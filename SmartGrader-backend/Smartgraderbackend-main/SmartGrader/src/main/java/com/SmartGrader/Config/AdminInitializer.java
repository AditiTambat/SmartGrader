package com.SmartGrader.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.SmartGrader.Entity.Admin;
import com.SmartGrader.Repository.AdminRepository;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner initAdmin(AdminRepository adminRepo, PasswordEncoder encoder) {
        return args -> {
            String email = "aditambat10@gmail.com";
            if (adminRepo.findByEmail(email).isEmpty()) {
                Admin admin = new Admin();
                admin.setEmail(email);
                admin.setPassword(encoder.encode("pass@123"));
                adminRepo.save(admin);
                System.out.println("Owner admin created: " + email);
            }
        };
    }
}
