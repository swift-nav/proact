#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}

const path = require('path');
require(path.resolve(__dirname, '../babel.register')); // babel registration (runtime transpilation for node)
require(path.resolve(__dirname, '../lib/api/'));
