package com.sodasys.sgms.user.service.impl;

import com.sodasys.sgms.comn.mail.MailUtile;
import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.user.mapper.UserMapper;
import com.sodasys.sgms.user.service.UserService;
import com.sodasys.sgms.user.vo.UserVo;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("userService")
public class UserServiceImpl extends EgovAbstractServiceImpl implements UserService , UserDetailsService {
    @Resource(name="userMapper")
    private UserMapper userMapper;
    @Autowired
    private MailUtile mailUtile;
    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserVo user = userMapper.login(username);
        if(user == null){
            throw new UsernameNotFoundException(username);
        }
        return user;
    }

    @Override
    public List<UserVo> getUserList(ScrollVo scrollVo) {
        return userMapper.getUserList(scrollVo);
    }

    @Override
    public int getUserCnt(ScrollVo scrollVo) {
        return userMapper.getUserCnt(scrollVo);
    }

    @Override
    public UserVo getUserDetail(UserVo user) {
        return userMapper.getUserDetail(user);
    }

    @Override
    public int userUpdate(UserVo user) {
        return userMapper.userUpdate(user);
    }

    @Override
    public int userDelete(String userId) {
        return userMapper.userDelete(userId);
    }

    @Override
    public int userAdd(UserVo user) {
        user.setUserPwd(mailUtile.sendMail(user.getUserEmail(),""));
        return userMapper.userAdd(user);
    }

    @Override
    public int userPwdInit(UserVo user) {
        user.setUserPwd(mailUtile.sendMail(user.getUserEmail(),"init"));
        return userMapper.userPwdInit(user);
    }

    @Override
    public int userPwdUpdate(UserVo user) {
        String userId =((UserVo) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserId();
        user.setUserId(userId);
        user.setInitPwdYn("N");
        user.setUserPwd(passwordEncoder.encode(user.getUserPwd()));
        return userMapper.userPwdUpdate(user);
    }

    @Override
    public void loginFail(String userId) {
        userMapper.loginFail(userId);
        int cnt = userMapper.getUserFailCnt(userId);
        if(cnt==5){
            UserVo user = new UserVo();
            user.setUserId(userId);
            user.setLockYn("Y");
            userMapper.userLockUpdate(user);
        }
    }

    @Override
    public void loginSuccess(String userId) {
        userMapper.loginSuccess(userId);
    }
}
