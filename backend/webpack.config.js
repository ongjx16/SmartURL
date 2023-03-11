const path = require('path');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, '.build'),
    filename: 'main.ts'
  }
};
