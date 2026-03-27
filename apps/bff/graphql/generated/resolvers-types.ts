import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Crypto = {
  __typename?: 'Crypto';
  change24h: Maybe<Scalars['Float']['output']>;
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
  city: Maybe<Scalars['String']['output']>;
  coordinates: GeoCoordinates;
  country: Scalars['String']['output'];
  name: Scalars['String']['output'];
  state: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type News = {
  __typename?: 'News';
  id: Scalars['ID']['output'];
  imageUrl: Maybe<Scalars['String']['output']>;
  publishedAt: Scalars['DateTime']['output'];
  source: Scalars['String']['output'];
  summary: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCryptos: Array<Maybe<Crypto>>;
  getNews: Array<Maybe<News>>;
  getWeather: Maybe<Weather>;
  searchLocations: Array<Maybe<LocationResult>>;
};


export type QueryGetCryptosArgs = {
  limit: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNewsArgs = {
  category: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetWeatherArgs = {
  city: InputMaybe<Scalars['String']['input']>;
  ip: InputMaybe<Scalars['String']['input']>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Crypto: ResolverTypeWrapper<Crypto>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GeoCoordinates: ResolverTypeWrapper<GeoCoordinates>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<Location>;
  LocationResult: ResolverTypeWrapper<LocationResult>;
  News: ResolverTypeWrapper<News>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Temperature: ResolverTypeWrapper<Temperature>;
  Weather: ResolverTypeWrapper<Weather>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Crypto: Crypto;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  GeoCoordinates: GeoCoordinates;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Location: Location;
  LocationResult: LocationResult;
  News: News;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Temperature: Temperature;
  Weather: Weather;
};

export type CryptoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Crypto'] = ResolversParentTypes['Crypto']> = {
  change24h: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  symbol: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GeoCoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoCoordinates'] = ResolversParentTypes['GeoCoordinates']> = {
  lat: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  city: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LocationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationResult'] = ResolversParentTypes['LocationResult']> = {
  city: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinates: Resolver<ResolversTypes['GeoCoordinates'], ParentType, ContextType>;
  country: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type NewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['News'] = ResolversParentTypes['News']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  source: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCryptos: Resolver<Array<Maybe<ResolversTypes['Crypto']>>, ParentType, ContextType, QueryGetCryptosArgs>;
  getNews: Resolver<Array<Maybe<ResolversTypes['News']>>, ParentType, ContextType, QueryGetNewsArgs>;
  getWeather: Resolver<Maybe<ResolversTypes['Weather']>, ParentType, ContextType, QueryGetWeatherArgs>;
  searchLocations: Resolver<Array<Maybe<ResolversTypes['LocationResult']>>, ParentType, ContextType, RequireFields<QuerySearchLocationsArgs, 'query'>>;
};

export type TemperatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Temperature'] = ResolversParentTypes['Temperature']> = {
  celsius: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fahrenheit: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type WeatherResolvers<ContextType = any, ParentType extends ResolversParentTypes['Weather'] = ResolversParentTypes['Weather']> = {
  condition: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  temperature: Resolver<ResolversTypes['Temperature'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Crypto: CryptoResolvers<ContextType>;
  DateTime: GraphQLScalarType;
  GeoCoordinates: GeoCoordinatesResolvers<ContextType>;
  Location: LocationResolvers<ContextType>;
  LocationResult: LocationResultResolvers<ContextType>;
  News: NewsResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Temperature: TemperatureResolvers<ContextType>;
  Weather: WeatherResolvers<ContextType>;
};

