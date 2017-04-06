'use strict';

module.exports = function(config) {
  /**
   * The input directory.
   *
   * @property config.html
   * @type {String}
   */
  config.html = 'html';

  /**
   * The output directory.
   *
   * @property config.dest
   * @type {String}
   */
  config.dest = '';

  //
  // 3rd party components
  //
  /**
   * Vendor Css (appended on compile time)
   *
   * @property config.vendor.css.append
   * @type {Array}
   */

  config.vendor.css.push('./bower_components/reveal.js/css/reveal.css');

  /**
   * Vendor Javascripts
   *
   * @property config.vendor.js
   * @type {Array}
   */
  //浏览器兼容性Javascript原生对象函数支持
  config.vendor.js.push('./bower_components/reveal.js/js/reveal.js');

};
