import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';


// const dimensionAttrs = ['width', 'height'];

export default memo(( id:any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [text, setText] = useState('Button');
    const [link, setLink] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Edit');
    const [nodeId, setNodeId] = useState('');

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


    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])


    const deleteNode = async () => {
        deleteNodeCall(nodeId, "buttonNode", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap' style={{zIndex: '99999 !important'}}>
                {/* gradient */}
                <div className="wrapper  elementWrap">

                    <div className="inner">
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <button onClick={openPopup} className='saveButton'>{text}</button>
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
                        <button onClick={savePopup}>Save</button>
                        <button onClick={closePopup} style={{ marginLeft: '10px'}}>Cancel</button>
                    </div>
                </div>
            )}
            <Handle type="source" position={Position.Bottom} />
            {/* <Handle type="target" position={Position.Top} /> */}
        </>
    );
});
