/**
 * Created by ksv on 09.05.17.
 */

'use strict';

const webpack = require("webpack");

module.exports = {

    entry: {
        app: "./app"
    },

    devtool: null,

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ]

};