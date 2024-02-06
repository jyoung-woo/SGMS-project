package com.sodasys.sgms.realTime.vo;

import com.sodasys.sgms.comn.excelUtil.annotation.ExcelColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * packageName    : com.sodasys.sgms.realTime.vo
 * fileName       : RealTimeVo
 * author         : 이예지
 * date           : 2024-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-23        이예지            최초 생성
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RealTimeVo extends SearchVo {
    @ExcelColumn(headerName = "관측소명")
    String obsvNm;
    @ExcelColumn(headerName = "관측소 코드")
    String obsvCd;
    @ExcelColumn(headerName = "모뎀 번호")
    String modemTel;
    @ExcelColumn(headerName = "관측시간")
    String msrtDt;
    @ExcelColumn(headerName = "굴착깊이")
    double digDepth;
    @ExcelColumn(headerName = "표고")
    double elev;
    @ExcelColumn(headerName = "수위(EL.m)")
    String el;
    @ExcelColumn(headerName = "수위(GL.m)")
    String gl;
    @ExcelColumn(headerName = "수온(℃)")
    String temp;
    @ExcelColumn(headerName = "EC(μS/cm)")
    String ec;
    @ExcelColumn(headerName = "대기압(bar)")
    String bar;
    @ExcelColumn(headerName = "배터리(V)")
    String battery;
}
