package com.sodasys.sgms.user.mapper;

import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.user.vo.UserVo;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

@Mapper("userMapper")
public interface UserMapper {
    UserVo login(String usrId);
    List<UserVo> getUserList(ScrollVo scrollVo);
    int getUserCnt(ScrollVo scrollVo);
    UserVo getUserDetail(UserVo user);
    int userUpdate(UserVo user);
    int userDelete(String userId);
    int userAdd(UserVo user);
    int userPwdInit(UserVo user);
    int userPwdUpdate(UserVo user);
    void loginFail(String userId);
    int getUserFailCnt(String userId);
    void loginSuccess(String userId);
    void userLockUpdate(UserVo user);
}
