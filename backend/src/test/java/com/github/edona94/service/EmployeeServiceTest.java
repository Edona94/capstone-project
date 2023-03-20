package com.github.edona94.service;

import com.github.edona94.model.Address;
import com.github.edona94.model.Employee;
import com.github.edona94.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {
    EmployeeRepository employeeRepository;
    EmployeeService employeeService;
    Employee employee1;


    @BeforeEach
    void setUp() {
        employeeRepository=mock(EmployeeRepository.class);
        employeeService=new EmployeeService(employeeRepository);
        LocalDate dateOfBirth1=LocalDate.of(1991,1,1);
        Address address1=new Address("street1","1","80000","Munich");
        Instant added1=Instant.parse("2023-03-02T15:30:00Z");
        employee1=new Employee(
                "1",
                "Employee 1",
                "LastName 1",
                "Java Developer",
                dateOfBirth1,
                address1,
                "employee1@gmail.com",
                "00157-123-456-78",
                added1,
                "employee1.pdf"
        );
    }
    @Test
    void getAllEmployees_whenFindAllReturnListOfOneEmployee_thenReturnListOfOneEmployee() {
        //GIVEN
        when(employeeRepository.findAll()).thenReturn(new ArrayList<>(List.of(employee1)));
        //WHEN
        List<Employee> actual = employeeService.getAllEmployees();
        List<Employee> expected = new ArrayList<>(List.of(employee1));
        //THEN
        verify(employeeRepository).findAll();
        assertEquals(expected,actual);
    }
}