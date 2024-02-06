package com.sodasys.sgms.information.vo;

import com.sodasys.sgms.comn.excelUtil.annotation.ExcelColumn;
import com.sodasys.sgms.comn.vo.UserInfo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class InformationVo extends UserInfo {

	private String sysCd;
	private String obsvCd;
	private String obsvSn;
	
	@ExcelColumn(headerName="관측소명")
	private String obsvNm;
	@ExcelColumn(headerName="주소")
	private String addr;
	@ExcelColumn(headerName="설치일자")
	private String instlYmd;
	@ExcelColumn(headerName="운영현황")
	private String operYn;
	@ExcelColumn(headerName="표고")
	private double elev;
	@ExcelColumn(headerName="굴착깊이")
	private double digDepth;
	@ExcelColumn(headerName="케이싱구경")
	private double csiDia;
	@ExcelColumn(headerName="지하수용도")
	private String useType;
	@ExcelColumn(headerName="음용여부")
	private String drkYn;
	private double lat;
	private double lot;
	private String rdnAddr;
	private String useYn;
	private String addrStdg;

		

	
	
	
	private String doc;
	private String searchType;
	private String searchKeyword;
	
	//법정동 컬럼
	private String ctpv;
	private String sgg;
	private String stli;
	private String sttyEnd;
	private String stdgCd;
	
	

	
	
}
