package com.cognizant.cartmicroservice.service;

import com.cognizant.cartmicroservice.entity.Vendor;

public interface VendorService {

	Vendor getVendorById(Integer vendorId);

	Vendor getVendorDetails(Integer productId, Integer quantity);

}