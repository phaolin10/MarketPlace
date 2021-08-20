package com.example.finalproject.controller;

import com.example.finalproject.dto.MessageResponse;
import com.example.finalproject.dto.UserDto;
import com.example.finalproject.model.User;
import com.example.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/homepage")
    public String all() {
        return "all";
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok(new MessageResponse("User added successfully!"));
    }

    @PostMapping("/add-user")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok(new MessageResponse("User added successfully!"));
    }

    @DeleteMapping("/delete-user/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(200);
    }

    @PostMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        userService.updateUser(userDto);
        return ResponseEntity.ok(200);
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(@RequestParam(name = "pageSize", defaultValue = "2") int pageSize,
                                    @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber) {
        return ResponseEntity.ok(userService.getAll(pageSize, pageNumber));
    }

}
