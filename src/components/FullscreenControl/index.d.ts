import { PureComponent } from "react";
import type { FullscreenControl as MapboxFullscreenControl } from "mapbox-gl";

type Props = {
  /**
   * container is the compatible DOM element which should be
   * made full screen. By default, the map container element
   * will be made full screen.
   */
  container: string;

  /* A string representing the position of the control on the map. */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export default class FullscreenControl extends PureComponent<Props> {
  getControl(): MapboxFullscreenControl;
}
