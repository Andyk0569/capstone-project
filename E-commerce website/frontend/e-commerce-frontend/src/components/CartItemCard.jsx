import React from "react";

export default function CartItemCard({ item }) {
  return (
    <div className="card mb-3 shadow-sm rounded-4">
      <div className="row g-0 align-items-center">
        <div className="col-md-3">
          <img
            src={item.imageUrl}
            alt={item.productName}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{item.productName}</h5>
            <p className="card-text text-muted">{item.category}</p>
            <p className="card-text fw-bold">₹{item.price}</p>
          </div>
        </div>
        <div className="col-md-3 text-center">
          <span className="badge bg-primary fs-6">Qty: {item.quantity}</span>
        </div>
      </div>
    </div>
  );
}
