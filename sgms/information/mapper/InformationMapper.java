package com.sodasys.sgms.information.mapper;


import java.util.HashMap;
import java.util.List;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.information.vo.InformationVo;

@Mapper("InformationMapper")
public interface InformationMapper {

	//관측소 조회
	public List<InformationVo> siteListData(ScrollVo scrollVo);
	
	//관측소 추가
	public int siteInsert(InformationVo informationVo);
	
	//관측소 PK check
	public int siteSameCheck(InformationVo informationVo);
	
	public int siteObsvCdCheck(String obsvCd);
	
	public InformationVo spotViewData(InformationVo informationVo);
	
	public int siteUpdateData(InformationVo informationVo);

	
	
}
