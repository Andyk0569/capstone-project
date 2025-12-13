import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userJson = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user = userJson ? JSON.parse(userJson) : null;

  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Fetch cart count initially
  const fetchCartCount = () => {
    if (token) {
      fetch('http://localhost:8080/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setCartCount(data.length))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Listen for custom cart update event
    window.addEventListener('cartUpdated', fetchCartCount);
    return () => window.removeEventListener('cartUpdated', fetchCartCount);
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ background: "#0f172a" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" style={{ fontSize: "1.6rem" }} to="/">
          <span style={{ background: "linear-gradient(90deg,#38bdf8,#6366f1)", WebkitBackgroundClip: "text", color: "transparent" }}>
            UniCommerce
          </span>
        </Link>

        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
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

          <div className="d-flex align-items-center gap-2">
            <input
              className="form-control form-control-sm me-2"
              style={{ maxWidth: "180px", borderRadius: "30px" }}
              type="search"
              placeholder="Search..."
            />

            {token && (
              <Link to="/cart" className="btn btn-outline-light btn-sm position-relative me-2">
                🛒
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {token && user ? (
              <>
                <Link to="/profile" className="btn btn-outline-light btn-sm me-2">
                  {user.firstName || 'Profile'}
                </Link>
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
