package com.example.finalproject.repository;

import com.example.finalproject.model.FavouriteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteListRepository extends JpaRepository<FavouriteList, Long> {
    List<FavouriteList> findFavouriteListById(Long id);

    FavouriteList findFavouriteListByUser(Long id);

}
