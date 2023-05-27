const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

//Destinos ods arquivos gerados no build
const buildCSS = "./build/styles";
const buildIMG = "./build/images";
const buildJS = "./build/scripts";

//Compila todos os arquivos .scss na pasta /styles
function compilaSass() {
    return gulp.src('./source/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(buildCSS));
}

//Compila o SASS a partir do arquivo main.scss
function compilaMainSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(buildCSS));
}

//Compila todas as imagens na pasta /images
function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(buildIMG));
}

//Compila todos os arquivos .js na pasta /scripts
function comprimeJavascript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(buildJS));
}

exports.default = gulp.series(compilaMainSass, comprimeImagens, comprimeJavascript);

exports.sass = compilaSass;
exports.minImg = comprimeImagens;
exports.minJs = comprimeJavascript;
