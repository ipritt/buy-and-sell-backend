"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _hapi = _interopRequireDefault(require("@hapi/hapi"));
var _app = require("firebase-admin/app");
var _routes = _interopRequireDefault(require("./routes"));
var _database = require("./database");
var _credentials = _interopRequireDefault(require("../credentials.json"));
var _inert = _interopRequireDefault(require("@hapi/inert"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv.default.config();
(0, _app.initializeApp)({
  credential: (0, _app.cert)(_credentials.default)
});
let server;
const start = async () => {
  server = _hapi.default.server({
    port: 8080,
    host: '0.0.0.0'
  });
  await server.register(_inert.default);
  _routes.default.forEach(route => server.route(route));
  await _database.db.connect();
  await server.start();
  console.log(`Server is listening on ${server.info.uri}`);
};
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
process.on('SIGINT', async () => {
  console.log('Stopping server...');
  await server.stop({
    timeout: 10000
  });
  _database.db.end();
  console.log('Server stopped');
  process.exit(0);
});
start();