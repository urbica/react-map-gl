// @flow

import { PureComponent, createElement } from 'react';
import type MapboxMap from 'mapbox-gl/src/ui/map';
import type MapboxLanguageControl from '@mapbox/mapbox-gl-language/index';

import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapContext from '../MapContext';

type Props = {
  /** List of supported languages */
  supportedLanguages?: string[],

  /** Custom style transformation to apply */
  languageTransform?: Function,

  /**
   * RegExp to match if a text-field is a language field
   * (optional, default /^\{name/)
   */
  languageField?: RegExp,

  /** Given a language choose the field in the vector tiles */
  getLanguageField?: Function,

  /** Name of the source that contains the different languages. */
  languageSource?: string,

  /** Name of the default language to initialize style after loading. */
  defaultLanguage?: string,

  /** Name of the language to set */
  language?: string
};

/**
 * Adds support for switching the language of your map style.
 */
class LanguageControl extends PureComponent<Props> {
  _map: MapboxMap;

  _control: MapboxLanguageControl;

  static defaultProps = {};

  componentDidMount() {
    const map: MapboxMap = this._map;
    const {
      supportedLanguages,
      languageTransform,
      languageField,
      getLanguageField,
      languageSource,
      defaultLanguage
    } = this.props;

    const control: MapboxLanguageControl = new MapboxLanguage({
      supportedLanguages,
      languageTransform,
      languageField,
      getLanguageField,
      languageSource,
      defaultLanguage
    });

    map.addControl(control);
    this._control = control;
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.language !== this.props.language) {
      this._setLanguage();
    }
  }

  componentWillUnmount() {
    if (!this._map || !this._map.getStyle()) {
      return;
    }

    this._map.removeControl(this._control);
  }

  _setLanguage = () => {
    const { language } = this.props;
    const map = this._map;
    const control = this._control;

    if (language) {
      map.setStyle(control.setLanguage(map.getStyle(), language));
    }
  };

  getControl() {
    return this._control;
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

export default LanguageControl;
