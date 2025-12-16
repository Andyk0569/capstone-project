package com.example.order_service.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.order_service.entity.CartItem;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByUserIdAndProductId(Long userId, Long productId);

    List<CartItem> findByUserId(Long userId);

    void deleteByUserIdAndProductId(Long userId, Long productId);

    void deleteByUserId(Long userId);
}
