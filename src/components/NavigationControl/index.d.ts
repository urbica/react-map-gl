import { PureComponent } from "react";
import type { NavigationControl as MapboxNavigationControl } from "mapbox-gl";

type Props = {
  /** If true the compass button is included. */
  showCompass: boolean;

  /** If true the zoom-in and zoom-out buttons are included. */
  showZoom: boolean;

  /**
   * If true the pitch is visualized by rotating X-axis of compass
   * and pitch will reset by clicking on the compass.
   */
  visualizePitch: boolean;

  /** A string representing the position of the control on the map. */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export default class NavigationControl extends PureComponent<Props> {
  getControl(): MapboxNavigationControl;
}
