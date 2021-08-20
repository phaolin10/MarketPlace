package com.example.finalproject.controller;

import com.example.finalproject.dto.ProductDto;
import com.example.finalproject.repository.ProductRepository;
import com.example.finalproject.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/product")
public class ProductController {

    private ProductService productService;
    private ProductRepository productRepository;

    @Autowired
    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @GetMapping("/get-all")
    public ResponseEntity<?>productList(@RequestParam(name = "pageSize", defaultValue = "2") int pageSize,
                                      @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber)
    {
        return ResponseEntity.ok(productService.getAll(pageSize,pageNumber));
    }

    @GetMapping("/get-product/{productId}")
    public ProductDto getProduct(@PathVariable Long productId) {
        return productService.getProduct(productId);
    }

    @PostMapping("/add-product")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void addProduct(@RequestBody ProductDto productDto) {
        productService.createProduct(productDto);
    }

    @PostMapping("/update-product")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProduct(@RequestBody ProductDto productDto) {
        productService.updateProduct(productDto);
        return ResponseEntity.ok(200);
    }

    @DeleteMapping("/delete-product/{productId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteProduct(@PathVariable Long productId){
        productService.deleteProduct(productId);
    }

    @GetMapping("/search-product/{productName}")
    public List<ProductDto> getSearchedProducts(@PathVariable String productName){
        return productService.searchProductByNameLike(productName);
    }

}
