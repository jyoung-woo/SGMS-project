import $, { param } from 'jquery'
import Axios from '../axios'
import '../scrollEvt';
import {scrollEndEvt} from "../scrollEvt";
import '../popup';
import {pop} from "../popup";
import {stdgCdBox} from '../stdgCdBox';

class SiteList {
	#searchKeyword;
	#searchType;
	#page = 0;
	#obsvCd;
	


		constructor() {
		let siteList = this;
		$(function() {
			siteList.init();
		
		})
	}

	

	 	init() {
		this.spotGetDate()
		this.searchButton()	//검색버튼눌렀을때실행	
		this.cancelButton()
		this.siteSameCheck()
		this.eventListenerExcel()
		this.scrollViewListener()
		this.siteInsertBtn()	//관측소추가버튼


	}
	


	
	

	//무한스크롤 ("siteList")
	createUserTable(page) {
		let searchType = document.querySelector("searchType").value || '';
		let searchKeyword = document.querySelector("searchKeyword").value || '';
		const params = {page:page, limit:20, searchKeyword:searchKeyword,searchType:searchType};
		Axios.get("siteList/siteListData",{params})
		.then((res)=>{
			this.#page = res.data.length>0 ? page+1 : page;
			this.spotGetDate(res.data);
		})
		
	}
	
	//무한스크롤 실행("siteList")
	scrollViewListener(){
		document.getElementById('userTableDiv').addEventListener('scroll',()=>{
			scrollEndEvn('userTableDiv','userTableDiv',this.createUserTable.bind(this).this.#page);
		})
	}
	
	//엑셀다운로드 메서드(siteList)
	siteListExcelDownload(){
		let searchType = this.#searchType || '';
		let searchKeyword = this.#searchKeyword || '';
		const params = {excel:"on", searchType: searchType, searchKeyword: searchKeyword };
		Axios.get("/siteList/siteListData/excelDownload",{params , responseType : 'blob'})
		.then((res)=> {
			const url = window.URL.createObjectURL(new Blob([res.data], {type: res.headers["content-type"]}));
			const link = document.createElement("a");
			const fileName = res.headers["content-disposition"].split("=")[1];
			link.href = url;
			link.download = fileName;
			link.click();
			window.URL.revokeObjectURL(url);
		})			
		.catch((error)=> {
			console.error("에러입니다",error)	
		})
	}
	
	//엑셀다운로드실행(siteList)
	eventListenerExcel(){
		document.getElementById('excel').addEventListener("click",()=>{
			this.#searchType = document.querySelector("select[name=searchType] option:checked").value;
			this.#searchKeyword = document.getElementById('searchKeyword').value;
			this.siteListExcelDownload();
		})
		
	}
	

	//insert 화면 보여지게하기("siteList")
	siteInsertBtn() {
	const popDiv = document.querySelector(".siteForm");
		insertButton.addEventListener('click',()=>{
			const test = document.querySelector(".stdgCd");
			stdgCdBox(test)
			pop(popDiv,true)
		})
	}
	
	//obsv_cd끼리의 중복체크 메서드("siteList")
	siteObsvCdCheck(){
		
	const obsvCd = document.querySelector(".obsvCd").value;
			
	const data ={obsvCd:obsvCd} 
	console.log("obsvCd",obsvCd)

		
		Axios.post("/siteList/obsvCheck",data)
		.then((res) => {
			let count = res.data;
			console.log("count",count);
			if(count == 0) {
				console.log("성공!");
				this.siteInsert();
			}else {
				alert("관측소 코드가 중복입니다.");
				return false;
			}		
		})
			
		.catch((error) => {
			
			console.log("실패",error);
		})
	}
	
	//sys_cd와 obsv_cd가 일치하는지 확인하기 위한 메서드("siteList")
	siteSameCheck() {
 
    let siteInsertButton = document.getElementById("siteInsertButton");
    siteInsertButton.addEventListener('click',() => {
   	
	const obsvNm = document.querySelector(".obsvNm").value;
	const obsvCd = document.querySelector(".obsvCd").value;
	const obsvSn = document.querySelector(".obsvSn").value;
	const lat = document.querySelector(".lat").value;
	const lot = document.querySelector(".lot").value;
	
	if(obsvCd == ""){
			alert("관측소 코드를 입력해 주세요.")
			obsvCd.trim();
			return;
		}
		if(obsvSn ==""){
			alert("관측소 시리얼번호를 입력해 주세요.")
			obsvSn.trim();
			return;
		}
		if(obsvSn.length > 20) {
			alert("관측소 시리얼번호는 20자 이하여야 합니다.")
			return;
		}
		
		if(lat < -90 || lat > 90  ){
			alert("위도를 올바르게 입력해주세요")
			return;
		}
		if(lot < -180 || lot > 180  ){
			alert("경도를 올바르게 입력해주세요")
			return;
		}
		
		
		//formdata메서드 대신 value지정해서 데이터 통신	

	const data = {obsvCd:obsvCd,obsvNm:obsvNm,obsvSn:obsvSn,lat:lat,lot:lot}
		console.log(data);
	
        Axios.post("/siteList/siteInsert/siteSameCheck", data)
            .then((res) => {
				const count = res.data;	
                if (count > 0 ) {
                    console.log("POST 요청 성공", res);
					this.siteObsvCdCheck();		
											
                } else {			
					alert("일치하는 코드가 없습니다.");							
                } 	
            })
            .catch((error) => {
                console.log("실패", error);
            });

    });
}

	//데이터베이스와 insert 수행 메서드 ("siteList")
	siteInsert() {
			const obsvNm = document.querySelector(".obsvNm").value;
			const obsvCd = document.querySelector(".obsvCd").value;
		
			const ctpv = document.querySelector(".ctpv") === null ? '':document.querySelector(".ctpv").value;
        	const stty = document.querySelector(".stty") === null ? '':document.querySelector(".stty").value;
        	const sgg = document.querySelector(".sgg") === null ? '':document.querySelector(".sgg").value;
        	const stli = document.querySelector(".stli") === null ? '':document.querySelector(".stli").value;
			const stdgCd = ctpv+stty+sgg+stli;
			
			
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
			
			
			const data ={obsvNm:obsvNm, obsvCd:obsvCd, stdgCd:stdgCd, obsvSn:obsvSn, addr:addr, lot:lot, lat:lat,useType:useType, digDepth:digDepth, useYn:useYn, elev:elev, drkYn:drkYn, instlYmd:instlYmd, operYn:operYn, csiDia:csiDia, doc:doc  } 
			console.log(data);
		
			Axios.post("/siteList/siteInsert",data)
			.then((res) => {				
				if(res.data == 1){
				console.log("POST 요청 성공", res);
				window.location.href = '/siteList';	

				}
				else{
					alert("올바르게 작성해주세요")
				}
			})
			.catch((error)=>{
				console.log("실패",error);
				
			
			})		
	}
	
	
	//insert팝업창 취소 리스너("siteList")
	cancelButton() {
		let cancelButton = document.getElementById("cancelButton");
		cancelButton.addEventListener('click',()=>{
			pop(document.querySelector(".siteForm"),false);
			//location.href="/siteList/siteInsert/cancel"
		})
	}
		
	//검색버튼 리스너("siteList") 		
	searchButton() {
		const button1 = document.getElementById("searchButton");
		button1.addEventListener('click', () => {

			this.spotGetDate();
		});
	}
	//상세화면이동("siteList")
	spotView(obsvCd) {
		
		location.href = "/siteList/siteSpotView?obsvCd=" + obsvCd;
		
			
	}
	
	
	
	//관측소 제원 리스트 함수(siteList)
	spotGetDate(data) {
		let searchType = document.querySelector("#searchType option:checked").value;
		let searchKeyword = document.querySelector("#searchKeyword").value;
		let search = { "searchType": searchType, "searchKeyword": searchKeyword };

		console.log(1, searchType.value)
		console.log(2, searchKeyword.value)

		Axios.get("/siteList/siteListData", { params: search })
			.then((res) => {
				console.log(res)
				let tBody = document.getElementById("tBody");
				tBody.innerHTML = '';
				let total = document.getElementById("total");
				total.innerHTML = '';
				let resultList = res.data;
				console.log("resultList", resultList)
				console.log("search",search)
				if (resultList && resultList.length > 0) {
					total.textContent = resultList.length;


					for (let i = 0; i < resultList.length; i++) {					
						let tr = document.createElement('tr')         
						tr.addEventListener('click',()=>{
							this.spotView(resultList[i].obsvCd).innerHTML='';
						}) 
						tr.innerHTML= `<tr>  
						 <td>${resultList[i].obsvSn || '-'}</td>
						 <td>${resultList[i].obsvNm || '-'}</td>
						 <td>${resultList[i].addr || '-'}</td>
						 <td>${ resultList[i].instlYmd || '-'}</td>
						 <td>${resultList[i].operYn || '-'}</td>
						 <td>${resultList[i].elev || '-'}</td>
						 <td>${resultList[i].csiDia || '-'}</td>
						 <td>${resultList[i].digDepth || '-'}</td>
						 <td>${resultList[i].useType || '-'}</td>
						 <td>${resultList[i].drkYn || '-'}</td>					
						</tr>`;
						tBody.appendChild(tr);


					}
					console.log("resultlist",resultList);
					
				}
			})

			.catch((error) => {
				console.error("Error:", error);

			});


	}
	
	
	

		


}


export default new SiteList();