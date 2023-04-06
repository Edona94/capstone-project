package com.github.edona94.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.github.edona94.model.Address;
import com.github.edona94.model.Employee;
import com.github.edona94.model.Gender;
import com.github.edona94.model.MongoUser;
import com.github.edona94.repository.EmployeeRepository;
import com.github.edona94.repository.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EmployeeControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    EmployeeRepository employeeRepository;
    @MockBean
    Cloudinary cloudinary;
    Uploader uploader = mock(Uploader.class);
    Employee employee1;
    @Autowired
    MongoUserRepository mongoUserRepository;

    MongoUser mongoUser;

    @BeforeEach
    void setUp() {
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
                Gender.FEMALE,
                "Software Development",
                "1a"
        );
        mongoUser = new MongoUser("1a","user","password","BASIC");
    }

    @Test
    @DirtiesContext
    void getAllEmployees_whenNoEmployeeInRepo_thenReturnEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllEmployees_whenOneEmployeeInRepo_thenReturnListOfOneEmployee() throws Exception {
        employeeRepository.save(employee1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                           {
                              "id": "1",
                              "firstName": "Employee 1",
                              "lastName": "LastName 1",
                              "position": "Java Developer",
                              "dateOfBirth": "1991-01-01",
                              "address": {
                                          "street": "street1",
                                          "houseNumber": "1",
                                          "postalCode": "80000",
                                          "city": "Munich"
                                        },
                              "email": "employee1@gmail.com",
                              "phoneNumber": "00157-123-456-78",
                              "added": "2023-03-02T15:30:00Z",
                              "cv": "employee1.pdf",
                              "gender": "FEMALE",
                              "department": "Software Development"
                           }
                        ]
                        """));

    }

    @Test
    @DirtiesContext
    @WithMockUser
    void addEmployee() throws Exception {
        mongoUserRepository.save(mongoUser);
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), anyMap())).thenReturn(Map.of("url", "employee1.pdf"));
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/employees")
                        .file(new MockMultipartFile("employeeDTORequest", null,
                                "application/json", """   
                                {
                                      "firstName": "Employee 1",
                                      "lastName": "LastName 1",
                                      "position": "Java Developer",
                                      "dateOfBirth": "1991-01-01",
                                      "address": {
                                                  "street": "street1",
                                                  "houseNumber": "1",
                                                  "postalCode": "80000",
                                                  "city": "Munich"
                                                },
                                      "email": "employee1@gmail.com",
                                      "phoneNumber": "00157-123-456-78",
                                      "added": "2023-03-02T15:30:00Z",
                                      "gender": "FEMALE",
                                      "department": "Software Development",
                                      "userId": "1a"
                                   }
                                   """.getBytes()))
                        .file(new MockMultipartFile("file", "content".getBytes()))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                               {
                              "firstName": "Employee 1",
                              "lastName": "LastName 1",
                              "position": "Java Developer",
                              "dateOfBirth": "1991-01-01",
                              "address": {
                                          "street": "street1",
                                          "houseNumber": "1",
                                          "postalCode": "80000",
                                          "city": "Munich"
                                        },
                              "email": "employee1@gmail.com",
                              "phoneNumber": "00157-123-456-78",
                              "added": "2023-03-02T15:30:00Z",
                              "cv": "employee1.pdf",
                              "gender": "FEMALE",
                              "department": "Software Development",
                              "userId": "1a"
                           }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void getEmployeeById() throws Exception {
        employeeRepository.save(employee1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                          {
                              "id": "1",
                              "firstName": "Employee 1",
                              "lastName": "LastName 1",
                              "position": "Java Developer",
                              "dateOfBirth": "1991-01-01",
                              "address": {
                                          "street": "street1",
                                          "houseNumber": "1",
                                          "postalCode": "80000",
                                          "city": "Munich"
                                        },
                              "email": "employee1@gmail.com",
                              "phoneNumber": "00157-123-456-78",
                              "added": "2023-03-02T15:30:00Z",
                              "cv": "employee1.pdf",
                              "gender": "FEMALE",
                              "department": "Software Development"
                           }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void updateEmployeeById_whenIdExist_ReturnUpdatedEmployee() throws Exception {
        mongoUserRepository.save(mongoUser);
        employeeRepository.save(employee1);
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(), anyMap())).thenReturn(Map.of("url", "employee1.pdf"));
        mockMvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT,"/api/employees/1")
                .file(new MockMultipartFile("employeeDTORequest", null,
                        "application/json", """   
                                {
                                      "firstName": "Employee 1",
                                      "lastName": "LastName 1",
                                      "position": "Java Developer",
                                      "dateOfBirth": "1991-01-01",
                                      "address": {
                                                  "street": "street1",
                                                  "houseNumber": "1",
                                                  "postalCode": "80000",
                                                  "city": "Munich"
                                                },
                                      "email": "updated_email@gmail.com",
                                      "phoneNumber": "00157-123-456-78",
                                      "added": "2023-03-02T15:30:00Z",
                                      "gender": "FEMALE",
                                      "department": "Software Development"
                                   }
                                   """.getBytes()))
                .file(new MockMultipartFile("file", "content".getBytes()))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                               {
                               "id": "1",
                              "firstName": "Employee 1",
                              "lastName": "LastName 1",
                              "position": "Java Developer",
                              "dateOfBirth": "1991-01-01",
                              "address": {
                                          "street": "street1",
                                          "houseNumber": "1",
                                          "postalCode": "80000",
                                          "city": "Munich"
                                        },
                              "email": "updated_email@gmail.com",
                              "phoneNumber": "00157-123-456-78",
                              "added": "2023-03-02T15:30:00Z",
                              "cv": "employee1.pdf",
                              "gender": "FEMALE",
                              "department": "Software Development"
                           }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteEmployee_whenIdExist_thenReturnThatEmployee() throws Exception {
        mongoUserRepository.save(mongoUser);
        employeeRepository.save(employee1);
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/employees/1")
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                              "id": "1",
                              "firstName": "Employee 1",
                              "lastName": "LastName 1",
                              "position": "Java Developer",
                              "dateOfBirth": "1991-01-01",
                              "address": {
                                          "street": "street1",
                                          "houseNumber": "1",
                                          "postalCode": "80000",
                                          "city": "Munich"
                                        },
                              "email": "employee1@gmail.com",
                              "phoneNumber": "00157-123-456-78",
                              "added": "2023-03-02T15:30:00Z",
                              "cv": "employee1.pdf",
                              "gender": "FEMALE",
                              "department": "Software Development"
                           }
                        """));
    }
}