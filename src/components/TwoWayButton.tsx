import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow, useNodesState, useEdgesState } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { apiUrl } from '../service/idGenerateFunctions';
import { deleteNodeCall } from '../service/deleteFunctions';
import { getNodeData } from '../service/getData';
import initialNodes from "../data/nodes";
import initialEdges from "../data/edges";


// const dimensionAttrs = ['width', 'height'];

export default memo((id: any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [text, setText] = useState('Button');
    const [link, setLink] = useState('#');
    const [buttonId, setButtonId] = useState('')
    const [popupOpen, setPopupOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Edit');
    const [nodeId, setNodeId] = useState('');




    useEffect(() => {
        const fetchData = async () => {
          try {
                const nodeData = await getNodeData();
    
                const desiredNodeId = id.id; 
                const node = nodeData.buttonData.find((node: { node_id: any; }) => node.node_id === desiredNodeId);
    
                if (node) {
                    setText(node.text);
                    setLink(node.link);
                    setButtonText(node.text);
                } else {
                }
    
          } catch (error) {
            console.error("Error fetching node data:", error);
          }
        };
    
        fetchData();
      }, []);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };


    // node title input
    const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    };

    // node text area input
    const handleLinkChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLink(event.target.value);
    };


    const savePopup = () => {
        setButtonText(text);
        setLink(link);
        closePopup();
    };

    // add data from node to node list
    const saveNode = async () => {
        setButtonId(id.id)
        setButtonText(text);
        setLink(link);
        
        try {
            const response = await fetch(`${apiUrl}/data-flow-button-data`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id.id, text: text, link: link}), 
              });
        
            if (!response.ok) {
              throw new Error('Failed to delete node');
            }

        } catch (error) {
            
        }
        closePopup();
    };

    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])
    
    

    const deleteNode = async () => {
        deleteNodeCall(nodeId, "button", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap' style={{zIndex: '99999 !important'}}>
                {/* gradient */}
                <div className="wrapper  elementWrap">

                    <div className="inner">
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <IoClose style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <button onClick={openPopup} className='twoWayButton'>{text}</button>
                    </div>


                </div>


            </div>
            {popupOpen && (
                <div className="popup">
                    <div className="popupInner" style={{padding: '10px'}}>
                        <label>Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                        />
                        <label>Link</label>
                        <input
                            type="text"
                            value={link}
                            onChange={handleLinkChange}
                            style={{ marginBottom: '10px'}}
                        />
                        <button onClick={saveNode} className="saveButtonPopUp">Save</button>
                        <button onClick={closePopup} className="saveButtonPopUp" style={{ marginLeft: '10px'}}>Cancel</button>
                    </div>
                </div>
            )}
            {/* <Handle type="source" position={Position.Right} /> */}
            <Handle type="source" position={Position.Bottom} />
            {/* <Handle type="target" position={Position.Left} /> */}
        </>
    );
});
