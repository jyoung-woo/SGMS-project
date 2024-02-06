package com.sodasys.sgms.comn.test.controller;

import com.sodasys.sgms.comn.test.vo.TestVo;
import com.sodasys.sgms.user.vo.UserVo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TestController {
    @RequestMapping("/test")
    public String testPage(TestVo vo){
        return "/test/test";
    }
}
