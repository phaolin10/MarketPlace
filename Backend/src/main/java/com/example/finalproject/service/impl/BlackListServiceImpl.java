package com.example.finalproject.service.impl;

import com.example.finalproject.model.BlackList;
import com.example.finalproject.model.User;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.service.BlackListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class BlackListServiceImpl implements BlackListService {
    private final UserRepository userRepository;

    @Override
    public void addBlackList(Long sellerId, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        User user = userOptional.get();
        Optional<User> sellerOpt = userRepository.findById(sellerId);
        User seller = sellerOpt.get();
        log.info("product is : {} user is : {}", sellerId, userId);
        if (user.getBlackList() != null) {
            user.getBlackList().getSellerList().add(seller);
            userRepository.save(user);
        } else {
            BlackList blackList = new BlackList();
            blackList.setOwner(userRepository.findById(userId).get());
            blackList.setSellerList(new ArrayList<User>());
            blackList.getSellerList().add(seller);
            user.setBlackList(blackList);
            userRepository.save(user);
        }
    }

    @Override
    public void removeBlackList(Long sellerId, Long userId) {
        log.info("productid {} userid {}", sellerId, userId);
        Optional<User> user = userRepository.findById(userId);
        Optional<User> seller = userRepository.findById(sellerId);
        if (user.get().getBlackList() != null) {
            user.get().getBlackList().getSellerList().remove(seller);
            userRepository.save(user.get());
        } else {

        }
    }

    @Override
    public BlackList getAll(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.get().getBlackList();
    }
}
