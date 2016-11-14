'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = mapDispatchToProps;

var _zipObject = require('lodash/zipObject');

var _zipObject2 = _interopRequireDefault(_zipObject);

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Pass in a dict of dicts of actions, and then a dispatch function. Returns
 * the same dictionary but with action producing functions bound to the `dispatch`
 * function, so that components can dispatch actions to the redux store.
 */
function mapDispatchToProps(actions) {
  return function (dispatch) {
    var actionKeys = (0, _keys2.default)(actions);
    var boundActionCreators = actionKeys.map(function (k) {
      return (0, _redux.bindActionCreators)(actions[k], dispatch);
    });

    return {
      actions: (0, _zipObject2.default)(actionKeys, boundActionCreators)
    };
  };
}
module.exports = exports['default'];