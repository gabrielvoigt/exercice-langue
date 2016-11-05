var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat'); // concatenar os arquivos.
var pump = require('pump'); // pump é utilizado para informar o erro na linha correta.
var uglify = require('gulp-uglify');
var tinypng = require('gulp-tinypng-compress'); // reduzir a capacidade da imagem.
var htmlmin = require('gulp-htmlmin'); // minificar html.
var gls = require('gulp-live-server'); // ficar observando o arquivo.
// verificar se tem algum erro no javascript, debugger e faz sugestões como arrumar.
var jshint = require('gulp-jshint');
// estilizar os erros de javascript.
var stylish = require('jshint-stylish');

gulp.task('default', ['sass', 'compress']);

gulp.task('sass', function () {
    return gulp.src('assets/src/sass/**/*.scss')
        .pipe(concat('style.min.js'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
});


gulp.task('compress', function (cb) {
    pump([
            gulp.src('assets/src/js/**/*.js'),
            concat('script.min.js'),
            uglify(),
            gulp.dest('assets/js')
        ],
        cb
    );
});

gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});


// tinypng - comprimir as imagens em png
// gulp.task('tinypng', function () {
//     gulp.src('img/*.{png,jpg,jpeg}')
//         .pipe(tinypng('KhOmhdkOq2wbISLkxlxAPDDJZb2gajmd')) // essa key foi gerada no site do tinypng.
//         .pipe(gulp.dest('compressed_images'));
// });

// verificar se existe algum erro no JS
gulp.task('lint', function() {
    return gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});