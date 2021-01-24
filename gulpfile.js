var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    notify = require("gulp-notify"),
    zip = require('gulp-zip');

// HTML Task
gulp.task('html', function (){
  return gulp.src('stage/html/pug/index.pug')
          .pipe(pug({pretty: true}))
          .pipe(gulp.dest('dist'))
          .pipe(notify('HTML task has done'))
          .pipe(livereload());
});

// CSS Task
gulp.task('css', function (){
  return gulp.src('stage/css/sass/master.scss')
          .pipe(sourcemaps.init())
          .pipe(sass({outputStyle: 'compressed'}))
          .pipe(prefix())
          .pipe(concat('master.css'))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest('dist/css'))
          .pipe(notify('CSS task has done'))
          .pipe(livereload());
});

// JS Task
gulp.task('js', function (){
  return gulp.src('stage/js/master.js')
          .pipe(concat('master.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist/js'))
          .pipe(notify('JavaScript task has done'))
          .pipe(livereload());
});

// Compress Files
gulp.task('compress', function (){
  return gulp.src('dist/**/*.*')
        .pipe(zip('website.zip'))
        .pipe(gulp.dest('.'))
        .pipe(notify('Files has been compressed'))
});

// Watch Task
gulp.task('watch', function (){
  require('./server.js');
  livereload.listen();
  gulp.watch('stage/html/pug/**/*.pug', ['html']);
  gulp.watch('stage/css/sass/**/*.scss', ['css']);
  gulp.watch('stage/js/master.js', ['js']);
  gulp.watch('dist/**/*.*', ['compress']);
});

// Default Task
gulp.task('default', ['watch']);