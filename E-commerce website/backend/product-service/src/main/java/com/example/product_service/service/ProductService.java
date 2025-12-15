package com.example.product_service.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.product_service.DTO.ProductRequestDTO;
import com.example.product_service.DTO.ProductResponseDTO;

// import com.example.ecommerce.entity.Product;

public interface ProductService {

    ProductResponseDTO createProduct(ProductRequestDTO request);

    ProductResponseDTO getProductById(Long productId);

    Page<ProductResponseDTO> getAllProducts(Pageable pageable);

    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO request);

    List<ProductResponseDTO> createProductsInBulk(List<ProductRequestDTO> requests);

    Page<ProductResponseDTO> getProductsByCategory(String category, Pageable pageable);

    void deleteProduct(Long productId);
}