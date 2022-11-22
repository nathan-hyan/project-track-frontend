module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'plugin:import/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort', // requires 'eslint-plugin-simple-import-sort'
  ],
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-unused-vars': 'off', // Disabling this so the native TS check can be used
    '@typescript-eslint/no-unused-vars': 'error',
    'simple-import-sort/imports': 'warn', // requires 'eslint-plugin-simple-import-sort'
    'simple-import-sort/exports': 'error', // requires 'eslint-plugin-simple-import-sort'
    'no-shadow': 'off', // Fixes false-positives for enums
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-alert': 'off', // Delete if you're not using native alert func.
    'import/no-extraneous-dependencies': [ // Avoids devDependencies with Testing Library in test files
      'error',
      {
        devDependencies: [
          'test.{ts,tsx}', // repos with a single test file
          'test-*.{ts,tsx}', // repos with multiple top-level test files
          '**/*{.,_}{test,spec}.{ts,tsx}', // tests where the extension or filename suffix denotes that it is a test
          '**/jest.config.ts', // jest config
          '**/jest.setup.ts', // jest setup
        ],
        optionalDependencies: false,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['./src'],
      },
    },
  },
  overrides: [
    // override "simple-import-sort" config - requires 'eslint-plugin-simple-import-sort'
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],

};
