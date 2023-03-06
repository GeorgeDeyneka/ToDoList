const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const minify = require("gulp-minify");
const browsersync = require("browser-sync");

const dist = "./dist";

gulp.task("copy-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("build-ts", () => {
  return gulp
    .src("./src/ts/index.ts")
    .pipe(
      webpack({
        output: {
          filename: "index.js",
        },
        watch: false,
        resolve: {
          extensions: [".ts", ".tsx", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              loader: "ts-loader",
            },
          ],
        },
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(dist + "/js"))
    .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(minify())
    .pipe(gulp.dest(dist + "/css"))
    .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
  return gulp
    .src("./src/assets/images/*.*")
    .pipe(gulp.dest(dist + "/assets/images"))
    .pipe(browsersync.stream());
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./dist/",
    port: 7070,
    notify: true,
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/assets/images/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
  gulp.watch("./src/ts/**/*.ts", gulp.parallel("build-ts"));
});

gulp.task(
  "build",
  gulp.parallel("copy-html", "copy-assets", "build-sass", "build-ts")
);

gulp.task("default", gulp.parallel("watch", "build"));
