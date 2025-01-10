import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  // extensionsToTreatAsEsm: ['.ts', '.tsx'],
  // transform: {
  //   '^.+\\.(ts|tsx)$': 'babel-jest',
  //   '^.+\\.(js|jsx)$': 'babel-jest',
  // },
  // transformIgnorePatterns: [
  //   'node_modules/(?!(next-auth|@auth/core)/)',
  // ],
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  //   '^@/(.*)$': '<rootDir>/$1',
  // },
  // testEnvironment: 'jsdom',
  // coverageProvider: 'v8',
  // cacheDirectory: '.jest-cache',
  // coverageDirectory: 'coverage',
  // coverageReporters: ['html', 'lcov', 'text-summary'],
  // collectCoverage: true,
  // testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  // setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  
  testMatch: ['<rootDir>/__test__/**/*.test.(js|jsx|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

// Ensure next/jest can load the Next.js config
export default createJestConfig(customJestConfig);
