package com.cognizant.vendormicroservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.vendormicroservice.dto.VendorDTO;
import com.cognizant.vendormicroservice.exception.ProductIdNotFoundException;
import com.cognizant.vendormicroservice.exception.QuantityLimitExceededException;
import com.cognizant.vendormicroservice.service.VendorService;
import com.cognizant.vendormicroservice.service.VendorStockService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*")
@Slf4j
@RestController
@RequestMapping(value={"/vendor"})
public class VendorController {	
	
	@Autowired
	private VendorService vendorServiceImpl;
	
	@Autowired
	private VendorStockService vendorStockServiceImpl;
	
	
	@GetMapping(value={"/getVendorDetails/{vendorId}"})
	public VendorDTO getVendorDetails(@PathVariable Integer vendorId) {
		log.info("Get Vendor Details from Controller method");
		return vendorServiceImpl.getVendorDetailsById(vendorId); 
	}
	
	@GetMapping(value= {"/getBestVendor/{productId}/{quantity}"})
	public VendorDTO getBestVendor(@PathVariable Integer productId, @PathVariable Integer quantity) throws ProductIdNotFoundException, QuantityLimitExceededException {
		log.info("Get Best Vendor Details from Controller method");
		return vendorStockServiceImpl.getBestVendor(productId,quantity);

	}

}
