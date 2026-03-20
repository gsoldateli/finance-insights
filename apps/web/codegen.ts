
import type { CodegenConfig } from '@graphql-codegen/cli';
import { API_CONFIG } from './config/api.config';

const config: CodegenConfig = {
  overwrite: true,
  schema: API_CONFIG.endpoint,
  documents: "**/*.gql.ts",
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        scalars: {
          DateTime: 'string',
        },
      },

      plugins: ['typescript-msw']
    }
  }
};

export default config;
