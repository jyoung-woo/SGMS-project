package com.sodasys.sgms.realTime.service.impl;

import com.sodasys.sgms.realTime.mapper.RealTimeMapper;
import com.sodasys.sgms.realTime.service.RealTimeService;
import com.sodasys.sgms.realTime.vo.RealTimeVo;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * packageName    : com.sodasys.sgms.realTime.service.impl
 * fileName       : RealTimeServiceImpl
 * author         : 이예지
 * date           : 2024-01-16
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-16        이예지            최초 생성
 */
@Service("realTimeService")
public class RealTimeServiceImpl extends EgovAbstractServiceImpl implements RealTimeService {

    @Resource(name = "realTimeMapper")
    public RealTimeMapper realTimeMapper;

    @Override
    public List<RealTimeVo> getList(RealTimeVo realTimeVo) {
        return realTimeMapper.getList(realTimeVo);
    }

    @Override
    public RealTimeVo detailContents(RealTimeVo realTimeVo) {
        return realTimeMapper.detailContents(realTimeVo);
    }

    @Override
    public List<RealTimeVo> excel(RealTimeVo realTimeVo) {
        return realTimeMapper.excel(realTimeVo);
    }

    @Override
    public int getCnt(RealTimeVo realTimeVo) {
        return realTimeMapper.getCnt(realTimeVo);
    }
}
