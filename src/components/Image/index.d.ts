import type { StyleImageInterface } from "mapbox-gl/src/style/style_image";
import { PureComponent } from "react";

type MapboxImage =
  | HTMLImageElement
  | ImageData
  | { width: number; height: number; data: Uint8Array | Uint8ClampedArray }
  | StyleImageInterface;

type Props = {
  /** The ID of the image. */
  id: string;

  /**
   * The image as an `HTMLImageElement`, `ImageData`, object with `width`,
   * `height`, and `data` properties with the same format as `ImageData`
   * or image url string
   * */
  image: MapboxImage | string;

  /** The ratio of pixels in the image to physical pixels on the screen */
  pixelRatio?: number;

  /** Whether the image should be interpreted as an SDF image */
  sdf?: boolean;
};

export default class Image extends PureComponent<Props> {
  constructor(props: Props);
}
