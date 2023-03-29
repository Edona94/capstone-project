package com.github.edona94.service;

import com.github.edona94.exception.EmployeeNotFoundException;
import com.github.edona94.model.Address;
import com.github.edona94.model.Employee;
import com.github.edona94.model.EmployeeDTORequest;
import com.github.edona94.model.MongoUserResponse;
import com.github.edona94.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {
    EmployeeRepository employeeRepository;
    EmployeeService employeeService;
    IdService idService;
    Employee employee1;
    CVService cvService;
    MultipartFile multipartFile;
    MongoUserDetailsService mongoUserDetailsService;
    Principal principal;


    @BeforeEach
    void setUp() {
        employeeRepository = mock(EmployeeRepository.class);
        idService = mock(IdService.class);
        cvService = mock(CVService.class);
        multipartFile = mock(MultipartFile.class);
        mongoUserDetailsService = mock(MongoUserDetailsService.class);
        principal = mock(Principal.class);
        employeeService = new EmployeeService(employeeRepository, idService, cvService,mongoUserDetailsService);
        LocalDate dateOfBirth1 = LocalDate.of(1991, 1, 1);
        Address address1 = new Address("street1", "1", "80000", "Munich");
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
                "employee1.pdf",
                "a"
        );

    }

    @Test
    void getAllEmployees_whenFindAllReturnListOfOneEmployee_thenReturnListOfOneEmployee() {
        //GIVEN
        when(employeeRepository.findAllByOrderByAddedDesc()).thenReturn(new ArrayList<>(List.of(employee1)));
        //WHEN
        List<Employee> actual = employeeService.getAllEmployees();
        List<Employee> expected = new ArrayList<>(List.of(employee1));
        //THEN
        verify(employeeRepository).findAllByOrderByAddedDesc();
        assertEquals(expected, actual);
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
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //WHEN
        Employee expected = employee1;
        Employee actual = employeeService.addEmployee(employee1DTORequest, multipartFile,principal);
        //THEN
        verify(employeeRepository).save(employee1);
        verify(idService).generateId();
        verify(mongoUserDetailsService).getMe(principal);
        assertEquals(expected, actual);
    }

    @Test
    void getEmployeeById_whenIdIsInRepository_thenReturnEmployee() {
        //GIVEN
        when(employeeRepository.findById(employee1.id())).thenReturn(Optional.of(employee1));
        //WHEN
        Employee expected = employee1;
        Employee actual = employeeService.getEmployeeById(employee1.id());
        //THEN
        verify(employeeRepository).findById(employee1.id());
        assertEquals(expected, actual);
    }

    @Test
    void getEmployeeById_whenIdIsNotInRepository_thenThrowException() {
        //GIVEN
        when(employeeRepository.findById("2")).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(EmployeeNotFoundException.class, () -> employeeService.getEmployeeById("2"));
        verify(employeeRepository).findById("2");
    }

    @Test
    void updateEmployeeById_whenIdExist_ReturnUpdatedEmployee() throws IOException {
        //GIVEN
        EmployeeDTORequest employeeDTORequest = new EmployeeDTORequest(
                employee1.firstName(),
                employee1.lastName(),
                employee1.position(),
                employee1.dateOfBirth(),
                employee1.address(),
                "e.@gmail.com",
                "00157-123-456-22",
                employee1.added());
        Employee updatedEmployee = new Employee(
                employee1.id(),
                employeeDTORequest.firstName(),
                employeeDTORequest.lastName(),
                employeeDTORequest.position(),
                employeeDTORequest.dateOfBirth(),
                employeeDTORequest.address(),
                employeeDTORequest.email(),
                employeeDTORequest.phoneNumber(),
                employeeDTORequest.added(),
                employee1.cv()
        ,      "a");

        when(cvService.uploadCV(multipartFile)).thenReturn(employee1.cv());

        when(employeeRepository.findById(employee1.id())).thenReturn(Optional.of(employee1));
        when(employeeRepository.save(updatedEmployee)).thenReturn(updatedEmployee);
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //WHEN
        Employee expected = updatedEmployee;
        Employee actual = employeeService.updateEmployeeById(employee1.id(), employeeDTORequest, multipartFile,principal);
        //THEN
        verify(employeeRepository).findById(employee1.id());
        verify(employeeRepository).save(updatedEmployee);
        verify(mongoUserDetailsService).getMe(principal);
        assertEquals(expected, actual);
    }

    @Test
    void deleteEmployee_whenEmployeeDoesntExist_thenThrowException() {
        //GIVEN
        when(employeeRepository.findById("3")).thenReturn(Optional.empty());
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //WHEN & THEN
        assertThrows(EmployeeNotFoundException.class, () -> employeeService.deleteEmployee("3",principal));
        verify(employeeRepository).findById("3");
    }

    @Test
    void deleteEmployee_whenEmployeeExist_thenReturnThatEmployee() {
        //WHEN
        when(employeeRepository.findById(employee1.id())).thenReturn(Optional.ofNullable(employee1));
        when(mongoUserDetailsService.getMe(principal)).thenReturn(new MongoUserResponse("a","",""));
        //GIVEN
        Employee actual = employeeService.deleteEmployee(employee1.id(),principal);
        Employee expected = employee1;
        //THEN
        verify(employeeRepository).findById(employee1.id());
        verify(mongoUserDetailsService).getMe(principal);
        assertEquals(expected, actual);
    }
}
