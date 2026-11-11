"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteListingRoute = void 0;
var _database = require("../database.js");
var _auth = require("firebase-admin/auth");
const deleteListingRoute = exports.deleteListingRoute = {
  method: 'DELETE',
  path: '/api/listings/{id}',
  handler: async (req, h) => {
    const id = req.params.id;
    const token = req.headers.authtoken;
    const user = await (0, _auth.getAuth)().verifyIdToken(token);
    const userId = user.user_id;
    await _database.db.query('DELETE FROM listings WHERE id = ? AND user_id = ?', [id, userId]);
    return {
      message: 'Listing deleted successfully'
    };
  }
};