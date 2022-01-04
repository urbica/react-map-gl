import { PureComponent } from "react";

type Props = {
  /** Unique id of the feature. */
  id: string | number;

  /** The Id of the vector source or GeoJSON source for the feature. */
  source: string;

  /** For vector tile sources, the sourceLayer is required. */
  sourceLayer: string;

  /** A set of key-value pairs. The values should be valid JSON types. */
  state: Object;
};

export default class FeatureState extends PureComponent<Props> {}
