package com.sodasys.sgms.obsvData.service.impl;

import com.sodasys.sgms.obsvData.mapper.ObsvDataMapper;
import com.sodasys.sgms.obsvData.service.ObsvDataService;
import com.sodasys.sgms.obsvData.vo.ObsvDataVo;
import com.sodasys.sgms.obsvData.vo.ObsvWeaherVo;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * packageName    : com.sodasys.sgms.obsvData.service.impl
 * fileName       : ObsvDataServiceImpl
 * author         : 이예지
 * date           : 2024-01-31
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-31        이예지            최초 생성
 */
@Service("obsvDataService")
public class ObsvDataServiceImpl extends EgovAbstractServiceImpl implements ObsvDataService  {

    @Resource(name="obsvDataMapper")
    public ObsvDataMapper mapper;

    @Override
    public List<ObsvDataVo> data(ObsvDataVo obsvDataVo) {
        return mapper.data(obsvDataVo);
    }

    @Override
    public List<ObsvDataVo> tableList(ObsvDataVo obsvDataVo) {
        return mapper.tableList(obsvDataVo);
    }

    @Override
    public int tableListCnt(ObsvDataVo obsvDataVo) {
        return mapper.tableListCnt(obsvDataVo);
    }

    @Override
    public List<ObsvDataVo> excel(ObsvDataVo obsvDataVo) {
        return mapper.excel(obsvDataVo);
    }

    @Override
    public List<ObsvDataVo> detailContents(ObsvDataVo obsvDataVo) {
        return mapper.detailContents(obsvDataVo);
    }

    @Override
    public List<ObsvDataVo> getObsvInfoBox(ObsvDataVo obsvDataVo) {
        return mapper.getObsvInfoBox(obsvDataVo);
    }

    @Override
    public List<ObsvDataVo> getSensorBox(ObsvDataVo obsvDataVo) {
        return mapper.getSensorBox(obsvDataVo);
    }

    @Override
    public List<ObsvWeaherVo> weatherList(ObsvWeaherVo obsvWeaherVo) {
        return mapper.weatherList(obsvWeaherVo);
    }

    @Override
    public int weatherCnt(ObsvWeaherVo obsvWeaherVo) {
        return mapper.weatherCnt(obsvWeaherVo);
    }

    @Override
    public List<ObsvWeaherVo> weatherExcel(ObsvWeaherVo obsvWeaherVo) {
        return mapper.weatherExcel(obsvWeaherVo);
    }
}
