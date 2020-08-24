const {ApolloServer, gql, PubSub} = require('apollo-server')
const axios = require('axios')

const pubsub = new PubSub()

const BOOKS_SUBSCRIPTION = 'BOOK_SUBSCRIPTION'

const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
]

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: String
  }

  type User {
    _id: ID
    name: String
    age: Int
    gender: String
  }

  type Query {
    book(id: ID): Book
    books: [Book]
    message: String
    users: [User]
    user(id: ID): User
  }

  type Response {
    status: String
    message: String
  }

  type Mutation {
    addUser(name: String, age: Int, gender: String): User
    addBook(id: ID, title: String, author: String): Book
  }

  type Subscription {
    newBook: Book
  }
`

const resolvers = {
  Query: {
    book: function (parent, args) {
      console.log('ininini')
      console.log(args)
      return books.find((book) => book.id === Number(args.id))
    },
    message: function () {
      return 'Hello Graph Ql'
    },
    books() {
      return books
    },
    async users() {
      const {data} = await axios.get('http://localhost:3001/users')

      return data
    },
    async user(parent, args) {
      const {data} = await axios.get(`http://localhost:3001/users/${args.id}`)

      return data
    }
  },
  Mutation: {
    async addUser(parent, args) {
      console.log(args)
      const {data} = await axios.post('http://localhost:3001/users', args)

      return data
    },

    addBook(parent, args) {
      books.push(args)
      pubsub.publish(BOOKS_SUBSCRIPTION, {newBook: args})

      return args
    }
  },
  Subscription: {
    newBook: {
      subscribe() {
        return pubsub.asyncIterator([BOOKS_SUBSCRIPTION])
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url, subscriptionsUrl}) => {
  console.log('Server Apollo siap digunakan pada url', url)
  console.log('Subscription Apollo siap digunakan pada url', subscriptionsUrl)
})
