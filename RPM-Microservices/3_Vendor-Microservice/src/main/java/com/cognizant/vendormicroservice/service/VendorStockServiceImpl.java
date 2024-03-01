package com.cognizant.vendormicroservice.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.vendormicroservice.dao.VendorDAO;
import com.cognizant.vendormicroservice.dao.VendorStockDAO;
import com.cognizant.vendormicroservice.dto.VendorDTO;
import com.cognizant.vendormicroservice.entity.Vendor;
import com.cognizant.vendormicroservice.entity.VendorStock;
import com.cognizant.vendormicroservice.exception.ProductIdNotFoundException;
import com.cognizant.vendormicroservice.exception.QuantityLimitExceededException;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class VendorStockServiceImpl implements VendorStockService {
	
	@Autowired
	private VendorDAO vendorDAOImpl;
	
	@Autowired
	private VendorStockDAO vendorStockDAOImpl;
	
	@Override
	public void saveVendorDetails(VendorStock vendorStock) {
		log.info("To save Vendor Details in Vendor Stock from saveVendorDetails Method");
		vendorStockDAOImpl.saveVendorDetailsDao(vendorStock);
	}
	
	@Override
	public int getMaxStockCount(Integer productId) {
		log.info("To Get Maximum Stock from the Vendor's Stock Details from getMaxStockCount method");
		return vendorStockDAOImpl.getMaxStockCountDao(productId);
	}
	
	@Override
	public List<Integer> getvendorIdsForGivenProduct(Integer productId){
		log.info("To Get Available Vendor Id for the given ProdcutID from getvendorIdsForGivenProduct Method");
		return vendorStockDAOImpl.getvendorIdsForGivenProductDao(productId);
	}
	
	@Override
	public List<Integer> getvendorIdsWithAvailableQuantity(Integer productId, int quantity){
		log.info("To Get Vendor Ids who are having enough quantity of stocks from getvendorIdsWithAvailableQuantity method");
		return vendorStockDAOImpl.getvendorIdsWithAvailableQuantityDao(productId,quantity);		
	}
	
	@Override
	public VendorStock getVendorStockDetails(Integer productId, Integer vendorId) {
		log.info("To Get Vendor Stock Details from getVendorStockDetails method");
		return vendorStockDAOImpl.getVendorStockDetailsDao(productId,vendorId);
		
	}
	
	@Override
	public VendorDTO getBestVendor(Integer productId, Integer quantity) throws ProductIdNotFoundException, QuantityLimitExceededException{
		log.info("Get Best Vendor from Vendor Stock Service Method");
		if (getvendorIdsForGivenProduct(productId).isEmpty()) {
			throw new ProductIdNotFoundException(
					"Product with the id [" + productId + "] is not present in the vendors stock");
		}

		// quantity exception
		int maxQuantity = getMaxStockCount(productId);
		if (quantity > maxQuantity) {
			throw new QuantityLimitExceededException(
					"The Quantity You wont is more then the available quantity!, Please enter quantity of the product below limit of ["
							+ maxQuantity + "] units");
		}

		List<Integer> vendorIdList = getvendorIdsWithAvailableQuantity(productId, quantity);
		System.out.println(vendorIdList);

		Vendor finalVendor = null;
		VendorStock vendorStock = null;
		double temp = Double.MIN_VALUE;
		
		for (Integer id : vendorIdList) {
			Vendor vendor = vendorDAOImpl.getVendorDetailsByIdDao(id);
			
			if (temp < vendor.getRating()) {
				temp = vendor.getRating();
				finalVendor = vendor;
			}
		}
		System.out.println(finalVendor);
		if (finalVendor != null) {
			vendorStock = getVendorStockDetails(productId, finalVendor.getVendorId());
			vendorStock.setStockInHand(vendorStock.getStockInHand() - quantity);
			saveVendorDetails(vendorStock);
		} else {
			return new VendorDTO();

		}
		ModelMapper mapper = new ModelMapper();
		VendorDTO vendorDTO =  new VendorDTO();
		mapper.map(finalVendor, vendorDTO);
		return vendorDTO;
	
	}

}
