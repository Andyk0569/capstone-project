import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // Mock signup: store user in localStorage
    const user = { firstName, lastName, email }
    localStorage.setItem('user', JSON.stringify(user))
    navigate('/')
  }

  return (
    <div className="card p-4 mx-auto" style={{maxWidth: 540}}>
      <h3 className="mb-3">Create account</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First name</label>
            <input className="form-control" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Last name</label>
            <input className="form-control" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}
