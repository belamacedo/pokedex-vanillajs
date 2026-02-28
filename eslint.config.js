import js from '@eslint/js'
import globals from 'globals'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-undef': 'error',
      'prettier/prettier': 'error',
      'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    },
  },
  prettierConfig,
]
