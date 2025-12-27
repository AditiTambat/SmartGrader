//package com.SmartGrader.Service;
//
//import org.springframework.stereotype.Service;
//
//@Service
//public class StudentService {
//
//}


package com.SmartGrader.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.SmartGrader.Entity.Student;
import com.SmartGrader.Repository.Studentrepo;

@Service
public class StudentService {

    @Autowired
    private Studentrepo studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    public Student registerStudent(Student student) {

       
        student.setPassword(passwordEncoder.encode(student.getPassword()));

        return studentRepository.save(student);
    }

   
    public Optional<Student> validateLogin(String email, String rawPassword) {

        Optional<Student> studentOpt = studentRepository.findByEmail(email);

        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();

            if (passwordEncoder.matches(rawPassword, student.getPassword())) {
                return Optional.of(student);
            }
        }
        return Optional.empty();
    }

    
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}

