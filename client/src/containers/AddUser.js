import React, {useState} from 'react'
import {gql, useMutation} from '@apollo/client'

const ADD_USER = gql`
  mutation AddUser($name: String, $age: Int, $gender: String) {
    addUser(name: $name, age: $age, gender: $gender) {
      _id
      name
      age
      gender
    }
  }
`

export default function AddUser() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

  const [addUser, result] = useMutation(ADD_USER)
  console.log(result)

  function onSubmit(e) {
    e.preventDefault()
    // Ketika form di submit maka mutation akan dijalankan.

    addUser({
      variables: {
        name: name,
        age: Number(age),
        gender: gender
      }
    })
  }

  return (
    <div className="bg-white w-full shadow-lg rounded-lg px-4 pt-6 pb-8 mb-4">
      <div className="flex justify-between items-center">
        <p className="text-left text-xl text-gray-900 mb-4">Add new User</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User name</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="User Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User age</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="User Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">User gender</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="User gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <button type="submit" className="mt-2 p-2 text-red-600 rounded shadow-lg w-full bg-red-200 text-center">
          Add new User
        </button>
      </form>
    </div>
  )
}
