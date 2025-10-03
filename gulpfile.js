import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';

const sassCompile = gulpSass(sass);

gulp.task('sass', () => {
  return gulp.src('src/style/scss/**/*.scss')  
    .pipe(sassCompile().on('error', sassCompile.logError)) 
    .pipe(gulp.dest('src/style/css'));  
});

gulp.task('watch', () => {
  gulp.watch('src/style/scss/**/*.scss', gulp.series('sass'));  
});

gulp.task('default', gulp.series('sass', 'watch'));  
