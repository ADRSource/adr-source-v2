module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: [
		'next/core-web-vitals',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'prettier',
	],
	rules: {
		'@typescript-eslint/strict-boolean-expressions': 'warn',
		'no-constant-binary-expression': 'warn',
		'no-implicit-coercion': 'error',
		'no-unneeded-ternary': 'warn',
		'@typescript-eslint/no-unnecessary-condition': 'warn',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],
	},
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
};
