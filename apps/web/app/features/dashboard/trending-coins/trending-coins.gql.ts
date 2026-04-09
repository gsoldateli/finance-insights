import { graphql } from "@/src/gql";

export const GET_TRENDING_COINS_QUERY = graphql(`
  query GetTrendingCoins {
  getTrendingCoins {
    id
    symbol
    name
    iconUrl
    currentPrice {
      amount
      currency
    }
    performance {
      changePercent
    }
  }
}
`);
