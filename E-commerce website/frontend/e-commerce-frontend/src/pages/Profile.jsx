export default function Profile() {
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const user = userJson ? JSON.parse(userJson) : null

  if (!user) {
    return (
      <div className="alert alert-warning">You are not logged in. Please <a href="/login">login</a>.</div>
    )
  }

  return (
    <div className="card p-4 mx-auto" style={{maxWidth: 720}}>
      <h3 className="mb-3">Profile</h3>
      <p><strong>Email:</strong> {user.email}</p>
      {user.firstName && <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>}
      <p><em>This is a demo profile view (client-side only).</em></p>
    </div>
  )
}
