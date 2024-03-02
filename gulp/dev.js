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

gulp.task("cleaner:dev", function (done) {
    if (fs.existsSync("./build/")) {
        return gulp.src("./build/", {read: false})
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

gulp.task("html:dev", function() {
    return gulp
        .src("./src/*.html")
        .pipe(changed("./build/", {hasChanged: changed.compareContents}))
        .pipe(plumber(plumberNotify("html")))
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest("./build/"))
});


gulp.task("scss:dev", function () {
    return gulp.src("./src/scss/main.scss")
        .pipe(changed("./build/css/"))
        .pipe(plumber(plumberNotify("scss")))
        .pipe(sourceMaps.init())
        .pipe(autoprefixer())
        .pipe(scss())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("./build/css/"))
})

gulp.task("copyImages:dev", function () {
    return gulp.src("./src/images/**/*")
        .pipe(changed("./build/images/"))
        /*.pipe(imagemin({
            verbose: true
        }))*/
        .pipe(gulp.dest("./build/images/"))
})

gulp.task("copyFonts:dev", function () {
    return gulp.src("./src/fonts/**/*")
        .pipe(changed("./build/fonts/"))
        .pipe(gulp.dest("./build/fonts/"))
})

gulp.task("js:dev", function () {
    return gulp.src("./src/js/*.js")
        .pipe(changed("./build/js/"))
        .pipe(plumber(plumberNotify("js")))
        .pipe(webpack(require("./../webpack.config")))
        .pipe(gulp.dest("./build/js/"))
})

gulp.task("startServer:dev", function () {
    return gulp.src("./build/")
        .pipe(server({
            livereload: true,
            open: true
        }))
})

gulp.task("watch:dev", function () {
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("scss:dev"));
    gulp.watch("./src/**/*.html", gulp.parallel("html:dev"));
    gulp.watch("./src/images/**/*", gulp.parallel("copyImages:dev"));
    gulp.watch("./src/images/**/*", gulp.parallel("copyFonts:dev"));
    gulp.watch("./src/js/**/*", gulp.parallel("js:dev"));
})

