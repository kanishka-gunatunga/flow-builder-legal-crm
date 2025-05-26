import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

import { deleteNodeCall } from '../service/deleteFunctions';


export default memo((id: any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [nodeId, setNodeId] = useState('');
    const [isSelected, setIsSelected] = useState(false);



    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])

    const toggleSelection = () => {
        setIsSelected(!isSelected);
        localStorage.setItem('selectedEnglishNodeID', id.id);
        console.log("selected : ", id.id)
    };

    // const toggleSelection = () => {
    //     if (isSelected) {
          
    //     //   localStorage.setItem('selectedEnglishNodeID', id.id);
    //     localStorage.removeItem('selectedEnglishNodeID');
    //       console.log("card group : ",id.id)
    //     //   setEnglishButtonID(null);
    //     } else {
    //         // localStorage.removeItem('selectedEnglishNodeID');
    //         localStorage.setItem('selectedEnglishNodeID', id.id);
    //     //   setEnglishButtonID(id.id);
    //     }
    //     setIsSelected(!isSelected);
    //   };
    // console.log("selected : ", isSelected)
    
    const deleteNode = async () => {
        deleteNodeCall(nodeId, "cardGroup",setNodes, setEdges)
    };



    return (
        <>
            <div className='elementWrap' id={nodeId}>
            {/* <input type="checkbox" checked={isSelected} onChange={toggleSelection} className="select-checkbox" /> */}
                {/* gradient */}
                <div className="wrapper groupColor elementWrap" style={{ borderRadius: '10px' }}>

                    <div className="inner" style={{ height: '480px', width: '300px' }}>
                    <div className='topBarGroup'>
                        <input type="checkbox" checked={isSelected} onChange={toggleSelection} className="select-checkbox" />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <IoClose style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                    </div>
                    </div>
                    


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            {/* <Handle type="source" position={Position.Bottom} /> */}
        </>
    );
});
