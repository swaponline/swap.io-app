module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(nanoevents|vuetify|lightweight-charts|fancy-canvas))']
}
