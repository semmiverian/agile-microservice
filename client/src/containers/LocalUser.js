import React from 'react'
import {gql, useQuery} from '@apollo/client'
import Card from '../components/Card'
import client, {GET_USER, counterReactive} from './../config/apolloClient'

const LOCAL_COUNTER = gql`
  query {
    counter @client
  }
`

export default function Home() {
  const {loading, error, data} = useQuery(GET_USER)

  const {
    data: {counter}
  } = useQuery(LOCAL_COUNTER)

  function addUser() {
    console.log('add user ditekan')

    // Read data yang ada di dalam cache nya
    const {localUsers} = client.readQuery({
      query: GET_USER
    })

    // Write datanya
    client.writeQuery({
      query: GET_USER,
      data: {
        localUsers: [
          ...localUsers,
          {
            name: 'Julio',
            age: 20,
            gender: 'Male'
          }
        ]
      }
    })
  }

  function decrementCounter() {
    counterReactive(counter - 1)
  }

  function incrementCounter() {
    counterReactive(counter + 1)
  }

  return (
    <div className="w-full shadow bg-white p-5">
      <div className="flex justify-between">
        <button className="text-indigo-600" onClick={decrementCounter}>
          Decrement
        </button>
        <h2 className="font-semibold text-xl text-gray-900">{counter}</h2>
        <button className="text-indigo-600" onClick={incrementCounter}>
          Increment
        </button>
      </div>
      {/* {loading && <h1 className="text-gray-900 text-3xl font-semibold">Sedang mengambil data</h1>}

      {error && <h1 className="text-gray-900 text-3xl font-semibold">Ada error di rumahku</h1>}

      {data && (
        <>
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-xl leading-7">List of Local Users</h2>

            <button className="text-indigo-600" onClick={addUser}>
              Add User
            </button>
          </div>
          {data.localUsers.map((user) => (
            <Card key={user._id} user={user} />
          ))}
        </>
      )} */}
    </div>
  )
}
