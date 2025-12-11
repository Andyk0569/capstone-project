import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ background: "#0f172a" }}>
      <div className="container">

        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold text-white" style={{ fontSize: "1.6rem" }} to="/">
          <span style={{ background: "linear-gradient(90deg,#38bdf8,#6366f1)", WebkitBackgroundClip: "text", color: "transparent" }}>
            UniCommerce
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Content */}
        <div className="collapse navbar-collapse" id="navContent">

          {/* Left Nav Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {["/", "/shop", "/about", "/contact"].map((path, i) => {
              const names = ["Home", "Shop", "About", "Contact"];
              return (
                <li className="nav-item" key={i}>
                  <Link
                    className={`nav-link text-white mx-2 ${location.pathname === path ? 'fw-bold border-bottom border-primary' : ''}`}
                    to={path}
                    style={{ transition: "0.3s" }}
                  >
                    {names[i]}
                  </Link>
                </li>
              );
            })}

          </ul>

          {/* Right Side Icons */}
          <div className="d-flex align-items-center gap-2">

            {/* Search Bar */}
            <input
              className="form-control form-control-sm me-2"
              style={{ maxWidth: "180px", borderRadius: "30px" }}
              type="search"
              placeholder="Search..."
            />

            {token && user ? (
              <>
                <Link to="/dashboard" className="btn btn-sm btn-info text-white me-2">Dashboard</Link>
                <Link to="/profile" className="btn btn-outline-light btn-sm me-2">Profile</Link>
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm me-2">Login</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
              </>
            )}
          </div>

        </div>

      </div>

    </nav>
  );
}

