package com.example.ecommerce.DTO;

import lombok.Data;

@Data
public class AddToCartRequest {

    private Long productId;
    private String productName;
    private String imageUrl;
    private String category;
    private double price;
}
