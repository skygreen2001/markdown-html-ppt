'use strict';

module.exports = function(config) {
  /**
   * The input directory.
   *
   * @property config.html
   * @type {String}
   */
  config.src = 'src';

  /**
   * The output directory.
   *
   * @property config.dest
   * @type {String}
   */
  config.dest = 'www';

  /**
   * The reveal.js directory.
   *
   * @property config.core
   * @type {String}
   */
  config.core = "./bower_components/reveal.js/";
  //
  // 3rd party components
  //
  /**
   * Vendor Css (appended on compile time)
   *
   * @property config.vendor.css
   * @type {Array}
   */

  config.vendor.css.reveal = './bower_components/reveal.js/css/reveal.css';

  /**
   * Vendor Javascripts
   *
   * @property config.vendor.js
   * @type {Array}
   */
  //浏览器兼容性Javascript原生对象函数支持
  config.vendor.js.reveal   = './bower_components/reveal.js/js/reveal.js';
  config.vendor.js.markdown = './bower_components/markdown/lib/markdown.js';
  config.vendor.js.bower    = [];
  config.vendor.js.bower.push('./bower_components/ace-builds/src/ace.js');

  config.vendor.js.bower.push('./bower_components/ace-builds/src/mode-markdown.js');
  // config.vendor.js.bower.push('./bower_components/ace-builds/src/mode-html.js');
  config.vendor.js.bower.push('./bower_components/ace-builds/src/theme-*.js');
  config.vendor.js.bower.push('./bower_components/jquery/dist/jquery.min.js');
  config.vendor.js.bower.push('./bower_components/marked/lib/marked.js');

  config.fn = {};

  /** 单个文件: 转换markdown文档为ppt html */
  config.fn.markdown2ppt = function(srcFile, baseName, encodeType, modelFile) {
    const fs = require('fs');
    var content = fs.readFileSync(srcFile, 'utf8');

    /**
     * encodeType: markdown to html方式
     * 1: marked   - https://github.com/chjj/marked
     * 0: markdown - https://github.com/evilstreak/markdown-js
     */
    encodeType   = encodeType || 1;
    if (encodeType == 1){
      var marked = require('marked');
      var html   = marked(content);
    } else {
      var md     = require( "markdown" ).markdown;
      var html   = md.toHTML(content);
    }
    var mph      = require('./mph.js');
    html         = mph.mph( html, encodeType );

    var gulp  = require('gulp'),
        $     = require('gulp-load-plugins')(),
        path  = require('path');
    modelFile = modelFile || config.src + '/html/model/common.html';
    gulp.src(modelFile)
    .pipe($.fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe($.replace('<!-- inject:reveal.js:content -->', html))
    .pipe($.rename({
      basename: baseName
    }))
    .pipe(gulp.dest(path.join(config.dest)));
  };

  /** 遍历指定路径下所有文件，返回路径数组 */
  config.fn.walk =function(dir, done) {
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


};
