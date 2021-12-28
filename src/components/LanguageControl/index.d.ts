import { PureComponent } from "react";
import type MapboxLanguageControl from "@mapbox/mapbox-gl-language/index";

type Props = {
  /** List of supported languages */
  supportedLanguages?: string[];

  /** Custom style transformation to apply */
  languageTransform?: Function;

  /**
   * RegExp to match if a text-field is a language field
   * (optional, default /^\{name/)
   */
  languageField?: RegExp;

  /** Given a language choose the field in the vector tiles */
  getLanguageField?: Function;

  /** Name of the source that contains the different languages. */
  languageSource?: string;

  /** Name of the default language to initialize style after loading. */
  defaultLanguage?: string;

  /** Name of the language to set */
  language?: string;
};

export default class LanguageControl extends PureComponent<Props> {
  getControl(): MapboxLanguageControl;
}
