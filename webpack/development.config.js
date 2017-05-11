/**
 * Created by ksv on 09.05.17.
 */

'use strict';

const path = require("path");
const webpack = require("webpack");

const cwd = process.cwd();
const host = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 8080;

module.exports = {

    entry: {
        app: [
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://${host}:${port}`,
            'webpack/hot/only-dev-server',
            "./app"
        ]
    },

    output: {
        filename: "/assets/app.js",
        publicPath: `http://${host}:${port}/assets/`
    },

    resolve: {
        root: [
            path.join(cwd, '/'),
        ],
        alias: {
            /**
             * @see http://stackoverflow.com/a/32444088
             */
            react: path.join(cwd, 'node_modules', 'react'),
        },
    },

    devtool: "cheap-inline-module-source-map",

    watchOptions: {
        aggregateTimeout: 100,
        poll: 50
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],

};
