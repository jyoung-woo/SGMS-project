package com.sodasys.sgms.comn.scroll.vo;

import com.sodasys.sgms.comn.vo.UserInfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ScrollVo extends UserInfo {
    int page;
    int limit = 30;
    int offSet;
    String searchKeyword = "";
    String searchType = "";
    String excel;
    
    public void setPage(int page) {
        this.page = page;
        this.offSet = page * this.limit;
    }
}
