package com.github.edona94.controller;

import com.github.edona94.model.MongoUser;
import com.github.edona94.repository.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MongoUserControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    MongoUserRepository mongoUserRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    MongoUser mongoUser1;

    @BeforeEach
    void setUp() {
        mongoUser1 = new MongoUser("1", "user", passwordEncoder.encode("password"), "BASIC");
    }

    @Test
    @DirtiesContext
    void signUp_whenInputIsValid_thenReturnNewUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username": "user",
                                "password": "password"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "username": "user",
                        "role": "BASIC"
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void postUser_whenNoCSRFToken_then403() throws Exception {
        mongoUserRepository.save(mongoUser1);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "username": "user",
                                "password": "123"
                                }
                                """))
                .andExpect(status().isForbidden());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void getMe_whenRegistered_thenReturnUser() throws Exception {
        mongoUserRepository.save(mongoUser1);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "1",
                        "username": "user",
                        "role": "BASIC"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    void getMe_whenNotAuthenticated_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }


    @Test
    @DirtiesContext
    void login_whenUserExists_thenReturnUser() throws Exception {
        mongoUserRepository.save(mongoUser1);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("user", "password"))
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                         {
                         "id": "1",
                         "username": "user",
                         "role": "BASIC"
                         }
                         """));
    }

    @Test
    @DirtiesContext
    void login_whenUsernameIsNotInRepository_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/login")
                        .with(httpBasic("user", "password"))
                        .with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void logout() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/users/logout").with(csrf()))
                .andExpect(status().isOk());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/users/me"))
                .andExpect(status().isUnauthorized());
    }
}