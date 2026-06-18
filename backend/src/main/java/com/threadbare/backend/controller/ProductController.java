package com.threadbare.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.threadbare.backend.model.Product;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private static final List<Product> PRODUCTS = List.of(
        new Product(1L, "T-shirt", new BigDecimal("99.99"), "Tops", "https://picsum.photos/id/1/200/300"),
        new Product(2L, "Jeans", new BigDecimal("79.99"), "Bottoms", "https://picsum.photos/id/1/200/300"),
        new Product(3L, "Hoddie", new BigDecimal("45.00"), "Outerwear", "https://picsum.photos/id/1/200/300"),
        new Product(4L, "Hat", new BigDecimal("199.99"), "Tops", "https://picsum.photos/id/1/200/300"),
        new Product(5L, "Black Jeans", new BigDecimal("55.00"), "Bottoms", "https://picsum.photos/id/1/200/300"),
        new Product(6L, "Jacket", new BigDecimal("55.00"), "Outerwear", "https://picsum.photos/id/1/200/300")
    );
    
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(PRODUCTS);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> byId(@PathVariable Long id) {
        Product product = PRODUCTS.stream()
                .filter(p-> p.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
                
        return ResponseEntity.ok(product);
    }
}
