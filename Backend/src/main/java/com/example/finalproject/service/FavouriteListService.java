package com.example.finalproject.service;


import com.example.finalproject.model.FavouriteList;

public interface FavouriteListService {

    void addFavouriteList(Long productId, Long userId);

    void removeFavouriteList(Long productId, Long userId);

    FavouriteList getAll(Long userId);
}
