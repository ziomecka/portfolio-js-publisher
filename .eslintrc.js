module.exports = {
  env: {
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-member-accessibility': ['error', {
      accessibility: 'explicit',
      overrides: {
        constructors: 'no-public',
      }
    }],
    'array-bracket-spacing': ['error', 'always', { 'singleValue': false }],
    'arrow-spacing': 'error',
    'comma-spacing': 'error',
    'computed-property-spacing': ['error', 'always'],
    'key-spacing': 'error',
    'max-len': ['error', { "code": 100 }],
    'no-duplicate-imports': 'error',
    'no-multi-spaces': 'error',
    'no-undef': 'off',
    'object-curly-spacing': ['error', 'always'],
    'semi': 'error',
    'sort-imports': 'error',
    'space-before-function-paren': 'error',
    'template-curly-spacing': ['error', 'always'],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
          '@typescript-eslint/no-var-requires': 'off',
          '@typescript-eslint/explicit-function-return-type': 'off'
      },
    },
  ],
};