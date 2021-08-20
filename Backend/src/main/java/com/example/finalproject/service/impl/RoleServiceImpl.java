package com.example.finalproject.service.impl;

import com.example.finalproject.exception.RoleNotFoundException;
import com.example.finalproject.model.Role;
import com.example.finalproject.model.RoleType;
import com.example.finalproject.repository.RoleRepository;
import com.example.finalproject.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role findByName(RoleType name) {
        Objects.requireNonNull(name, "role name cannot be null");
        return roleRepository.findByName(name).orElseThrow(RoleNotFoundException::new);
    }
}
