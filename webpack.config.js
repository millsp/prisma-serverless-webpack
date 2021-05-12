const path = require('path');

const {ESBuildMinifyPlugin} = require('esbuild-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: slsw.lib.entries,
    externals: ['_http_common', 'encoding'],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015',
                },
            },
        ],
    },
    optimization: {
        minimizer: [new ESBuildMinifyPlugin({target: 'es2015'})],
        minimize: true,
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
    ],
};
