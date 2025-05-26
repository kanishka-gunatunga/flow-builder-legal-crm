const apiUrl = 'https://dfcc.vercel.app';


export const onConnectEdge = async (params: any): Promise<void> => {
    try {
      // console.log("new edge data : ", params)
      const response = await fetch(`${apiUrl}/data-flow-insert-edge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add edge');
      }
  
      // console.log('response : ', response)
  
    } catch (error) {
      console.error('Error adding edge:', error);
    }
      
  };

// export const addOrUpdateEdge = (
//   params: any,
//   edges: any[], 
//   setEdges: (value: SetStateAction<any[]>) => void 
// ) => {
//   if (!('id' in params)) {
//     params.id = generateEdgeId();
//   }
//   params.type = 'button';
//   setEdges((prevEdges) => {
//     const newEdges = addEdge(params, prevEdges);
//     console.log('Updated Edges List:', newEdges);
//     return newEdges;
//   });
// };

// export const updateExistingEdge = (
//   oldEdge: any, 
//   newConnection: any, 
//   edges: any[], 
//   setEdges: (value: SetStateAction<any[]>) => void 
// ) => {
//   const updatedEdge = updateEdge(oldEdge, newConnection, edges);
//   updatedEdge.type = 'button';
//   setEdges((prevEdges) => {
//     const updatedEdges = prevEdges.map((edge) =>
//       edge.id === updatedEdge.id ? updatedEdge : edge
//     );
//     console.log('Updated Edges List:', updatedEdges);
//     return updatedEdges;
//   });
// };


