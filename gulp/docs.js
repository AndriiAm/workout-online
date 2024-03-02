const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const scss = require("gulp-sass")(require("sass"));
const server = require("gulp-server-livereload");
const cleaner = require("gulp-clean");
const fs = require("fs");
const sourceMaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const htmlClean = require("gulp-htmlclean");
const webp = require("gulp-webp");
const webpHtml = require("gulp-webp-html");
const webpCss = require("gulp-webp-css");

gulp.task("cleaner:docs", function (done) {
    if (fs.existsSync("./docs/")) {
        return gulp.src("./docs/", {read: false})
            .pipe(cleaner())
    }
    done();
})

const plumberNotify = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: "Error <%= error.message %>",
            sound: false
        })
    }
}

gulp.task("html:docs", function() {
    return gulp
        .src("./src/*.html")
        .pipe(changed("./docs/"))
        .pipe(plumber(plumberNotify("html")))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(webpHtml())
        .pipe(htmlClean())

        .pipe(gulp.dest("./docs/"))
});


gulp.task("scss:docs", function () {
    return gulp.src("./src/scss/main.scss")
        .pipe(changed("./docs/css/"))
        .pipe(plumber(plumberNotify("scss")))
        .pipe(sourceMaps.init())
        .pipe(autoprefixer())
        .pipe(scss())
        .pipe(csso())
        .pipe(webpCss())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("./docs/css/"))
})

gulp.task("copyImages:docs", function () {
    return gulp.src("./src/images/**/*")
        .pipe(changed("./docs/images/"))
        .pipe(webp())
        .pipe(gulp.dest("./docs/images/"))
        .pipe(gulp.src("./src/images/**/*"))
        .pipe(changed("./docs/images/"))
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(gulp.dest("./docs/images/"))
})

gulp.task("copyFonts:docs", function () {
    return gulp.src("./src/fonts/**/*")
        .pipe(changed("./docs/fonts/"))
        .pipe(gulp.dest("./docs/fonts/"))
})

gulp.task("js:docs", function () {
    return gulp.src("./src/js/*.js")
        .pipe(changed("./docs/js/"))
        .pipe(plumber(plumberNotify("js")))
        .pipe(webpack(require("./../webpack.config")))
        .pipe(gulp.dest("./docs/js/"))
})

gulp.task("startServer:docs", function () {
    return gulp.src("./docs/")
        .pipe(server({
            livereload: true,
            open: true
        }))
})

gulp.task("watch:docs", function () {
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("scss:docs"));
    gulp.watch("./src/**/*.html", gulp.parallel("html:docs"));
    gulp.watch("./src/images/**/*", gulp.parallel("copyImages:docs"));
    gulp.watch("./src/images/**/*", gulp.parallel("copyFonts:docs"));
    gulp.watch("./src/images/**/*", gulp.parallel("js:docs"));
})

