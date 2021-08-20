package com.example.finalproject.repository;

import com.example.finalproject.model.Role;
import com.example.finalproject.model.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    List<Role> findRoleById(Long id);

    Optional<Role> findByName(RoleType name);

}
