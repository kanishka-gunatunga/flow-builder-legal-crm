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
import TextImageNode from "./TextImageNode";

import { IoAddCircle } from "react-icons/io5";
import { addNode } from "../service/nodeFunction";
import { apiUrl, generateEdgeId, generateGroupId, generateNodeId } from "../service/idGenerateFunctions";
import TwoWayButton from "./TwoWayButton";
import CardStyleOne from "./CardStyleOne";
import EndCircleNode from "./EndCircleNode";
import ButtonGroupView from "./ButtonGroupView";
import CardGroupView from "./CardGroupView";
import { loadDataOnMount, loadDataOnMountTamil } from "../service/getData";
import { onConnectEdge } from "../service/edgeFunctions";
import TextOnlyNodeStyle from "./TextOnlyNodeStyle";
import TextInputNodeTamil from "./tamil/TextInputNodeTamil";
import ButtonGroupViewTamil from "./tamil/ButtonGroupViewTamil";
import TextOnlyNodeStyleTamil from "./tamil/TextOnlyNodeStyleTamil";
import CardStyleOneTamil from "./tamil/CardStyleOneTamil";
import TextImageNodeTamil from "./tamil/TextImageNodeTamil";
import TwoWayButtonTamil from "./tamil/TwoWayButtonTamil";
import CardGroupViewTamil from "./tamil/CardGroupViewTamil";
import FormGroupTamil from "./tamil/FormGroupTamil";


const nodeTypes = {
  textinput: TextInputNodeTamil,
  tools: ToolBarNode,
  start: CircleNode,
  annotation: AnotationNode,
  button: TwoWayButtonTamil,
  cardHeader: TextImageNodeTamil,
  cardStyleOne: CardStyleOneTamil,
  textOnly: TextOnlyNodeStyleTamil,
  end: EndCircleNode,
  buttonGroup: ButtonGroupViewTamil,
  cardGroup: CardGroupViewTamil,
  formGroup: FormGroupTamil
};


const edgeTypes = {
  button: ButtonEdge,
};




interface FlowPanelProps {
  language: string;
}


// tamil flow
const TamilFlowPanel: React.FC<FlowPanelProps> = (language) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [buttonGroupId, setButtonGroupId] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(String);



  useEffect(() => {
    console.log("Language : ", language.language)
    setSelectedLanguage(language.language)
    loadDataOnMountTamil(setNodes, setEdges);
    console.log("nodes : ", nodes)
  }, []);


  useEffect(() => {

  }, [groupId])



  // add text imput node
  const addTextNode = () => {
    addNode('tamil', 'textinput', setNodes);
  };

  // add card header node - need to change this also ----------
  const addCardHeaderNode = () => {
    addNode('tamil', 'cardStyleOne', setNodes);
  };

  // text only node
  const addTextOnlyNode = () => {
    addNode('tamil', 'textOnly', setNodes);
  };

  // add start circle node
  const addEndNode = () => {
    addNode('tamil', 'end', setNodes);
  };

  const addFormGroupNode = () => {
    addNode('tamil', 'formGroup', setNodes);
  };

  // edge connect
  const onConnect = useCallback(
    async (params: Edge | Connection) => {
      if (!('id' in params)) {
        params.id = generateEdgeId();
      }
      params.type = 'button';
      onConnectEdge(params)
      console.log('Updated params:', params);

      setEdges((prevEdges) => {
        const newEdges = addEdge(params, prevEdges);
        return newEdges;
      });

    },
    [setEdges]
  );


  const onNodeDragStop = useCallback(
    async (event: any, node: { position: { x: any; y: any }; id: string }) => {
      const { x, y } = node.position;
      try {
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

        setNodes((prevNodes) =>
          prevNodes.map((n) => (n.id === node.id ? { ...n, position: { x, y } } : n))
        );
      } catch (error) {
        console.error('Error updating node position:', error);
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
        backgroundColor: '#f8f8f8 !important',
        zIndex: '0 !important',
        pointerEvents: "all",
        visibility: "visible",
        position: 'relative !important'
      },
      language: 'tamil'
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, group];
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

  const addGroupCardHeaderNode = async (groupId: string) => {
    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: 0,
        y: 15,
      },
      type: 'cardHeader',
      style: {
        position: 'absolute !important'
      },
      parentId: groupId,
      extent: 'parent',
      language: 'tamil'
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

    } catch (error) {
      console.error('Error creating group card header node:', error);
    }
  };

  const addGroupButtonNode = async (groupId: string | undefined) => {

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
        y: 380,
      },
      type: 'button',
      style: {
        position: 'absolute !important'
      },
      parentId: groupId,
      extent: 'parent',
      language: 'tamil'
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










  // Add this function to handle the click event of the delete button
  const addFloatingButton = () => {
    const savedNodeId = localStorage.getItem('selectedTamilNodeID');
    if (!savedNodeId) {
      console.error("Group ID is not defined");
      return;
    }

    addGroupButtonNode(savedNodeId);
  };










  // button group 
  const addButtonGroup = async () => {
    const buttonGroupId = generateGroupId();
    setButtonGroupId(buttonGroupId);

    const group = {
      id: buttonGroupId,
      type: 'buttonGroup',
      data: { label: 'Group' },
      selectable: true,
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
      style: {
        width: '300px',
        minHeight: '260px',
        height: '260px !important',
        backgroundColor: '#f8f8f8 !important',
        zIndex: '0 !important',
        pointerEvents: "all",
        visibility: "visible",
      },
      language: 'tamil'
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
        y: 165,
      },
      type: 'button',
      style: {
        position: 'relative !important'
      },
      parentId: buttonGroupId,
      extent: 'parent',
      language: 'tamil'
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
    const savedNodeId = localStorage.getItem('selectedTamilButtonID');
    if (!savedNodeId) {
      console.error("Group ID is not defined");
      return;
    }
    addGroupButtonsNodes(savedNodeId);
  };

  // const currentTexts = buttonTexts[language.language] || buttonTexts.en;


  return (
    <>
      <div className="controlWrapper">
        <div className="flowHandleCard" style={{ position: 'absolute', top: 10, zIndex: 999, display: 'flex', flexDirection: 'row' }}>
          <button className="OptionButton" style={{ marginRight: '10px' }} onClick={addButtonGroup}>
            Buttons
          </button>
          <button className="OptionButton" style={{ marginRight: '10px' }} onClick={addCardHeaderNode}>
            Card style 1
          </button>
          <button className="OptionButton" style={{ marginRight: '10px' }} onClick={addGroup} >Card style 2</button>
          <button className="OptionButton" style={{ marginRight: '10px' }} onClick={addEndNode}>End</button>
          <button className="OptionButton" style={{ marginRight: '10px' }} onClick={addTextOnlyNode}>Text</button>
          <button className="OptionButton" style={{ marginRight: '10px' }} onClick={addTextNode}>text card</button>
          <button className="OptionButton" style={{ marginRight: '10px' }} onClick={addFormGroupNode}>Form</button>


          <button
            className="OptionButton"
            style={{ marginRight: '10px' }}
            onClick={addFloatingButton}
          >
            <IoAddCircle /> Card Buttons

          </button>
          <button
            className="OptionButton"
            onClick={addFloatingButtonForButtonGroup}
          >
            <IoAddCircle /> Buttons Group

          </button>
        </div>
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeDragStop={onNodeDragStop}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onEdgeUpdate={onEdgeUpdate}
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

export default TamilFlowPanel;
