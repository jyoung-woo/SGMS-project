package com.sodasys.sgms.comn.stdg.service;

import com.sodasys.sgms.comn.stdg.vo.StdgVo;

import java.util.List;

public interface StdgService {
    List<StdgVo> getCtpvList();
    List<StdgVo> getSggList(StdgVo vo);
    List<StdgVo> getSttyList(StdgVo vo);
    List<StdgVo> getStliList(StdgVo vo);

}
