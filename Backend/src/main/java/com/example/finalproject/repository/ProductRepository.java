package com.example.finalproject.repository;

import com.example.finalproject.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductById(Long id);

    List<Product> findProductByProductNameContaining(String name);


}
