const gulp = require("gulp");
require("./gulp/dev");
require("./gulp/docs.js")

gulp.task("default", gulp.series(
    "cleaner:dev",
    gulp.parallel("includeFiles:dev", "scss:dev", "copyImages:dev", "copyFonts:dev", "js:dev"),
    gulp.parallel("startServer:dev", "watch:dev")
));

gulp.task("docs", gulp.series(
    "cleaner:docs",
    gulp.parallel("includeFiles:docs", "scss:docs", "copyImages:docs", "copyFonts:docs", "js:docs"),
    gulp.parallel("startServer:docs", "watch:docs")
));