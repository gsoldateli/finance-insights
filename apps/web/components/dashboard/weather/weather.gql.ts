import { graphql } from "@/src/gql";

export const GET_WEATHER_QUERY = graphql(`
  query GetWeather($ip: String) {
    getWeather(ip: $ip) {
      temp
      condition
      location {
        city
        state
        country
      }
    }
  }
`);
