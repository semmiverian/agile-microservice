import React from 'react'
import {useParams} from 'react-router-dom'
import {gql, useQuery} from '@apollo/client'

const GET_USER = gql`
  query GetUser($id: ID) {
    user(id: $id) {
      _id
      name
      gender
      age
    }
  }
`

export default function Detail(props) {
  const params = useParams()
  const {loading, error, data} = useQuery(GET_USER, {
    variables: {
      id: params.id
    }
  })

  console.log(data, error, loading)
  return (
    <div className="w-full shadow bg-white p-5">
      {loading && <h1 className="text-gray-900 text-3xl font-semibold">Sedang mengambil data</h1>}

      {data && (
        <>
          <h1 className="text-gray-900 text-3xl font-semibold">Detail user</h1>
          <div>
            <h4 className="text-gray-900 text-lg">{data.user.name}</h4>
            <div className="flex space-x-4">
              <h4 className="text-gray-500 text-base">Age: {data.user.age}</h4>
              <h4 className="text-gray-500 text-base">Gender: {data.user.gender || 'Questionable'}</h4>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
