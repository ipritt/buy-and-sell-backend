"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserListingsRoute = void 0;
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _auth = require("firebase-admin/auth");
var _database = require("../database.js");
const getUserListingsRoute = exports.getUserListingsRoute = {
  method: 'GET',
  path: '/api/users/{userId}/listings',
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    if (!token) throw _boom.default.unauthorized('Authentication is required.');
    const user = await (0, _auth.getAuth)().verifyIdToken(token);
    const userId = user.user_id;
    if (user.uid !== userId) throw _boom.default.unauthorized('Users can only access their own listings!');
    const {
      results
    } = await _database.db.query('SELECT * FROM listings WHERE user_id = ?', [userId]);
    return results;
  }
};