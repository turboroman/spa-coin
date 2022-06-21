// eslint-disable-next-line
module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
  },
  plugins: ['prettier', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'prettier'
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
  },
  parser: 'babel-eslint',
};
