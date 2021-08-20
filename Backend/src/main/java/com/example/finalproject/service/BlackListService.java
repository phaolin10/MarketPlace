package com.example.finalproject.service;

import com.example.finalproject.model.BlackList;

public interface BlackListService {

    void addBlackList(Long sellerId, Long userId);

    void removeBlackList(Long sellerId, Long userId);

    BlackList getAll(Long userId);
}
