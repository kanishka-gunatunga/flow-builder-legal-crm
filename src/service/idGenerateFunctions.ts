import { v4 as uuidv4 } from 'uuid';


// node id generate
export const generateNodeId = () => `node_${uuidv4()}`;

// edge id generate
export const generateEdgeId = () => `edge_${uuidv4()}`;

// group id
export const generateGroupId = () => `group_${uuidv4()}`;

// group id
export const formElementId = () => `field_${uuidv4()}`;

export const apiUrl = 'https://dfcc.vercel.app';
