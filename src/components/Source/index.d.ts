import type {
  SourceSpecification,
  RasterSourceSpecification,
  VectorSourceSpecification,
} from "mapbox-gl/src/style-spec/types";
import { PureComponent, ReactNode } from "react";

export type TileSourceSpecification =
  | VectorSourceSpecification
  | RasterSourceSpecification;

export type Props = SourceSpecification & {
  /** Mapbox GL Source id */
  id: string;

  /** Layers */
  children?: ReactNode;
};

type State = {
  loaded: boolean;
};

export default class Source extends PureComponent<Props, State> {}
