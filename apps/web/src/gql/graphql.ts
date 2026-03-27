/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
};

export type Crypto = {
  __typename?: 'Crypto';
  change24h?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  symbol: Scalars['String']['output'];
};

export type GeoCoordinates = {
  __typename?: 'GeoCoordinates';
  lat: Scalars['Float']['output'];
  lng: Scalars['Float']['output'];
};

export type Location = {
  __typename?: 'Location';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type LocationResult = {
  __typename?: 'LocationResult';
  city?: Maybe<Scalars['String']['output']>;
  coordinates: GeoCoordinates;
  country: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  state: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type News = {
  __typename?: 'News';
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  publishedAt: Scalars['DateTime']['output'];
  source: Scalars['String']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCryptos: Array<Maybe<Crypto>>;
  getNews: Array<Maybe<News>>;
  getWeather?: Maybe<Weather>;
  searchLocations: Array<Maybe<LocationResult>>;
};


export type QueryGetCryptosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNewsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetWeatherArgs = {
  city?: InputMaybe<Scalars['String']['input']>;
  ip?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchLocationsArgs = {
  query: Scalars['String']['input'];
};

export type Temperature = {
  __typename?: 'Temperature';
  celsius: Scalars['Int']['output'];
  fahrenheit: Scalars['Int']['output'];
};

export type Weather = {
  __typename?: 'Weather';
  condition: Scalars['String']['output'];
  location: Location;
  temperature: Temperature;
};

export type GetNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsQuery = { __typename?: 'Query', getNews: Array<{ __typename?: 'News', id: string, title: string, summary?: string | null, url: string, publishedAt: string, source: string, imageUrl?: string | null } | null> };

export type GetWeatherQueryVariables = Exact<{
  ip?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetWeatherQuery = { __typename?: 'Query', getWeather?: { __typename?: 'Weather', condition: string, temperature: { __typename?: 'Temperature', celsius: number, fahrenheit: number }, location: { __typename?: 'Location', city: string, state: string, country: string } } | null };

export type SearchLocationsQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchLocationsQuery = { __typename?: 'Query', searchLocations: Array<{ __typename?: 'LocationResult', id: string, name: string, city?: string | null, state: string, country: string, coordinates: { __typename?: 'GeoCoordinates', lat: number, lng: number } } | null> };


export const GetNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetNewsQuery, GetNewsQueryVariables>;
export const GetWeatherDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWeather"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWeather"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"temperature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"celsius"}},{"kind":"Field","name":{"kind":"Name","value":"fahrenheit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<GetWeatherQuery, GetWeatherQueryVariables>;
export const SearchLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchLocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<SearchLocationsQuery, SearchLocationsQueryVariables>;

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetNewsQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { getNews }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetNewsQuery = (resolver: GraphQLResponseResolver<GetNewsQuery, GetNewsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetNewsQuery, GetNewsQueryVariables>(
    'GetNews',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetWeatherQuery(
 *   ({ query, variables }) => {
 *     const { ip } = variables;
 *     return HttpResponse.json({
 *       data: { getWeather }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetWeatherQuery = (resolver: GraphQLResponseResolver<GetWeatherQuery, GetWeatherQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetWeatherQuery, GetWeatherQueryVariables>(
    'GetWeather',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockSearchLocationsQuery(
 *   ({ query, variables }) => {
 *     const { query } = variables;
 *     return HttpResponse.json({
 *       data: { searchLocations }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockSearchLocationsQuery = (resolver: GraphQLResponseResolver<SearchLocationsQuery, SearchLocationsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<SearchLocationsQuery, SearchLocationsQueryVariables>(
    'SearchLocations',
    resolver,
    options
  )
