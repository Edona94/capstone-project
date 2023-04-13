package com.github.edona94.model;


import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record EmployeeDTORequest(
        String firstName,
        String lastName,
        String position,
        LocalDate dateOfBirth,
        Address address,
        String email,
        String phoneNumber,
        Instant added,
        Gender gender,
        String department,
        BigDecimal salary
) {
}
