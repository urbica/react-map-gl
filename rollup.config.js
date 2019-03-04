import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  treeshake: true,
  output: [
    { file: pkg.main, exports: 'named', sourcemap: true, format: 'cjs' },
    { file: pkg.module, sourcemap: true, format: 'esm' }
  ],
  external: ['react', 'react-dom', 'mapbox-gl', 'supercluster'],
  plugins: [resolve(), babel(), commonjs(), terser()]
};
