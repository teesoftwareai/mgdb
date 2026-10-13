import React, { useState } from 'react'
import UsersTable from './UsersTable'
import AddUserForm from './AddUserForm'
import { useState as useUseState } from 'react'

export default function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          mgdb CRUD System
        </h1>

        {/* Add new user */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            aria-label="Add new user"
          >
            Add New User
          </button>
        </div>

        {showForm && (
          <AddUserForm onClose={() => setShowForm(false)} />
        )}

        {/* Show user list */}
        <UsersTable />
      </div>
    </div>
  )
}