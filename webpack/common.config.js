/**
 * Created by ksv on 09.05.17.
 */

'use strict';

const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "../frontend/src"),
    build: path.join(__dirname, "../assets"),
};

const NODE_ENV = process.env.NODE_ENV || "development";

const development = require("./development.config.js");
const production = require("./production.config.js");

const common = {

    context: PATHS.src,

    output: {
        path: PATHS.build,
        filename: "[name].js",
        library: "[name]"
    },

    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".js"],
    },

    resolveLoader: {
        modulesDirectories: ["node_modules"],
        moduleTemplates: ["*-loader", "*"],
        extensions: ["", ".js", ".css", ".json", ".scss"]
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ["eslint"],
                include: [
                    PATHS.src
                ],
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: "file",
            },
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                loaders: ["babel"],
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
            },
            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!resolve-url-loader!sass-loader?sourceMap')
            }
        ],

        // ignore jQuery path
        noParse: /\/node_modules\/jquery/,
    },

    postcss: function () {
        return [
            autoprefixer({ browsers: ['last 2 versions', 'ie 9'] }),
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NOD_ENV: JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new ExtractTextPlugin("[name].css", {
            allChunks: true,
            disable: false
        }),
        new webpack.ProgressPlugin(function(percentage, message) {
            var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
            var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
            if (Math.round(percentage * 100) === 100) {
                message = 'done.';
            }
            process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) + '% : ' + message + MOVE_LEFT);
        })
    ]
};

// merge two configs
if (NODE_ENV === "production") {
    module.exports = merge(production, common);
} else {
    module.exports = merge(development, common);
}