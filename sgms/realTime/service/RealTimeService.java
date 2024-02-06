package com.sodasys.sgms.realTime.service;

import com.sodasys.sgms.realTime.vo.RealTimeVo;

import java.util.List;

/**
 * packageName    : com.sodasys.sgms.realTime.service
 * fileName       : RealTimeService
 * author         : 이예지
 * date           : 2024-01-16
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-16        이예지            최초 생성
 */

public interface RealTimeService {
    List<RealTimeVo> getList(RealTimeVo realTimeVo);
    RealTimeVo detailContents(RealTimeVo realTimeVo);
    List<RealTimeVo> excel(RealTimeVo realTimeVo);
    int getCnt(RealTimeVo realTimeVo);

}
