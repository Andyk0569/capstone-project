import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Books",
  "Accessories",
];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const url =
        category === "All"
          ? "http://localhost:8080/api/products"
          : `http://localhost:8080/api/products/category/${category}`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // TEMP ADD TO CART HANDLER
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    alert(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="container py-5">
      <div className="row">

        {/* CATEGORY LIST */}
        <div className="col-md-3 mb-4">
          <h5 className="fw-bold mb-3">Categories</h5>

          <ul className="list-group rounded-4 shadow-sm">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`list-group-item ${
                  selectedCategory === cat ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCTS */}
        <div className="col-md-9">
          <h4 className="fw-bold mb-4">
            {selectedCategory === "All"
              ? "All Products"
              : `${selectedCategory} Products`}
          </h4>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : (
            <div className="row g-4">
              {products.length === 0 ? (
                <p className="text-muted">No products available</p>
              ) : (
                products.map((product) => (
                  <div className="col-md-4" key={product.name}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
