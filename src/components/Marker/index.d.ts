import { PureComponent, ReactNode } from "react";
import type { Marker as MapboxMarker, PointLike, LngLat } from "mapbox-gl";

type Props = {
  /** Marker content */
  children: ReactNode;

  /**
   * A string indicating the part of the Marker
   * that should be positioned closest to the coordinate
   */
  anchor?:
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

  /** The longitude of the center of the marker. */
  longitude: number;

  /** The latitude of the center of the marker. */
  latitude: number;

  /**
   * The offset in pixels as a `PointLike` object to apply
   * relative to the element's center. Negatives indicate left and up.
   */
  offset?: PointLike;

  /**
   * Boolean indicating whether or not a marker is able to be dragged
   * to a new position on the map.
   */
  draggable?: boolean;

  /**
   * The rotation angle of the marker in degrees, relative to its
   * respective `rotationAlignment` setting. A positive value will
   * rotate the marker clockwise.
   */
  rotation?: number;

  /**
   * map aligns the `Marker` to the plane of the map. `viewport`
   * aligns the  Marker to the plane of the viewport. `auto` automatically
   * matches the value of `rotationAlignment`.
   */
  pitchAlignment?: string;

  /**
   * map aligns the `Marker`'s rotation relative to the map, maintaining
   * a bearing as the map rotates. `viewport` aligns the `Marker`'s rotation
   * relative to the viewport, agnostic to map rotations.
   * `auto` is equivalent to `viewport`.
   */
  rotationAlignment?: string;

  /** Fired when the marker is clicked */
  onClick?: (event: MouseEvent) => void;

  /** Fired when the marker is finished being dragged */
  onDragEnd?: (lngLat: LngLat) => void;

  /** Fired when the marker is finished being dragged */
  onDragStart?: (lngLat: LngLat) => void;

  /** Fired when the marker is dragged */
  onDrag?: (lngLat: LngLat) => void;
};

export default class Marker extends PureComponent<Props> {
  constructor(props: Props);

  getMarker(): MapboxMarker;
}
