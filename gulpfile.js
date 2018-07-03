// generated on 2018-06-07 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const browserify = require('browserify');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

const runStyles = () => {
  return gulp
    .src('src/styles/*.scss')
    .pipe($.plumber())
    .pipe($.if(dev, $.sourcemaps.init()))
    .pipe(
      $.sass
        .sync({
          outputStyle: 'expanded',
          precision: 10,
          includePaths: ['.']
        })
        .on('error', $.sass.logError)
    )
    .pipe(
      $.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] })
    )
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(gulp.dest('.temp/styles'))
    .pipe(reload({ stream: true }));
};

const runScripts = () => {
  // return gulp
    // .src('src/scripts/**/*.js')
    const b = browserify({
      entries:'src/scripts/main.js',
      transform: babelify,
      debug: true
    })

    return b.bundle()
      .pipe(source('bundle.js'))
      .pipe($.plumber())
      .pipe(buffer())
      // .pipe($.if(dev, $.sourcemaps.init({loadMaps: true})))
      // .pipe($.if(dev, $.sourcemaps.write('.')))
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.temp/scripts'))
      .pipe(reload({stream: true}));

    // .pipe($.plumber())
    // .pipe($.if(dev, $.sourcemaps.init()))
    // .pipe($.babel())
    // .pipe($.if(dev, $.sourcemaps.write('.')))
    // .pipe(gulp.dest('.temp/scripts'))
    // .pipe(reload({ stream: true }));
};

const runHtml = () => {
  return (
    gulp
      .src('src/*.html')
      .pipe($.useref({ searchPath: ['.temp', 'src', '.'] }))
      // .pipe($.if('src/scripts/main.js', $.uglify({ compress: { drop_console: false } })))
      // .pipe($.if('src/scripts/**/*.js', $.uglify({ compress: { drop_console: true } })))
      // .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
      .pipe($.if(/\.css$/, $.cssnano({ safe: true, autoprefixer: false })))
      .pipe(
        $.if(
          /\.html$/,
          $.htmlmin({
            collapseWhitespace: false,
            minifyCSS: true,
            minifyJS: { compress: { drop_console: true } },
            processConditionalComments: false,
            removeComments: false,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          })
        )
      )
      .pipe(gulp.dest('dist'))
  );
};

const runImages = () => {
  return gulp
    .src('src/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
};

const runFonts = () => {
  return gulp
    .src(
      require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(
        err
      ) {}).concat('src/fonts/**/*')
    )
    .pipe($.if(dev, gulp.dest('.temp/fonts'), gulp.dest('dist/fonts')));
};

gulp.task('styles', runStyles);

gulp.task('scripts', runScripts);

gulp.task('html', ['styles', 'scripts'], runHtml);

gulp.task('images', runImages);

gulp.task('fonts', runFonts);

const lint = files => {
  return gulp
    .src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({ stream: true, once: true }))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
};

gulp.task('lint', () => {
  return lint('src/scripts/**/*.js').pipe(gulp.dest('src/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js').pipe(gulp.dest('test/spec'));
});

gulp.task('extras', () => {
  return gulp
    .src(['src/*', '!src/*.html'], {
      dot: true
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.temp', 'dist']));

gulp.task('start', () => {
  runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], () => {
    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.temp', 'src'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp
      .watch(['src/*.html', 'src/images/**/*', '.temp/fonts/**/*'])
      .on('change', reload);

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

gulp.task('start:dist', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync.init({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.temp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp
    .src('src/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(
      wiredep({
        ignorePath: /^(\.\.\/)+/
      })
    )
    .pipe(gulp.dest('src/styles'));

  gulp
    .src('src/*.html')
    .pipe(
      wiredep({
        exclude: ['bootstrap'],
        ignorePath: /^(\.\.\/)*\.\./
      })
    )
    .pipe(gulp.dest('src'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep'], 'build', resolve);
  });
});
