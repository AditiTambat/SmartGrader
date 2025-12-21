package com.SmartGrader.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SmartGrader.Entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
	
	//Optional<Admin> findByUsername(String username);

	 Optional<Admin> findByEmail(String email);
	
}
