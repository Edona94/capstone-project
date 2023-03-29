package com.github.edona94.service;

import com.github.edona94.exception.EmployeeNotFoundException;
import com.github.edona94.exception.UnauthorizedException;
import com.github.edona94.model.Employee;
import com.github.edona94.model.EmployeeDTORequest;
import com.github.edona94.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.InputMismatchException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final IdService idService;
    private final CVService cvService;
    private final MongoUserDetailsService mongoUserDetailsService;

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAllByOrderByAddedDesc();
    }

    public String uploadCv(MultipartFile cv) {
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
        return cvUri;
    }

    public Employee addEmployee(EmployeeDTORequest employeeDTORequest, MultipartFile cv, Principal principal) {
        String id = idService.generateId();
        String cvUri = uploadCv(cv);
        String adminId = mongoUserDetailsService.getMe(principal).id();
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
                cvUri,
                adminId
        );
        return employeeRepository.save(newEmployee);
    }

    public Employee getEmployeeById(String id) {
        return employeeRepository.findById(id).orElseThrow(EmployeeNotFoundException::new);
    }

    public Employee updateEmployeeById(String id, EmployeeDTORequest employeeDTORequest, MultipartFile cv,Principal principal) {
        String adminId = mongoUserDetailsService.getMe(principal).id();
        Employee employee = getEmployeeById(id);
        String cvUri = employee.cv(); // Set the cvUri to the existing CV URI by default

        if(cv != null && !cv.isEmpty()) { // Check if a new CV file has been provided
            cvUri = uploadCv(cv); // If yes, upload the new CV and update the cvUri
        }
        if (!employee.userId().equals(adminId)) {
            throw new UnauthorizedException("Only Admin can edit the employee data");
        }
        Employee updatedEmployee = new Employee(
                id,
                employeeDTORequest.firstName(),
                employeeDTORequest.lastName(),
                employeeDTORequest.position(),
                employeeDTORequest.dateOfBirth(),
                employeeDTORequest.address(),
                employeeDTORequest.email(),
                employeeDTORequest.phoneNumber(),
                employeeDTORequest.added(),
                cvUri,
                adminId
        );
        return employeeRepository.save(updatedEmployee);
    }

    public Employee deleteEmployee(String id,Principal principal) {
        String adminId = mongoUserDetailsService.getMe(principal).id();
        Optional<Employee> employee = employeeRepository.findById(id);
        if(employee.isEmpty()) {
            throw new EmployeeNotFoundException("Employee with id" +id+ "doesn't exist");
        }
        if(!employee.get().userId().equals(adminId)){
            throw new UnauthorizedException("You may only delete your own tasks!");
        }
        employeeRepository.deleteById(id);
        return employee.get();
    }
}
