import React from 'react'
import {Link, useLocation} from 'react-router-dom'

function Navigation() {
  const {pathname} = useLocation()

  return (
    <nav className="w-full bg-white flex justify-between px-6 py-3 mb-4 items-center border-b border-gray-300">
      <Link to="/">
        <h2 className="text-xl text-gray-900 tracking-wide leading-3">Hacktiv People</h2>
      </Link>

      <div className="cursor-pointer flex">
        <Link to="/">
          <div className="relative mr-5">
            <span className={` ${pathname === '/' ? 'text-gray-900 ' : 'text-gray-500'} hover:text-gray-900`}>
              Home
            </span>
            {pathname === '/' && (
              <div className="border border-red-300 absolute inset-x-0" style={{bottom: '-0.8rem'}}></div>
            )}
          </div>
        </Link>

        <Link to="/add">
          <div className="relative mr-5">
            <span className={` ${pathname === '/add' ? 'text-gray-900 ' : 'text-gray-500'} hover:text-gray-900`}>
              Add
            </span>
            {pathname === '/add' && (
              <div className="border border-red-300 absolute inset-x-0" style={{bottom: '-0.8rem'}}></div>
            )}
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
