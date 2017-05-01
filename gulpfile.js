/* jshint node: true, strict: true */
'use strict';

/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  src  : 'src',
  dest : 'www',
  core : "./bower_components/reveal.js/",
  less : {
    src: [
      './src/less/bootstrap.less'
    ],
    paths: [
      './src/less', './bower_components'
    ]
  },
  vendor : {
      css : { },
      js  : { }
  }

};

if (require('fs').existsSync('./config.js')) {
  var configFn = require('./config');
  configFn(config);
}

/*-----  End of Configuration  ------*/


/*========================================
=            Requiring stuffs            =
========================================*/

var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    path = require('path'),
    seq  = require('run-sequence');

/*======================================================================
=            Copy all core reveal directory                            =
======================================================================*/
gulp.task('core', function () {
  gulp.src([
    config.core + 'css/reveal.css',
    config.core + 'css/print/*.css',
    config.core + 'css/theme/*.css',
    config.core + 'lib/**/*',
    config.core + 'plugin/**/*',
    config.core + 'demo.html',
  ], { base: config.core })
  .pipe(gulp.dest(path.join( config.dest )));
});


/*======================================================================
=            Compile, minify, mobilize less                            =
======================================================================*/

gulp.task('css', function () {
  gulp.src(config.vendor.css.reveal)
  .pipe($.cssmin({keepSpecialComments : 0}))
  .pipe($.rename({
    basename: "reveal",
    suffix: '.min'
  }))
  .pipe(gulp.dest(path.join(config.dest, 'css')));

  gulp.src(config.less.src).pipe($.less({
    paths: config.less.paths.map(function(p){
      return path.resolve(__dirname, p);
    })
  }))
  .pipe($.mobilizer('bootstrap.css', {
    'bootstrap.css': {
      screens: 'any'
    }
  }))
  .pipe($.cssmin({keepSpecialComments : 0}))
  .pipe($.rename({
    basename: "common",
    suffix: '.min'
  }))
  .pipe(gulp.dest(path.join(config.dest, 'css')));
});


/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/

gulp.task('js', function() {
  gulp.src(config.vendor.js.reveal)
  .pipe(gulp.dest(path.join(config.dest, 'js')));

  gulp.src(config.vendor.js.reveal)
  .pipe($.concat('r.js'))
  .pipe($.uglify())
  .pipe($.rename({suffix: '.min'}))
  .pipe(gulp.dest(path.join(config.dest, 'js')));

  gulp.src(config.vendor.js.markdown)
  .pipe(gulp.dest(path.join(config.dest, 'js')));

  gulp.src(config.vendor.js.markdown)
  .pipe($.concat('m.js'))
  .pipe($.uglify())
  .pipe($.rename({suffix: '.min'}))
  .pipe(gulp.dest(path.join(config.dest, 'js')));

  gulp.src(config.vendor.js.bower)
  .pipe($.concat('bower.js'))
  .pipe(gulp.dest(path.join(config.dest, 'js')));

  gulp.src(config.vendor.js.bower)
  .pipe($.concat('b.js'))
  .pipe($.uglify())
  .pipe($.rename({suffix: '.min'}))
  .pipe(gulp.dest(path.join(config.dest, 'js')));
});

/*======================================
=            Install Sequence          =
======================================*/

gulp.task('install', function() {
  // Setup Bower Library
  $.bower({});
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function(done){
  var tasks = [ 'install', 'core' ];

  tasks.push( 'css' );
  tasks.push( 'js' );

  seq(tasks, done);
});


/*======================================
=       Markdown to reveal.js ppt      =
======================================*/
gulp.task('markdown', function() {
  var baseName = "";
  var srcFile  = "";

  var mdDirs = [];

  var srcDir  = __dirname + '/md';
  config.fn.walk(srcDir, function(err, results) {
    if (err) throw err;
    // console.log(results);
    for(var i in results){
      srcFile  = results[i];
      // console.log(srcFile);
      baseName = path.basename(srcFile, '.md').toLowerCase();
      // console.log(baseName);
      config.fn.markdown2ppt(srcFile, baseName);
    }
  });

});
