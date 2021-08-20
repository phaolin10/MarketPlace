package com.example.finalproject.repository;

import com.example.finalproject.model.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlackListRepository extends JpaRepository<BlackList, Long> {
    List<BlackList> findBlackListById(Long id);
}
