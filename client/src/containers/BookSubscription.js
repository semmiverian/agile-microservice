import React, {useState, useEffect} from 'react'
import {useMutation, useSubscription, useQuery, gql} from '@apollo/client'

const BOOK_SUBSCRIPTION = gql`
  subscription OnBookAdded {
    newBook {
      id
      title
      author
    }
  }
`

const ADD_BOOK = gql`
  mutation AddBook($id: ID, $title: String, $author: String) {
    addBook(id: $id, title: $title, author: $author) {
      id
    }
  }
`

const FETCH_BOOK = gql`
  query FetchBook {
    books {
      id
      title
      author
    }
  }
`

export default function BookSubscription() {
  const {data, subscribeToMore} = useQuery(FETCH_BOOK)
  const {data: subscription} = useSubscription(BOOK_SUBSCRIPTION)
  const [addBook, test] = useMutation(ADD_BOOK)

  useEffect(() => {
    subscribeToMore({
      document: BOOK_SUBSCRIPTION,
      updateQuery(prev, {subscriptionData}) {
        if (!subscriptionData.data) {
          return prev
        }

        const newBook = subscriptionData.data.newBook
        console.log(prev)

        return {
          ...prev,
          books: [...prev.books, newBook]
        }
      }
    })
  }, [])

  function createNewBook(e) {
    e.preventDefault()
    addBook({
      variables: {
        id: 121,
        title: 'Atomic Habit',
        author: 'James Clear'
      }
    })
  }

  return (
    <div className="w-full shadow bg-white p-5">
      <button className="px-4 py-2 text-center bg-indigo-600 rounded shadow text-white mb-2" onClick={createNewBook}>
        Add Book
      </button>
      <div className="divide-y space-y-3 divide-gray-300">
        {data?.books &&
          data.books.map((book, index) => (
            <div className="flex py-2" key={index}>
              <h3 className="text-gray-900 leading-7">{book.title}</h3>
            </div>
          ))}
      </div>
    </div>
  )
}
