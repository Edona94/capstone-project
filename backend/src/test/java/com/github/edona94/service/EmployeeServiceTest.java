package com.github.edona94.service;

import com.github.edona94.model.Address;
import com.github.edona94.model.Employee;
import com.github.edona94.model.EmployeeDTORequest;
import com.github.edona94.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {
    EmployeeRepository employeeRepository;
    EmployeeService employeeService;
    IdService idService;
    Employee employee1;
    CVService cvService;
    MultipartFile multipartFile;


    @BeforeEach
    void setUp() {
        employeeRepository = mock(EmployeeRepository.class);
        idService = mock(IdService.class);
        cvService = mock(CVService.class);
        multipartFile = mock(MultipartFile.class);
        employeeService = new EmployeeService(employeeRepository,idService, cvService);
        LocalDate dateOfBirth1 = LocalDate.of(1991,1,1);
        Address address1 = new Address("street1","1","80000","Munich");
        Instant added1 = Instant.parse("2023-03-02T15:30:00Z");
        employee1 = new Employee(
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

    @Test
    void addEmployee() throws IOException {
        //GIVEN
        when(idService.generateId()).thenReturn("1");
        when(cvService.uploadCV(multipartFile)).thenReturn(employee1.cv());
        EmployeeDTORequest employee1DTORequest = new EmployeeDTORequest(
                employee1.firstName(),
                employee1.lastName(),
                employee1.position(),
                employee1.dateOfBirth(),
                employee1.address(),
                employee1.email(),
                employee1.phoneNumber(),
                employee1.added()
        );
        when(employeeRepository.save(employee1)).thenReturn(employee1);
        //WHEN
        Employee expected = employee1;
        Employee actual = employeeService.addEmployee(employee1DTORequest,multipartFile);
        //THEN
        verify(employeeRepository).save(employee1);
        verify(idService).generateId();
        assertEquals(expected,actual);
    }
}