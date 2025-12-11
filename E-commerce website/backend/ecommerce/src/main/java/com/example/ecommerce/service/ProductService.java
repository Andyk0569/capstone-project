package com.example.ecommerce.service;

import java.util.List;

import com.example.ecommerce.DTO.ProductRequestDTO;
import com.example.ecommerce.DTO.ProductResponseDTO;

public interface ProductService {

    ProductResponseDTO createProduct(ProductRequestDTO request);

    ProductResponseDTO getProductById(Long productId);

    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO request);

    List<ProductResponseDTO> createProductsInBulk(List<ProductRequestDTO> requests);

    void deleteProduct(Long productId);
}