import { gql } from '@apollo/client'

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int!) {
    locations(page: $page) {
      info {
        count,
        pages,
        next,
        prev
      }
      results {
        id,
        name,
        type,
        dimension
      }
    }
  }
`

export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      name,
      type,
      dimension,
      residents {
        id, 
        name,
        status,
        species,
        type,
        image
      }
    }
  }
`

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
      }
      results {
        id,
        name,
        status,
        image
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }
`

export const GET_CHARACTER = gql`
  query GetCharacters($id: ID!) {
    character(id: $id) {
      id,
      name,
      status,
      species,
      type,
      gender,
      origin {
        id,
        name,
        type,
        dimension
      },
      location {
        id,
        name,
        type,
        dimension
      },
      image
    }
  }
`