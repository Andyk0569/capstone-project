package com.example.ecommerce.controller;

import com.example.ecommerce.DTO.LoginRequest;
import com.example.ecommerce.DTO.SignUpRequest;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Sign up endpoint
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody SignUpRequest signUpRequest) {
        User user = userService.registerUser(signUpRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("userId", user.getUserId());
        response.put("email", user.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Bulk sign up endpoint
    @PostMapping("/signup/bulk")
    public ResponseEntity<Map<String, Object>> bulkSignup(@RequestBody List<SignUpRequest> signUpRequests) {
        List<User> users = userService.registerMultipleUsers(signUpRequests);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Users registered successfully");
        response.put("totalUsers", users.size());
        response.put("users", users.stream().map(u -> {
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("userId", u.getUserId());
            userMap.put("email", u.getEmail());
            userMap.put("firstName", u.getFirstName());
            userMap.put("lastName", u.getLastName());
            return userMap;
        }).toList());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("userId", user.getUserId());
        response.put("email", user.getEmail());
        response.put("firstName", user.getFirstName());
        response.put("lastName", user.getLastName());

        return ResponseEntity.ok(response);
    }

    // Get user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);

        if (user.isEmpty()) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        User foundUser = user.get();
        Map<String, Object> response = new HashMap<>();
        response.put("userId", foundUser.getUserId());
        response.put("firstName", foundUser.getFirstName());
        response.put("lastName", foundUser.getLastName());
        response.put("email", foundUser.getEmail());
        response.put("address", foundUser.getAddress());
        response.put("createdAt", foundUser.getCreatedAt());

        return ResponseEntity.ok(response);
    }

    // Update user
    @PutMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long userId, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(userId, userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User updated successfully");
        response.put("userId", updatedUser.getUserId());
        response.put("firstName", updatedUser.getFirstName());
        response.put("lastName", updatedUser.getLastName());
        response.put("address", updatedUser.getAddress());

        return ResponseEntity.ok(response);
    }

    // Delete user (soft delete)
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "User deleted successfully");

        return ResponseEntity.ok(response);
    }
}
