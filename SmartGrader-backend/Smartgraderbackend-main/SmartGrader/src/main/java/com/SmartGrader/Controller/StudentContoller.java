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

