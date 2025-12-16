package com.example.order_service.DTO;

import lombok.Data;

@Data
public class PlaceOrderRequest {
    private String address;
    private String paymentMethod;
}
