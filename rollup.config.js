import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const extensions = ['.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  treeshake: true,
  output: [
    { file: pkg.main, exports: 'named', sourcemap: true, format: 'cjs' },
    { file: pkg.module, sourcemap: true, format: 'esm' },
  ],
  external: ['react', 'react-dom', 'mapbox-gl', /@babel\/runtime/],
  plugins: [
    nodeResolve({
      extensions,
    }),
    babel({
      extensions,
      babelHelpers: 'runtime'
    }),
    commonjs(),
    terser(),
  ],
};
