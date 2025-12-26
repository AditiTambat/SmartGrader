package com.SmartGrader.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.SmartGrader.DTO.QuestionDTO;
import com.SmartGrader.Entity.Question;
import com.SmartGrader.Entity.Student;
import com.SmartGrader.Entity.StudentAnswer;
import com.SmartGrader.Exceptions.QuizAlreadySubmittedException;
import com.SmartGrader.Repository.Questionrepo;
import com.SmartGrader.Repository.Studentanswerrepo;
import com.SmartGrader.Repository.Studentrepo;
import com.SmartGrader.Service.MailSenderService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins="*")
public class QuizController {

    @Autowired
    private Questionrepo questionRepo;

    @Autowired
    private Studentrepo studentRepo;

    @Autowired
    private Studentanswerrepo studentAnswerRepo;

    @Autowired
    private MailSenderService mailSenderService;  // inject mail sender service

    @GetMapping("/start")
    public List<QuestionDTO> startQuiz(@RequestParam String email) {
        Student student = studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        boolean hasAttempted = studentAnswerRepo.existsByStudent(student);
        if (hasAttempted) {
            throw new RuntimeException("You have already attempted the quiz.");
        }

        return questionRepo.findAllByOrderByIdAsc().stream()
                .map(q -> new QuestionDTO(
                        q.getId(),
                        q.getQuestionText(),
                        q.getOptionA(),
                        q.getOptionB(),
                        q.getOptionC(),
                        q.getOptionD()
                ))
                .collect(Collectors.toList());
    }

    @PostMapping("/submit")
    public int submitQuiz(@RequestParam String email, @RequestBody List<StudentAnswer> answers) throws MessagingException, QuizAlreadySubmittedException {
        Student student = studentRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (studentAnswerRepo.existsByStudent(student)) {
            throw new QuizAlreadySubmittedException("You have already submitted the quiz.");
        }

        int score = 0;
        for (StudentAnswer ans : answers) {
            ans.setStudent(student);
            Question q = questionRepo.findById(ans.getQuestion().getId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));
            ans.setQuestion(q);

            String selected = ans.getSelectedAnswer() != null ? ans.getSelectedAnswer().trim() : "";
            String correct = q.getCorrectAnswer() != null ? q.getCorrectAnswer().trim() : "";

            if (selected.equalsIgnoreCase(correct)) {
                score++;
            }

            studentAnswerRepo.save(ans);
        }

        // Save the final score in the student entity
        student.setFinalScore(score);
        studentRepo.save(student);

        // Send quiz completion email
        System.out.println("sending the completion score email....");
        mailSenderService.sendQuizCompletionEmail(student.getEmail(), student.getName(), score);

        System.out.println("Final Score: " + score);
        return score;
    }
}
