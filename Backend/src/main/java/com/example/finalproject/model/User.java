package com.example.finalproject.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Setter
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseEntity {

    @Column(unique = true)
    @NotNull
    private String username;

    private String name;

    private String surname;

    @NotNull
    private String password;

    @NotNull
    private String email;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "owner")
    @JsonManagedReference
    private BlackList blackList;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
    @JsonManagedReference
    private FavouriteList favouriteList;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Product> productList = new ArrayList<>();

}
