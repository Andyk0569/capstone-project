import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:8080/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        console.log("Fetched orders:", data); // Debug log
        setOrders(data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <p>Loading order history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">Failed to fetch orders: {error}</div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Order History</h3>

      {orders.map((order) => (
        <div key={order.orderId} className="border rounded p-3 mb-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <strong>Order ID: {order.orderId}</strong>
            <span className="badge bg-primary">{order.status || 'CREATED'}</span>
          </div>
          
          <div className="text-muted small">
            Date: {order.createdAt 
              ? new Date(order.createdAt).toLocaleString() 
              : 'N/A'}
          </div>
          
          <div className="fw-bold mt-2">
            Total: ₹{order.totalAmount?.toFixed(2) || '0.00'}
          </div>
          
          {order.items && order.items.length > 0 ? (
            <div className="mt-3">
              <div className="fw-semibold mb-2">Items:</div>
              {order.items.map((item) => (
                <div 
                  key={item.orderItemId || item.productId} 
                  className="ms-3 py-1 d-flex justify-content-between"
                >
                  <span>
                    {item.productName} x {item.quantity}
                  </span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 text-muted">No items available</div>
          )}
        </div>
      ))}
    </div>
  );
}