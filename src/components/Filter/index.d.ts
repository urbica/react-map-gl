import type { FilterSpecification } from "mapbox-gl/src/style-spec/types";
import { PureComponent } from "react";

type Props = {
  /** Mapbox GL Layer id */
  layerId: string;
  /**
   * The filter, conforming to the Mapbox Style Specification's
   * filter definition. (see https://docs.mapbox.com/mapbox-gl-js/style-spec/#other-filter)
   * If null or undefined is provided, the function removes any existing filter
   * from the layer.
   * */
  filter: FilterSpecification | null | undefined;

  /**
   * Whether to check if the filter conforms to the Mapbox GL
   * Style Specification. Disabling validation is a performance optimization
   * that should only be used if you have previously validated the values you
   * will be passing to this function.
   * */
  validate?: boolean;
};

export default class Filter extends PureComponent<Props> {}
