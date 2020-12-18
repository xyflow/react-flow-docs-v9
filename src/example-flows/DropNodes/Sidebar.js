import React from 'react';
import { useStoreState } from 'react-flow-renderer';

export default () => {
    
  // scale is needed for optional offset improvement
  const [,, scale] = useStoreState((store) => store.transform);

  return (
    <aside>
      <div className="description">
        This is an example of how you can drag and drop new nodes onto the flow editor.
      </div>
      <div className="title">Nodes</div>
      {[{type: 'A'}, {type: 'B'}, {type: 'C'}].map((node,i) => (
        <div key={node.type} draggable={true}
          onDragStart={event => {
            // store "what" we are dragging.
            event.dataTransfer.setData("application/react-flow/drag-nodetype", node.type);

            // Optional steps for more natural feeling drop position (get drag start offset for node and current zoom scale)
            const containerBounds = event.target.getBoundingClientRect();
            event.dataTransfer.setData("application/react-flow/drag-offset-x", event.clientX - containerBounds.left);
            event.dataTransfer.setData("application/react-flow/drag-offset-y", event.clientY - containerBounds.top);
            event.dataTransfer.setData("application/react-flow/drag-offset-scale", scale);
          }}

          //Here we are just grabbing the default node styles, setting static fixes that they are normaly absolute positioned
          className="react-flow__node react-flow__node-default" style={{position: 'static', marginTop: '4px'}}
        >
          <span>Type {node.type}</span>
        </div>
      ))}
    </aside>
  );
};