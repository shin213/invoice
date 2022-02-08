module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'arrow-body-style': 'error',
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'generator-star-spacing': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    // 'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'rest-spread-spacing': 'error',
    'template-curly-spacing': 'error',
    'yield-star-spacing': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'class',
        'format': ['PascalCase'],
        'custom': {
          'regex': 'send|start|find',
          'match': false
        }
      },
    ]
  },
}
  