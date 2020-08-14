import React from 'react'
import {Link} from 'react-router-dom'

export default function Card({user}) {
  return (
    <div className="mt-4 border-b border-gray-500 pb-1">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-gray-900 text-lg">{user.name}</h4>
          <div className="flex space-x-4">
            <h4 className="text-gray-500 text-base">Age: {user.age}</h4>
            <h4 className="text-gray-500 text-base">Gender: {user.gender || 'Questionable'}</h4>
          </div>
        </div>
        <Link to={`/${user._id}`}>
          <button className="px-4 py-1 bg-indigo-600 rounded text-white">See Details</button>
        </Link>
      </div>
    </div>
  )
}
