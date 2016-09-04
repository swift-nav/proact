//  enable runtime transpilation to use ES6/7 in node
var fs = require('fs');
var path = require('path');

// Include proakt .babelrc, not project-relative babelrc
// The goal is for projects using proakt to not have their own babelrc at all
var babelrc = fs.readFileSync(path.resolve(__dirname, './.babelrc'));
var config;

try {
  config = JSON.parse(babelrc.toString());
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);
