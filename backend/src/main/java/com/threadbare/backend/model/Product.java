package com.threadbare.backend.model;

import java.math.BigDecimal;

public record Product(
    Long id,
    String name,
    BigDecimal price,
    String category,
    String image
){}
