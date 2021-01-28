const gulp = require("gulp"),
  concat = require("gulp-concat"),
  prefix = require("gulp-autoprefixer"),
  sass = require("gulp-sass"),
  pug = require("gulp-pug"),
  connect = require("gulp-connect"),
  babel = require("gulp-babel"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  // uglify = require("gulp-uglify-es").default,
  notify = require("gulp-notify");
// zip = require("gulp-zip");

// HTML Task
gulp.task("html", function () {
  return gulp
    .src("stage/html/pug/index.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(notify("HTML task has done"))
    .pipe(connect.reload());
});

// CSS Task
gulp.task("css", function () {
  return (
    gulp
      .src("stage/css/sass/master.scss")
      .pipe(sourcemaps.init())
      // .pipe(sass({ outputStyle: "compressed" }))
      .pipe(sass())
      .pipe(prefix())
      .pipe(concat("master.css"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/css"))
      .pipe(notify("CSS task has done"))
      .pipe(connect.reload())
  );
});

// JS Task
gulp.task("js", function () {
  return gulp
    .src("stage/js/master.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("master.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify("JavaScript task has done"))
    .pipe(connect.reload());
});

// // Compress Files
// gulp.task("compress", function () {
//   return gulp
//     .src("dist/**/*.*")
//     .pipe(zip("website.zip"))
//     .pipe(gulp.dest("."))
//     .pipe(notify("Files has been compressed"));
// });

gulp.task("connect", function () {
  connect.server({
    root: "dist",
    port: 8000,
    livereload: true,
  });
});

// Watch Task
gulp.task("watch", function () {
  gulp.watch("stage/html/pug/**/*.pug", gulp.series("html"));
  gulp.watch("stage/css/sass/**/*.scss", gulp.series("css"));
  gulp.watch("stage/js/master.js", gulp.series("js"));
  // gulp.watch("dist/**/*.*", ["compress"]);
});

// Default Task
gulp.task("default", gulp.parallel(["watch", "connect"]));
