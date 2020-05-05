// next.config.js
const withCss = require("@zeit/next-css");

// next.config.js
const withImages = require("next-images");



// module.exports = withImages({
//   webpack(config, options) {
//     return config;
//   },
// });

module.exports = {
  ...withCss({
    cssLoaderOptions: {
      url: false,
    },
    exportTrailingSlash: true,
    exportPathMap: function () {
      return {
        "/createQuiz/": { page: "/createQuiz" },
        // "/chart/:id": { page: "/chart/[id]" },
      };
    },
  }),
  
  ...withImages({
    webpack(config, options) {
      return config;
    },
  }),
};
