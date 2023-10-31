module.exports = {
    root: true,
    extends: ['universe/native'],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
            rules: {
                '@typescript-eslint/no-shadow': ['error'],
                'no-shadow': 'off',
                'no-undef': 'off',
                'no-unused-vars': 'off',
                'prettier/prettier': 'error',
            },
        },
    ],
};
