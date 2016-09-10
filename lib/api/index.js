'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _prettyError = require('pretty-error');

var _prettyError2 = _interopRequireDefault(_prettyError);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _mapUrl2 = require('./mapUrl');

var _mapUrl3 = _interopRequireDefault(_mapUrl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var projectRoot = process.cwd(); // Start api by using the `proakt-api` binary.
// Assumes that we are running in an ES6 context.

var actionsPath = _path2.default.resolve(projectRoot, './api');
var configPath = _path2.default.resolve(projectRoot, './config.js');

/* eslint-disable */
var actions = require(actionsPath);
var config = require(configPath);
/* eslint-enable */

var pretty = new _prettyError2.default();
var app = (0, _express2.default)();

var server = new _http2.default.Server(app);

var io = new _socket2.default(server);
io.path('/ws');

app.use((0, _expressSession2.default)({
  secret: config.apiSessionSecret || 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(_bodyParser2.default.json());

app.use(function (req, res) {
  var splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  var _mapUrl = (0, _mapUrl3.default)(actions, splittedUrlPath);

  var action = _mapUrl.action;
  var params = _mapUrl.params;


  if (action) {
    action(req, params).then(function (result) {
      if (result instanceof Function) {
        result(res);
      } else {
        res.json(result);
      }
    }, function (reason) {
      if (reason && reason.redirect) {
        res.redirect(reason.redirect);
      } else {
        console.error('API ERROR:', pretty.render(reason));
        res.status(reason.status || 500).json(reason);
      }
    });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

var bufferSize = 100;
var messageBuffer = new Array(bufferSize);
var messageIndex = 0;

if (config.apiPort) {
  var runnable = app.listen(config.apiPort, function (err) {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
    console.info('Hooked up API endpoints:\n' + (0, _keys2.default)(actions).map(function (a) {
      return '   /api/' + a;
    }).join('\n'));
  });

  io.on('connection', function (socket) {
    socket.emit('news', { msg: '\'Hello World!\' from server' });

    socket.on('history', function () {
      for (var index = 0; index < bufferSize; index++) {
        var msgNo = (messageIndex + index) % bufferSize;
        var msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', function (d) {
      var data = (0, _assign2.default)({}, d, { id: messageIndex });
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}