/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@vibewell/ui-web/(.*)$': '<rootDir>/packages/ui/web/$1',
    '^@vibewell/ui-web$': '<rootDir>/packages/ui/web',
    '^@vibewell/ui-core/(.*)$': '<rootDir>/packages/ui/core/$1',
    '^@vibewell/ui-core$': '<rootDir>/packages/ui/core',
    '^@vibewell/ui-core-theme$': '<rootDir>/packages/ui/core/theme',
    '^@vibewell/ui-core-theme/(.*)$': '<rootDir>/packages/ui/core/theme/$1',
    '^@vibewell/api$': '<rootDir>/packages/api',
    '^@vibewell/api/(.*)$': '<rootDir>/packages/api/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js', '<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { 
      tsconfig: 'tsconfig.jest.json',
      // Handle ESM imports
      useESM: false,
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    }],
  },
  collectCoverageFrom: [
    'packages/ui/**/*.{ts,tsx}',
    'apps/web/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*.d.ts',
    '!**/dist/**',
    '!**/stories/**',
    '!**/mocks/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@vibewell)/)',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
      tsconfig: 'tsconfig.jest.json',
    },
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
}; 