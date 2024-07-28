import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest  = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
  "^.+.tsx?$": ["ts-jest",{ isolatedModules: true }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
export default config;