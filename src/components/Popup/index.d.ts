import { PureComponent, ReactNode } from "react";
import type { Popup as MapboxPopup, LngLatBoundsLike } from "mapbox-gl";

type Props = {
  /** Popup content. */
  children: ReactNode;

  /** The longitude of the center of the popup. */
  longitude: number;

  /** The latitude of the center of the popup. */
  latitude: number;

  /*
   * If true, a close button will appear
   * in the top right corner of the popup.
   */
  closeButton?: boolean;

  /** If true, the popup will closed when the map is clicked. */
  closeOnClick?: boolean;

  /** The onClose callback is fired when the popup closed. */
  onClose?: Function;

  /*
   * A string indicating the part of the Popup
   * that should be positioned closest to the coordinate.
   * */
  anchor?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

  /**
   * The offset in pixels as a `PointLike` object to apply
   * relative to the element's center. Negatives indicate left and up.
   */
  offset?: LngLatBoundsLike;

  /** The className of the popup */
  className?: string;

  /** A string that sets the CSS property of the popup's maximum width. */
  maxWidth?: string;
};

export default class Popup extends PureComponent<Props> {
  constructor(props: Props);

  getPopup(): MapboxPopup;
}
