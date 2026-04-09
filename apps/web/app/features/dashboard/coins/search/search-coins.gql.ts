import { graphql } from "@/src/gql";

export const SEARCH_COINS_QUERY = graphql(`
  query SearchCoins($query: String!) {
    searchCoins(query: $query) {
      id
      name
      symbol
      iconUrl
    }
  }
`);
