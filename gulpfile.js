/* jshint node: true, strict: true */
'use strict';

/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  src   : 'src',
  dest   : 'www',
  core   : "./bower_components/reveal.js/",
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

    // bower          = require('gulp-bower'),

    // concat         = require('gulp-concat'),
    // uglify         = require('gulp-uglify'),
    // sourcemaps     = require('gulp-sourcemaps'),
    // cssmin         = require('gulp-cssmin'),
    // ignore         = require('gulp-ignore'),
    // rename         = require('gulp-rename'),
    // replace        = require('gulp-replace'),
    // fileinclude    = require('gulp-file-include');

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

});

/*======================================
=            Install Sequence          =
======================================*/

gulp.task('install', function(done) {
  // Setup Bower Library
  $.bower({});

  var tasks = ['css', 'js'];
  seq('core', tasks, done);
});


/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function(done){
  var tasks = [];

  tasks.push('install');

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
  walk(srcDir, function(err, results) {
    if (err) throw err;
    // console.log(results);
    for(var i in results){
      srcFile  = results[i];
      // console.log(srcFile);
      baseName = path.basename(srcFile, '.md').toLowerCase();
      // console.log(baseName);
      markdown2ppt(srcFile, baseName);
    }
  });

});

/** 单个文件: 转换markdown文档为ppt html */
function markdown2ppt(srcFile, baseName) {
  const fs = require('fs');
  var content = fs.readFileSync(srcFile, 'utf8');
  var md = require( "markdown" ).markdown;
  var html = md.toHTML(content);

  // parse the markdown into a tree and grab the link references
  // var tree = md.parse( content );
  // var html = md.renderJsonML( md.toHTMLTree( tree ) );
  // console.log(tree);

  // fs.writeFile(__dirname + '/demo/index.html', html, (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });

  html = html.replace(new RegExp("\n","gm"),"\n                    ");
  html = '<section data-background="white">\n                    <section>\n                    ' + html;
  // html = html.replace(new RegExp("<h2>","gm"),'\n                </section>\n                <section data-background="#4d7e65" data-background-transition="slide">\n                    <h2>');
  // html = html.replace(new RegExp("<h3>","gm"),'\n                </section>\n                <section data-background="white">\n                    <h3>');

  html = html.replace(/<h2>(.*)<\/h2>/gi, '</section>\n                </section>\n            <h2>$1</h2>');
  html = html.replace(/<h2>(.*)<\/h2>/gi, '\n                <section role="$1">\n                    <section data-background="#4d7e65" data-background-transition="slide">\n                    <h2>$1</h2>');
  html = html.replace(/<h3>(.*)<\/h3>/gi, '\n                    </section>\n            <h3>$1</h3>');
  html = html.replace(/<h3>(.*)<\/h3>/gi, '\n                    <section data-background="white">\n                    <h3>$1</h3>');

  html = html.replace(/<p><code><\/code>`/mgi, '<p><code>');
  html = html.replace(/<code><\/code>`<\/p>/mgi, '<\/code><\/p>');
  html = html.replace(/<\/p>(\s*)<pre><code>/mgi, '$1    ');
  html = html.replace(/<\/code><\/pre>(\s*)<p>/mgi, '$1');

  html = html.replace(/<p><code>\w*/mgi, '<pre><code data-trim contenteditable>');
  html = html.replace(/<\/code><\/p>/gi, '<\/code><\/pre>');
  html = html.replace(/<(\/)?em>/mgi, '*');
  html = html.replace(/<\/p>(\s+)<p>/mgi, '$1');

  html = html.replace(/<\/ul>/gi, '\n                    </ul>');
  html = html.replace(/<li>/gi, '\n                        <li>');

  html = html + '\n                    </section>\n                </section>\n';

  html = html.replace(new RegExp("<blockquote>","gm"),"");
  html = html.replace(new RegExp("</blockquote>","gm"),"");
  html = html.replace(new RegExp("<p><strong>","gm"),"<h2>");
  html = html.replace(new RegExp("</strong></p>","gm"),"</h2>");

  gulp.src(config.src + '/model/common.html')
  .pipe($.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
  .pipe($.replace('<!-- inject:reveal.js:content -->', html))
  .pipe($.rename({
    basename: baseName
  }))
  .pipe(gulp.dest(path.join(config.dest)));
}

/** 遍历指定路径下所有文件，返回路径数组 */
function walk(dir, done) {
  const fs = require('fs');
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};
