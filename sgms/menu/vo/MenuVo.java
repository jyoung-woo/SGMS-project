package com.sodasys.sgms.menu.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuVo {
    String menuId;
    String menuNm;
    String url;
    String upId;
    int depth;
    String authCd;
    String acesCd;
    int order;
    public MenuVo(String url, String acesCd) {
        this.url = url;
        this.acesCd = acesCd;
    }
}
