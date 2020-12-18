import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls
} from 'react-flow-renderer';

import Sidebar from './Sidebar';

import './provider.css';

/* really useful helper function from inside react-flow (not presently exported) */
function getMousePosition(event) {
  const reactFlowNode = event.target.closest('.react-flow');
  if (!reactFlowNode) {
    return;
  }

  const containerBounds = reactFlowNode.getBoundingClientRect();

  return {
    x: event.clientX - containerBounds.left,
    y: event.clientY - containerBounds.top,
  };
}

const onElementClick = (event, element) => console.log('click', element);

const initialElements = [
  {
    id: 'provider-1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  { id: 'provider-2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
  {
    id: 'provider-e1-2',
    source: 'provider-1',
    target: 'provider-2',
    animated: true,
  },
  { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3' },
];

const ProviderFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const onDrop = (ev) => {
    ev.preventDefault();
    //get "what" is being dropped
    const nodeType = ev.dataTransfer.getData("application/react-flow/drag-nodetype");
    //don't accept just any drop (also handled in onDragOver)
    if(!nodeType) return;

    let mousePos = getMousePosition(ev) || {x: ev.clientX, y: ev.clientY};
    
    // Optional steps for more natural feeling drop position
    const offsetX = Number(ev.dataTransfer.getData("application/react-flow/drag-offset-x"));
    const offsetY = Number(ev.dataTransfer.getData("application/react-flow/drag-offset-y"));
    const offsetScale = Number(ev.dataTransfer.getData("application/react-flow/drag-offset-scale"));
    mousePos = {x: mousePos.x - (offsetScale * offsetX), y: mousePos.y - (offsetScale * offsetY)};

    // project figures out the scale and panning offsets for us
    mousePos = reactFlowInstance.project(mousePos);
    setElements(elements =>
      [...elements, {
        id: `id-${new Date().getTime()}`, position: mousePos, data: {label: `Type ${nodeType}`}
      }]
    );
   }

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            /* to allow dropping onDrop and onDragOver must be handled */
            onDrop={onDrop}
            onDragOver={(e) => {
              /* only allow drags that have our custom data type for node */
              const hasNodeType = e.dataTransfer.types.includes("application/react-flow/drag-nodetype");
              if (hasNodeType){ e.preventDefault(); }
            }}
            elements={elements}
            onElementClick={onElementClick}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
