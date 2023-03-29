package com.github.edona94.repository;

import com.github.edona94.model.MongoUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MongoUserRepository extends MongoRepository<MongoUser,String> {
    Optional<MongoUser> findByUsername(String username);
    boolean existsByUsername(String username);
}
