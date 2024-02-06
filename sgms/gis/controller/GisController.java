package com.sodasys.sgms.gis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class GisController {
    @RequestMapping(value = "/gis/map" , method = RequestMethod.GET)
    public String gisPage(){
        return "/gis";
    } 
}
