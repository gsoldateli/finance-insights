import { graphql } from "@/src/gql";

export const GET_WEATHER_QUERY = graphql(`
  query GetWeather($query: String!) {
    getWeather(query: $query) {
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

export const SEARCH_LOCATIONS_QUERY = graphql(`
  query SearchLocations($query: String!) {
    searchLocations(query: $query) {
      id
      name
      city
      state
      country
      coordinates {
        lat
        lng
      }
    }
  }
`);