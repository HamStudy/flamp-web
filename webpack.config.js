const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    node: {
        fs: 'empty',
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CopyPlugin([
            { from: 'src/*.html', flatten: true },
        ]),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: 'mt63_flamp',
        libraryTarget: 'umd',
        filename: 'flampWeb.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.wasm$/,
                type: "javascript/auto",
                use: 'file-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [
                    /node_modules/,
                ],
            }
        ]
    }
};