// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type { StyleImageInterface } from 'mapbox-gl/src/style/style_image';

import MapContext from '../MapContext';

type Props = {|
  /** The ID of the image. */
  id: string,

  /**
   * The image as an `HTMLImageElement`, `ImageData`, object with `width`,
   * `height`, and `data`
   * properties with the same format as `ImageData` or string with image url
   * */
  image:
    | window.HTMLImageElement
    | window.ImageData
    | { width: number, height: number, data: Uint8Array | Uint8ClampedArray }
    | StyleImageInterface
    | string,

  /**
   * options.pixelRatio The ratio of pixels in the image to physical pixels on
   * the screen
   * options.sdf Whether the image should be interpreted as an SDF image
   */
  options?: {
    pixelRatio?: number,
    sdf?: boolean
  }
|};

class Image extends PureComponent<Props> {
  _map: MapboxMap;

  _id: string;

  static defaultProps = {
    options: {}
  };

  constructor(props: Props) {
    super(props);
    this._id = props.id;
  }

  componentDidMount() {
    const map = this._map;
    const { id, image, options } = this.props;

    if (typeof image === 'string') {
      map.loadImage(image, (error, img) => {
        if (error) {
          throw error;
        }

        map.addImage(id, img, options);
      });
    } else {
      map.addImage(id, image, options);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const map = this._map;
    const { image } = this.props;

    if (image !== prevProps.image) {
      if (typeof image === 'string') {
        map.loadImage(image, (err, img) => {
          if (err) {
            throw err;
          }

          map.updateImage(this._id, img);
        });
      } else {
        map.updateImage(this._id, image);
      }
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle() || !this._map.hasImage(this._id)) {
      return;
    }

    this._map.removeImage(this._id);
  }

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
