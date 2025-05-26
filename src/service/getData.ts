import { SetStateAction } from "react";
import { Node, Edge } from "reactflow";
import { apiUrl } from "./idGenerateFunctions";


const english = "english";
const sinhala = "sinhala";
const tamil = "tamil";

const fetchDataFlowData = async () => {

    try {
      // const response = await fetch(`${apiUrl}/data-flow-retrieve-data`);
      // if (!response.ok) {
      //   throw new Error('Failed to retrieve data');
      // }
      // const data = await response.json();

    const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({language: "english"}), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    
    const data = await response.json();
    console.log('get english data response : ',data )

      // const filteredNodes = data.nodes.filter(node => node.language === "sinhala");

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchDataFlowDataSinhala = async () => {

    try {
    const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({language: "sinhala"}), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    const data = await response.json();
    console.log('get sinhala data response : ',data )

      // const filteredNodes = data.nodes.filter(node => node.language === "sinhala");

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const fetchDataFlowDataTamil = async () => {

    try {
    const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({language: "tamil"}), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    const data = await response.json();
    console.log('get tamil data response : ',data )

      // const filteredNodes = data.nodes.filter(node => node.language === "sinhala");

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const loadDataOnMount = async (setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; }, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; }) => {
    try {
      const data = await fetchDataFlowData();

      console.log("fetchDataFlowData ---> ", data)

      data.nodes.forEach((node: { parentId: any; parent_id: any; }) => {
        node.parentId = node.parent_id;
        delete node.parent_id;
    });
    
    console.log("test english : ", data.nodes);
  
      const filteredNodes = data.nodes.map((node: { [x: string]: any; }) => {
        const filteredNode: any = {};
        for (const key in node) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'node_id') {
            filteredNode['id'] = node[key]; // Rename node_id to id
          } else if (key === 'position' && node[key] !== null) {
            if (typeof node[key] === 'string') {
              try {
                // Parse the position string into an object
                const positionObj = JSON.parse(node[key]);
                // Assign x and y to the filteredNode under position
                filteredNode.position = { x: positionObj.x, y: positionObj.y };
              } catch (parseError) {
                console.error(`Failed to parse position string for node ${node.node_id}:`, node[key]);
              }
            } else if (typeof node[key] === 'object' && node[key] !== null) {
              // Assign position directly if it's already an object
              filteredNode.position = { x: node[key].x, y: node[key].y };
            }
          } else if (key !== 'style' && node[key] !== null) {
            // For other attributes, copy non-null values directly
            filteredNode[key] = node[key];
          }
        }

        // Add style for group nodes
        if (filteredNode.type === 'cardGroup') {
          filteredNode.style = {
            width: '300px',
            minHeight: '400px',
            height: 'auto !important',
            backgroundColor: '#f8f8f83d !important',
            zIndex: '0 !important',
            pointerEvents: "all",
            visibility: "visible",
            position: 'relative !important'
          };
        }
        else if (filteredNode.type === 'buttonGroup') {
          filteredNode.style = {
            position: 'relative !important',
            width: '300px',
            minHeight: '260px',
            height: '260px !important',
            backgroundColor: '#f8f8f83d !important',
            zIndex: '0 !important',
            pointerEvents: "all",
            visibility: "visible",
          };
        }
        else {
          filteredNode.style = {
            position: 'absolute !important'
          };
        }

        return filteredNode;
      });
  
      const filteredEdges = data.edges.map((edge: { [x: string]: any; }) => {
        const filteredEdge: any = {};
        for (const key in edge) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'edge_id') {
            filteredEdge['id'] = edge[key]; // Rename edge_id to id
          } else if (edge[key] !== null) {
            filteredEdge[key] = edge[key];
          }
        }
        return filteredEdge;
      });
  
      // Update state with filtered nodes and edges
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } catch (error) {
      console.error('Failed to fetch data on mount:', error);
      // Handle error as needed
    }
  };

  export const loadDataOnMountSinhala = async (setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; }, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; }) => {
    try {
      const data = await fetchDataFlowDataSinhala();

      data.nodes.forEach((node: { parentId: any; parent_id: any; }) => {
        node.parentId = node.parent_id;
        delete node.parent_id;
    });
    
    console.log("test sinhala : ", data.nodes);
  
      const filteredNodes = data.nodes.map((node: { [x: string]: any; }) => {
        const filteredNode: any = {};
        for (const key in node) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'node_id') {
            filteredNode['id'] = node[key]; // Rename node_id to id
          } else if (key === 'position' && node[key] !== null) {
            if (typeof node[key] === 'string') {
              try {
                // Parse the position string into an object
                const positionObj = JSON.parse(node[key]);
                // Assign x and y to the filteredNode under position
                filteredNode.position = { x: positionObj.x, y: positionObj.y };
              } catch (parseError) {
                console.error(`Failed to parse position string for node ${node.node_id}:`, node[key]);
              }
            } else if (typeof node[key] === 'object' && node[key] !== null) {
              // Assign position directly if it's already an object
              filteredNode.position = { x: node[key].x, y: node[key].y };
            }
          } else if (key !== 'style' && node[key] !== null) {
            // For other attributes, copy non-null values directly
            filteredNode[key] = node[key];
          }
        }

        // Add style for group nodes
        if (filteredNode.type === 'cardGroup') {
          filteredNode.style = {
            width: '300px',
            minHeight: '400px',
            height: 'auto !important',
            backgroundColor: '#f8f8f83d !important',
            zIndex: '0 !important',
            pointerEvents: "all",
            visibility: "visible",
            position: 'relative !important'
          };
        }
        else if (filteredNode.type === 'buttonGroup') {
          filteredNode.style = {
            position: 'relative !important',
            width: '300px',
            minHeight: '260px',
            height: '260px !important',
            backgroundColor: '#f8f8f83d !important',
            zIndex: '0 !important',
            pointerEvents: "all",
            visibility: "visible",
          };
        }
        else {
          filteredNode.style = {
            position: 'absolute !important'
          };
        }

        return filteredNode;
      });
  
      const filteredEdges = data.edges.map((edge: { [x: string]: any; }) => {
        const filteredEdge: any = {};
        for (const key in edge) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'edge_id') {
            filteredEdge['id'] = edge[key]; // Rename edge_id to id
          } else if (edge[key] !== null) {
            filteredEdge[key] = edge[key];
          }
        }
        return filteredEdge;
      });
  
      // Update state with filtered nodes and edges
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } catch (error) {
      console.error('Failed to fetch data on mount:', error);
      // Handle error as needed
    }
  };


  export const loadDataOnMountTamil = async (setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; }, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; }) => {
    try {
      const data = await fetchDataFlowDataTamil();

      data.nodes.forEach((node: { parentId: any; parent_id: any; }) => {
        node.parentId = node.parent_id;
        delete node.parent_id;
    });
    
    console.log("test tamil : ", data);
  
      const filteredNodes = data.nodes.map((node: { [x: string]: any; }) => {
        const filteredNode: any = {};
        for (const key in node) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'node_id') {
            filteredNode['id'] = node[key]; // Rename node_id to id
          } else if (key === 'position' && node[key] !== null) {
            if (typeof node[key] === 'string') {
              try {
                // Parse the position string into an object
                const positionObj = JSON.parse(node[key]);
                // Assign x and y to the filteredNode under position
                filteredNode.position = { x: positionObj.x, y: positionObj.y };
              } catch (parseError) {
                console.error(`Failed to parse position string for node ${node.node_id}:`, node[key]);
              }
            } else if (typeof node[key] === 'object' && node[key] !== null) {
              // Assign position directly if it's already an object
              filteredNode.position = { x: node[key].x, y: node[key].y };
            }
          } else if (key !== 'style' && node[key] !== null) {
            // For other attributes, copy non-null values directly
            filteredNode[key] = node[key];
          }
        }

        // Add style for group nodes
        if (filteredNode.type === 'cardGroup') {
          filteredNode.style = {
            width: '300px',
            minHeight: '400px',
            height: 'auto !important',
            backgroundColor: '#f8f8f83d !important',
            zIndex: '0 !important',
            pointerEvents: "all",
            visibility: "visible",
            position: 'relative !important'
          };
        }
        else if (filteredNode.type === 'buttonGroup') {
          filteredNode.style = {
            position: 'relative !important',
            width: '300px',
            minHeight: '260px',
            height: '260px !important',
            backgroundColor: '#f8f8f83d !important',
            zIndex: '0 !important',
            pointerEvents: "all",
            visibility: "visible",
          };
        }
        else {
          filteredNode.style = {
            position: 'absolute !important'
          };
        }

        return filteredNode;
      });
  
      const filteredEdges = data.edges.map((edge: { [x: string]: any; }) => {
        const filteredEdge: any = {};
        for (const key in edge) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'edge_id') {
            filteredEdge['id'] = edge[key]; // Rename edge_id to id
          } else if (edge[key] !== null) {
            filteredEdge[key] = edge[key];
          }
        }
        return filteredEdge;
      });
  
      // Update state with filtered nodes and edges
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } catch (error) {
      console.error('Failed to fetch data on mount:', error);
      // Handle error as needed
    }
  };
  


  export const getNodeData = async () => {
    try {
        // const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     }
        //   });
        const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({language: english}), 
        });

          const data = await response.json();
          console.log('get english data response : ',data )


          // const filteredNodes = data.nodes.filter((node: { id: string; }) => !/^field_/.test(node.id));

    // Create a new data object with the filtered nodes
    // const newData = {
    //     ...data,
    //     nodes: filteredNodes
    // };

    // console.log('filtered data: ', filteredNodes);


        if (!response.ok) {
          throw new Error('Failed to get node data');
        }
        return data;
      } catch (error) {
        console.error('Error deleting node:', error);
        // Handle error as needed
      }
};


export const getTamilNodeData = async () => {
  try {
      const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({language: tamil}), 
      });

        const data = await response.json();
        console.log('get sinhala data response : ',data )

      if (!response.ok) {
        throw new Error('Failed to get node data');
      }
      return data;
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
};


export const getSinhalaNodeData = async () => {
  try {
      const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({language: sinhala}), 
      });

        const data = await response.json();
        console.log('get sinhala data response : ',data )

      if (!response.ok) {
        throw new Error('Failed to get node data');
      }
      return data;
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
};