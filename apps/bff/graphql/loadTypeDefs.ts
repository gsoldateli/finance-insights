import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'graphql';


/**
 * Loads and validates the physical Schema of the Monorepo.
 * If the file is corrupted, the process crashes at Boot (Fail-Fast).
 */
export function loadTypeDefs() {
    try {
        // Absolute path to the shared package in the Monorepo
        const schemaPath = join(process.cwd(), './graphql/schema.graphql');

        const schemaString = readFileSync(schemaPath, 'utf8');

        // The catch: 'parse' validates the GraphQL syntax before Apollo tries to run it
        // If there is a syntax error, it throws an error to the catch block here.
        return parse(schemaString);

    } catch (error) {
        console.error('❌ Critical Error: Failed to load or validate schema.graphql');
        if (error instanceof Error) {
            console.error(`Details: ${error.message}`);
        }
        process.exit(1); // Stops the process immediately (Fail-Fast)
    }
}