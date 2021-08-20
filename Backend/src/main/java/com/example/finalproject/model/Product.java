package com.example.finalproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@Entity
public class Product extends BaseEntity {

    @NotNull
    private String productName;

    private String description;

    @NotNull
    private Long price;

    @NotNull
    private Long inStock;

    @ManyToOne
    @JsonBackReference
    private User seller;

}
