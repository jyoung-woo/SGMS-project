package com.sodasys.sgms.user.service;

import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.user.vo.UserVo;

import java.util.List;

public interface UserService {
    List<UserVo> getUserList(ScrollVo scrollVo);
    int getUserCnt(ScrollVo scrollVo);
    UserVo getUserDetail(UserVo user);
    int userUpdate(UserVo user);
    int userDelete(String userId);
    int userAdd(UserVo user);
    int userPwdInit(UserVo user);
    int userPwdUpdate(UserVo user);
    void loginSuccess(String userId);
    void loginFail(String userId);
}
