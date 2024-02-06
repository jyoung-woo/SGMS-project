package com.sodasys.sgms.obsvData.mapper;

import com.sodasys.sgms.obsvData.vo.ObsvDataVo;
import com.sodasys.sgms.obsvData.vo.ObsvWeaherVo;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * packageName    : com.sodasys.sgms.obsvData.mapper
 * fileName       : ObsvDataMapper
 * author         : 이예지
 * date           : 2024-01-31
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-31        이예지            최초 생성
 */
@Mapper("obsvDataMapper")
public interface ObsvDataMapper {
    List<ObsvDataVo> data(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> tableList(ObsvDataVo obsvDataVo);
    int tableListCnt(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> detailContents(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> excel(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> getObsvInfoBox(ObsvDataVo obsvDataVo);
    List<ObsvDataVo> getSensorBox(ObsvDataVo obsvDataVo);
    List<ObsvWeaherVo> weatherList(ObsvWeaherVo ObsvWeatherVo);
    int weatherCnt(ObsvWeaherVo ObsvWeatherVo);
    List<ObsvWeaherVo> weatherExcel(ObsvWeaherVo ObsvWeatherVo);
}
