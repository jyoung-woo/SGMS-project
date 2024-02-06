package com.sodasys.sgms.main.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;


@Controller
@Slf4j
public class MainController {
    @RequestMapping(value = "/main" , method = RequestMethod.GET)
    public String mainPage(@RequestParam(required = false , defaultValue = "") String msg , HttpServletRequest request){
        if(msg.equals("noLogin")){
            request.getSession().setAttribute("loginFailMsg", "로그인을 해주세요");
        }
        return "/main";
    }    
}
