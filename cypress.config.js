const { defineConfig } = require("cypress");
const env = require('./cypress.env.json');

module.exports = defineConfig({
  e2e: {
    baseUrl: env.BASE_URL,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  }
});