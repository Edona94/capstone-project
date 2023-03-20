package com.github.edona94.model;

public record Address(
        String street,
        String houseNumber,
        String postalCode,
        String city
) {
}
