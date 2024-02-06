package com.sodasys.sgms.information.controller;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sodasys.sgms.comn.excelUtil.ExcelUtil;
import com.sodasys.sgms.comn.scroll.vo.ScrollVo;
import com.sodasys.sgms.information.service.InformationService;
import com.sodasys.sgms.information.vo.InformationVo;

@Controller
public class InformationController {

	@Resource(name = "InformationService")
	InformationService service;

	@RequestMapping(value = "/locationPage", method = { RequestMethod.GET })
	public String location() {

		return "/information/location";

	}

	@RequestMapping(value = "/siteList", method = { RequestMethod.GET })
	public String siteListPage() {
		return "/information/siteList";
	}

	@RequestMapping(value = "/siteList/siteListData", method = { RequestMethod.GET })
	public ResponseEntity<?> siteListData(ScrollVo scrollVo) {

		List<InformationVo> list = service.siteListData(scrollVo);
        System.out.println(list);
 		return ResponseEntity.ok(service.siteListData(scrollVo));
		
	}
 
	@RequestMapping(value = "/siteList/siteInsert", method = { RequestMethod.POST })
	@ResponseBody
	public int siteInsert(@RequestBody InformationVo informationVo) {
		int result = service.siteInsert(informationVo);

		return result;
	}

	@RequestMapping(value = "/siteList/siteInsert/siteSameCheck", method = { RequestMethod.POST })
	public ResponseEntity<?> siteSameCheck(@RequestBody InformationVo informationVo) {

		int count = service.siteSameCheck(informationVo);

		return ResponseEntity.ok(count);
	}

	@RequestMapping(value = "siteList/siteInsert/cancel", method = { RequestMethod.GET })
	public String cancel() {
		return "redirect:/siteList";
	}

	@RequestMapping(value = "siteList/obsvCheck", method = { RequestMethod.POST })
	public ResponseEntity<?> obsvCdCheck(@RequestBody InformationVo informationVo) {
		int count = service.siteObsvCdCheck(informationVo.getObsvCd());
		System.out.println("siteObsvCdCheck method called, param: " + informationVo.getObsvCd());
		return ResponseEntity.ok(count);
	}

	@RequestMapping(value = "/siteList/siteListData/excelDownload", method = { RequestMethod.GET })
	public void siteListExcelDownload(ScrollVo scrollVo,
			@RequestParam(value = "searchKeyword", required = false) String searchKeyword,
			@RequestParam(value = "searchType", required = false) String searchType, HttpServletResponse response) {
		HashMap<String, Object> param = new HashMap<String, Object>();
		param.put("searchKeyword", searchKeyword);
		param.put("searchCType", searchType);
		List<InformationVo> result = service.siteListData(scrollVo);
		System.out.println("결과값" + result);
		ExcelUtil.excelDownload(result, "obsvList", response);

	}

	@RequestMapping(value = "/siteList/siteSpotView", method = { RequestMethod.GET })
	public String siteSpotView(@RequestParam("obsvCd") String obsvCd, InformationVo informationVo, Model model) {
		model.addAttribute("list", service.spotViewData(informationVo));
		model.addAttribute("obsvCd", obsvCd);

		return "/information/siteInfo";
	}

	@RequestMapping(value = "/siteList/siteUpdataData", method = { RequestMethod.POST })
	public ResponseEntity<?> siteUpdateData(@RequestBody InformationVo vo) {
		int result = service.siteUpdateData(vo);

		return ResponseEntity.ok(result);
	}

}
