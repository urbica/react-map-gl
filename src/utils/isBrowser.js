// based on https://github.com/uber/luma.gl/blob/master/src/utils/is-browser.js
// This function is needed in initialization stages,
// make sure it can be imported in isolation
import isElectron from './isElectron';

const isNode =
  typeof process === 'object' &&
  String(process) === '[object process]' &&
  !process.browser;

const isBrowser = !isNode || isElectron;

// document does not exist on worker thread
export const isBrowserMainThread = isBrowser && typeof document !== 'undefined';

export default isBrowser;
