// groupFunctions.js

import { generateGroupId } from "./idGenerateFunctions";


export const generateGroup = (setGroups, setNodes, addGroupCardHeaderNode, addGroupButtonNode) => {
  const groupId = generateGroupId();
  setGroupId(groupId);

  const group = {
    id: groupId,
    type: 'group',
    data: { label: 'Group' },
    position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
    style: {
      width: '248px',
      minHeight: '320px',
      maxHeight: '450px',
      height: 'auto !important',
      backgroundColor: 'rgba(208, 192, 247, 0.2)',
      zIndex: '0'
    },
  };

  setGroups([...groups, group]);

  // Add group card header node
  addGroupCardHeaderNode(groupId);

  // Add group button node
  addGroupButtonNode(groupId);

  console.log("group : ", group);

  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes, group];
    console.log("Updated Node List with group:", updatedNodes);
    return updatedNodes;
  });
};
