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

export type CoinDetails = {
  __typename?: 'CoinDetails';
  currentPrice: Money;
  description?: Maybe<Scalars['String']['output']>;
  history: Array<HistoryPoint>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  marketCap?: Maybe<Money>;
  name: Scalars['String']['output'];
  performance: CoinPerformanceMetrics;
  symbol: Scalars['String']['output'];
  volume24h?: Maybe<Money>;
};


export type CoinDetailsHistoryArgs = {
  period: HistoryPeriod;
};

export type CoinPerformanceMetrics = {
  __typename?: 'CoinPerformanceMetrics';
  allTimeHigh?: Maybe<Scalars['Float']['output']>;
  athDate?: Maybe<Scalars['String']['output']>;
  changeAbs: Scalars['Float']['output'];
  changePercent: Scalars['Float']['output'];
  fiftyTwoWeekHigh?: Maybe<Scalars['Float']['output']>;
  fiftyTwoWeekLow?: Maybe<Scalars['Float']['output']>;
  isPositive: Scalars['Boolean']['output'];
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

export enum HistoryPeriod {
  All = 'ALL',
  OneDay = 'ONE_DAY',
  OneMonth = 'ONE_MONTH',
  OneYear = 'ONE_YEAR',
  SevenDays = 'SEVEN_DAYS'
}

export type HistoryPoint = {
  __typename?: 'HistoryPoint';
  price: Scalars['Float']['output'];
  timestamp: Scalars['Float']['output'];
  volume?: Maybe<Scalars['Float']['output']>;
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
  state?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Float']['output'];
  currency: Scalars['String']['output'];
  formatted: Scalars['String']['output'];
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
  coin?: Maybe<CoinDetails>;
  getCryptos: Array<Maybe<Crypto>>;
  getNews: Array<Maybe<News>>;
  getTrendingCoins: Array<Maybe<CoinDetails>>;
  getWeather?: Maybe<Weather>;
  searchLocations: Array<Maybe<LocationResult>>;
};


export type QueryCoinArgs = {
  symbol: Scalars['String']['input'];
};


export type QueryGetCryptosArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetNewsArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetWeatherArgs = {
  query: Scalars['String']['input'];
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
  CoinDetails: ResolverTypeWrapper<CoinDetails>;
  CoinPerformanceMetrics: ResolverTypeWrapper<CoinPerformanceMetrics>;
  Crypto: ResolverTypeWrapper<Crypto>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  GeoCoordinates: ResolverTypeWrapper<GeoCoordinates>;
  HistoryPeriod: HistoryPeriod;
  HistoryPoint: ResolverTypeWrapper<HistoryPoint>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Location: ResolverTypeWrapper<Location>;
  LocationResult: ResolverTypeWrapper<LocationResult>;
  Money: ResolverTypeWrapper<Money>;
  News: ResolverTypeWrapper<News>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Temperature: ResolverTypeWrapper<Temperature>;
  Weather: ResolverTypeWrapper<Weather>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CoinDetails: CoinDetails;
  CoinPerformanceMetrics: CoinPerformanceMetrics;
  Crypto: Crypto;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  GeoCoordinates: GeoCoordinates;
  HistoryPoint: HistoryPoint;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Location: Location;
  LocationResult: LocationResult;
  Money: Money;
  News: News;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  Temperature: Temperature;
  Weather: Weather;
};

export type CoinDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CoinDetails'] = ResolversParentTypes['CoinDetails']> = {
  currentPrice?: Resolver<ResolversTypes['Money'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  history?: Resolver<Array<ResolversTypes['HistoryPoint']>, ParentType, ContextType, RequireFields<CoinDetailsHistoryArgs, 'period'>>;
  iconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  marketCap?: Resolver<Maybe<ResolversTypes['Money']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  performance?: Resolver<ResolversTypes['CoinPerformanceMetrics'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volume24h?: Resolver<Maybe<ResolversTypes['Money']>, ParentType, ContextType>;
};

export type CoinPerformanceMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CoinPerformanceMetrics'] = ResolversParentTypes['CoinPerformanceMetrics']> = {
  allTimeHigh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  athDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  changeAbs?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  changePercent?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fiftyTwoWeekHigh?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  fiftyTwoWeekLow?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  isPositive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type CryptoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Crypto'] = ResolversParentTypes['Crypto']> = {
  change24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GeoCoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeoCoordinates'] = ResolversParentTypes['GeoCoordinates']> = {
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
};

export type HistoryPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['HistoryPoint'] = ResolversParentTypes['HistoryPoint']> = {
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type LocationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationResult'] = ResolversParentTypes['LocationResult']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinates?: Resolver<ResolversTypes['GeoCoordinates'], ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MoneyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Money'] = ResolversParentTypes['Money']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  formatted?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type NewsResolvers<ContextType = any, ParentType extends ResolversParentTypes['News'] = ResolversParentTypes['News']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publishedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  coin?: Resolver<Maybe<ResolversTypes['CoinDetails']>, ParentType, ContextType, RequireFields<QueryCoinArgs, 'symbol'>>;
  getCryptos?: Resolver<Array<Maybe<ResolversTypes['Crypto']>>, ParentType, ContextType, Partial<QueryGetCryptosArgs>>;
  getNews?: Resolver<Array<Maybe<ResolversTypes['News']>>, ParentType, ContextType, Partial<QueryGetNewsArgs>>;
  getTrendingCoins?: Resolver<Array<Maybe<ResolversTypes['CoinDetails']>>, ParentType, ContextType>;
  getWeather?: Resolver<Maybe<ResolversTypes['Weather']>, ParentType, ContextType, RequireFields<QueryGetWeatherArgs, 'query'>>;
  searchLocations?: Resolver<Array<Maybe<ResolversTypes['LocationResult']>>, ParentType, ContextType, RequireFields<QuerySearchLocationsArgs, 'query'>>;
};

export type TemperatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Temperature'] = ResolversParentTypes['Temperature']> = {
  celsius?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fahrenheit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type WeatherResolvers<ContextType = any, ParentType extends ResolversParentTypes['Weather'] = ResolversParentTypes['Weather']> = {
  condition?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['Location'], ParentType, ContextType>;
  temperature?: Resolver<ResolversTypes['Temperature'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CoinDetails?: CoinDetailsResolvers<ContextType>;
  CoinPerformanceMetrics?: CoinPerformanceMetricsResolvers<ContextType>;
  Crypto?: CryptoResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GeoCoordinates?: GeoCoordinatesResolvers<ContextType>;
  HistoryPoint?: HistoryPointResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LocationResult?: LocationResultResolvers<ContextType>;
  Money?: MoneyResolvers<ContextType>;
  News?: NewsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Temperature?: TemperatureResolvers<ContextType>;
  Weather?: WeatherResolvers<ContextType>;
};

