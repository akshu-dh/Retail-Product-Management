package com.cognizant.vendormicroservice.service;

import com.cognizant.vendormicroservice.dto.VendorDTO;

public interface VendorService {

	VendorDTO getVendorDetailsById(Integer vendorId);

}