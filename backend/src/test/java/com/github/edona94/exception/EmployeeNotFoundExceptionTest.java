package com.github.edona94.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EmployeeNotFoundExceptionTest {
    @Test
    void testConstructorWithDefaultMessage() {
        //GIVEN
        EmployeeNotFoundException exception = new EmployeeNotFoundException();
        //THEN
        assertEquals("Current Employee not found", exception.getMessage());
    }

    @Test
    void testConstructorWithCustomMessage() {
        //GIVEN
        String customMessage = "This is a custom message";
        EmployeeNotFoundException exception = new EmployeeNotFoundException(customMessage);
        //THEN
        assertEquals(customMessage, exception.getMessage());
    }
}