package com.example.finalproject.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
@Getter
public class BlacklistRequest {

    @NotBlank
    private Long userId;

    @NotBlank
    private Long userBlackId;

}
