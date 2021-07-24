/* eslint-env node */
/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "react", "react-hooks", "eslint-plugin-simple-import-sort", "import"],
	rules: {
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-var-requires": "off",
		"simple-import-sort/imports": "error",
		"sort-imports": "off",
		"import/order": "off",
		"import/first": "error",
		"import/newline-after-import": "error",
		"import/no-duplicates": "error",
		"react/react-in-jsx-scope": "off",
		"no-console": "warn",
		"no-undef": "off",
		"react/prop-types": "off",
		"@typescript-eslint/no-unused-vars": ["warn", { vars: "all", args: "after-used", ignoreRestSiblings: false, argsIgnorePattern: "^_" }],
	},
	ignorePatterns: ["**/*.test.*"],
};
