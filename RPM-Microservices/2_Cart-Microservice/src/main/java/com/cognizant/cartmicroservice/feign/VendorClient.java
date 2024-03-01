package com.cognizant.cartmicroservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cognizant.cartmicroservice.entity.Vendor;





@FeignClient(value="VENDOR-SERVICE",url = "http://localhost:5002/vendor")
public interface VendorClient {
	@GetMapping(value= {"/getBestVendor/{productId}/{quantity}"})
	public Vendor getBestVendor(@PathVariable Integer productId, @PathVariable Integer quantity);
	
	@GetMapping(value={"/getVendorDetails/{vendorId}"})
	public Vendor getVendorDetails(@PathVariable Integer vendorId);
	
	

}
