package com.sodasys.sgms.information.service;

import java.util.List;


import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.information.vo.InformationVo;

public interface InformationService {

	public List<InformationVo> siteListData(ScrollVo scrollVo);
	public int siteInsert(InformationVo informationVo);
	public int siteSameCheck(InformationVo informationVo);
	public int siteObsvCdCheck(String obsvCd);
	public InformationVo spotViewData(InformationVo informationVo);
	public int siteUpdateData(InformationVo informationVo);

}
