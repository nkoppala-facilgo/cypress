const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 's1s83m',
  experimentalSessionSupport: true,
  chromeWebSecurity: false,
  viewportHeight: 768,
  viewportWidth: 1024,
  env: {
    common_string: 'FKH Facilgo PVU',
    basic_auth: 1,
    username: '',
    password: '',
    base_url: 'https://preview.facilgo.com',
    users_url: '/user_management',
    data: 'preview',
    token: ''
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
