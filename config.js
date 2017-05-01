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
    html         = config.fn.markdown2revealjs( html, encodeType );

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

  config.fn.markdown2revealjs = function( markdown_html_content, encodeType ) {
    encodeType = encodeType || 1;
    var html = markdown_html_content;
    if (encodeType == 1){
      html = html.replace(new RegExp("\n","gm"),"\n                    ");
      html = '<section data-background="white">\n                    <section>\n                    ' + html;

      html = html.replace(/<h2 id=".*">(.*)<\/h2>/gi, '</section>\n                </section>\n            <h2>$1</h2>');
      html = html.replace(/<h2>(.*)<\/h2>/gi, '\n                <section role="$1">\n                    <section data-background="#4d7e65" data-background-transition="slide">\n                    <h2>$1</h2>');
      html = html.replace(/<h3 id=".*">(.*)<\/h3>/gi, '\n                    </section>\n            <h3>$1</h3>');
      html = html.replace(/<h3>(.*)<\/h3>/gi, '\n                    <section data-background="white">\n                    <h3>$1</h3>');

      html = html.replace(/<pre><code(.*)>(.*)/mgi, '<pre><code data-trim contenteditable$1>\n                    $2');

      html = html.replace(/<li>/gi, '    <li>');

      html = html + '\n                    </section>\n                </section>\n';

      html = html.replace(new RegExp("<blockquote>","gm"),"");
      html = html.replace(new RegExp("</blockquote>","gm"),"");
      html = html.replace(new RegExp("<p><strong>","gm"),"<h2>");
      html = html.replace(new RegExp("</strong></p>","gm"),"</h2>");
    } else {
      // parse the markdown into a tree and grab the link references
      // var tree = md.parse( content );
      // var html = md.renderJsonML( md.toHTMLTree( tree ) );
      // console.log(tree);

      // fs.writeFile(__dirname + '/demo/'+baseName+'.html', html, (err) => {
      //   if (err) throw err;
      //   console.log('The file has been saved!');
      // });

      html = html.replace(new RegExp("\n","gm"),"\n                    ");
      html = '<section data-background="white">\n                    <section>\n                    ' + html;

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
    }
    return html;
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
