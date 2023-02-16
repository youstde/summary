var gulp = require('gulp');
var rimraf = require('rimraf');

// gulp.src('./src/**/*.js')
//     .pipe(gulp.dest('build'));


// gulp.task('build', function() {
//     const stream = gulp.src('./src/test/*.js', { base: './' })
//     .pipe(gulp.dest('build'));
//     return stream;
// });

// gulp.task('default', gulp.series('build'));

function build() {
    const stream = gulp.src('./src/test/*.js', { base: './' })
    .pipe(gulp.dest('build'));
    return stream;
}

gulp.task('default', gulp.series(build));