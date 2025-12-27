//package com.SmartGrader.Controller;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.SmartGrader.DTO.LoginRequest;
//import com.SmartGrader.DTO.LoginResponse;
//import com.SmartGrader.Entity.Student;
//import com.SmartGrader.Repository.Studentrepo;
//import com.SmartGrader.Service.MailSenderService;
//
//import jakarta.mail.MessagingException;
//
//@RequestMapping("/students")
//@RestController
//@CrossOrigin(origins = "*")
//public class StudentContoller {
//
//    @Autowired
//    private Studentrepo studentRepository;
//
//    @Autowired
//    private MailSenderService mailSenderService;
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@RequestBody Student student) throws MessagingException {
//        Optional<Student> existingStudent = studentRepository.findByEmail(student.getEmail());
//        if (existingStudent.isPresent()) {
//            return ResponseEntity.status(HttpStatus.CONFLICT)
//                    .body("User with email " + student.getEmail() + " already exists.");
//        }
//        Student savedStudent = studentRepository.save(student);
//
//        // Send welcome email after signup
//        mailSenderService.sendWelcomeEmail(savedStudent.getEmail(), savedStudent.getName());
//
//        System.out.println(student.getEmail() + " registered");
//        return ResponseEntity.ok(savedStudent);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        Optional<Student> existingStudentOpt = studentRepository.findByEmail(loginRequest.getEmail());
//
//        if (existingStudentOpt.isPresent()) {
//            Student existingStudent = existingStudentOpt.get();
//
//            if (existingStudent.getPassword().equals(loginRequest.getPassword())) {
//                LoginResponse response = new LoginResponse(
//                        existingStudent.getName(),
//                        existingStudent.getEmail(),
//                        existingStudent.getFinalScore() // null if not attempted
//                );
//
//                return ResponseEntity.ok(response);
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body("Incorrect password");
//            }
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body("User with email " + loginRequest.getEmail() + " not found.");
//        }
//    }
//
//    @GetMapping("/score")
//    public ResponseEntity<?> getFinalScore(@RequestParam String email) {
//        Optional<Student> studentOpt = studentRepository.findByEmail(email);
//        if (studentOpt.isPresent()) {
//            Student student = studentOpt.get();
//            Integer finalScore = student.getFinalScore();
//            if (finalScore == null) {
//                return ResponseEntity.ok("The student has not attempted the quiz yet.");
//            }
//            return ResponseEntity.ok(finalScore);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body("User with email " + email + " not found.");
//        }
//    }
//}
//





package com.SmartGrader.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.SmartGrader.DTO.LoginRequest;
import com.SmartGrader.DTO.LoginResponse;
import com.SmartGrader.Entity.Student;
import com.SmartGrader.Service.MailSenderService;
import com.SmartGrader.Service.StudentService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentContoller {

    @Autowired
    private StudentService studentService;

    @Autowired
    private MailSenderService mailSenderService;

    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Student student) throws MessagingException {

        Optional<Student> existingStudent = studentService.getStudentByEmail(student.getEmail());
        if (existingStudent.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User with email " + student.getEmail() + " already exists.");
        }

        Student savedStudent = studentService.registerStudent(student);

        mailSenderService.sendWelcomeEmail(savedStudent.getEmail(), savedStudent.getName());

        return ResponseEntity.ok(savedStudent);
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        Optional<Student> studentOpt =
                studentService.validateLogin(
                        loginRequest.getEmail(),
                        loginRequest.getPassword());

        if (studentOpt.isPresent()) {

            Student student = studentOpt.get();

            LoginResponse response = new LoginResponse(
                    student.getName(),
                    student.getEmail(),
                    student.getFinalScore()
            );

            return ResponseEntity.ok(response);

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }
    }

    
    @GetMapping("/score")
    public ResponseEntity<?> getFinalScore(@RequestParam String email) {

        Optional<Student> studentOpt = studentService.getStudentByEmail(email);

        if (studentOpt.isPresent()) {
            Integer score = studentOpt.get().getFinalScore();
            return score == null
                    ? ResponseEntity.ok("The student has not attempted the quiz yet.")
                    : ResponseEntity.ok(score);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User with email " + email + " not found.");
    }
}

