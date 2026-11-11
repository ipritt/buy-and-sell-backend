"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = void 0;
var _mysql = _interopRequireDefault(require("mysql2"));
let connection;
const db = exports.db = {
  connect: () => new Promise((resolve, reject) => {
    connection = _mysql.default.createConnection({
      ...(process.env.DB_SOCKET ? {
        socketPath: process.env.DB_SOCKET
      } : {
        host: process.env.DB_HOST || '127.0.0.1'
      }),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    connection.connect(error => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  }),
  query: (queryString, escapedValues) => new Promise((resolve, reject) => {
    connection.query(queryString, escapedValues, (error, results, fields) => {
      if (error) reject(error);
      resolve({
        results,
        fields
      });
    });
  }),
  end: () => connection.end()
};