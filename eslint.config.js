import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import eslintPlugin from '@typescript-eslint/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import react from 'eslint-plugin-react'

import eslintConfigPrettier from 'eslint-config-prettier'; 


export default defineConfig([
  globalIgnores(['dist',
        'src/apis/generated/**',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
      react.configs.flat.recommended,

    ],
    languageOptions: {
      ecmaVersion: 2020,     
      ...react.configs.flat.recommended.languageOptions,

      globals: globals.browser,
    }, 
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
    },
    rules: {
          ...js.configs.recommended.rules,
          ...eslintPlugin.configs.recommended.rules,
          ...react.configs.recommended.rules,
          ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
          'quotes': ['error', 'single'],
          "no-unused-vars": "off",

          'react/react-in-jsx-scope': 'off', 
          'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
          ],
          'indent': ['warn', 'tab', {
            'SwitchCase': 2,
            'ignoredNodes': ['TemplateLiteral'],
          }],
          'react/jsx-indent': ['warn', 'tab'], 
                    'comma-dangle': ['warn', 'always-multiline'],

          'react/jsx-indent-props': ['warn', 'tab'],
          'react/jsx-first-prop-new-line': ['warn', 'multiline'],
          'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
          'react/jsx-max-props-per-line': ['warn', { maximum: 1 }],
          'react/jsx-first-prop-new-line': ['warn', 'multiline'],
          'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],

          'object-curly-spacing': ['warn', 'always'],
          'array-bracket-spacing': ['warn', 'never'],
          'comma-dangle': ['warn', 'always-multiline'],
          'eol-last': ['warn', 'always'],
        },
    
  },
])
