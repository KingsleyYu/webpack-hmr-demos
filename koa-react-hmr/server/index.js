
/**
 * babel-register是针对node还未支持的es6/es7进行兼容。
 */
require('babel-register');
require('babel-polyfill');
require('./server.js');