"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListingRoute = void 0;
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _database = require("../database");
const getListingRoute = exports.getListingRoute = {
  method: 'GET',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const id = req.params.id;
    const {
      results
    } = await _database.db.query('SELECT * FROM listings WHERE id = ?', [id]);
    const listing = results[0];
    if (!listing) {
      throw _boom.default.notFound(`Listing not found with id ${id}`);
    }
    return listing;
  }
};