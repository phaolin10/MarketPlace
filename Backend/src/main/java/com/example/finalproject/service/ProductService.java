package com.example.finalproject.service;

import com.example.finalproject.dto.ProductDto;
import com.example.finalproject.model.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {

    void createProduct(ProductDto productDto);

    void deleteProduct(Long productId);

    void updateProduct(ProductDto productDto);

    List<ProductDto> searchProduct(String name);

    List<ProductDto> searchProductByNameLike(String productName);

    Page<Product> getAll(int pageSize, int pageNumber);

    ProductDto getProduct(Long productId);

}
