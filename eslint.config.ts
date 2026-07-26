import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    basePath: "src",
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: {'@typescript-eslint': tseslint.plugin}
  },
]);
