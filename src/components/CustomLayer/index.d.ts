import { PureComponent, createElement, ReactNode } from "react";
import type MapboxMap from "mapbox-gl/src/ui/map";
import type { CustomLayerInterface } from "mapbox-gl/src/style/style_layer/custom_style_layer";
import MapContext from "../MapContext";

type Props = {
  /** The id of an existing layer to insert the new layer before. */
  before?: string;

  /** Mapbox GL Custom Layer instance */
  layer: CustomLayerInterface;
};
/**
 * Custom layers allow a user to render directly into the map's GL context
 * using the map's camera.
 */

export default class CustomLayer extends PureComponent<Props> {
}
