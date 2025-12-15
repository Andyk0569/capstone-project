package com.example.ecommerce.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.DTO.AddToCartRequest;
import com.example.ecommerce.entity.CartItem;
import com.example.ecommerce.service.CartService;
import com.example.ecommerce.service.UserService;

import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    private final UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @RequestBody AddToCartRequest request,
            Authentication authentication // spring security
    ) {
        // authentication.getName() gives email
        String email = authentication.getName();

        // Fetch userId from DB
        Long userId = userService.getUserIdByEmail(email);

        cartService.addToCart(request, userId);
        return ResponseEntity.ok("Product added to cart");
    }

    // @GetMapping
    // public ResponseEntity<?> getCart(JwtAuthenticationToken authentication) {
    // Long userId = authentication.getToken().getClaim("userId");
    // return ResponseEntity.ok(cartService.getUserCart(userId));
    // }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(Authentication authentication) {
        // Get the currently logged-in user's email
        String email = authentication.getName(); // this works for UsernamePasswordAuthenticationToken
        Long userId = userService.getUserIdByEmail(email); // write a helper method to get userId

        List<CartItem> cart = cartService.getUserCart(userId);
        return ResponseEntity.ok(cart);
    }

}
