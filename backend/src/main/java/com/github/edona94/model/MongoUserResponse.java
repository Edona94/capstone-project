package com.github.edona94.model;

public record MongoUserResponse(
        String id,
        String username,
        String role
) {
}
