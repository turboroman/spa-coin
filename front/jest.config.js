// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss|png|jpeg)$': 'babel-jest',
  },

  testEnvironment: 'jsdom',
};
