---
title: Provider
---

If you have **multiple flows** on a page or if you need **access to the internal state and actions** of React Flow outside of the `ReactFlow` component you need to wrap it with the `ReactFlowProvider` component:

```jsx
import ReactFlow, { ReactFlowProvider } from 'react-flow-renderer';

const FlowWithProvider = () => (
  <ReactFlowProvider>
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onConnect={onConnect}
    />
  </ReactFlowProvider>
);
```

It is used in the [provider example](/examples/provider/).

Note that if you are using the [bundle without styles](/docs/theming/), to correctly access internal state and actions you need to **import the provider and hooks from the same path**.

```js
import ReactFlow from 'react-flow-renderer/nocss'
export const Flow = () => (
  <ReactFlow
    elements={elements}
    onElementClick={onElementClick}
    onConnect={onConnect}
  />  
)

// separate page
import { ReactFlowProvider, useStoreState, useStoreActions } from 'react-flow-renderer/nocss';
import Sidebar from './Sidebar';

export const Wrapper = () => {
  const elements = useStoreState((state) => state.elements)
  const setElements = useStoreActions((actions) => actions.setElements);
  return (
    <ReactFlowProvider>
      <Flow/>
      <Sidebar elements={elements} setElements={setElements}/>
    </ReactFlowProvider> 
}
```