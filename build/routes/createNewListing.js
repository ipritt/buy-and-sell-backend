"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewListingRoute = void 0;
var _boom = _interopRequireDefault(require("@hapi/boom"));
var _uuid = require("uuid");
var _database = require("../database.js");
var _auth = require("firebase-admin/auth");
const createNewListingRoute = exports.createNewListingRoute = {
  method: 'POST',
  path: '/api/listings',
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    if (!token) throw _boom.default.unauthorized('Authentication is required.');
    const user = await (0, _auth.getAuth)().verifyIdToken(token);
    const userId = user.user_id;
    const {
      name = '',
      description = '',
      price = 0
    } = req.payload;
    const id = (0, _uuid.v4)();
    const views = 0;
    await _database.db.query(`INSERT INTO listings (id, name, description, price, user_id, views) 
            VALUES (?, ?, ?, ?, ?, ?)`, [id, name, description, price, userId, views]);
    return {
      id,
      name,
      description,
      price,
      user_id: userId,
      views
    };
  }
};