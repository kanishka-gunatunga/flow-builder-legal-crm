import React, { memo, useEffect, useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from "../service/deleteFunctions";
import { apiUrl } from "../service/idGenerateFunctions";
import { getNodeData } from "../service/getData";
import { IoClose } from "react-icons/io5";



export default memo((id: any) => {
  const { setNodes } = useReactFlow();
  const { setEdges } = useReactFlow();
  const [text, setText] = useState("");
  const [nodeId, setNodeId] = useState('');
  const [intent, setIntent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const nodeData = await getNodeData();

        const desiredNodeId = id.id;
        const node = nodeData.textOnly.find((node: { node_id: any; }) => node.node_id === desiredNodeId);
        const nodeIntent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

        if (node) {
          setText(node.text);
          setIntent(nodeIntent.intent)
        } else {
        }

      } catch (error) {
        console.error("Error fetching node data:", error);
      }
    };

    fetchData();
  }, []);

  // node intent input
  const handleIntentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntent(event.target.value);
};
  // node text area input
  const handleDescriptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };

  // add data from node to node list
  const saveNode = async () => {
    try {
      const response = await fetch(`${apiUrl}/data-flow-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id.id, text: text , intent: intent }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete node");
      }
    } catch (error) { }
  };

  useEffect(() => {
    setNodeId(id.id)
  }, [nodeId])


  const deleteNode = async () => {
    deleteNodeCall(nodeId, "textOnly", setNodes, setEdges);
  };

  return (
    <>
      <div className="elementWrap" style={{ zIndex: "99998 !important" }}>
        {/* gradient */}
        <div
          className="wrapper plainColor  elementWrap"
          style={{ borderRadius: "10px", margin: "10px" }}
        >
          <div
            className="inner"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button className="nodeCloseButton" onClick={deleteNode}>
              <IoClose
                  style={{
                    color: "#000 !important",
                    fontSize: "20px !important",
                  }}
                />
              </button>
            </div>
            <label>Intent</label>
                        <input
                            type="text"
                            value={intent || ''}
                            onChange={handleIntentChange}
                            className="nodrag cardInput"
                        />
            <label style={{ marginBottom: "10px" }}>Add your text here</label>
            <textarea
              value={text}
              onChange={handleDescriptionChange}
              className="nodrag cardInput"
              style={{ marginBottom: "10px" }}
            ></textarea>
            <button onClick={saveNode} className="saveButton">
              Save
            </button>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      {/* <Handle type="source" position={Position.Bottom} /> */}
    </>
  );
});
