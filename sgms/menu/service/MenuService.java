package com.sodasys.sgms.menu.service;

import com.sodasys.sgms.menu.vo.MenuVo;

import java.util.List;

public interface MenuService {
    MenuVo authCheck(MenuVo menuVo);

    List<MenuVo> getLeftMenu(String authCd);

}
