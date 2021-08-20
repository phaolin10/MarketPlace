package com.example.finalproject.controller;

import com.example.finalproject.dto.BlacklistRequest;
import com.example.finalproject.dto.MessageResponse;
import com.example.finalproject.service.BlackListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/blacklist")
public class BlackListController {

    private BlackListService blackListService;

    @Autowired
    public BlackListController(BlackListService blackListService) {
        this.blackListService = blackListService;
    }

    @PostMapping
    public ResponseEntity<?> addBlackList(@RequestBody BlacklistRequest blacklistRequest) {
        blackListService.addBlackList(blacklistRequest.getUserBlackId(), blacklistRequest.getUserId());
        log.info("black : {} user : {}", blacklistRequest.getUserBlackId(), blacklistRequest.getUserId());
        return ResponseEntity.ok(new MessageResponse("Product added successfully"));
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteUserFromBlackList(@RequestBody BlacklistRequest blacklistRequest) {
        blackListService.removeBlackList(blacklistRequest.getUserBlackId(), blacklistRequest.getUserId());
        return ResponseEntity.ok(new MessageResponse("Product deleted successfully"));
    }

    @GetMapping
    public ResponseEntity<?> getBlacklist(@RequestParam(name = "userId") Long userId) {
        log.info("user id : {}", userId);
        return ResponseEntity.ok(blackListService.getAll(userId));
    }


}
