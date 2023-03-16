module.exports = {
  root: true,
  env: {
    node: true,
    'jquery': true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    "prefer-const": "off"
  },
  globals: {
    sysConfig: true,
    echarts: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
