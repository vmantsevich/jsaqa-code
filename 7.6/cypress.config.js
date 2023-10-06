module.exports = {
  retries: 1,
  e2e: {
    baseUrl: "http://localhost:3000",
    retries: {
      openMode: 1,
      runMode: 2,
    },
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
  },
};
