package com.example.finalproject.controller;

import com.example.finalproject.dto.FavListRequest;
import com.example.finalproject.dto.MessageResponse;
import com.example.finalproject.service.FavouriteListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/favourite-list")
public class FavouriteListController {

    private FavouriteListService favouriteListService;

    @Autowired
    public FavouriteListController(FavouriteListService favouriteListService) {
        this.favouriteListService = favouriteListService;
    }

    @PostMapping
    public ResponseEntity<?> addFavList(@RequestBody FavListRequest favListRequest) {
        log.info("userıd is {} productid is {}", favListRequest.getUserId(), favListRequest.getProductId());
        favouriteListService.addFavouriteList(favListRequest.getProductId(), favListRequest.getUserId());
        return ResponseEntity.ok(new MessageResponse("Product added successfully"));
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteProductFromFavList(@RequestBody FavListRequest favListRequest) {
        favouriteListService.removeFavouriteList(favListRequest.getProductId(), favListRequest.getUserId());
        return ResponseEntity.ok(new MessageResponse("Product deleted successfully"));
    }

    @GetMapping
    public ResponseEntity<?> getFavouriteList(@RequestParam(name = "userId") Long userId) {
        log.info("user id : {}", userId);
        return ResponseEntity.ok(favouriteListService.getAll(userId));
    }
}
