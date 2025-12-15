package com.example.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommerce.DTO.ProductRequestDTO;
import com.example.ecommerce.DTO.ProductResponseDTO;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    private ProductResponseDTO convertToDTO(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setProductId(product.getProductId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setCategory(product.getCategory());
        dto.setImageUrl(product.getImageUrl());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        return dto;
    }

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        product = productRepository.save(product);
        return convertToDTO(product);
    }

    @Override
    public ProductResponseDTO getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    @Override
    public Page<ProductResponseDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    @Override
    public ProductResponseDTO updateProduct(Long productId, ProductRequestDTO request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setImageUrl(request.getImageUrl());

        product = productRepository.save(product);
        return convertToDTO(product);
    }

    @Override
    public void deleteProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(productId);
    }

    @Override
    public List<ProductResponseDTO> createProductsInBulk(List<ProductRequestDTO> requests) {

        List<Product> products = requests.stream().map(req -> {
            Product product = new Product();
            product.setName(req.getName());
            product.setDescription(req.getDescription());
            product.setPrice(req.getPrice());
            product.setCategory(req.getCategory());
            product.setImageUrl(req.getImageUrl());
            return product;
        }).collect(Collectors.toList());

        List<Product> savedProducts = productRepository.saveAll(products);

        return savedProducts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Page<ProductResponseDTO> getProductsByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable)
                .map(this::convertToDTO);
    }

}
