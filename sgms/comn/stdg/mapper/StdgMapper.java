package com.sodasys.sgms.comn.stdg.mapper;

import com.sodasys.sgms.comn.stdg.vo.StdgVo;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper("stdgMapper")
public interface StdgMapper {
    List<StdgVo> getCtpvList();
    List<StdgVo> getSggList(StdgVo vo);
    List<StdgVo> getSttyList(StdgVo vo);
    List<StdgVo> getStliList(StdgVo vo);

}
