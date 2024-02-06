package com.sodasys.sgms.obsvData.service;

import com.sodasys.sgms.obsvData.vo.ObsvDataVo;
import com.sodasys.sgms.obsvData.vo.ObsvWeaherVo;

import java.util.List;

/**
 * packageName    : com.sodasys.sgms.obsvData.service
 * fileName       : ObsvDataService
 * author         : 이예지
 * date           : 2024-01-31
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-31        이예지            최초 생성
 */
public interface ObsvDataService {
    List<ObsvDataVo> data(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> tableList(ObsvDataVo obsvDataVo);
    int tableListCnt(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> excel(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> detailContents(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> getObsvInfoBox(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> getSensorBox(ObsvDataVo obsvDataVo);
    List<ObsvWeaherVo> weatherList(ObsvWeaherVo obsvWeaherVo);
    int weatherCnt(ObsvWeaherVo obsvWeaherVo);
    List<ObsvWeaherVo> weatherExcel(ObsvWeaherVo obsvWeaherVo);
}
