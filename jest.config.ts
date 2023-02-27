import {defaults} from 'jest-config';
import type {Config} from 'jest';
const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/**/node_modules'],
	coverageDirectory: '../coverage',
	rootDir: 'packages',
	testRegex: '.*\\.test\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	testEnvironment: 'node',
	testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '/dist/'],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/console-utils/src/$1',
	},
};
export default config;
