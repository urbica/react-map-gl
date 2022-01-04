import { PureComponent } from "react";
import type { ScaleControl as MapboxScaleControl } from "mapbox-gl";

type Props = {
  /* The maximum length of the scale control in pixels. */
  maxWidth: number;

  /* Unit of the distance. */
  unit: "imperial" | "metric" | "nautical";

  /* A string representing the position of the control on the map. */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

export default class ScaleControl extends PureComponent<Props> {
  getControl(): MapboxScaleControl;
}
