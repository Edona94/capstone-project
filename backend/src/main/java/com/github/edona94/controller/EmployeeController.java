package com.github.edona94.controller;

import com.github.edona94.model.Employee;
import com.github.edona94.model.EmployeeDTORequest;
import com.github.edona94.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    
    private final EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public Employee addEmployee(@RequestPart("employeeDTORequest") EmployeeDTORequest employeeDTORequest, @RequestPart(value = "file", required = false) MultipartFile cv, Principal principal) {
        return employeeService.addEmployee(employeeDTORequest,cv,principal);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        return employeeService.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    public Employee updateEmployeeById(@PathVariable String id,@RequestPart("employeeDTORequest") EmployeeDTORequest employeeDTORequest,@RequestPart(value = "file", required = false) MultipartFile cv,Principal principal){
        return employeeService.updateEmployeeById(id,employeeDTORequest,cv,principal);
    }

    @DeleteMapping("/{id}")
    public Employee deleteEmployee(@PathVariable String id, Principal principal) {
        return employeeService.deleteEmployee(id,principal);
    }
}
