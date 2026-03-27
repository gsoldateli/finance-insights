/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetNews {\n    getNews {\n      id\n      title\n      summary\n      url\n      publishedAt\n      source\n      imageUrl\n    }\n  }\n": typeof types.GetNewsDocument,
    "\n  query GetWeather($ip: String) {\n    getWeather(ip: $ip) {\n      temperature {\n        celsius\n        fahrenheit\n      }\n      condition\n      location {\n        city\n        state\n        country\n      }\n    }\n  }\n": typeof types.GetWeatherDocument,
    "\n  query SearchLocations($query: String!) {\n    searchLocations(query: $query) {\n      id\n      name\n      city\n      state\n      country\n      coordinates {\n        lat\n        lng\n      }\n    }\n  }\n": typeof types.SearchLocationsDocument,
};
const documents: Documents = {
    "\n  query GetNews {\n    getNews {\n      id\n      title\n      summary\n      url\n      publishedAt\n      source\n      imageUrl\n    }\n  }\n": types.GetNewsDocument,
    "\n  query GetWeather($ip: String) {\n    getWeather(ip: $ip) {\n      temperature {\n        celsius\n        fahrenheit\n      }\n      condition\n      location {\n        city\n        state\n        country\n      }\n    }\n  }\n": types.GetWeatherDocument,
    "\n  query SearchLocations($query: String!) {\n    searchLocations(query: $query) {\n      id\n      name\n      city\n      state\n      country\n      coordinates {\n        lat\n        lng\n      }\n    }\n  }\n": types.SearchLocationsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetNews {\n    getNews {\n      id\n      title\n      summary\n      url\n      publishedAt\n      source\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query GetNews {\n    getNews {\n      id\n      title\n      summary\n      url\n      publishedAt\n      source\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWeather($ip: String) {\n    getWeather(ip: $ip) {\n      temperature {\n        celsius\n        fahrenheit\n      }\n      condition\n      location {\n        city\n        state\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWeather($ip: String) {\n    getWeather(ip: $ip) {\n      temperature {\n        celsius\n        fahrenheit\n      }\n      condition\n      location {\n        city\n        state\n        country\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchLocations($query: String!) {\n    searchLocations(query: $query) {\n      id\n      name\n      city\n      state\n      country\n      coordinates {\n        lat\n        lng\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchLocations($query: String!) {\n    searchLocations(query: $query) {\n      id\n      name\n      city\n      state\n      country\n      coordinates {\n        lat\n        lng\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;