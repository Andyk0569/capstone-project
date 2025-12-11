export default function Dashboard() {
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  const user = userJson ? JSON.parse(userJson) : null
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  if (!token || !user) {
    return (
      <div className="alert alert-warning">
        You are not authenticated. Please <a href="/login">login</a> or <a href="/signup">sign up</a>.
      </div>
    )
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Welcome to your Dashboard</h2>
              
              <div className="alert alert-success">
                ✅ Authentication successful!
              </div>

              <div className="mb-4">
                <h5>User Info</h5>
                <p><strong>Email:</strong> {user.email}</p>
                {user.firstName && (
                  <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                )}
              </div>

              <div className="mb-4">
                <h5>Active Session</h5>
                <p className="text-muted">You are logged in with a valid JWT token.</p>
              </div>

              <div className="d-grid">
                <button className="btn btn-lg btn-primary" disabled>🎉 Dashboard Placeholder</button>
              </div>
              
              <p className="text-center text-muted mt-3 small">
                More features coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
