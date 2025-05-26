import React, { memo } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { deleteNodeCall } from '../service/deleteFunctions';
import { IoClose } from "react-icons/io5";


export default memo((id: any) => {
  const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
  

  const deleteNode = async () => {
    deleteNodeCall(id.id, "end", setNodes, setEdges)
};

  return (
    <>
      <div className="wrapper"  style={{ overflow: 'visible' }}>
        {/* <div className="inner">{label || 'no node connected'}</div> */}
        <div className="inner" style={{color: '#383D44 !important',  overflow: 'visible' }}>
        <div style={{ display: 'flex', justifyContent: 'end', position: 'absolute', top: -15, right: -5 }}>
            <button className='nodeCloseButton' onClick={deleteNode}>
            <IoClose style={{ color: '#000 !important', fontSize: '20px !important' }} />
            </button>
          </div>
          <p style={{color: '#383D44 !important'}}>
          End
          </p>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
});
