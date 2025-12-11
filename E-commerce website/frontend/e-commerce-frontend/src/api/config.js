const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const apiCall = async (endpoint, method = 'GET', body = null, includeToken = false) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (includeToken) {
    const token = localStorage.getItem('token')
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }

  return data
}
