"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.staticFilesRoute = exports.filesRoutes = void 0;
const angularRoutePaths = ['/', '/listings', '/contact/{id}', '/edit-listing/{id}', '/listings/{id}', '/my-listings', '/new-listing'];
const filesRoutes = exports.filesRoutes = angularRoutePaths.map(path => ({
  method: 'GET',
  path,
  handler: (req, h) => {
    return h.file('dist/buy-and-sell/browser/index.csr.html');
  }
}));
const staticFilesRoute = exports.staticFilesRoute = {
  method: 'GET',
  path: '/{params*}',
  handler: {
    directory: {
      path: 'dist/buy-and-sell/browser',
      index: ['index.csr.html']
    }
  }
};