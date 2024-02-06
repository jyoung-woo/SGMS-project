package com.sodasys.sgms.information.service.impl;

import java.util.List;
import javax.annotation.Resource;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;
import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.information.mapper.InformationMapper;
import com.sodasys.sgms.information.service.InformationService;
import com.sodasys.sgms.information.vo.InformationVo;

@Service("InformationService")
public class InformationServiceImpl extends EgovAbstractServiceImpl implements InformationService {

	@Resource(name="InformationMapper")
	InformationMapper mapper;

	@Override
	public List<InformationVo> siteListData(ScrollVo scrollVo) {
		
		return mapper.siteListData(scrollVo);
	}


	@Override
	public int siteInsert(InformationVo informationVo) {
		
		return mapper.siteInsert(informationVo);
	}

	@Override
	public int siteSameCheck(InformationVo informationVo) {
		
		return mapper.siteSameCheck(informationVo);
	}

	@Override
	public int siteObsvCdCheck(String obsvCd) {
		return mapper.siteObsvCdCheck(obsvCd);
	}


	@Override
	public InformationVo spotViewData(InformationVo informationVo) {
		InformationVo obsvSn = mapper.spotViewData(informationVo);
		return obsvSn; 
	}


	@Override
	public int siteUpdateData(InformationVo informationVo) {
		int obsvSn = mapper.siteUpdateData(informationVo);
		return obsvSn;
	}
}
