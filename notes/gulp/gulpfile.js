var gulp = require('gulp');

gulp.task('default', function() {
    console.log('hellow');
})

gulp.src('./src/test/*.js', { base: 'src' })
    .pipe(gulp.dest('build'));