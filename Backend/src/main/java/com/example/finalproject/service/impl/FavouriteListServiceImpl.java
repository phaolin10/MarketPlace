package com.example.finalproject.service.impl;

import com.example.finalproject.model.FavouriteList;
import com.example.finalproject.model.Product;
import com.example.finalproject.model.User;
import com.example.finalproject.repository.ProductRepository;
import com.example.finalproject.repository.UserRepository;
import com.example.finalproject.service.FavouriteListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class FavouriteListServiceImpl implements FavouriteListService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public void addFavouriteList(Long productId, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        User user = userOptional.get();
        Product product = productRepository.findProductById(productId);
        log.info("product is : {} user is : {}", productId, userId);
        if (user.getFavouriteList() != null) {
            user.getFavouriteList().getProductsFavList().add(product);
            userRepository.save(user);
        } else {
            FavouriteList favouriteList = new FavouriteList();
            favouriteList.setUser(userRepository.findById(userId).get());
            favouriteList.setProductsFavList(new ArrayList<Product>());
            favouriteList.getProductsFavList().add(product);

            user.setFavouriteList(favouriteList);
            userRepository.save(user);
        }
    }

    @Override
    public void removeFavouriteList(Long productId, Long userId) {
        log.info("productid {} userid {}", productId, userId);
        Optional<User> user = userRepository.findById(userId);
        Product product = productRepository.findProductById(productId);
        if (user.get().getFavouriteList() != null) {
            user.get().getFavouriteList().getProductsFavList().remove(product);
            userRepository.save(user.get());
        } else {

        }

    }

    @Override
    public FavouriteList getAll(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.get().getFavouriteList();
    }

}
