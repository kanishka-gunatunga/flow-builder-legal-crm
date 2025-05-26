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

import '../styles/overview.css';
import ToolBarNode from "./ToolBarNode";
import CircleNode from "./CircleNode";
import AnotationNode from "./AnotationNode";

import { IoAddCircle } from "react-icons/io5";
import { addNode } from "../service/nodeFunction";
import { apiUrl, generateEdgeId, generateGroupId, generateNodeId } from "../service/idGenerateFunctions";
import CardStyleOne from "./CardStyleOne";
import EndCircleNode from "./EndCircleNode";
import { loadDataOnMountSinhala } from "../service/getData";
import { onConnectEdge } from "../service/edgeFunctions";
import TextOnlyNodeStyle from "./TextOnlyNodeStyle";
import TextImageNodeSinhala from "./sinhala/TextImageNodeSinhala";
import ButtonGroupViewSinhala from "./sinhala/ButtonGroupViewSinhala";
import TwoWayButtonSinhala from "./sinhala/TwoWayButtonSinhala";
import TextInputNodeSinhala from "./sinhala/TextInputNodeSinhala";
import TextOnlyNodeStyleSinhala from "./sinhala/TextOnlyNodeStyleSinhala";
import CardStyleOneSinhala from "./sinhala/CardStyleOneSinhala";
import CardGroupView from "./sinhala/CardGroupView";
import FormGroupSinhala from "./sinhala/FormGroupSinhala";


const nodeTypes = {
  textinput: TextInputNodeSinhala,
  tools: ToolBarNode,
  start: CircleNode,
  annotation: AnotationNode,
  button: TwoWayButtonSinhala,
  cardHeader: TextImageNodeSinhala,
  cardStyleOne: CardStyleOneSinhala,
  textOnly: TextOnlyNodeStyleSinhala,
  end: EndCircleNode,
  buttonGroup: ButtonGroupViewSinhala,
  cardGroup: CardGroupView,
  formGroup: FormGroupSinhala
};


const edgeTypes = {
  button: ButtonEdge,
};




interface FlowPanelProps {
  language: string;
}

const SinhalaFlowPanel: React.FC<FlowPanelProps> = (language ) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [buttonGroupId, setButtonGroupId] = useState(null);

  const [selectedLanguage, setSelectedLanguage] = useState(String);
  

  useEffect(() => {
    
    loadDataOnMountSinhala(setNodes, setEdges );
    console.log("Language : ", language.language)
    setSelectedLanguage(language.language)
    console.log("nodes : ", nodes)
  }, []);


  useEffect(() => {

  }, [groupId])



  // add text imput node
  const addTextNode = () => {
    addNode('sinhala', 'textinput', setNodes);
  };

  // add card header node - need to change this also ----------
  const addCardHeaderNode = () => {
    addNode('sinhala','cardStyleOne', setNodes);
  };

  // text only node
  const addTextOnlyNode = () => {
    addNode('sinhala', 'textOnly', setNodes);
  };

  // add start circle node
  const addEndNode = () => {
    addNode('sinhala' ,'end', setNodes);
  };

  const addFormGroupNode = () => {
    addNode('sinhala', 'formGroup', setNodes);
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
        backgroundColor: 'rgba(208, 192, 247, 0.2)',
        zIndex: '0 !important',
        position: 'relative !important'
      },
      language: 'sinhala'
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
      language: 'sinhala'
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
      language: 'sinhala'
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
    const savedNodeId = localStorage.getItem('selectedSinhalaNodeID');
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
      language: 'sinhala'
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
      language: 'sinhala'
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
    const savedNodeId = localStorage.getItem('selectedSinhalaButtonID');
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

export default SinhalaFlowPanel;
