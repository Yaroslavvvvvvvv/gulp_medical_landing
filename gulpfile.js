const {src, dest, watch, series, parallel} = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const connect = require('gulp-connect')
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat')
const minify = require('gulp-minify');


const appPath = {
    scss: './app/scss/**/*.scss',
    pug: './app/index.pug',
    img: './app/images/**/*.*',
    js: './app/js/**/*.js',

}
const destPath = {
    css: './dest/css',
    html: './dest',
    img: './dest/images',
    js: './dest/js'
}

const jsPath = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './app/js/script.js'
]

//параметри стилів
function buildStyles() {
    return src(appPath.scss)
        //ініціалізація карти
        .pipe(sourcemaps.init())
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        //запис карти  
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.css))
        .pipe(connect.reload());
}

//параметри html
function buildHtml() {
    return src(appPath.pug)
        .pipe(pug({pretty: false}))
        .pipe(dest(destPath.html))
        .pipe(connect.reload());
}

function buildJs() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(minify(
            {
                ext: {
                    min: 'min.js'
                }
            }
        ))
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.js))
        .pipe(connect.reload());
}

function startLocalServer() {
    connect.server({
        root: 'dest',
        port: 8080,
        livereload: true
    })
}

function copyImage() {
    return src(appPath.img)
        .pipe(dest(destPath.img))
}

//watch
function watchCode() {
    watch(appPath.scss, buildStyles)
    watch(appPath.pug, buildHtml)
    watch(appPath.js, buildJs)
}


exports.default = series(buildStyles, buildHtml, buildJs, copyImage, parallel(startLocalServer, watchCode))






