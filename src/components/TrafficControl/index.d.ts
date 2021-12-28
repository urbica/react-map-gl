import { PureComponent } from "react";
import type MapboxTrafficControl from "@mapbox/mapbox-gl-traffic";

type Props = {
  /** Show or hide traffic overlay by default. */
  showTraffic?: Boolean;

  /** Show a toggle button to turn traffic on and off. */
  showTrafficButton?: Boolean;

  /**
   * The traffic source regex used to determine whether a layer displays
   * traffic or not
   * */
  trafficSource?: RegExp;
};

export default class TrafficControl extends PureComponent<Props> {
  getControl(): MapboxTrafficControl;
}
