/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
};


export type QueryGetCryptosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNewsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetWeatherArgs = {
  city: Scalars['String']['input'];
};

export type Weather = {
  __typename?: 'Weather';
  city: Scalars['String']['output'];
  condition: Scalars['String']['output'];
  temp: Scalars['Int']['output'];
};

export type GetNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsQuery = { __typename?: 'Query', getNews: Array<{ __typename?: 'News', id: string, title: string, summary?: string | null, url: string, publishedAt: string, source: string, imageUrl?: string | null } | null> };


export const GetNewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetNewsQuery, GetNewsQueryVariables>;