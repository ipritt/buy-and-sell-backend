"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllListingsRoute = void 0;
var _database = require("../database");
const getAllListingsRoute = exports.getAllListingsRoute = {
  method: 'GET',
  path: '/api/listings',
  handler: async (req, h) => {
    const {
      results
    } = await _database.db.query('SELECT * FROM listings');
    return results;
  }
};