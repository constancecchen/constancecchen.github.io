"use strict";

var fs = require("fs"),
    path = require("path"),
    gulp = require("gulp"),
    tap = require("gulp-tap"),
    rename = require("gulp-rename"),
    webserver = require("gulp-webserver"),
    dust = require("gulp-dust-html"),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer");

/*----------------------------------------------
  Compile & autoprefix CSS
-----------------------------------------------*/
gulp.task("css", function() {
  return gulp.src("css/style.scss")
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(autoprefixer({browsers: ["> 1%", "last 3 versions", "Firefox ESR"]}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css/"));
});

/*----------------------------------------------
  Concat / uglify JS
-----------------------------------------------*/
gulp.task("js", function() {
  return gulp.src("js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("js/"));
});

/*----------------------------------------------
  Compile Dust templates into HTML
-----------------------------------------------*/
require("dustjs-linkedin").config.cache = false;

gulp.task("html:index", function() {
  return gulp.src("templates/index.dust")
    .pipe(dust({
      basePath: "templates",
      data: JSON.parse(fs.readFileSync("index.json")),
    }))
    .pipe(gulp.dest("."));
});

gulp.task("html:portfolio", function() {
  return gulp.src("portfolio/**/index.json")
    .pipe(tap(function(file, t) {
      var fileDir = path.relative(file.cwd, path.dirname(file.path));
      var data = JSON.parse(fs.readFileSync(fileDir + "/index.json"));

      data.meta = {};
      data.meta.desc = data.description || "";
      data.meta.desc = data.meta.desc.split(". ")[0].replace(/<\/?.*>/gi, "") + ".";
      data.meta.image = fileDir + "/screenshot-thumb.jpg";
      data.meta.url = fileDir + "/";

      return gulp.src("templates/portfolio-page.dust")
        .pipe(dust({
          basePath: "templates",
          data: data,
        }))
        .pipe(gulp.dest(fileDir))
        .on("end", function() {
          fs.renameSync(
            fileDir + "/portfolio-page.html",
            fileDir + "/index.html"
          );
        });
    }));
});

/*----------------------------------------------
  Compile & build all
-----------------------------------------------*/
gulp.task("build", ["css", "js", "html:index", "html:portfolio"]);

/*----------------------------------------------
  Watch
-----------------------------------------------*/
gulp.task("watch", ["build"], function() {
  gulp.watch("css/**/*.scss", ["css"]);
  gulp.watch("js/**/*.js", ["js"]);
  gulp.watch("index.json", ["html:index"]);
  gulp.watch("portfolio/**/index.json", ["html:portfolio"]);
  gulp.watch("templates/**/*.dust", ["html:index", "html:portfolio"]);
});

/*----------------------------------------------
  Spin up a live-reloaded webserver
-----------------------------------------------*/
 gulp.task("default", ["build", "watch"], function () {
  return gulp.src(".")
    .pipe(webserver({
      open: true,
      livereload: {
        enable: true,
        https: true,
        filter: function(fileName) {
          // Pages should only reload when their compiled files have been processed.
          if (fileName.match(/.(scss|json|dust)$/)) {
            return false;
          } else {
            return true;
          }
        }
      }
    }));
 });
