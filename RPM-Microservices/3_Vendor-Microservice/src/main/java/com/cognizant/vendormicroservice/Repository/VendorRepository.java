package com.cognizant.vendormicroservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognizant.vendormicroservice.entity.Vendor;

public interface VendorRepository extends JpaRepository<Vendor, Integer>{

}
