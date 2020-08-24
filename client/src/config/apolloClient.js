import {ApolloClient, InMemoryCache, gql, makeVar, HttpLink, split} from '@apollo/client'
import {WebSocketLink} from '@apollo/client/link/ws'
import {getMainDefinition} from '@apollo/client/utilities'

export const counterReactive = makeVar(100)

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  // uri: 'http://localhost:4000',
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          counter: {
            read() {
              return counterReactive()
            }
          }
        }
      }
    }
  })
})

export const GET_USER = gql`
  query {
    localUsers {
      name
      age
      gender
    }
  }
`

client.writeQuery({
  query: GET_USER,
  data: {
    localUsers: [
      {
        name: 'Kosasih',
        age: 15,
        gender: 'male'
      }
    ]
  }
})

export default client
