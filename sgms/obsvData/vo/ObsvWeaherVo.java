package com.sodasys.sgms.obsvData.vo;

import com.sodasys.sgms.comn.excelUtil.annotation.ExcelColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * packageName    : com.sodasys.sgms.obsvData.vo
 * fileName       : ObsvWeaherVo
 * author         : 이예지
 * date           : 2024-02-05
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-02-05        이예지            최초 생성
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ObsvWeaherVo {
    @ExcelColumn(headerName = "관측소명")
    String obsvNm;
    @ExcelColumn(headerName = "센서")
    String sensorId;
    @ExcelColumn(headerName = "날짜")
    String msrtDt;
    @ExcelColumn(headerName = "풍향")
    String windDir;
    @ExcelColumn(headerName = "풍속")
    String windSpeed;
    @ExcelColumn(headerName = "대기온도")
    String airTemp;
    @ExcelColumn(headerName = "습도(%)")
    String humidity;
    @ExcelColumn(headerName = "강우량(mm)")
    String rainfall;
    @ExcelColumn(headerName = "대기압")
    String atmPressure;
    @ExcelColumn(headerName = "일사량")
    String solarRadiation;
    @ExcelColumn(headerName = "자외선")
    String uv;
    String obsvCd;
}
