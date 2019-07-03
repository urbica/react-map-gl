// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { StyleImageInterface } from 'mapbox-gl/src/style/style_image';

import MapContext from '../MapContext';

type MapboxImage =
  | HTMLImageElement
  | ImageData
  | { width: number, height: number, data: Uint8Array | Uint8ClampedArray }
  | StyleImageInterface;

type Props = {|
  /** The ID of the image. */
  id: string,

  /**
   * The image as an `HTMLImageElement`, `ImageData`, object with `width`,
   * `height`, and `data` properties with the same format as `ImageData`
   * or image url string
   * */
  image: MapboxImage | string,

  /** The ratio of pixels in the image to physical pixels on the screen */
  pixelRatio?: number,

  /** Whether the image should be interpreted as an SDF image */
  sdf?: boolean
|};

class Image extends PureComponent<Props> {
  _map: MapboxMap;

  _id: string;

  static defaultProps = {
    pixelRatio: 1,
    sdf: false
  };

  constructor(props: Props) {
    super(props);
    this._id = props.id;
  }

  componentDidMount() {
    const { image, pixelRatio, sdf } = this.props;
    this._loadImage(image, data =>
      this._map.addImage(this._id, data, { pixelRatio, sdf })
    );
  }

  componentDidUpdate(prevProps: Props) {
    const { id, image, pixelRatio, sdf } = this.props;

    if (
      id !== prevProps.id ||
      sdf !== prevProps.sdf ||
      pixelRatio !== prevProps.pixelRatio
    ) {
      this._id = id;
      this._map.removeImage(prevProps.id);
      this._loadImage(image, data =>
        this._map.addImage(this._id, data, { pixelRatio, sdf })
      );

      return;
    }

    if (image !== prevProps.image) {
      this._loadImage(image, data => this._map.updateImage(this._id, data));
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle() || !this._map.hasImage(this._id)) {
      return;
    }

    this._map.removeImage(this._id);
  }

  _loadImage = (image: MapboxImage | string, callback: MapboxImage => void) => {
    if (typeof image === 'string') {
      this._map.loadImage(image, (error, data) => {
        if (error) throw error;
        callback(data);
      });

      return;
    }

    callback(image);
  };

  render() {
    return createElement(MapContext.Consumer, {}, (map) => {
      if (map) {
        this._map = map;
      }

      return null;
    });
  }
}

export default Image;
