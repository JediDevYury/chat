import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier'

const rules = {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 1,
    'no-undef': 'off',
    "no-console": 'error'
}

export default tseslint.config(
    {
        ignores: ['**/build/**', '**/dist/**', 'src/some/file/to/ignore.ts'],
    },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
        ],
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            prettier,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
        rules,
    }
)
