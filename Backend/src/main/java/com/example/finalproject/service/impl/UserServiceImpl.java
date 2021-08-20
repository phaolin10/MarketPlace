package com.example.finalproject.service.impl;

import com.example.finalproject.dto.UserDto;
import com.example.finalproject.exception.UserFoundException;
import com.example.finalproject.exception.UserIdNotFoundException;
import com.example.finalproject.exception.UserNotFoundException;
import com.example.finalproject.model.User;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
            throw new UserFoundException("Kullanıcı adı ya da mail kullanımda.");
        } else {
            return userRepository.save(user);
        }
    }

    @Override
    public void deleteUser(Long userId) {

        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new UserIdNotFoundException("Kullanıcı bulunamadı");
        }
    }

    @Override
    public void updateUser(UserDto userDto) {
        if (userRepository.existsById(userDto.getId())) {
            User tempUser = userRepository.getById(userDto.getId());
            final User user = User.builder()
                    .id(userDto.getId())
                    .username(userDto.getUsername())
                    .email(userDto.getEmail())
                    .roles(userDto.getRoles())
                    .password(tempUser.getPassword())
                    .build();
            userRepository.save(user);

        } else {
            throw new UserIdNotFoundException("Kullanıcı bulunamadı");
        }
    }

    @Override
    public List<User> searchUserByName(String username) {
        return null;
    }

    @Override
    public User findByUsername(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        return userRepository.findByUsername(username).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public Boolean existsByUsername(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        Objects.requireNonNull(email, "email cannot be null");
        return userRepository.existsByEmail(email);
    }

    @Override
    public Page<User> getAll(int pageSize, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return userRepository.findAll(pageable);
    }

}
