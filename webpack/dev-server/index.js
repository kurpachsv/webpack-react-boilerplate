/**
 * Created by ksv on 09.05.17.
 */

'use strict';

/**
 * Enable HMR Method 3 — Via NPM Module
 * @see https://medium.com/@rajaraodv/webpacks-hmr-react-hot-loader-the-missing-manual-232336dc0d96
 */

const host = process.env.HOSTNAME || "localhost";
const port = process.env.PORT || 8080;

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../common.config");

// configure WDS

new WebpackDevServer(webpack(config), {
    publicPath: `http://${host}:${port}/assets/`,
    quiet: false,
    noInfo: true,
    stats: {
        colors: true
    },
    inline: true,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 100,
        poll: 50
    },
    headers: { "Access-Control-Allow-Origin": "*" }
}).listen(port, host, function(err) {
    if (err) {
        console.error(err);
    }
    console.log(`Listening at ${host}:${port}`);
});