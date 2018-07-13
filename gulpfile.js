var gulp = require('gulp');

gulp.task('build', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
    var cssnano		 = require("cssnano");
    var stylus 		 = require('gulp-stylus');


    return gulp.src('./src/*.stylus')
    	.pipe(stylus())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});