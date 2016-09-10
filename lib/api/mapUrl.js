'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = mapUrl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapUrl() {
  var availableActions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var url = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var notFound = { action: null, params: [] };

  // test for empty input
  if (url.length === 0 || (0, _keys2.default)(availableActions).length === 0) {
    return notFound;
  }
  /*eslint-disable */
  var reducer = function reducer(prev, current) {
    if (prev.action && prev.action[current]) {
      return { action: prev.action[current], params: [] }; // go deeper
    } else {
      if (typeof prev.action === 'function') {
        return { action: prev.action, params: prev.params.concat(current) }; // params are found
      } else {
        return notFound;
      }
    }
  };
  /*eslint-enable */

  var actionAndParams = url.reduce(reducer, { action: availableActions, params: [] });

  return typeof actionAndParams.action === 'function' ? actionAndParams : notFound;
}
module.exports = exports['default'];