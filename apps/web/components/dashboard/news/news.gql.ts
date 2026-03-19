import { graphql } from "@/src/gql";

export const GET_NEWS_QUERY = graphql(`
  query GetNews {
    getNews {
      id
      title
      summary
      url
      publishedAt
      source
      imageUrl
    }
  }
`);
