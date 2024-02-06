package com.sodasys.sgms.comn.stdg.controller;

import com.sodasys.sgms.comn.stdg.service.StdgService;
import com.sodasys.sgms.comn.stdg.vo.StdgVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Controller
public class StdgController {
    @Resource(name="stdgService")
    private StdgService stdgService;
    @RequestMapping("/comm/ctpvList")
    public ResponseEntity<List<StdgVo>> getCtpvList(){
        List<StdgVo> result = stdgService.getCtpvList();
        return ResponseEntity.ok(result);
    }
    @RequestMapping("/comm/sggList")
    public ResponseEntity<List<StdgVo>> getSggList(StdgVo vo){
        List<StdgVo> result = stdgService.getSggList(vo);
        return ResponseEntity.ok(result);
    }
    @RequestMapping("/comm/sttyList")
    public ResponseEntity<List<StdgVo>> getSttyList(StdgVo vo){
        List<StdgVo> result = stdgService.getSttyList(vo);
        return ResponseEntity.ok(result);
    }
    @RequestMapping("/comm/stliList")
    public ResponseEntity<List<StdgVo>> getStliList(StdgVo vo){
        List<StdgVo> result = stdgService.getStliList(vo);
        return ResponseEntity.ok(result);
    }

}
