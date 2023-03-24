package com.github.edona94.controller;

import com.github.edona94.model.Employee;
import com.github.edona94.model.EmployeeDTORequest;
import com.github.edona94.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public Employee addEmployee(@RequestPart("employeeDTORequest") EmployeeDTORequest employeeDTORequest,@RequestPart(value = "file", required = false) MultipartFile cv) {
        return employeeService.addEmployee(employeeDTORequest,cv);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        return employeeService.getEmployeeById(id);
    }

    @DeleteMapping("/{id}")
    public Employee deleteEmployee(@PathVariable String id) {
        return employeeService.deleteEmployee(id);
    }

}
