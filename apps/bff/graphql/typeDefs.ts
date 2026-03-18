export const typeDefs = `#graphql

type Crypto {
  id: ID!
  symbol: String!
  name: String!
  price: Float!
  change24h: Float
  lastUpdated: String
}


type News {
  id: ID!
  title: String!
  summary: String
  url: String!
  source: String!
  publishedAt: String
}


type Weather {
  temp: Float!
  condition: String!
  city: String!
}

type Query {
  getTopCryptos(limit: Int): [Crypto!]!
  getLatestNews(category: String): [News!]!
  getWeather(city: String!): Weather
}
`;