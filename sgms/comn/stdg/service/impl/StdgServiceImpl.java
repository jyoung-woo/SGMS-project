package com.sodasys.sgms.comn.stdg.service.impl;

import com.sodasys.sgms.comn.stdg.mapper.StdgMapper;
import com.sodasys.sgms.comn.stdg.service.StdgService;
import com.sodasys.sgms.comn.stdg.vo.StdgVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service("stdgService")
public class StdgServiceImpl implements StdgService {
    @Resource(name="stdgMapper")
    private StdgMapper stdgMapper;
    @Override
    public List<StdgVo> getCtpvList() {
        return stdgMapper.getCtpvList();
    }

    @Override
    public List<StdgVo> getSggList(StdgVo vo) {
        return stdgMapper.getSggList(vo);
    }

    @Override
    public List<StdgVo> getSttyList(StdgVo vo) {
        return stdgMapper.getSttyList(vo);
    }

    @Override
    public List<StdgVo> getStliList(StdgVo vo) {
        return stdgMapper.getStliList(vo);
    }
}
