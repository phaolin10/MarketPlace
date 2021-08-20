package com.example.finalproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class BlackList extends BaseEntity {
    @OneToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private User owner;

    @ManyToMany
    private List<User> sellerList;
}
