package com.sodasys.sgms.menu.service.impl;

import com.sodasys.sgms.menu.mapper.MenuMapper;
import com.sodasys.sgms.menu.service.MenuService;
import com.sodasys.sgms.menu.vo.MenuVo;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("menuService")
public class MenuServiceImpl extends EgovAbstractServiceImpl implements MenuService {
    @Resource(name = "menuMapper")
    private MenuMapper menuMapper;

    @Override
    public MenuVo authCheck(MenuVo menuVo) {
        String url = menuVo.getUrl();
        if(url.contains("404")) return new MenuVo("/404", "404");
        if(url.contains("403")) return new MenuVo("/403", "403");
        if(url.contains("500")) return new MenuVo("/500", "500");
        MenuVo menu = menuMapper.authCheck(menuVo);
        if (menu == null)  return new MenuVo("/404", "404");
        return menu;
    }

    @Override
    public List<MenuVo> getLeftMenu(String authCd) {
        return menuMapper.getLeftMenu(authCd);
    }
}
