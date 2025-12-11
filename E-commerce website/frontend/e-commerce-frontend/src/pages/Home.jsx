import { Link } from 'react-router-dom';

export default function Home() {

  const heroStyle = {
    background: "linear-gradient(120deg, #0f172a, #1e293b, #334155)",
    minHeight: "80vh",
    color: "white",
    paddingTop: "4rem"
  };

  const cardHover = {
    transition: "transform .3s, box-shadow .3s",
  };

  return (
    <>
      {/* HERO SECTION */}
      <section style={heroStyle} className="d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Section */}
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold lh-sm">
                Discover the Next-Gen Marketplace
              </h1>
              <p className="lead text-light opacity-75 mt-3">
                Unique picks. Exclusive drops. Curated by experts. Designed for shoppers with taste.
              </p>

              <div className="d-flex gap-3 mt-4">
                <Link to="/shop" className="btn btn-primary btn-lg px-4 shadow-lg">Start Shopping</Link>
                <Link to="/about" className="btn btn-outline-light btn-lg px-4">Learn More</Link>
              </div>

              <div className="mt-4">
                <span className="badge bg-light text-dark me-2">✔ Free Shipping</span>
                <span className="badge bg-light text-dark me-2">✔ 30-Day Returns</span>
                <span className="badge bg-light text-dark">✔ Secure Checkout</span>
              </div>

            </div>

            {/* Right Section – Featured Card */}
            <div className="col-lg-6">
              <div className="card border-0 shadow-lg p-3 rounded-4"
                style={{ background: "#ffffff10", backdropFilter: "blur(10px)" }}>
                <h5 className="text-white">Featured Drop</h5>
                <p className="text-light opacity-75">Limited edition arrivals — crafted for you.</p>
                <div className="ratio ratio-16x9 bg-light rounded-3"></div>

                <div className="mt-3 d-flex gap-2">
                  <Link to="/shop" className="btn btn-primary btn-sm">Shop Now</Link>
                  <button className="btn btn-outline-light btn-sm">Preview</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* POPULAR PICKS */}
      <section className="py-5">
        <div className="container">
          <h3 className="fw-bold mb-4">Popular Picks</h3>

          <div className="row g-4">
            {[1, 2, 3].map((i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="card h-100 shadow-sm rounded-4"
                  style={cardHover}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-10px)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)" }}
                >
                  <div className="ratio ratio-4x3 bg-light rounded-top"></div>
                  <div className="card-body">
                    <h5 className="fw-bold">Premium Item {i}</h5>
                    <p className="text-muted">Exclusive handpicked product with top ratings.</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold text-primary">$39</span>
                      <button className="btn btn-outline-primary btn-sm">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* WHY US */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h4 className="fw-bold">Why Shop with UniCommerce?</h4>

          <div className="row mt-4">
            {[
              { icon: "⚡", title: "Fast Delivery", desc: "Quick shipping on all orders" },
              { icon: "🔒", title: "Secure Checkout", desc: "Your payments are always safe" },
              { icon: "⭐", title: "Premium Quality", desc: "Top-rated items curated for you" },
            ].map((f, i) => (
              <div className="col-md-4" key={i}>
                <div className="display-5">{f.icon}</div>
                <h6 className="fw-bold mt-2">{f.title}</h6>
                <p className="text-muted">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
