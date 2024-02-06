package com.sodasys.sgms.menu.mapper;

import com.sodasys.sgms.menu.vo.MenuVo;
import com.sodasys.sgms.user.vo.UserVo;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

@Mapper("menuMapper")
public interface MenuMapper {
    MenuVo authCheck(MenuVo menuVo);

    List<MenuVo> getLeftMenu(String authCd);
}
