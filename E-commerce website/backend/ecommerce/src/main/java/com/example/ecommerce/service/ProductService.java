package com.example.ecommerce.service;

import java.util.List;

import com.example.ecommerce.DTO.ProductRequestDTO;
import com.example.ecommerce.DTO.ProductResponseDTO;
// import com.example.ecommerce.entity.Product;

public interface ProductService {

    ProductResponseDTO createProduct(ProductRequestDTO request);

    ProductResponseDTO getProductById(Long productId);

    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO request);

    List<ProductResponseDTO> createProductsInBulk(List<ProductRequestDTO> requests);

    List<ProductResponseDTO> getProductsByCategory(String category);

    void deleteProduct(Long productId);
}