import {defaults} from 'jest-config';
import type {JestConfigWithTsJest} from 'ts-jest';
const config: JestConfigWithTsJest = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	extensionsToTreatAsEsm: ['.ts'],
	moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/packages/**/node_modules'],
	coverageDirectory: '../coverage',
	testRegex: '.*\\.test\\.ts$',
	collectCoverageFrom: ['**/*.(t|j)s'],
	testEnvironment: 'node',
	testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '/dist/'],
	preset: 'ts-jest/presets/default-esm',
	transformIgnorePatterns: ['^.+\\.js$'],
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/packages/$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', {useESM: true}],
	},
};
export default config;
