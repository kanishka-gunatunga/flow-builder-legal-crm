import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow, useEdgesState, useNodesState } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';
import { IoClose } from "react-icons/io5";




export default memo((id: any) => {

    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [intent, setIntent] = useState('');
    const [nodeId, setNodeId] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const nodeData = await getNodeData();

                const desiredNodeId = id.id;
                const node = nodeData.textBox.find((node: { node_id: any; }) => node.node_id === desiredNodeId);
                const nodeIntent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

                if (node) {
                    setTitle(node.title);
                    setDescription(node.description);
                    setIntent(nodeIntent.intent)
                } else {
                }

            } catch (error) {
                console.error("Error fetching node data:", error);
            }
        };

        fetchData();
    }, []);

    // node intent input
    const handleIntentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntent(event.target.value);
    };

    // node title input
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    // node text area input
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };

    // add data from node to node list
    const saveNode = async () => {
        try {
            console.log("intent : ", intent)
            const response = await fetch(`${apiUrl}/data-flow-text-box`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id.id, title: title, description: description, intent: intent }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete node');
            }
            console.log("text input save node : ", response)
        } catch (error) {

        }
    };

    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])



    // delete node from list
    const deleteNode = async () => {
        deleteNodeCall(nodeId, "textinput", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper plainColor elementWrap">

                    <div className="inner" style={{display: "flex", flexDirection: "column", padding: "10px", borderRadius: "10px"}}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                            <IoClose style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <label>Intent</label>
                        <input
                            type="text"
                            value={intent || ''}
                            onChange={handleIntentChange}
                            className="nodrag cardInput"
                            placeholder='Add Intent'
                        />

                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="nodrag cardInput"
                            placeholder='Add Card Title'
                        />
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className="nodrag cardInput"
                            placeholder='Add Description'
                        ></textarea>
                        <button onClick={saveNode} className='saveButton' style={{marginTop:"20px"}}>Save</button>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            {/* <Handle type="source" position={Position.Bottom} /> */}
        </>
    );
});
