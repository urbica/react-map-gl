import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    { file: pkg.main, exports: 'named', sourcemap: true, format: 'cjs' },
    { file: pkg.module, sourcemap: true, format: 'esm' }
  ],
  external: ['react', 'react-dom', 'mapbox-gl', 'immutable', 'supercluster'],
  plugins: [resolve(), babel({ exclude: 'node_modules/**' }), commonjs(), terser()]
};
