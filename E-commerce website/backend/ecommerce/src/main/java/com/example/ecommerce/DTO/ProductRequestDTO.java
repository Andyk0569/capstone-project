package com.example.ecommerce.DTO;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductRequestDTO {

    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String imageUrl;
}