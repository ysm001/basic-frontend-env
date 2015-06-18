var gulp = require('gulp');
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var coffee = require("gulp-coffee");
var watch = require("gulp-watch");
var coffeeSourcemaps = require('gulp-sourcemaps');

gulp.task("server", function() {
  browser({
    server: {
      baseDir: "./src"
    }
  });
});

gulp.task("compile-sass", function() {
  gulp.src("src/sass/**/*.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest("./src/css"))
  .pipe(browser.reload({stream:true}));
});

gulp.task("compile-coffee", function() {
  gulp.src("src/coffee/**/*.coffee")
  .pipe(plumber())
  .pipe(coffeeSourcemaps.init())
  .pipe(coffee({bare: true}))
  .pipe(coffeeSourcemaps.write())
  .pipe(gulp.dest("./src/js"));
});

gulp.task("minify-js", function() {
    gulp.src(["src/js/**/*.js","!src/js/min/**/*.js"])
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("./src/js/min"))
    .pipe(browser.reload({stream:true}));
});

gulp.task("html",function(){
  gulp.src("src/**/*.html")
  .pipe(browser.reload({stream:true}));
});

gulp.task("default", ["server"], function() {
  watch("src/coffee/**/*.coffee",function() {gulp.start(["compile-coffee"])});
  watch(["src/js/**/*.js","!src/js/min/**/*.js"],function() {gulp.start(["minify-js"])});
  watch("src/sass/**/*.scss",function() {gulp.start(["compile-sass"])});
  watch(["src/**/*.html"],function() {gulp.start(["html"])});
});
