const gulp = require('gulp');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const del = require('del');

const paths = {
  styles: {
    src: 'public/stylesheets/**/*.css',
    dest: 'assets/styles/'
  },
  scripts: {
    src: 'public/javascripts/**/*.js',
    dest: 'assets/scripts/'
  }
};

function clean() {
  return del(['assets']);
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

const build = gulp.series(clean, gulp.parallel(styles, scripts));

gulp.task('nodemon', function() {
  return nodemon({
    tasks: ['build']
  });
});

gulp.task('dev', gulp.series(build, 'nodemon'));

gulp.task('default', build);

module.exports = {
  build,
  clean,
  styles,
  scripts
};