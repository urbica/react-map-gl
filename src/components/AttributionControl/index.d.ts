import { PureComponent, ReactNode } from "react";
import type { AttributionControl as MapboxAttributionControl } from "mapbox-gl";

type Props = {
  /**
   * If `true` force a compact attribution that shows the full
   * attribution on mouse hover, or if  false force the full attribution
   * control. The default is a responsive attribution that collapses when
   * the map is less than 640 pixels wide.
   */
  compact: boolean;

  /* String or strings to show in addition to any other attributions. */
  customAttribution: string | Array<string>;

  /* A string representing the position of the control on the map. */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export default class AttributionControl extends PureComponent<Props> {
  getControl(): MapboxAttributionControl;
}
