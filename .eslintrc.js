module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
  parserOptions: { 
    project: './tsconfig.json',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
}; 