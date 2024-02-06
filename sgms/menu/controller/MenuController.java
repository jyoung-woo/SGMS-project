package com.sodasys.sgms.menu.controller;

import com.sodasys.sgms.menu.service.MenuService;
import com.sodasys.sgms.menu.vo.MenuVo;
import com.sodasys.sgms.user.vo.UserVo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Controller
public class MenuController {
    @Resource(name="menuService")
    private MenuService menuService;
    @GetMapping("/leftMenu")
    public ResponseEntity<List<MenuVo>> getLeftMenu(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserVo userVo = (UserVo)authentication.getPrincipal();
        List<MenuVo> result = menuService.getLeftMenu(userVo.getAuthCd());
        return ResponseEntity.ok(result);
    }
}
