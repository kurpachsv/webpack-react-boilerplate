/**
 * Created by ksv on 09.05.17.
 */

'use strict';

const gulp = require("gulp");
const server = require("./webpack/dev-server");
const del = require("del");

gulp.task('webpack-dev-server', gulp.series(function () {
    return del(['./assets/*']);
}, gulp.parallel(function () {
    return server;
})));