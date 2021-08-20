package com.example.finalproject.service;

import com.example.finalproject.dto.UserDto;
import com.example.finalproject.model.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {

    User createUser(User user);

    void deleteUser(Long userId);

    void updateUser(UserDto userDto);

    List<User> searchUserByName(String username);

    User findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Page<User> getAll(int pageSize, int pageNumber);
}
