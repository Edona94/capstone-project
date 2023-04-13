package com.github.edona94.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Document("employees")
public record Employee(
        @Id
        String id,
        String firstName,
        String lastName,
        String position,
        LocalDate dateOfBirth,
        Address address,
        String email,
        String phoneNumber,
        Instant added,
        String cv,
        Gender gender,
        String department,
        BigDecimal salary,
        String userId
) {
}
