package com.example.order_service.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.order_service.DTO.AddToCartRequest;
import com.example.order_service.entity.CartItem;
import com.example.order_service.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;

    public void addToCart(AddToCartRequest request, Long userId) {

        CartItem item = cartRepository
                .findByUserIdAndProductId(userId, request.getProductId())
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setUserId(userId);
                    newItem.setProductId(request.getProductId());
                    newItem.setProductName(request.getProductName());
                    newItem.setImageUrl(request.getImageUrl());
                    newItem.setCategory(request.getCategory());
                    newItem.setPrice(request.getPrice());
                    newItem.setQuantity(0);
                    return newItem;
                });

        item.setQuantity(item.getQuantity() + 1);
        cartRepository.save(item);
    }

    public List<CartItem> getUserCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeFromCart(Long userId, Long productId) {
        cartRepository.deleteByUserIdAndProductId(userId, productId);
    }

    public void clearCart(Long userId) {
        cartRepository.findByUserId(userId)
                .forEach(cartRepository::delete);
    }
}
