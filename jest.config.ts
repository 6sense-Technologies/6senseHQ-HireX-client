import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  testMatch: ['<rootDir>/__test__/**/*.test.(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

export default createJestConfig(customJestConfig);
