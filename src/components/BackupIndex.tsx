import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  NodeToolbar,
  Connection,
  Edge,
  updateEdge,
  Position,
  ControlButton,
  NodeResizeControl,
} from "reactflow";

import initialNodes from "../data/nodes";
import initialEdges from "../data/edges";
import ButtonEdge from "./ButtonEdge";
import TextInputNode from "./TextInputNode";

import '../styles/overview.css';
import ToolBarNode from "./ToolBarNode";
import CircleNode from "./CircleNode";
import AnotationNode from "./AnotationNode";
import ButtonNode from "./ButtonNode";
import TextImageNode from "./TextImageNode";
import CardGroupNode from "./TextOnlyNodeStyle";

import { IoAddCircle } from "react-icons/io5";
import { addNode } from "../service/nodeFunction";
import { generateEdgeId, generateGroupId, generateNodeId } from "../service/idGenerateFunctions";
import TwoWayButton from "./TwoWayButton";
import CardStyleOne from "./CardStyleOne";
import EndCircleNode from "./EndCircleNode";
import GroupView from "./ButtonGroupView";
import GroupViewLarge from "./CardGroupView";
import { loadDataOnMount } from "../service/getData";


const nodeTypes = {
  textinput: TextInputNode,
  tools: ToolBarNode,
  start: CircleNode,
  annotation: AnotationNode,
  button: TwoWayButton,
  cardHeader: TextImageNode,
  cardStyleOne: CardStyleOne,
  textOnly: CardGroupNode,
  end: EndCircleNode,
  buttonGroup: GroupView,
  cardGroup: GroupViewLarge
};


const edgeTypes = {
  button: ButtonEdge,
};

const processNode = {
  color: '#fff',
  borderColor: '#872341',
};

const nodeClassName = (node: { type: any; }) => node.type;






const FlowPanel = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [buttonGroupId, setButtonGroupId] = useState(null);

  const [loadData, setLoadData] = useState(null)

  // const apiUrl = 'https://dfcc-chat-bot.vercel.app';
  const apiUrl = 'https://legal-crm.vercel.app';

  

  

  useEffect(() => {
    loadDataOnMount( setNodes , setEdges )
  }, []);

  // add start circle node
  const addCircleNode = () => {
    addNode('start', setNodes);
  };

  // add text imput node
  const addTextNode = () => {
    addNode('textinput', setNodes);
  };

  // add tool node
  const addToolNode = () => {
    addNode('tools', setNodes);
  };

  // test group - change this ----------------------
  const addCardViewNode = () => {
    addNode('cardView', setNodes);
  };

  // add button node
  const addButtonNode = () => {
    addNode('button', setNodes);
  };

  // add card header node - need to change this also ----------
  const addCardHeaderNode = () => {
    addNode('cardStyleOne', setNodes);
  };

  // text only node
  const addTextOnlyNode = () => {
    addNode('textOnly', setNodes);
  };

  // add start circle node
  const addEndNode = () => {
    addNode('end', setNodes);
  };





  // const onEdgeUpdate = useCallback(
  //   (oldEdge: Edge, newConnection: Connection) => {
  //     const updatedEdge = updateEdge(oldEdge, newConnection, edges);
  //     updatedEdge.type = 'button';
  //     setEdges((prevEdges) => {
  //       const updatedEdges = prevEdges.map((edge) =>
  //         edge.id === updatedEdge.id ? updatedEdge : edge
  //       );
  //       console.log('Updated Edges List:', updatedEdges);
  //       return updatedEdges;
  //     });
  //   },
  //   [edges, setEdges]
  // );

  // const onNodeDragStop = useCallback(
  //   (event: any, node: { position: { x: any; y: any; }; id: string; }) => {
  //     const { x, y } = node.position;
  //     setNodes((prevNodes) =>
  //       prevNodes.map((n) =>
  //         n.id === node.id ? { ...n, position: { x, y } } : n
  //       )
  //     );
  //     console.log('Updated Node List:', nodes);
  //   },
  //   [nodes, setNodes]
  // );




  const onEdgeUpdate = useCallback(
    async (oldEdge: Edge, newConnection: Connection) => {
      const updatedEdge = updateEdge(oldEdge, newConnection, edges);
      updatedEdge.type = 'button';

      try {
        // console.log("update edge : ", updatedEdge)
        const response = await fetch(`${apiUrl}/data-flow-update-edge`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEdge),
        });

        if (!response.ok) {
          throw new Error('Failed to update edge');
        }
        // console.log("update response : ", response)


      } catch (error) {
        console.error('Error updating edge:', error);
        // Handle error as needed
      }

      setEdges((prevEdges) => {
        const updatedEdges = prevEdges.map((edge) =>
          edge.id === updatedEdge.id ? updatedEdge : edge
        );
        // console.log('Updated Edges List:', updatedEdges);
        return updatedEdges;
      });
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    async (params: Edge | Connection) => {
      if (!('id' in params)) {
        params.id = generateEdgeId();
      }
      params.type = 'button';

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

        setEdges((prevEdges) => {
          const newEdges = addEdge(params, prevEdges);
          // console.log('Updated Edges List:', newEdges);
          return newEdges;
        });
      } catch (error) {
        console.error('Error adding edge:', error);
        // Handle error as needed
      }
    },
    [setEdges]
  );

  const onNodeDragStop = useCallback(
    async (event: any, node: { position: { x: any; y: any }; id: string }) => {
      const { x, y } = node.position;
      try {
        // console.log("update node : ", { id: node.id, position: { x, y } })
        const response = await fetch(`${apiUrl}/data-flow-update-node`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: node.id, position: { x, y } }),
        });

        if (!response.ok) {
          throw new Error('Failed to update node position');
        }

        // console.log("response update node : ", response)

        setNodes((prevNodes) =>
          prevNodes.map((n) => (n.id === node.id ? { ...n, position: { x, y } } : n))
        );
        // console.log('Updated Node List:', nodes);
      } catch (error) {
        console.error('Error updating node position:', error);
        // Handle error as needed
      }
    },
    [nodes, setNodes]
  );







  // card style 2 group
  const addGroup = async () => {
    const groupId = generateGroupId();
    setGroupId(groupId);

    const group = {
      id: groupId,
      type: 'cardGroup',
      data: { label: 'Group' },
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
      style: {
        width: '300px',
        minHeight: '400px',
        height: 'auto !important',
        backgroundColor: 'rgba(208, 192, 247, 0.2)',
        zIndex: '999',
        position: 'relative !important'
      },
      buttons: [{
        label: 'Delete',
        onClick: () => handleDeleteGroup(groupId)
      }]
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, group];
      // console.log("Updated Node List with group:", updatedNodes);
      return updatedNodes;
    });

    try {

      // console.log("new group node data : ", group)
      const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      // console.log('response : ', response)

      setGroups([...groups, group]);

      // Add group card header node
      await addGroupCardHeaderNode(groupId);

      // Add group button node
      await addGroupButtonNode(groupId);

    } catch (error) {
      console.error('Error creating group:', error);
      // Handle error as needed
    }
  };

  const addGroupCardHeaderNode = async (groupId) => {
    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: 0,
        y: 0,
      },
      type: 'cardHeader',
      style: {
        position: 'absolute !important'
      },
      parentId: groupId,
      extent: 'parent',
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      // console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });

    try {
      // console.log("new group header node data : ", newNode)
      const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNode),
      });

      if (!response.ok) {
        throw new Error('Failed to create group card header node');
      }

      // console.log('response : ', response)


    } catch (error) {
      console.error('Error creating group card header node:', error);
    }
  };

  const addGroupButtonNode = async (groupId) => {

    const buttonsCount = nodes.filter(node => node.type === 'button' && node.parentId === groupId).length;

    if (buttonsCount >= 3) {
      alert('Maximum button limit reached for this group');
      return;
    }

    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: 10 + (buttonsCount * 95),
        y: 325,
      },
      type: 'button',
      style: {
        position: 'absolute !important'
      },
      parentId: groupId,
      extent: 'parent',
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      // console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });

    try {

      // console.log("new group button node data : ", newNode)
      const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNode),
      });

      if (!response.ok) {
        throw new Error('Failed to create group button node');
      }

      // console.log('response : ', response)

    } catch (error) {
      console.error('Error creating group button node:', error);
    }
  };









  const deleteGroup = (groupId) => {
    const filteredNodes = nodes.filter(node => node.parentId !== groupId && node.id !== groupId);
    setNodes(filteredNodes);
    // Remove group from groups state
    setGroups(groups.filter(group => group.id !== groupId));
  };

  // Add this function to handle the click event of the delete button
  const handleDeleteGroup = (groupId) => {
    deleteGroup(groupId);
  };

  const addFloatingButton = () => {
    if (!groupId) {
      console.error("Group ID is not defined");
      return;
    }

    addGroupButtonNode(groupId);
  };










  // button group 
  const addButtonGroup = async () => {
    const buttonGroupId = generateGroupId();
    setButtonGroupId(buttonGroupId);

    const group = {
      id: buttonGroupId,
      type: 'buttonGroup',
      data: { label: 'Group' },
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
      style: {
        width: '300px',
        minHeight: '100px',
        height: 'auto !important',
        backgroundColor: 'rgba(208, 192, 247, 0.2)',
        zIndex: '999'
      },
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, group];
      // console.log("Updated Node List with group:", updatedNodes);
      return updatedNodes;
    });

    try {

      // console.log("new group node data : ", group)
      const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      // console.log('response : ', response)

      setGroups([...groups, group]);

      // Add group button node
      addGroupButtonsNodes(buttonGroupId);

      // console.log("group : ", group);

    } catch (error) {
      console.error('Error creating group:', error);
      // Handle error as needed
    }
  };

  const addGroupButtonsNodes = async (buttonGroupId: string | undefined) => {

    const buttonsCount = nodes.filter(node => node.type === 'button' && node.parentId === buttonGroupId).length;

    if (buttonsCount >= 3) {
      alert('Maximum button limit reached for this group');
      return;
    }

    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: 10 + (buttonsCount * 95),
        y: 10,
      },
      type: 'button',
      style: {
        position: 'relative !important'
      },
      parentId: buttonGroupId,
      extent: 'parent',
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      // console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });

    try {

      // console.log("new group button node data : ", newNode)
      const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNode),
      });

      if (!response.ok) {
        throw new Error('Failed to create group button node');
      }

      // console.log('response : ', response)

    } catch (error) {
      console.error('Error creating group button node:', error);
    }


  };

  const addFloatingButtonForButtonGroup = () => {
    if (!buttonGroupId) {
      console.error("Group ID is not defined");
      return;
    }
    addGroupButtonsNodes(buttonGroupId);
  };





  return (
    <>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 999, display: 'flex', flexDirection: 'column' }}>
        <button onClick={addCircleNode} >start</button>
        <button onClick={addEndNode} style={{ marginTop: '10px' }}>End</button>
        <button onClick={addTextNode} style={{ marginTop: '10px' }}>text card</button>
        {/* <button onClick={addToolNode} style={{ marginTop: '10px' }}>tool</button> */}
        <button onClick={addButtonGroup} style={{ marginTop: '10px' }}>
          Buttons
        </button>
        <button onClick={addTextOnlyNode} style={{ marginTop: '10px' }}>Text</button>
        <button onClick={addCardHeaderNode} style={{ marginTop: '10px' }}>
          Card style 1
        </button>
        <button onClick={addGroup} style={{ marginTop: '10px' }}>Card style 2</button>




        {groupId && (
          <button
            style={{
              position: "relative",
              bottom: "0px",
              right: "0px",
              zIndex: "1000",
              marginTop: '50px'
            }}
            onClick={addFloatingButton}
          >
            <IoAddCircle /> Card Buttons

          </button>
        )}
        {buttonGroupId && (
          <button
            style={{
              position: "relative",
              bottom: "0px",
              right: "0px",
              zIndex: "1000",
              marginTop: '10px'
            }}
            onClick={addFloatingButtonForButtonGroup}
          >
            <IoAddCircle /> Buttons Group

          </button>
        )}
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeDragStop={onNodeDragStop}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Controls />
          {/* <Controls>
            <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
              <IoAddCircle style={{ color: '#000' }} />
            </ControlButton>
          </Controls> */}
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          <NodeToolbar />
          <NodeResizeControl />
        </ReactFlow>
      </div>
    </>
  );
};

export default FlowPanel;
