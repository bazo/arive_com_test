/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(tsx?|ts?)$": "ts-jest",
		"\\.svg$": "svg-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|ts?)$",
	moduleFileExtensions: ["js", "ts", "tsx", "json", "node"],
	rootDir: "./src",
	moduleNameMapper: {
		"^api$": "<rootDir>/api/index.ts",
		"^api/(.*)$": "<rootDir>/api/$1",
		"^app/(.*)$": "<rootDir>/app/$1",
		"^assets/(.*)$": "<rootDir>/assets/$1",
		"^components/(.*)$": "<rootDir>/components/$1",
		"^libs/(.*)$": "<rootDir>/libs/$1",
		"^mocks/(.*)$": "<rootDir>/mocks/$1",
		"^pages/(.*)$": "<rootDir>/pages/$1",
		"\\.css$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/__tests__/setupJest.js"],
};
