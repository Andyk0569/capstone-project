import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiCall } from '../api/config'

export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await apiCall('/api/users/signup', 'POST', { firstName, lastName, email, password })
      localStorage.setItem('user', JSON.stringify({ email, firstName, lastName }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card p-4 mx-auto" style={{maxWidth: 540}}>
      <h3 className="mb-3">Create account</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First name</label>
            <input className="form-control" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required disabled={loading} />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last name</label>
            <input className="form-control" value={lastName} onChange={(e)=>setLastName(e.target.value)} required disabled={loading} />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required disabled={loading} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required disabled={loading} />
        </div>
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>
      </form>
    </div>
  )
}
