var gulp = require('gulp'),
	sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	concat = require('gulp-concat'),
	del = require('del');

gulp.task('default', ['clean'], function() {
    gulp.start('style', 'script');
});

gulp.task('clean', function(cb) {
    del(['public/styles/css', 'public/js/*.min.js'], cb);
});

gulp.task('style', function() {
	gulp.src('public/styles/sass/*.scss')
   		.pipe(sass())
        .pipe(rename({suffix: '.min'}))
	    .pipe(gulp.dest('public/styles/css'))
		.pipe(minifycss())
	    .pipe(gulp.dest('public/styles/css'))
		.pipe(notify({ message: 'style complete' }));
});

gulp.task('script', function() {
	/*return gulp.src('public/js/*.js')
		.pipe(jshint('.jshintrc'))
	    .pipe(jshint.reporter('default'))
	   	//.pipe(concat('script.js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('public/js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(notify({ message: 'script complete' }));
    */
});
