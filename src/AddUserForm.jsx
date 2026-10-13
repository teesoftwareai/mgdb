import React, { useState } from 'react'
import { getCollection } from './db'
import sweetalert2 from 'sweetalert2'

const AddUserForm = ({ onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      sweetalert2.fire({
        title: 'Validation Error!',
        text: 'Please fill in all fields',
        icon: 'error'
      })
      return
    }

    setSaving(true)

    try {
      const collection = await getCollection('users')
      await collection.insertOne({
        name,
        email,
        createdAt: new Date()
      })

      sweetalert2.fire({
        title: 'Success!',
        text: 'User has been added successfully',
        icon: 'success'
      })

      setName('')
      setEmail('')
      if (onClose) onClose()
    } catch (error) {
      console.error('Error adding user:', error)
      sweetalert2.fire({
        title: 'Error!',
        text: 'Failed to add user. Please try again.',
        icon: 'error'
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter user name"
            required
            aria-label="User name"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="enter@example.com"
            required
            aria-label="Email address"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors ${
            saving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-disabled={saving}
        >
          {saving ? 'Saving...' : 'Save User'}
        </button>
      </form>
      <button
        type="button"
        onClick={onClose}
        className="mt-4 text-gray-600 hover underline text-sm"
        aria-label="Close form"
      >
        Cancel
      </button>
    </div>
  )
}

export default AddUserForm