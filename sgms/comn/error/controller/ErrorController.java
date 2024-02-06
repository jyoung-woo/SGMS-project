package com.sodasys.sgms.comn.error.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController {
    @RequestMapping("/404")
    public String error404(){
        return "404";
    }
    @RequestMapping("/403")
    public String error403(){
        return "403";
    }
    @RequestMapping("/500")
    public String error00(){
        return "500";
    }
}
