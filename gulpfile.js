var gulp = require('gulp');
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var coffee = require("gulp-coffee");

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
  gulp.watch("src/coffee/**/*.coffee",["coffee"]);
  gulp.watch(["src/js/**/*.js","!src/js/min/**/*.js"],["js"]);
  gulp.watch("src/sass/**/*.scss",["sass"]);
  gulp.watch(["src/**/*.html"],["html"]);
});
