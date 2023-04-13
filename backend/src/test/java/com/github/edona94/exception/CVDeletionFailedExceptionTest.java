package com.github.edona94.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CVDeletionFailedExceptionTest {

    @Test
    void testConstructorWithCustomMessage() {
        //GIVEN
        String customMessage = "This is a custom message";
        CVDeletionFailedException exception = new CVDeletionFailedException(customMessage);
        //THEN
        assertEquals(customMessage, exception.getMessage());
    }
}