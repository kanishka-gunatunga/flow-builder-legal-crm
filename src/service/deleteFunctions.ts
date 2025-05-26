import { Edge, Node, useEdgesState, useNodesState } from "reactflow";
import { loadDataOnMount, loadDataOnMountSinhala, loadDataOnMountTamil } from "./getData";
import { apiUrl } from "./idGenerateFunctions";
import { SetStateAction } from "react";


export const edgeDelete = async (edge_id: any) => {
    
    try {
        // console.log("edge_id ", edge_id)
        const response = await fetch(`${apiUrl}/data-flow-delete-edge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: edge_id}),
        });

        if (!response.ok) {
            throw new Error('Failed to delete edge');
        }
        console.log("edge delete response : ",response)
    } catch (error) {

    }
}


export const deleteNodeCall = async (id: any , type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; } | undefined, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; } | undefined) => {
    try {
      // console.log("-------------- delete id api ------- : ", id)
      console.log("Node ID button - english: ",id, "type: ", type )
        const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, type}), 
          });
    
        if (!response.ok) {
          throw new Error('Failed to delete node');
        }
        console.log("english node delete response : ",response)

        loadDataOnMount(setNodes, setEdges);
      } catch (error) {
        console.error('Error deleting node:', error);
      }
      
};

export const deleteFieldCall = async (id: any , type: string) => {
  try {
    // console.log("-------------- delete id api ------- : ", id)
    console.log("Node ID button - english: ",id, "type: ", type )
      const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, type}), 
        });
  
      if (!response.ok) {
        throw new Error('Failed to delete node');
      }
      console.log("english node delete response : ",response)

    } catch (error) {
      console.error('Error deleting node:', error);
    }
    
};

export const deleteNodeCallSinhala = async (id: any , type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; } | undefined, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; } | undefined) => {
  try {
    // console.log("-------------- delete id api ------- : ", id)
    console.log("Node ID button - sinhala: ",id, "type: ", type )
      const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, type}), 
        });
  
      if (!response.ok) {
        throw new Error('Failed to delete node');
      }
      console.log("sinhala node delete response : ",response)
      loadDataOnMountSinhala(setNodes, setEdges);
      // console.log('Node deleted:', id);
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
    
};

export const deleteNodeCallTamil = async (id: any , type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; } | undefined, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; } | undefined) => {
  try {
    // console.log("-------------- delete id api ------- : ", id)
    console.log("Node ID button - tamil: ",id, "type: ", type )
      const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, type}), 
        });
  
      if (!response.ok) {
        throw new Error('Failed to delete node');
      }
      console.log("tamil node delete response : ",response)
      loadDataOnMountTamil(setNodes, setEdges);
      // console.log('Node deleted:', id);
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
    
};