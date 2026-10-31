export default [{
  files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
  ignores: ['dist/**', 'node_modules/**'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: {window: 'readonly', document: 'readonly', console: 'readonly', process: 'readonly', URL: 'readonly', require: 'readonly', module: 'readonly', __dirname: 'readonly', Buffer: 'readonly'}
  },
  rules: {
    'no-undef': 'error', 'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'no-unreachable': 'error', 'no-constant-condition': 'error', 'valid-typeof': 'error',
    'constructor-super': 'error', 'no-dupe-keys': 'error', 'eqeqeq': 'error'
  }
}];
