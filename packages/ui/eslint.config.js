const base = require('@taskpro/eslint');

module.exports = [
  ...base,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  },
  {
    ignores: ['eslint.config.js', 'storybook-static/**'],
  },
];
