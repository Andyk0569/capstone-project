package com.example.product_service.repository;

import org.springframework.data.domain.Pageable;

// import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.product_service.entity.Product;

public interface ProductRepository extends JpaRepository<com.example.product_service.entity.Product, Long> {

    Page<Product> findByCategory(String category, Pageable pageable);
}