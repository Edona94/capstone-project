package com.github.edona94.service;

import com.github.edona94.model.Employee;
import com.github.edona94.model.EmployeeDTORequest;
import com.github.edona94.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.InputMismatchException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final IdService idService;
    private final CVService cvService;

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee addEmployee(EmployeeDTORequest employeeDTORequest, MultipartFile cv) {
        String id = idService.generateId();
        String cvUri;
        if (cv != null) {
            try {
                cvUri = cvService.uploadCV(cv);
            } catch (IOException e) {
                throw new InputMismatchException("The CV upload didn't work: " + e.getMessage());
            }
        } else {
            cvUri = null;
        }
        Employee newEmployee = new Employee(
                id,
                employeeDTORequest.firstName(),
                employeeDTORequest.lastName(),
                employeeDTORequest.position(),
                employeeDTORequest.dateOfBirth(),
                employeeDTORequest.address(),
                employeeDTORequest.email(),
                employeeDTORequest.phoneNumber(),
                employeeDTORequest.added(),
                cvUri
        );
        return employeeRepository.save(newEmployee);
    }

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

}
