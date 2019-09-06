require('@babel/register')({
  extensions: [ '.ts', '.tsx' ],
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-env',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ],
});

const { Publisher } = require('../../src/index');

module.exports = Publisher;
