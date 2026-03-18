import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './graphql/schema.graphql', // Where your contract is located
    generates: {
        './graphql/generated/resolvers-types.ts': {
            plugins: ['typescript', 'typescript-resolvers'],
            config: {
                avoidOptionals: true,
                maybeValue: 'T | null',
            },
        },
    },
};

export default config;