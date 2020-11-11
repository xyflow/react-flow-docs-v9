---
title: Hooks
---

<InfoBox title="Note" text="You have to use the ReactFlowProvider if you want to use hooks from react-flow"/>

For modifying or reading the state of the graph, you can use the following hooks:

### useZoomPanHelper

This hook can be used to modify the viewport of the react flow graph. Example:

```javascript
import { useZoomPanHelper } from 'react-flow';

export default () => {
  const { fitView } = useZoomPanHelper();

  return <button onClick={() => fitView()}></button>;
};
```

The `useZoomPanHelper` hook returns an object containing the following functions:

`fitView`

Fits the view port so that all nodes are visible

`fitView = ({ padding }): void`

`zoomIn`

Zoom in

`zoomIn = (): void`

`zoomOut`

Zoom out

`zoomOut = (): void`

`zoomTo`

Zooms to the specified zoom level

`zoomTo = (zoomLevel: number): void`
