module.exports = {
	// The root of your source code, typically /src
	// `<rootDir>` is a token Jest substitutes
	"roots": ["<rootDir>/src/"] ,

	// Jest transformations -- this adds support for TypeScript
	// using ts-jest
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	"moduleNameMapper": {
		"@core/(.*)": "<rootDir>/src/core/$1",
		"@redux/(.*)": "<rootDir>/src/redux/$1",
		"@adapters/(.*)": "<rootDir>/src/adapters/$1",
		"@components/(.*)": "<rootDir>/src/components/$1",
		"@testing-library/(.*)": "<rootDir>/node_modules/@testing-library/$1",
	},
	"verbose": true,

	// Runs special logic, such as cleaning up components
	// when using React Testing Library and adds special
	// extended assertions to Jest
	// setupFilesAfterEnv: [
	//   "@testing-library/react/cleanup-after-each",
	//   "@testing-library/jest-dom/extend-expect"
	// ],

	// Test spec file resolution pattern
	// Matches parent folder `__tests__` and filename
	// should contain `test` or `spec`.
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

	// Module file extensions for importing
	moduleFileExtensions: ["ts", "tsx", "js"],
	preset: 'ts-jest',
};