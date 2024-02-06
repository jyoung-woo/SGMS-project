package com.sodasys.sgms.user.controller;

import com.sodasys.sgms.comn.excelUtil.ExcelUtil;
import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.user.service.UserService;
import com.sodasys.sgms.user.vo.UserVo;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;

@Controller
public class UserController {
    @Resource(name="userService")
    private UserService userService;
    /**
     * 사용자관리 페이지 이동
     * @return 사용자 관리 페이지
     */
    @RequestMapping(value = "/userMng" , method = RequestMethod.GET)
    public String userListPage(){
        return "/user/userMng";
    }
    /**
     * 사용자 스크롤 데이터
     * @param scrollVo 스크롤 => page , limit
     * @return 사용자 목록 라스트 + 사용자 수
     */
    @RequestMapping(value = "/userMng/getList" , method = RequestMethod.GET)
    public ResponseEntity<HashMap<String,Object>> userList(ScrollVo scrollVo){
        HashMap<String,Object> result = new HashMap<String , Object>();
        result.put("data" , userService.getUserList(scrollVo));
        result.put("cnt" , userService.getUserCnt(scrollVo));
        return ResponseEntity.ok(result);
    }
    /**
     * 사용자 정보 불러오기
     * @param userVo 조회할 사용자 id
     * @return 사용자정보
     */
    @RequestMapping(value = "/userMng/getUserDetail" , method = RequestMethod.GET)
    public ResponseEntity<UserVo> getUserDetail(UserVo userVo){
        UserVo result = userService.getUserDetail(userVo);
        return ResponseEntity.ok(result);
    }
    /**
     * 사용자 목로 엑셀 다운로드
     * @param scrollVo 검색데이터 => searchKeyword , searchType
     * @param response 엑셀파일
     */
    @RequestMapping(value = "/userMng/getList/excelDownload" , method = RequestMethod.GET)
    public void userListExcelDownload(ScrollVo scrollVo , HttpServletResponse response){
        List<UserVo> result = userService.getUserList(scrollVo);
        ExcelUtil.excelDownload(result, "obsvList", response);
    }

    /**
     * 사용자 정보 수정
     * @param vo 사용자 정보
     * @return 변경시 1
     */
    @RequestMapping(value = "/userMng/userUpdate",method = RequestMethod.PUT)
    public ResponseEntity<?> userUpdate(@RequestBody UserVo vo){
        int result = userService.userUpdate(vo);
        return ResponseEntity.ok(result);
    }

    /**
     * 사용자 계정 사용여부 N 처리
     * @param userId 변경할 사용자 아이디
     * @return 성공시 1
     */
    @RequestMapping(value = "/userMng/userDelete" , method = RequestMethod.DELETE)
    public ResponseEntity<?> userDelete(String userId){
        int result = userService.userDelete(userId);
        return ResponseEntity.ok(result);
    }

    /**
     * 사용자추가
     * @param user 추가할 사용자 정보
     * @return 성공시 1 : 500
     */
    @RequestMapping(value = "/userMng/userAdd" , method = RequestMethod.POST)
    public ResponseEntity<?> userAdd(@RequestBody UserVo user){
        int result = userService.userAdd(user);
        if(result>0){
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(500).body("ERROR");
        }
    }
    @RequestMapping(value = "/userMng/initPwd" , method = RequestMethod.POST)
    public ResponseEntity<?> userPwdInit(@RequestBody UserVo user){
        int result = userService.userPwdInit(user);
        if(result>0){
            return ResponseEntity.ok(result);
        }else{
            return ResponseEntity.status(500).body("ERROR");
        }
    }
    @RequestMapping(value = "/comm/userPwdUpdate" , method = RequestMethod.PUT)
    public ResponseEntity<?> userPwdUpdate(@RequestBody UserVo user){
        int result = userService.userPwdUpdate(user);
        return ResponseEntity.ok(result);
    }

}
