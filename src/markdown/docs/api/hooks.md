---
title: Hooks
---

<InfoBox title="Note" text="The following hooks are available from version 8.0.0 upwards. You have to use the ReactFlowProvider if you want to use these hooks."/>

For modifying or reading the state of the graph, you can use the following hooks:

### useZoomPanHelper

This hook can only be used when your application is wrapped with a [`ReactFlowProvider`](/docs/api/components/provider/).
It can be used to modify the viewport of the react flow graph. Example:

```javascript
import { useZoomPanHelper } from 'react-flow';

export default () => {
  const { fitView } = useZoomPanHelper();

  return (
    <button
      onClick={() => fitView({ padding: 0.2, includeHiddenNodes: true })}
    ></button>
  );
};
```

The `useZoomPanHelper` hook returns an object containing the following functions:

- `fitView = ({ padding: number, includeHiddenNodes: boolean }): void` - fits the view to the nodes on the pane. `padding` is `0.1` and `includeHiddenNodes` is `false` by default
- `zoomIn = (): void` - zooms in
- `zoomOut = (): void` - zooms out
- `zoomTo = (zoomLevel: number): void` - zooms to passed zoom level
- `transform: (transform: FlowTransform): void` - sets the transform of the pane
- `setCenter: (x: number, y: number, zoom?: number): void` - sets the center to the passed params. If no zoom is passed the maxZoom is used
- `fitBounds: (bounds: Rect, padding?: number): void` - fits the pane to the passed bounds (object with width x, y, width and height: `{ x: 0, y: 0, width: 100, height: 100 }`)
- `initialized: boolean` - `true` when hook is initialized

You can find an example of how to use it here: [useZoomPanHelper example](/examples/use-zoom-pan-helper-hook/)
