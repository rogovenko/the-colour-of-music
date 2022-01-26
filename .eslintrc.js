module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: [
          '.jsx',
          '.tsx',
          '.js',
          '.ts',
        ],
      },
    ],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-uses-react': 0,
    'react/prop-types': 0,
    'react/jsx-no-constructed-context-values': 0,
    'no-param-reassign': 0,
    'default-param-last': 0,
    'no-await-in-loop': 0,
    'eqeqeq': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/no-array-index-key': 0,
  },
}
