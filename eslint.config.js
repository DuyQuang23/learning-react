import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 1. Tắt quy tắc bắt buộc phải có React trong scope (Dành cho React 17+)
      'react/react-in-jsx-scope': 'off',

      // 2. Cấu hình để TypeScript không báo lỗi "React" chưa sử dụng
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          'varsIgnorePattern': '^React$', // Bỏ qua kiểm tra nếu biến đó tên là "React"
          'argsIgnorePattern': '^_',
        },
      ],
      
      // Các rules khác của bạn...
    },
  },
  
])
