package com.SmartGrader.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    // Sending welcome email after signup (HTML)
    public void sendWelcomeEmail(String toEmail, String studentName) throws MessagingException {
        String subject = "Welcome to SmartGrader!";
        String body = buildWelcomeEmailHtml(studentName);
        sendHtmlEmail(toEmail, subject, body);
    }

    // Send quiz completion email with final score (HTML)
    public void sendQuizCompletionEmail(String toEmail, String studentName, int finalScore) throws MessagingException {
        String subject = "Quiz Completed! Your Final Score";
        String body = buildQuizCompletionEmailHtml(studentName, finalScore);
        sendHtmlEmail(toEmail, subject, body);
    }

    // Utility method to send HTML email
    private void sendHtmlEmail(String toEmail, String subject, String htmlBody) throws MessagingException {
        System.out.println("Sending email to: " + toEmail + " with subject: " + subject);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        helper.setTo(toEmail);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);  // true = isHtml
        helper.setFrom("aditambat10@gmail.com"); 

        mailSender.send(message);

        System.out.println("Email sent successfully to: " + toEmail);
    }

   //HTML build for welcome Email.
    private String buildWelcomeEmailHtml(String studentName) {
    	return "<html>" +
    		       "<body style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#f4f6f8; margin:0; padding:20px;\">" +
    		       "  <div style=\"max-width: 600px; background: #ffffff; margin: 40px auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); color: #333;\">" +
    		       "    <h2 style=\"color:#2E86C1; margin-top: 0;\">Welcome to SmartGrader, " + studentName + "!</h2>" +
    		       "    <p style=\"font-size: 1.1em;\">Thank you for signing up at <strong>SmartGrader</strong>. We're excited to have you onboard.</p>" +
    		       "    <p style=\"font-size: 1em; margin-top: 20px;\">Get ready to challenge yourself and improve your skills!</p>" +
    		       "    <hr style=\"border:none; border-top:1px solid #eee; margin: 30px 0;\"/>" +
    		       "    <p style=\"font-size: 0.85em; color: #666; text-align: center;\">" +
    		       "      Developed by <a href=\"mailto:aditambat10@gmail.com\" style=\"color:#2E86C1; text-decoration:none;\">aditambat10@gmail.com</a>" +
    		       "    </p>" +
    		       "  </div>" +
    		       "</body>" +
    		       "</html>";

    }

    // Build HTML for quiz completion email
    private String buildQuizCompletionEmailHtml(String studentName, int finalScore) {
    	return "<html>" +
    		       "<body style=\"font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#f4f6f8; margin:0; padding:20px;\">" +
    		       "  <div style=\"max-width: 600px; background: #ffffff; margin: 40px auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); color: #333;\">" +
    		       "    <h2 style=\"color:#27AE60; margin-top: 0;\">Congratulations, " + studentName + "!</h2>" +
    		       "    <p style=\"font-size: 1.1em;\">You have successfully completed the quiz.</p>" +
    		       "    <p style=\"font-size: 1.5em; font-weight: bold; color: #E67E22; margin: 20px 0;\">" +
    		       "      Your final score is: " + finalScore + " / 50" +
    		       "    </p>" +
    		       "    <p style=\"font-size: 1em;\">Keep up the great work and continue learning!</p>" +
    		       "    <hr style=\"border:none; border-top:1px solid #eee; margin: 30px 0;\"/>" +
    		       "    <p style=\"font-size: 0.85em; color: #666; text-align: center;\">" +
    		       "      Developed by <a href=\"mailto:aditambat10@gmail.com\" style=\"color:#27AE60; text-decoration:none;\">aditambat10@gmail.com</a>" +
    		       "    </p>" +
    		       "  </div>" +
    		       "</body>" +
    		       "</html>";

    }
}


