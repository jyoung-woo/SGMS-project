package com.sodasys.sgms.obsvData.controller;

import com.sodasys.sgms.comn.excelUtil.ExcelUtil;
import com.sodasys.sgms.obsvData.service.ObsvDataService;
import com.sodasys.sgms.obsvData.vo.ObsvDataVo;
import com.sodasys.sgms.obsvData.vo.ObsvWeaherVo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * packageName    : com.sodasys.sgms.obsvData.controller
 * fileName       : ObsvDataController
 * author         : 이예지
 * date           : 2024-01-31
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2024-01-31        이예지            최초 생성
 */
@Controller
public class ObsvDataController {

    @Resource(name="obsvDataService")
    public ObsvDataService obsvDataService;

    @RequestMapping(value="/obsvData/detail", method = RequestMethod.GET)
    public String realTimeDetail(ObsvDataVo obsvDataVo) {
        Map<String, Object> result = new HashMap<>();
        result.put("data", obsvDataService.detailContents(obsvDataVo));
        return "/obsvData/obsvData";
    }

    @RequestMapping(value="/obsvData/data", method = RequestMethod.GET)
    public ResponseEntity<HashMap<String, Object>> dataList(ObsvDataVo obsvDataVo) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("data", obsvDataService.data(obsvDataVo));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/obsvData/dataList", method = RequestMethod.GET)
    public ResponseEntity<HashMap<String, Object>> tableList(ObsvDataVo obsvDataVo) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("list", obsvDataService.tableList(obsvDataVo));
        result.put("cnt", obsvDataService.tableListCnt(obsvDataVo));

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value="/obsvData/excelDownload")
    public void obsvDataListExcelDownload(ObsvDataVo obsvDataVo, HttpServletResponse response) {
        List<ObsvDataVo> result = obsvDataService.excel(obsvDataVo);
        ExcelUtil.excelDownload(result, "obsvData", response);
    }

    @RequestMapping(value="/obsvData/obsvBox", method = RequestMethod.GET)
    public ResponseEntity<List<ObsvDataVo>> obsvListBox(ObsvDataVo obsvDataVo) {
        return new ResponseEntity<List<ObsvDataVo>>(obsvDataService.getObsvInfoBox(obsvDataVo), HttpStatus.OK);
    }

    @RequestMapping(value="/obsvData/sensorBox", method = RequestMethod.GET)
    public ResponseEntity<List<ObsvDataVo>> sensorListBox(ObsvDataVo obsvDataVo) {
        return new ResponseEntity<List<ObsvDataVo>>(obsvDataService.getSensorBox(obsvDataVo), HttpStatus.OK);
    }

    @RequestMapping(value="/obsvData/obsvWeather")
    public String obsvWeather() {
        return "/obsvData/obsvWeather";
    }

    @RequestMapping(value="/obsvData/obsvWeatherList")
    public ResponseEntity<HashMap<String, Object>> obsvWeatherList(ObsvWeaherVo obsvWeatherVo) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("list", obsvDataService.weatherList(obsvWeatherVo));
        result.put("cnt", obsvDataService.weatherCnt(obsvWeatherVo));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value="/obsvData/weatherExcelDownload")
    public void obsvDataWeatherExcelDownload(ObsvWeaherVo obsvWeaherVo, HttpServletResponse response) {
        List<ObsvWeaherVo> result = obsvDataService.weatherExcel(obsvWeaherVo);
        ExcelUtil.excelDownload(result, "obsvWeatherData", response);
    }

    @RequestMapping(value="/obsvData/obsvCompare")
    public String obsvCompare() {
        return "/obsvData/obsvCompare";
    }


}
