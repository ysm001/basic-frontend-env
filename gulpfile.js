var gulp = require('gulp');
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var coffee = require("gulp-coffee");
var watch = require("gulp-watch");

gulp.task("server", function() {
  browser({
    server: {
      baseDir: "./src"
    }
  });
});

gulp.task("sass", function() {
  gulp.src("src/sass/**/*.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest("./src/css"))
  .pipe(browser.reload({stream:true}));
});

gulp.task("coffee", function() {
  gulp.src('src/coffee/**/*.coffee')
  .pipe(coffee())
  .pipe(gulp.dest('./src/js'));
});

gulp.task("js", function() {
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
  watch("src/coffee/**/*.coffee",function() {gulp.start(["coffee"])});
  watch(["src/js/**/*.js","!src/js/min/**/*.js"],function() {gulp.start(["js"])});
  watch("src/sass/**/*.scss",function() {gulp.start(["sass"])});
  watch(["src/**/*.html"],function() {gulp.start(["html"])});
});
