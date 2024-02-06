package com.sodasys.sgms.comn.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Component
public class MailUtile {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;
    public String sendMail(String userEmail, String type) {
        String htmlContent ="";
        String randomString = generateRandomString(10);
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper;
        try {
            helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(userEmail);
            if(type.equals("init")){
                helper.setSubject("SODASYSTEM SGMS 비밀번호 초기화.");
                htmlContent += "<h1>비밀번호를 초기화 합니다.</h1>";
                htmlContent += "<p> 로그인후 변경해주세요 </p><br>";
                htmlContent += "<p>임시비밀번호 : " + randomString + "</p>";
            }else{
                helper.setSubject("SODASYSTEM SGMS 가입을 축하드립니다.");
                htmlContent += "<h1>가입을 축하드립니다.</h1>";
                htmlContent += "<p> 로그인후 변경해주세요 </p><br>";
                htmlContent += "<p>비밀번호 : " + randomString + "</p>";
            }
            helper.setText(htmlContent, true);
            mailSender.send(message);
            return passwordEncoder.encode(randomString);
        } catch (MessagingException e) {
            e.printStackTrace();
            return null;
        }
    }
    public static String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+";
        StringBuilder randomStringBuilder = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            randomStringBuilder.append(randomChar);
        }
        return randomStringBuilder.toString();
    }
}
