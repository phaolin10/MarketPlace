package com.example.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.validation.constraints.NotNull;

@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {

    @NotNull
    private Long id;

    @NotNull
    private String productName;

    @NotNull
    private String description;

    @NotNull
    private Long price;

    @NotNull
    private Long inStock;
}
