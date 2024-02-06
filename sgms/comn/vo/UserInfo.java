package com.sodasys.sgms.comn.vo;

import com.sodasys.sgms.user.vo.UserVo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;

@Getter
@Setter
@AllArgsConstructor
public class UserInfo {
    String userId;
    String userEmail;
    String companyNm;
    String initPwdYn;
    String stdgCd;
    String authCd;

    public UserInfo() {
        UserVo vo = (UserVo) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        this.userId = vo.getUserId();
        this.userEmail = vo.getUserEmail();
        this.companyNm = vo.getCompanyNm();
        this.initPwdYn = vo.getInitPwdYn();
        this.stdgCd = vo.getStdgCd();
        this.authCd = vo.getAuthCd();
    }
}
