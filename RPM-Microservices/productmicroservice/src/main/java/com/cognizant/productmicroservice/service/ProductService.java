package com.cognizant.productmicroservice.service;

import java.util.List;

import com.cognizant.productmicroservice.dto.ProductDTO;
import com.cognizant.productmicroservice.exception.ProductNotFoundException;
import com.cognizant.productmicroservice.exception.RatingGreaterThan5Exception;

public interface ProductService {

	ProductDTO searchProductById(Integer id);

	ProductDTO searchProductByName(String name);

	void addProductRating(Integer id, int rating) throws ProductNotFoundException, RatingGreaterThan5Exception;

	List<ProductDTO> getAllProducts();

}