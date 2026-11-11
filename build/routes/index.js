"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _addViewToListing = require("./addViewToListing");
var _createNewListing = require("./createNewListing");
var _deleteListing = require("./deleteListing");
var _getAllListings = require("./getAllListings");
var _getListing = require("./getListing");
var _getUserListings = require("./getUserListings");
var _updateListing = require("./updateListing");
var _files = require("./files");
var _default = exports.default = [_addViewToListing.addViewToListingRoute, _createNewListing.createNewListingRoute, _deleteListing.deleteListingRoute, _getAllListings.getAllListingsRoute, _getListing.getListingRoute, _getUserListings.getUserListingsRoute, _updateListing.updateListingRoute, _files.staticFilesRoute, ..._files.filesRoutes];