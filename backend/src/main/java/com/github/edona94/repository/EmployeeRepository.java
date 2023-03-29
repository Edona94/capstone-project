package com.github.edona94.repository;

import com.github.edona94.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee,String> {
    List<Employee> findAllByOrderByAddedDesc();
}
