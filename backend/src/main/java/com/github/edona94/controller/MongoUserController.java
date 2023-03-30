package com.github.edona94.controller;

import com.github.edona94.model.MongoUserRequest;
import com.github.edona94.model.MongoUserResponse;
import com.github.edona94.service.MongoUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class MongoUserController {
    private final MongoUserDetailsService mongoUserDetailsService;
    @PostMapping
    public MongoUserResponse signup(@RequestBody MongoUserRequest user) {
        return mongoUserDetailsService.signup(user);
    }

    @GetMapping("/me")
    public MongoUserResponse getMe(Principal principal) {
        return mongoUserDetailsService.getMe(principal);
    }

    @PostMapping("/login")
    public MongoUserResponse login(Principal principal) {
        return getMe(principal);
    }

    @PostMapping("/logout")
    public void logout() {
        // this method exists only to define the endpoint!
    }
}
