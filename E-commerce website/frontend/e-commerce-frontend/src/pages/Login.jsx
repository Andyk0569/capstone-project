import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Mock authentication: store user in localStorage
    const user = { email }
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/')
  }

  return (
    <div className="card p-4 mx-auto" style={{maxWidth: 480}}>
      <h3 className="mb-3">Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}
