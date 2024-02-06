package com.sodasys.sgms.obsvData.vo;

import com.sodasys.sgms.comn.excelUtil.annotation.ExcelColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * packageName    : com.sodasys.sgms.obsvData.vo
 * fileName       : ObsvDataVo
 * author         : 이예지
 * date           : 2024-02-03
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-02-03        이예지            최초 생성
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ObsvDataVo {
    @ExcelColumn(headerName = "관측소명")
    String obsvNm;
    @ExcelColumn(headerName = "센서")
    String sensorId;
    @ExcelColumn(headerName = "날짜")
    String msrtDt;
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
    @ExcelColumn(headerName = "배터리 전압(V)")
    String battery;
    @ExcelColumn(headerName = "태양광 전압(V)")
    String sBattery;
    String rainfall;
    String obsvCd;
    String modemTel;
}
