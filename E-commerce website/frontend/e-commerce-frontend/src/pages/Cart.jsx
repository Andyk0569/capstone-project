import { useEffect, useState } from "react";
import CartItemCard from "../components/CartItemCard";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();

    // Listen for updates (when user adds new product to cart)
    const handler = () => fetchCartItems();
    window.addEventListener("cartUpdated", handler);

    return () => window.removeEventListener("cartUpdated", handler);
  }, []);

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">My Cart</h3>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-muted">Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <CartItemCard key={item.productId} item={item} />
        ))
      )}
    </div>
  );
}
