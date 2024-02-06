package com.sodasys.sgms.realTime.controller;

import com.sodasys.sgms.comn.excelUtil.ExcelUtil;
import com.sodasys.sgms.realTime.service.RealTimeService;
import com.sodasys.sgms.realTime.vo.RealTimeVo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;

/**
 * packageName    : com.sodasys.sgms.realTime.controller
 * fileName       : RealtimeController
 * author         : 이예지
 * date           : 2024-01-16
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-16        이예지              수정
 */

@Controller
@RequestMapping("/realTime")
public class RealTimeController {

	@Resource(name="realTimeService")
	private RealTimeService realTimeService;
	
	@RequestMapping(value ="/realTimeState", method = RequestMethod.GET)
	public String realTimeState()
	{
		return "/realtime/realtime";
	}

	@RequestMapping(value="/realTimeState/realTimeList", method = RequestMethod.GET)
	public ResponseEntity<HashMap<String, Object>> realTimeList(RealTimeVo vo) {
		HashMap<String, Object> result = new HashMap<>();
		result.put("list", realTimeService.getList(vo));
		result.put("cnt", realTimeService.getCnt(vo));
		return ResponseEntity.ok(result);
	}

	@RequestMapping(value="/realTimeState/excelDownload")
	public void realTimeListExcelDownload(RealTimeVo realTimeVo, HttpServletResponse response) {
		List<RealTimeVo> result = realTimeService.excel(realTimeVo);
		ExcelUtil.excelDownload(result, "realTimeList", response);
	}
}