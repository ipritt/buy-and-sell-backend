"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateListingRoute = void 0;
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _auth = require("firebase-admin/auth");
var _database = require("../database.js");
const updateListingRoute = exports.updateListingRoute = {
  method: 'POST',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const id = req.params.id;
    const token = req.headers.authtoken;
    if (!token) throw _boom.default.unauthorized('Authentication is required.');
    const user = await (0, _auth.getAuth)().verifyIdToken(token);
    const userId = user.user_id;
    const {
      name,
      description,
      price
    } = req.payload;
    await _database.db.query(`UPDATE listings SET name = ?, description = ?, price = ? 
            WHERE id = ? AND user_id = ?`, [name, description, price, id, userId]);
    const {
      results
    } = await _database.db.query('SELECT * FROM listings WHERE id = ? AND user_id = ?', [id, userId]);
    if (!results.length) throw _boom.default.notFound('Listing not found.');
    return results[0];
  }
};