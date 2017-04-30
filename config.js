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

};
