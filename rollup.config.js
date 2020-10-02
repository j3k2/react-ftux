import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import conditional from "rollup-plugin-conditional";

const isProduction = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production') || false;

export default {
    input: 'src/index.js',
    output: {
        file: 'lib/bundle.js',
        format: 'cjs'
    },
    external: ['react', 'react-dom', 'styled-components'],
    plugins: [
        resolve(),
        commonjs({
            namedExports: {
                'node_modules/react/index.js': ['Component'],
            }
        }),
        conditional(isProduction, [
            minify({})
        ]),
        babel({
            exclude: 'node_modules/**'
        })],
    watch: {
        chokidar: false
    }
};
