#!/usr/bin/env node
require('../babel.register'); // custom babel registration

var path = require('path');
var projectRoot = process.cwd();

// Allow require to resolve modules from the project root
module.paths.push(path.resolve(projectRoot, './node_modules/'));

var serverPath = path.resolve(projectRoot, './src/server');
var webpackToolsPath = path.resolve(__dirname, '../webpack/webpack-isomorphic-tools');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require(webpackToolsPath))
  .development(__DEVELOPMENT__)
  .server(projectRoot, function() {
    require(serverPath);
  });
