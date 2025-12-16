package com.example.order_service.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.order_service.DTO.OrderResponse;
import com.example.order_service.entity.CartItem;
import com.example.order_service.entity.Order;
import com.example.order_service.entity.OrderItem;
import com.example.order_service.repository.CartRepository;
import com.example.order_service.repository.OrderItemRepository;
import com.example.order_service.repository.OrderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final CartRepository cartRepo;
    private final OrderRepository orderRepo;
    private final OrderItemRepository itemRepo;

    public OrderResponse placeOrder(Long userId) {

        if (userId == null) {
            throw new RuntimeException("Invalid user");
        }

        List<CartItem> cartItems = cartRepo.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        double total = cartItems.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        Order order = new Order();
        order.setUserId(userId);
        order.setTotalAmount(total);
        order.setStatus("CREATED");
        order.setCreatedAt(LocalDateTime.now());

        orderRepo.save(order);

        List<OrderItem> orderItems = cartItems.stream().map(item -> {
            OrderItem oi = new OrderItem();
            oi.setOrderId(order.getOrderId());
            oi.setProductId(item.getProductId());
            oi.setProductName(item.getProductName());
            oi.setImageUrl(item.getImageUrl());
            oi.setQuantity(item.getQuantity());
            oi.setPrice(item.getPrice());
            return oi;
        }).toList();

        itemRepo.saveAll(orderItems);

        // Clear cart AFTER successful order creation
        cartRepo.deleteByUserId(userId);

        return new OrderResponse(
                order.getOrderId(),
                total,
                order.getStatus());
    }

    public List<Order> getOrders(Long userId) {
        List<Order> orders = orderRepo.findByUserId(userId);

        // Populate each order with its items
        orders.forEach(order -> {
            List<OrderItem> items = itemRepo.findByOrderId(order.getOrderId());
            order.setItems(items);
        });

        return orders;
    }
}
