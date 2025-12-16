package com.example.api_gateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

        @Autowired
        private JwtAuthFilter jwtAuthenticationFilter;

        @Bean
        public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
                return builder.routes()

                                // ============================================
                                // PROTECTED ROUTES (JWT Required) - Define FIRST
                                // ============================================

                                // Cart Service - ALL cart endpoints require JWT
                                .route("cart_protected", r -> r
                                                .path("/api/cart/**")
                                                .filters(f -> f.filter(jwtAuthenticationFilter))
                                                .uri("http://localhost:8083")) // order-service

                                // ============================================
                                // PUBLIC ROUTES (No JWT Required)
                                // ============================================

                                // User Service - ALL endpoints are public (signup, login, profile, etc.)
                                .route("user_service_public", r -> r
                                                .path("/api/users/**")
                                                .uri("http://localhost:8081")) // ecommerce service

                                // Product Service - ALL endpoints are public
                                .route("product_service_public", r -> r
                                                .path("/api/products/**")
                                                .uri("http://localhost:8082")) // product-service

                                .build();
        }
}