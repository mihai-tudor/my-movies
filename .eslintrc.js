module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 0,
    'vue/html-indent': 2,
    'vue/html-closing-bracket-spacing': 2,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-multi-spaces': 2,
    'no-shadow': ['error', { allow: ['state'] }],
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
