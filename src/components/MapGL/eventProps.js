// @flow

export type EventProps = {
  /** The resize event handler */
  onResize?: Function,

  /** The remove event handler */
  onRemove?: Function,

  /** The mousedown event handler */
  onMousedown?: Function,

  /** The mouseup event handler */
  onMouseup?: Function,

  /** The mouseover event handler */
  onMouseover?: Function,

  /** The mousemove event handler */
  onMousemove?: Function,

  /** The click event handler */
  onClick?: Function,

  /** The dblclick event handler */
  onDblclick?: Function,

  /** The mouseenter event handler */
  onMouseenter?: Function,

  /** The mouseleave event handler */
  onMouseleave?: Function,

  /** The mouseout event handler */
  onMouseout?: Function,

  /** The contextmenu event handler */
  onContextmenu?: Function,

  /** The touchstart event handler */
  onTouchstart?: Function,

  /** The touchend event handler */
  onTouchend?: Function,

  /** The touchmove event handler */
  onTouchmove?: Function,

  /** The touchcancel event handler */
  onTouchcancel?: Function,

  /** The movestart event handler */
  onMovestart?: Function,

  /** The move event handler */
  onMove?: Function,

  /** The moveend event handler */
  onMoveend?: Function,

  /** The dragstart event handler */
  onDragstart?: Function,

  /** The drag event handler */
  onDrag?: Function,

  /** The dragend event handler */
  onDragend?: Function,

  /** The zoomstart event handler */
  onZoomstart?: Function,

  /** The zoom event handler */
  onZoom?: Function,

  /** The zoomend event handler */
  onZoomend?: Function,

  /** The rotatestart event handler */
  onRotatestart?: Function,

  /** The rotate event handler */
  onRotate?: Function,

  /** The rotateend event handler */
  onRotateend?: Function,

  /** The pitchstart event handler */
  onPitchstart?: Function,

  /** The pitch event handler */
  onPitch?: Function,

  /** The pitchend event handler */
  onPitchend?: Function,

  /** The boxzoomstart event handler */
  onBoxzoomstart?: Function,

  /** The boxzoomend event handler */
  onBoxzoomend?: Function,

  /** The boxzoomcancel event handler */
  onBoxzoomcancel?: Function,

  /** The webglcontextlost event handler */
  onWebglcontextlost?: Function,

  /** The webglcontextrestored event handler */
  onWebglcontextrestored?: Function,

  /** The load event handler */
  onLoad?: Function,

  /** The error event handler */
  onError?: Function,

  /** The data event handler */
  onData?: Function,

  /** The styledata event handler */
  onStyledata?: Function,

  /** The sourcedata event handler */
  onSourcedata?: Function,

  /** The dataloading event handler */
  onDataloading?: Function,

  /** The styledataloading event handler */
  onStyledataloading?: Function,

  /** The sourcedataloading event handler */
  onSourcedataloading?: Function
};
