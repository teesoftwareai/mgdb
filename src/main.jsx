import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import sweetalert2 from 'sweetalert2'

sweetalert2.fire({
  title: 'Welcome to mgdb',
  text: 'System initialized successfully',
  icon: 'success'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)