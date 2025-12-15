import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Electronics", "Fashion", "Books", "Accessories"];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12; // products per page

  // FETCH PRODUCTS WITH PAGINATION
  const fetchProducts = async (category, page = 0) => {
    setLoading(true);
    try {
      const url =
        category === "All"
          ? `http://localhost:8080/api/products?page=${page}&size=${pageSize}`
          : `http://localhost:8080/api/products/category/${category}?page=${page}&size=${pageSize}`;

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.content); // current page items
      setTotalPages(data.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory, 0); // reset to page 0 when category changes
  }, [selectedCategory]);

  // ADD TO CART HANDLER
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.productId,
          productName: product.name,
          imageUrl: product.imageUrl,
          category: product.category,
          price: product.price,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      // Trigger custom event to update cart badge
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Added to cart 🛒");
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    }
  };

  // PAGINATION HANDLERS
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      fetchProducts(selectedCategory, currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 < totalPages) {
      fetchProducts(selectedCategory, currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    fetchProducts(selectedCategory, page);
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
            <>
              <div className="row g-4">
                {products.length === 0 ? (
                  <p className="text-muted">No products available</p>
                ) : (
                  products.map((product) => (
                    <div className="col-md-4" key={product.productId}>
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`btn mx-1 ${
                        i === currentPage
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handlePageClick(i)}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    className="btn btn-outline-primary ms-2"
                    onClick={handleNextPage}
                    disabled={currentPage + 1 >= totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
