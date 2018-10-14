// @flow
import { createContext, version } from 'react';
import type { Context as ReactContext } from 'react';
import type { Context as CreateReactContext } from 'create-react-context';

export type Context<T> = ReactContext<T> | CreateReactContext<T>;

const reactVersion = parseInt(version, 10);

const createContextFn = reactVersion < 16 ? require('create-react-context').default : createContext;

export default createContextFn;
