
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: "/",
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/listings",
    "route": "/"
  },
  {
    "renderMode": 1,
    "route": "/listings"
  },
  {
    "renderMode": 0,
    "route": "/listings/*"
  },
  {
    "renderMode": 0,
    "route": "/contact/*"
  },
  {
    "renderMode": 0,
    "route": "/edit-listing/*"
  },
  {
    "renderMode": 1,
    "route": "/my-listings"
  },
  {
    "renderMode": 2,
    "route": "/new-listing"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    "index.csr.html": {size: 614, hash: "4a9a17d300858a2cfa23d84ec840bec81bcfb81b786a350d2e641c95d384d9d1", text: () => import("./assets-chunks/index_csr_html.mjs").then(m => m.default)},
    "index.server.html": {size: 948, hash: "5aa404a7d0930b8e65fc594aeae1520401856910a7fc9554567eaacd337fb74f", text: () => import("./assets-chunks/index_server_html.mjs").then(m => m.default)},
    "new-listing/index.html": {size: 1304, hash: "5d5a36c94e60cd11116d4c1b7f0d856c36df2f090d3d5beeb07f517892652a59", text: () => import("./assets-chunks/new-listing_index_html.mjs").then(m => m.default)},
    "styles-S7KZFDGS.css": {size: 923, hash: "PJu12mWD5zU", text: () => import("./assets-chunks/styles-S7KZFDGS_css.mjs").then(m => m.default)}
  },
};
