import React, { useState, useEffect } from 'react'
import { getCollection } from './db'
import sweetalert2 from 'sweetalert2'

const UsersTable = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try {
      const collection = await getCollection('users')
      const result = await collection.find({}).sort({ createdAt: -1 }).toArray()
      setUsers(result)
    } catch (error) {
      console.error('Error fetching users:', error)
      sweetalert2.fire({
        title: 'Error!',
        text: 'Failed to load users',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const result = await import('sweetalert2')
    const { default: sw } = result
    const confirm = await sw.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (confirm.isConfirmed) {
      try {
        const collection = await getCollection('users')
        await collection.deleteOne({ _id: id })
        init()
        sw.fire('Deleted!', 'User has been deleted.', 'success')
      } catch (error) {
        console.error('Error deleting user:', error)
        sw.fire('Error!', 'Failed to delete user', 'error')
      }
    }
  }

  if (loading) return (
    <div className="p-8 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mt-4" />
      <span className="block mt-2">Loading...</span>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="border p-2 px-4 py-2 text-left text-gray-600 text-sm font-medium">ID</th>
              <th className="border p-2 px-4 py-2 text-left text-gray-600 text-sm font-medium">Name</th>
              <th className="border p-2 px-4 py-2 text-left text-gray-600 text-sm font-medium">Email</th>
              <th className="border p-2 px-4 py-2 text-left text-gray-600 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="border p-2 text-sm text-gray-600">
                  {user._id.toString().slice(0, 8)}...
                </td>
                <td className="border p-2 text-sm text-gray-800 font-medium">{user.name || 'N/A'}</td>
                <td className="border p-2 text-sm text-gray-600">{user.email || 'N/A'}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:underline text-sm mr-2"
                    aria-label="Delete user"
                  >
                    Delete
                  </button>
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    aria-label="View details"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersTable