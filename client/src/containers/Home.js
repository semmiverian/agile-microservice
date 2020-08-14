import React from 'react'
import {gql, useQuery} from '@apollo/client'
import Card from './../components/Card'

const FETCH_USER = gql`
  query FetchUser {
    users {
      _id
      name
      gender
      age
    }
  }
`

export default function Home() {
  const {loading, error, data} = useQuery(FETCH_USER)

  return (
    <div className="w-full shadow bg-white p-5">
      {loading && <h1 className="text-gray-900 text-3xl font-semibold">Sedang mengambil data</h1>}

      {error && <h1 className="text-gray-900 text-3xl font-semibold">Ada error di rumahku</h1>}

      {data && (
        <>
          <h2 className="font-semibold text-xl leading-7">List of Users</h2>
          {data.users.map((user) => (
            <Card key={user._id} user={user} />
          ))}
        </>
      )}
    </div>
  )
}
