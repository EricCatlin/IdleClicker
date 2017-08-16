const gulp = require('gulp'),
      sass = require('gulp-sass'),
      cleanCSS = require('gulp-clean-css'),
      uglify = require('gulp-uglify'),
      strip = require('gulp-strip-comments'),
      ngAnnotate = require('gulp-ng-annotate'),
      sourcemaps = require('gulp-sourcemaps'),
      templates = require('gulp-angular-templatecache'),
      concat = require('gulp-concat'),
      nodemon = require('gulp-nodemon'),
      connect = require('gulp-connect'),
      proxy = require('http-proxy-middleware'),
      shell = require('gulp-shell'),
      run = require('run-sequence'),
      del = require('del'),
      autoprefixer = require('gulp-autoprefixer'),
      size = require('gulp-size');

var public = './public/'
var src = public+'src/',
    build = public+'build/',
    vendor = require('./vendor.js');

var paths = {
    allCss:  [src+'**/*.css'],
    allScss: [src+'**/*.scss'],
    mainScss: [src+'scss/main.scss'],
    scripts: [src+'**/*.js'],
    markup:  [src+'**/*.html'],
    images:  [src+'images/**/*'],
    fonts:   [src+'fonts/**/*']
};

var autoprefixerOptions = {
    browsers: ['last 4 versions', '> 5%', 'Firefox ESR']
};

gulp.task('build:vendor:css', function() {
  return gulp.src(vendor.styles)
    .pipe(concat('vendor.css'))
    .pipe(cleanCSS())
    .pipe(autoprefixer(autoprefixerOptions) )
    .pipe(size())
    .pipe(gulp.dest(build))
});

gulp.task('build:vendor:js', function() {
  return gulp.src(vendor.scripts)
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(build))
});

gulp.task('build:vendor:fonts', function () {
  return gulp.src(vendor.fonts)
    .pipe(gulp.dest(public+'fonts'))
    .pipe(connect.reload());
});

gulp.task('build:css', function() {
  return gulp.src(paths.allCss)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(cleanCSS())
    .pipe(autoprefixer(autoprefixerOptions) )
    .pipe(gulp.dest(build))
    .pipe(size())
    .pipe(connect.reload());
});

gulp.task('build:scss', function() {
  return gulp.src(paths.mainScss)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(autoprefixer(autoprefixerOptions) )
    .pipe(gulp.dest(build))
    .pipe(size())
    .pipe(connect.reload())
});

gulp.task('build:js', function() {
  return gulp.src(paths.scripts)
   // .pipe(strip())
   // .pipe(ngAnnotate())
  //  .pipe(uglify({mangle:true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(build))
    .pipe(connect.reload());
});

gulp.task('build:html', function(){
  return gulp.src(paths.markup)
    .pipe(templates({module:'anne.client'}))
    .pipe(gulp.dest(build))
    .pipe(connect.reload());
});

gulp.task('build:fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(public+'fonts'))
    .pipe(connect.reload());
});

gulp.task('build:images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(public+'images'))
    .pipe(connect.reload());
});

gulp.task('clean', function() {
  del.sync(build+'*');
});

gulp.task('watch:styles', function() {
  gulp.watch(paths.allCss, ['build:css']);
  gulp.watch(paths.allScss,   ['build:scss']);
});

gulp.task('watch:scripts', function() {
  gulp.watch(paths.scripts, ['build:js']);
});

gulp.task('watch:views', function() {
  gulp.watch(paths.markup,  ['build:html']);
});


gulp.task('serve', function () {
  nodemon({
    script:'server.js',
    ext:'js css'
  }),
 connect.server({
    root: ['./public', './public/build'],
    port: '3001',
    livereload: true,
    fallback: public+'index.html',
    middleware: function (connect, opt) {
      return [
        proxy('/api', {
          target: 'http://localhost:3300',
          changeOrigin: true
        })
      ]
    }
  });
});

// Main tasks
gulp.task('build', [
  'clean',
  'build:vendor:js',
  'build:vendor:css',
  'build:vendor:fonts',
  'build:js',
  'build:css',
  'build:scss',
  'build:fonts',
  'build:images',
  'build:html'
]);
gulp.task('default', ['build']);
gulp.task('watch', ['watch:styles','watch:scripts','watch:views']);

gulp.task('start', function(cb) {
  run('build', 'watch', 'serve', cb);
});
