import { Context } from "react";
import { Map } from "mapbox-gl";

declare const MapContext: Context<Map | null>;

export default MapContext;
