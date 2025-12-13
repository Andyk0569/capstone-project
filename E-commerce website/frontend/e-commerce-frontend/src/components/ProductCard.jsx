export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card h-100 shadow-sm rounded-4">
      
      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="card-img-top rounded-top"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="fw-bold">{product.name}</h6>

        <span className="badge bg-secondary mb-2">
          {product.category}
        </span>

        <p className="text-muted small flex-grow-1">
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold text-primary">
            ₹{product.price}
          </span>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
