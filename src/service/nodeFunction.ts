import { SetStateAction, useCallback } from "react";
import { generateNodeId } from "./idGenerateFunctions";
import { Node } from "reactflow";

const processNode = {
    color: '#fff',
    borderColor: '#872341',
  };

  const apiUrl = 'https://dfcc.vercel.app';
  
export const addNode = async (language: string, type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: (prevNodes: any) => any[]): void; }) => {

  console.log("API DATA : ", language , type)

  const newNodeId = generateNodeId();
  const newNode = {
    id: newNodeId,
    data: { label: `Node ${newNodeId}` },
    position: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    type,
    language: language,
    style: processNode,
  };

  // setNodes((prevNodes) => {
  //   const updatedNodes = [...prevNodes, newNode];
  //   console.log('Updated Node List:', updatedNodes);
  //   return updatedNodes;
  // });

  try {
    // Make API call to post the new node data

    console.log("new node add : ", newNode)
    const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNode), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    console.log('new node add response : ',response )

    setNodes((prevNodes: any) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  } catch (error) {
    console.error('Error adding node:', error);
  }
};



// export const onNodeDragStopCall = async (id: undefined, position: undefined) =>{
//     try {
//       // console.log("update node : ", { id: node.id, position: { x, y } })
//       const response = await fetch(`${apiUrl}/data-flow-update-node`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id: node.id, position: { x, y } }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update node position');
//       }

//       // console.log("response update node : ", response)

//     } catch (error) {
//       console.error('Error updating node position:', error);
//       // Handle error as needed
//     }
//   }
