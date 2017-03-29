/* jshint node: true, strict: true */
'use strict';

/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  dest    : '',
  vendor: {
    css: [ ],
    js : [ ]
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

var gulp           = require('gulp'),

    bower          = require('gulp-bower'),

    seq            = require('run-sequence'),
    uglify         = require('gulp-uglify'),
    sourcemaps     = require('gulp-sourcemaps'),
    cssmin         = require('gulp-cssmin'),
    ignore         = require('gulp-ignore'),
    rename         = require('gulp-rename'),
    path           = require('path');


/*======================================================================
=            Compile, minify, mobilize less                            =
======================================================================*/

gulp.task('css', function () {
  gulp.src(config.vendor.css)
  .pipe(cssmin({keepSpecialComments : 0}))
  .pipe(rename({
    basename: "reveal",
    suffix: '.min'
  }))
  .pipe(gulp.dest(path.join(config.dest, 'css')));
});


/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/

gulp.task('js', function() {
  gulp.src(config.vendor.js)
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(path.join(config.dest, 'js')));

});

/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done) {
  var tasks = ['js'];
  seq('css', tasks, done);
});

/*======================================
=            Install Sequence          =
======================================*/

gulp.task('install', function() {
  // Setup Bower Library
  bower({});
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function(done){
  var tasks = [];

  tasks.push('install');

  tasks.push('build');

  seq(tasks, done);
});


/*======================================
=       Markdown to reveal.js ppt      =
======================================*/

gulp.task('markdown', function() {
    gulp.src('./bower_components/markdown/lib/markdown.js')
    .pipe(gulp.dest(path.join(config.dest, 'js')));

    const fs = require('fs');
    var content = fs.readFileSync(__dirname + '/demo/md/CODEGUIDE.md', 'utf8');

    var md = require( "markdown" ).markdown;
    // parse the markdown into a tree and grab the link references
    // var tree = md.parse( content );
    // var html = md.renderJsonML( md.toHTMLTree( tree ) );
    // fs.writeFile(__dirname + '/message.md', html, (err) => {
    //   if (err) throw err;
    //   console.log('The file has been saved!');
    // });

});
