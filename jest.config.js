module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!axios).+\\.js$'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue,ts}'],
  coverageReporters: ['html', 'text-summary'],
};
