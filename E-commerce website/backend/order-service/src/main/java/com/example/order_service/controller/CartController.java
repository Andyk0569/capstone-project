package com.example.order_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.order_service.DTO.AddToCartRequest;
import com.example.order_service.entity.CartItem;
import com.example.order_service.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @RequestBody AddToCartRequest request,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Email") String userEmail) {

        // Gateway already validated JWT and extracted user info
        cartService.addToCart(request, userId);
        return ResponseEntity.ok("Product added to cart for user: " + userEmail);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Email") String userEmail) {

        // Gateway already validated JWT and extracted user info
        return ResponseEntity.ok(cartService.getUserCart(userId));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> removeFromCart(
            @PathVariable Long itemId,
            @RequestHeader("X-User-Id") Long userId) {

        cartService.removeFromCart(itemId, userId);
        return ResponseEntity.ok("Item removed from cart");
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<?> updateCartItem(
            @PathVariable Long itemId,
            @RequestParam Integer quantity,
            @RequestHeader("X-User-Id") Long userId) {

        return ResponseEntity.ok("Cart item updated");
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart(
            @RequestHeader("X-User-Id") Long userId) {

        cartService.clearCart(userId);
        return ResponseEntity.ok("Cart cleared");
    }
}