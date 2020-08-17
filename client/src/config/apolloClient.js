import {ApolloClient, InMemoryCache, gql, makeVar} from '@apollo/client'

export const counterReactive = makeVar(100)

const client = new ApolloClient({
  uri: 'http://localhost:4000',
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
