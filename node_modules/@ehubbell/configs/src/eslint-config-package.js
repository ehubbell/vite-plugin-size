module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:eqeqeq-fix/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['react', '@typescript-eslint', 'unused-imports', 'simple-import-sort'],
	ignorePatterns: ['build', 'dist', 'node_modules'],
	rules: {
		eqeqeq: ['warn'],
		'no-empty': ['warn'],
		'no-useless-escape': ['warn'],
		'unused-imports/no-unused-imports': 'error',
		'no-mixed-spaces-and-tabs': ['off'],
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': 'error',
		'object-curly-spacing': ['warn', 'always'],
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unsafe-declaration-merging': 'off',
		'@typescript-eslint/no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'off',
	},
	overrides: [
		{
			files: ['**/*.js', '**/*.ts', '**/*.tsx', '**.*.css'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [['react', 'next']],
					},
				],
			},
		},
	],
};

// Docs
// https://archive.eslint.org/docs/developer-guide/shareable-configs
