import { useEffect, useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(await res.json());
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/orders/place", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Checkout failed");

      alert("Order placed successfully!");
      window.dispatchEvent(new Event("cartUpdated"));
      window.location.href = "/orders";
    } catch (err) {
        console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Checkout</h3>

      {cartItems.map((item) => (
        <div key={item.productId} className="border p-3 mb-2">
          <strong>{item.productName}</strong>
          <div>Qty: {item.quantity}</div>
          <div>Price: ₹{item.price}</div>
        </div>
      ))}

      <button
        className="btn btn-primary mt-4"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
}
