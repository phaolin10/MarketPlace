package com.example.finalproject.service.impl;

import com.example.finalproject.dto.ProductDto;
import com.example.finalproject.exception.ProductNotFoundException;
import com.example.finalproject.model.Product;
import com.example.finalproject.repository.ProductRepository;
import com.example.finalproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public void createProduct(ProductDto productDto) {
        final Product product = Product.builder()
                .productName(productDto.getProductName())
                .price(productDto.getPrice())
                .price(productDto.getPrice())
                .inStock(productDto.getInStock())
                .build();
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            // product not found
        }
    }

    @Override
    public void updateProduct(ProductDto productDto) {
        if (productRepository.existsById(productDto.getId())) {
            final Product product = Product
                    .builder()
                    .id(productDto.getId())
                    .productName(productDto.getProductName())
                    .price(productDto.getPrice())
                    .inStock(productDto.getInStock())
                    .description(productDto.getDescription())
                    .build();
            productRepository.save(product);
        }
    }

    @Override
    public List<ProductDto> searchProduct(String name) {
        return null;
    }

    @Override
    public List<ProductDto> searchProductByNameLike(String productName) {
        List<Product> productList = productRepository.findProductByProductNameContaining(productName);
        List<ProductDto> productDtos = new ArrayList<>();

        productList.forEach(item -> {
            ProductDto productDto = ProductDto.builder()
                    .productName(item.getProductName())
                    .description(item.getDescription())
                    .price(item.getPrice())
                    .inStock(item.getInStock())
                    .build();
            productDtos.add(productDto);
        });
        return productDtos;
    }

    @Override
    public Page<Product> getAll(int pageSize, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return productRepository.findAll(pageable);
    }

    @Override
    public ProductDto getProduct(Long productId) {
        if (productRepository.existsById(productId)) {
            Product product = productRepository.findProductById(productId);
            ProductDto productDto = ProductDto.builder()
                    .productName(product.getProductName())
                    .description(product.getDescription())
                    .price(product.getPrice())
                    .inStock(product.getInStock())
                    .build();
            return productDto;
        } else {
            throw new ProductNotFoundException();
        }


    }
}
