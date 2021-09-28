module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/airbnb', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'vue/max-len': ['error', { code: 120, template: 120, ignoreHTMLAttributeValues: false }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', { registeredComponentsOnly: false }],
    'vue/require-name-property': 'error',
    'vue/v-on-function-call': ['error', 'never'],
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/require-direct-export': 'error',
    'no-eq-null': 'error',
    'require-await': 'error',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': [
      'error',
      'never',
      {
        ignorePackages: true,
        pattern: {
          vue: 'always'
        }
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
