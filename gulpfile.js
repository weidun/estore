var gulp = require("gulp")
var sass = require("gulp-sass")
var live_server = require("gulp-live-server")
gulp.task("default", function () {

})
gulp.task("sass", function () {
    return gulp.src("./sass/*.sass")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"))
})
gulp.task("debug", function () {
    var server = live_server.static("./", 3000)
    server.start()
    gulp.watch("./sass/*.sass", ["sass"])
    gulp.watch(["./css/*.css", "index.html", "./js/*.js", "./templates/*/*.html"], function (f) {
        server.notify.apply(server, [f])
    })
})