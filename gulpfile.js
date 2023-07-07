const {src, dest, watch, series, parallel} = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const connect = require('gulp-connect')
const sourcemaps = require('gulp-sourcemaps');


const appPath = {
    scss: './app/scss/**/*.scss',
    pug: './app/index.pug'
}
const destPath = {
    css: './dest/css',
    html: './dest'
}

//параметри стилів
function buildStyles() {
    return src(appPath.scss)
        //ініціалізація карти
        .pipe(sourcemaps.init())
        .pipe(sass.sync({}).on('error', sass.logError))
        //запис карти
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.css))
        .pipe(connect.reload());
}

//параметри html
function buildHtml() {
    return src(appPath.pug)
        .pipe(pug({pretty: true}))
        .pipe(dest(destPath.html))
        .pipe(connect.reload());
}

function startLocalServer() {
    connect.server({
        root: 'dest',
        port: 8080,
        livereload: true
    })
}

//watch
function watchCode() {
    watch(appPath.scss, buildStyles)
    watch(appPath.pug, buildHtml)
}


exports.default = series(buildStyles, buildHtml, parallel(startLocalServer, watchCode))






