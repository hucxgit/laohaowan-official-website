var gulp = require("gulp")
    ,del = require('del')
    ,$ = require("gulp-load-plugins")();

var src = "./app/"
    ,dist = "./dist/"
    ,nodeModules = "./node_modules/"
    ,environment = $.util.env.type || 'development'
    ,isProduction = environment === "production"
    ,pkg = require("./package.json")
    ,banner = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @version v<%= pkg.version %>',
      ' * @author <%= pkg.author %>',
      ' */',
      ''].join('\n')
    ,genRandomName = function () {
      var seed = (new Date()).valueOf();
      return Math.round(seed * (Math.random()+0.5)).toString(16);
    };


gulp.task('font', function() {
  return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./dist/fonts/'))
});

gulp.task('index', function() {
  var indexLibsStreamOption = {ignorePath: "/dist"}
      ,indexJsStreamOption = {ignorePath: "/dist", "name" : "bundle"}
      ,indexLibsCssStreamOption = {ignorePath: "/dist", "name": "vendorcss"}
      ,indexCssStreamOption = {ignorePath: "/dist"};

  var indexLibsStream = gulp.src('./node_modules/jquery/dist/jquery.js')
    .pipe(!isProduction ? $.util.noop() : $.uglify())
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/js', {mode: 0644}));

  var indexJsStream = gulp.src('./app/js/index.js')
    .pipe(!isProduction ? $.util.noop() : $.uglify())
    .pipe($.banner(banner, {pkg: pkg}))
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/js', {mode: 0644}));

  var indexCssStream = gulp.src('./app/css/index.css')
    .pipe(!isProduction ? $.util.noop() : $.cssnano())
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/css', {mode: 0644}));

  var indexLibsCssStream = gulp.src('./node_modules/font-awesome/css/font-awesome.css')
    .pipe($.cssnano())
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/css', {mode: 0644}));

  return gulp.src('./app/index.html')
    .pipe($.inject(indexLibsCssStream, indexLibsCssStreamOption))
    .pipe($.inject(indexCssStream, indexCssStreamOption))
    .pipe($.inject(indexLibsStream, indexLibsStreamOption))
    .pipe($.inject(indexJsStream, indexJsStreamOption))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('mobile', function() {
  var indexLibsStreamOption = {ignorePath: "/dist"}
      ,indexJsStreamOption = {ignorePath: "/dist", "name" : "bundle"}
      ,indexLibsCssStreamOption = {ignorePath: "/dist", "name": "vendorcss"}
      ,indexCssStreamOption = {ignorePath: "/dist"};

  var indexLibsStream = gulp.src('./node_modules/jquery/dist/jquery.js')
    .pipe(!isProduction ? $.util.noop() : $.uglify())
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/js', {mode: 0644}));

  var indexJsStream = gulp.src('./app/js/index.mobile.js')
    .pipe(!isProduction ? $.util.noop() : $.uglify())
    .pipe($.banner(banner, {pkg: pkg}))
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/js', {mode: 0644}));

  var indexCssStream = gulp.src('./app/css/index.mobile.css')
    .pipe(!isProduction ? $.util.noop() : $.cssnano())
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/css', {mode: 0644}));

  var indexLibsCssStream = gulp.src('./node_modules/font-awesome/css/font-awesome.css')
    .pipe($.cssnano())
    .pipe($.rename(function(path) {
      path.basename = genRandomName() + (isProduction ? "min" : "");
    }))
    .pipe(gulp.dest('./dist/css', {mode: 0644}));

  return gulp.src('./app/mobile.html')
    .pipe($.inject(indexLibsCssStream, indexLibsCssStreamOption))
    .pipe($.inject(indexCssStream, indexCssStreamOption))
    .pipe($.inject(indexLibsStream, indexLibsStreamOption))
    .pipe($.inject(indexJsStream, indexJsStreamOption))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('image', function() {
  return gulp.src('./app/image/*')
    .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/image/'));
})

gulp.task("watch", function() {
  if (!isProduction) {
    gulp.watch(src+'**', ['index', 'mobile']);
  }
});

gulp.task('clean', function(cb) {
  return del([dist+"**"], cb);
});

gulp.task('default', $.sequence(['clean'], ['font', 'image', 'mobile', 'index'], 'watch'));
