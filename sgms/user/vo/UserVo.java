package com.sodasys.sgms.user.vo;

import com.sodasys.sgms.comn.excelUtil.annotation.ExcelColumn;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserVo implements UserDetails {
    @ExcelColumn(headerName = "아이디")
    String userId;
    @ExcelColumn(headerName = "이메일")
    String userEmail;
    @ExcelColumn(headerName = "회사명")
    String companyNm;
    @ExcelColumn(headerName = "사용여부")
    String useYn;

    int rowNum;
    String lockYn;
    String initPwdYn;
    int failCnt;
    String stdgCd;
    String userPwd;
    String authCd;
    String doc;
    String userEndYmd;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + authCd));
        return authorities;
    }

    @Override
    public String getPassword() {
        return userPwd;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return lockYn.equals("N");
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return useYn.equals("Y");
    }
}
