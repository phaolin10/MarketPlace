package com.example.finalproject.service;

import com.example.finalproject.model.Role;
import com.example.finalproject.model.RoleType;

public interface RoleService {
    Role findByName(RoleType name);
}
