import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo((id: any ) => {


  return (
    <>

      <div className="wrappers" style={{ overflow: 'visible' }}>
        <div className="inner" style={{ color: '#383D44 !important', overflow: 'visible' }}>
          <p style={{ color: '#383D44 !important' }}>
            Start
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
