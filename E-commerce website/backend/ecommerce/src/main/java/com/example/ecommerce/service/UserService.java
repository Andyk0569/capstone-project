package com.example.ecommerce.service;

import com.example.ecommerce.DTO.LoginRequest;
import com.example.ecommerce.DTO.SignUpRequest;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Register a new user
    public User registerUser(SignUpRequest signUpRequest) {
        // Check if email already exists
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    // Login user
    public User loginUser(LoginRequest loginRequest) {
        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User foundUser = user.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), foundUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return foundUser;
    }

    // Get user by ID
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // Update user
    public User updateUser(Long userId, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setAddress(userDetails.getAddress());
        user.setUpdatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

    // Delete user (soft delete)
    public void deleteUser(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        user.setDeletedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    // Register multiple users
    public List<User> registerMultipleUsers(List<SignUpRequest> signUpRequests) {
        return signUpRequests.stream()
                .map(this::registerUser)
                .collect(Collectors.toList());
    }

    public Long getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getUserId();
    }

}
