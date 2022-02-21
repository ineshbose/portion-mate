module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'react-hooks',
    'react-native',
    'prettier',
  ],
  extends: [
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['backend', 'env'],
  rules: {
    'import/namespace': 'off',
    'import/order': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': [2, { ignore: ['env$'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
