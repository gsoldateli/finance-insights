import { graphql } from "@/src/gql";

export const GET_WEATHER_QUERY = graphql(`
  query GetWeather($ip: String) {
    getWeather(ip: $ip) {
      temperature {
        celsius
        fahrenheit
      }
      condition
      location {
        city
        state
        country
      }
    }
  }
`);
