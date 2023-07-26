// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:solid/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'solid'],
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'func-call-spacing': 0,
    'space-before-function-paren': [
      'error',
      { asyncArrow: 'always', named: 'never' },
    ],
    quotes: [1, 'single'],
    'comma-dangle': [
      'error',
      { arrays: 'always-multiline', objects: 'always-multiline' },
    ],
  },
};
