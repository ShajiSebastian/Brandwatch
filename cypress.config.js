const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "retries": 2,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.google.com/maps',
  },
});
