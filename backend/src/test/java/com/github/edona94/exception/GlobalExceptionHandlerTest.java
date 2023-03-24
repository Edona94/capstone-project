package com.github.edona94.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class GlobalExceptionHandlerTest {
    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach
    void setUp() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }
    @Test
    void handleEmployeeNotFoundException_returnsNotFoundResponse() {
        // GIVEN
        EmployeeNotFoundException exception = new EmployeeNotFoundException("Employee not found");
        // WHEN
        ResponseEntity<Map<String,Object>> responseEntity = globalExceptionHandler.handleEmployeeNotFoundException(exception);
        // THEN
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Employee not found", responseEntity.getBody().get("message"));
        assertNotNull(responseEntity.getBody().get("timestamp"));
    }

    @Test
    void handleGeneralException_returnsBadRequestResponse() {
        // WHEN
        ResponseEntity<Map<String,Object>> responseEntity = globalExceptionHandler.handleGeneralException();
        // THEN
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Sorry, Bad request", responseEntity.getBody().get("message"));
        assertNotNull(responseEntity.getBody().get("timestamp"));
    }
}