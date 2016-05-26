/* eslint no-var: 0, vars-on-top: 0, no-console: 0  */
require('babel-polyfill');
require('babel-register')();

var server = require('../');
var PORT = 7777;
var HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`GraphQL API Server Start http://${HOST}:${PORT}`);
});
