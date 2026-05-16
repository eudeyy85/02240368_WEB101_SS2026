import js from '@eslint/js'                          // ESLint's built-in JS rule sets
import globals from 'globals'                        // predefined globals (window, console…)
import reactHooks from 'eslint-plugin-react-hooks'   // enforces Rules of Hooks
import reactRefresh from 'eslint-plugin-react-refresh' // warns on HMR-unsafe exports
import { defineConfig, globalIgnores } from 'eslint/config' // ESLint v9 flat config helpers

export default defineConfig([                        // wraps array with type-safety
  globalIgnores(['dist']),                           // skip linting the build output folder
  {
    files: ['**/*.{js,jsx}'],                        // apply rules only to JS/JSX files
    extends: [                                       // inherit these rule sets in order
      js.configs.recommended,                        // ESLint's core recommended rules
      reactHooks.configs.flat.recommended,           // recommended hooks rules (flat format)
      reactRefresh.configs.vite,                     // react-refresh preset tuned for Vite
    ],
    languageOptions: {                               // how ESLint parses your code
      ecmaVersion: 2020,                             // understand ES2020 syntax
      globals: globals.browser,                      // allow browser globals (window, fetch…)
      parserOptions: {
        ecmaVersion: 'latest',                       // parser uses the newest JS grammar
        ecmaFeatures: { jsx: true },                 // enable JSX parsing
        sourceType: 'module',                        // treat files as ES modules (import/export)
      },
    },
    rules: {                                         // custom rule overrides
      'no-unused-vars': ['error', {                  // error on unused variables…
        varsIgnorePattern: '^[A-Z_]'                 // …except UPPER_CASE ones (e.g. components)
      }],
    },
  },
])
