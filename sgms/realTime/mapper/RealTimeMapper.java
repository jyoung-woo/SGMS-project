package com.sodasys.sgms.realTime.mapper;

import com.sodasys.sgms.realTime.vo.RealTimeVo;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.List;

/**
 * packageName    : com.sodasys.sgms.realTime.mapper
 * fileName       : RealTimeMapper
 * author         : 이예지
 * date           : 2024-01-16
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-16        이예지            최초 생성
 */

@Mapper("realTimeMapper")
public interface RealTimeMapper {
    List<RealTimeVo> getList(RealTimeVo realTimeVo);
    RealTimeVo detailContents(RealTimeVo realTimeVo);
    List<RealTimeVo> excel(RealTimeVo realTimeVo);
    int getCnt(RealTimeVo realTimeVo);
}
