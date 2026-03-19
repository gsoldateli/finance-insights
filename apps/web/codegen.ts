
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "app/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
      plugins: []
    }
  }
};

export default config;
