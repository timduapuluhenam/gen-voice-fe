import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

const httpLink = new HttpLink({
  uri: 'https://artistic-mosquito-84.hasura.app/v1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'uDP7gFWKAcViR0tGPXS2R5SdKS0vbkKuhcrhNMTE5SfGJJM4pIIuSVQ8nHjQ1W6Q'
  }
})

const wsLink = new WebSocketLink({
  uri: 'wss://artistic-mosquito-84.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    timeout: 10000,
    lazy: true,
    connectionParams: {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'uDP7gFWKAcViR0tGPXS2R5SdKS0vbkKuhcrhNMTE5SfGJJM4pIIuSVQ8nHjQ1W6Q'
      }
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

export default client
