import $, { param } from 'jquery'
import Axios from '../axios'
import '../popup';
import {pop} from "../popup";
import {stdgCdBox} from '../stdgCdBox';

class SiteInfo {

	


		constructor() {
		let siteInfo = this;
		$(function() {
			siteInfo.init();
		
		})
	}

	

	 	init() {
		this.siteUpdateBtn();
		this.siteUpdateCancel();
		this.siteUpdateData();
		


	}
	
	stdgCheckBox(){
		let stdgCd = document.querySelector(".stdgCd").getAttribute("stdgCd")
		stdgCdBox(document.querySelector(".stdgCd"),stdgCd);
		
	}
	
	siteUpdateData() {
		let siteUpdateData = document.getElementById("siteUpdateData")
		siteUpdateData.addEventListener('click',()=>{
			const obsvNm = document.querySelector(".obsvNm").value;
			const obsvCd = document.querySelector(".obsvCd").value;
			const obsvSn = document.querySelector(".obsvSn").value;
			const addr = document.querySelector(".addr").value;
			const lot = document.querySelector(".lot").value;
			const lat = document.querySelector(".lat").value;
			const useType = document.querySelector(".useType").value;
			const digDepth = document.querySelector(".digDepth").value;
			const useYn = document.querySelector(".useYn").value;
			const elev = document.querySelector(".elev").value;
			const drkYn = document.querySelector(".drkYn").value;
			const instlYmd = document.querySelector(".instlYmd").value;
			const operYn = document.querySelector(".operYn").value;
			const csiDia = document.querySelector(".csiDia").value;
			const doc = document.querySelector(".doc").value;
			const ctpvDiv = document.querySelector(".stdgCd");
			
			const data = {obsvNm:obsvNm, obsvCd:obsvCd,obsvSn:obsvSn,addr:addr,lot:lot,
			 lat:lat, useType:useType, digDepth:digDepth, useYn:useYn, elev:elev, drkYn:drkYn,
			instlYmd:instlYmd, operYn:operYn, csiDia:csiDia, doc:doc, stdgCd:stdgCd
	 		}
			console.log("데이타는?",data);
		
			Axios.post("/siteList/siteUpdataData", data)
			.then((res)=>{
				stdgCdBox(ctpvDiv, data.stdgCd);
				const data = res.data;
				if(data >=1) {
					alert("수정되었습니다.");
					pop(document.querySelector(".siteForm"),false);
					document.querySelector(".siteTableBody").innerHTML='';				
				}else("error");
				
			}).error((error)=>{
				console.log("에러입니다",error)
			})
		
			
			
			
		})
		
		
	}	
	
	siteUpdateCancel(){
		let siteUpdateCancel = document.getElementById("siteUpdateCancel");
		siteUpdateCancel.addEventListener('click',()=>{
			pop(document.querySelector(".siteForm"),false);
		})
	}
	
	//관측소 이동("siteInfo")
	siteUpdateBtn() {
		let updateButton= document.getElementById("siteUpdateBtn");
		updateButton.addEventListener('click',()=>{
			const popDiv = document.querySelector(".siteForm")
			const test = document.querySelector(".stdgCd");
			stdgCdBox(test)
			pop(popDiv, true);
			this.useTypeValue();
			this.useYnValue();
			this.drkYnValue();
			this.operYnValue();
			this.stdgCdValue();
			this.stdgCheckBox();
			
		})
	}
	//어디서 이런 코드를 찾을 수 있는건가요...(siteInfo.jsp부분)
	useTypeValue(){	
	let useTypeValue = document.getElementById("useTypeValue").value;
	document.getElementById("useType").value = useTypeValue;
	document.getElementById("useType").setAttribute("selected", true);
	}
	
	useYnValue(){
	 let useYnValue = document.getElementById("useYnValue").value;
	document.getElementById("useYn").value = useYnValue;
	document.getElementById("useYn").setAttribute("selected", true);
	}
	
	drkYnValue(){
	 let drkYnValue = document.getElementById("drkYnValue").value;
	document.getElementById("drkYn").value = drkYnValue;
	document.getElementById("drkYn").setAttribute("selected", true);
	}
	
	operYnValue(){
	 let operYnValue = document.getElementById("operYnValue").value;
	document.getElementById("operYn").value = operYnValue;
	document.getElementById("operYn").setAttribute("selected", true);
	}
	
	stdgCdValue(){
	 let stdgCdValue = document.getElementById("stdgCdValue").value;
	let data = document.getElementById("stdgCd").value = stdgCdValue;
	stdgCdBox(ctpvDiv,data.stdgCd);
	}
	

		


}


export default new SiteInfo();