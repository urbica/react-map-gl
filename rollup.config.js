import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  treeshake: true,
  output: [
    { file: pkg.main, exports: 'named', sourcemap: true, format: 'cjs' },
    { file: pkg.module, sourcemap: true, format: 'esm' }
  ],
  external: [
    /@babel\/runtime/,
    'react',
    'react-dom',
    'mapbox-gl'
  ],
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**'
    }),
    commonjs({
      transformMixedEsModules: true
    }),
    terser()
  ]
};
