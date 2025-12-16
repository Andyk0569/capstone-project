package com.example.order_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponse {
    private long orderId;
    private double totalAmount;
    private String status;
}
