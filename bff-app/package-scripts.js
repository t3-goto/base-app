//
// For more details here
// https://www.npmjs.com/package/nps
// https://www.npmjs.com/package/nps-utils
//
module.exports = {
  scripts: {
    default: 'nps start',
    //
    // Starts the builded app
    //
    start: {
      default: {
        script: 'cross-env NODE_ENV=production node dist/app.js',
        description: 'Starts the builded app with production mode',
      },
      dev: {
        script: 'cross-env NODE_ENV=development ts-node-dev src/app.ts',
        description: 'Starts the app development mode',
      },
    },
    // Builds the app into the dist directory
    build: {
      default: {
        script: 'webpack --config webpack.prod.config.js',
        description: 'Builds the app with production mode',
      },
      dev: {
        script: 'webpack --config webpack.dev.config.js',
        description: 'Builds the app with development mode',
      },
    },
    // Runs ESLint over the project
    lint: {
      script: 'eslint src',
      description: 'eslint src',
    },
  },
};
