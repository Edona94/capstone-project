package com.github.edona94.exception;

public class EmployeeNotFoundException  extends RuntimeException{
    public EmployeeNotFoundException() {
        super("Current Employee not found");
    }
    public EmployeeNotFoundException(String message) {
        super(message);
    }
}
