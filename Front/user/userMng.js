import Axios from '../axios';
import '../scrollEvt';
import {scrollEndEvt} from "../scrollEvt";
import '../popup';
import {pop} from "../popup";
import {stdgCdBox} from '../stdgCdBox';

class UserMng {
    #searchKeyword;
    #searchType;
    #page = 0;

    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.init();
        });
    }

    init() {
        this.createUserTable(this.#page);
        this.eventListener();
    }

    /**
     * 사용자 목록 엑셀다운로드
     */
    userListExcelDownload() {
        let searchType = this.#searchType || '';
        let searchKeyword = this.#searchKeyword || '';
        const params = {excel: "on", searchKeyword: searchKeyword, searchType: searchType};
        Axios.get("/userMng/getList/excelDownload", {params, responseType: 'blob'})
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data], {type: response.headers["content-type"]}));
                const link = document.createElement("a");
                const fileName = response.headers["content-disposition"].split("=")[1];
                link.href = url;
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading Excel file:', error);
            });
        ;
    }

    /**
     * 사용자 데이터 목록 불러오기
     * @param page 페이지 일경우 1부터 스크롤인경우 0 부터
     */
    createUserTable(page) {
        let searchType = this.#searchType || '';
        let searchKeyword = this.#searchKeyword || '';
        const params = {page: page, limit: 20, searchKeyword: searchKeyword, searchType: searchType};
        Axios.get("/userMng/getList", {params})
            .then((response) => {
                this.#page = response.data.data.length > 0 ? page + 1 : page;
                this.createTable(response.data);
            })
    }

    /**
     * 사용자 데이터로 table 생상
     * @param data 사용자 list
     */
    createTable(data) {
        let cnt = data.cnt;
        let dataList = data.data;
        const userTableBody = document.querySelector(".userTableBody");
        document.querySelector(".total").textContent = cnt;
        dataList.forEach((user) => {
            let tr = document.createElement('tr');
            user.useYn = user.useYn ? 'Y' : 'N';
            tr.innerHTML = `<tr>
                                <td>${user.rowNum}</td>
                                <td>${user.userId}</td>
                                <td>${user.companyNm}</td>
                                <td>${user.userEmail}</td>
                                <td>${user.lockYn}</td>
                            </tr>`;
            tr.addEventListener('click', () => {
                this.createUserDetails(user.userId);
            })
            userTableBody.appendChild(tr);
        })
    }

    /**
     * 이벤트리스너
     */
    eventListener() {
        document.querySelector('.userTableDiv').addEventListener('scroll', () => {
            scrollEndEvt('userTableDiv', 'userTableDiv', this.createUserTable.bind(this), this.#page);
        })
        document.querySelector('.searchBtn').addEventListener('click', () => {
            document.querySelector('.userTableDiv').innerHTML = '';
            this.#searchType = document.querySelector("select[name=searchType] option:checked").value;
            this.#searchKeyword = document.querySelector('.searchKeyword').value;
            this.createUserTable(0);
        })
        document.querySelector(".excel").addEventListener("click", () => {
            this.#searchType = document.querySelector("select[name=searchType] option:checked").value;
            this.#searchKeyword = document.querySelector('.searchKeyword').value;
            this.userListExcelDownload();
        });
        document.querySelector(".userInfo-close").addEventListener("click", () => {
            pop(document.querySelector(".memberForm"), false)
        });
        document.querySelector(".userAdd-close").addEventListener("click", () => {
            pop(document.querySelector(".addUserPop"), false)
        });

        document.querySelector(".modify").addEventListener("click", ()=>{
            this.userUpdate();
        });
        document.querySelector(".delete").addEventListener("click",()=>{
            this.userDelete();
        });
        document.querySelector(".userAdd").addEventListener("click" , ()=>{
            this.createUserAddPop();
        })
        document.querySelector(".createUserBtn").addEventListener("click",()=>{
            this.createUser();
        })
        document.querySelector(".init").addEventListener("click",()=>{
            this.userPwdInit();
        })
    }
    userPwdInit(){
        const userId = document.querySelector(".userId").value;
        const userEmail = document.querySelector(".email").value;
        const data = {userId:userId,userEmail:userEmail};
        Axios.post("/userMng/initPwd",data)
            .then((response)=>{
                alert("비밀번호를 초기화 했습니다.");
                pop(document.querySelector(".memberForm"),false);
                document.querySelector(".userTableBody").innerHTML='';
                this.#page = 0;
                this.createUserTable(0);
            })
    }
    createUserAddPop(){
        const addPop = document.querySelector(".addUserPop");
        const stdg = addPop.querySelector(".stdg");
        pop(addPop,true);
        stdgCdBox(stdg);
    }
    createUser(){
        const userAddPop = document.querySelector(".addUserPop");
        const userId = userAddPop.querySelector(".userId").value;
        const companyNm = userAddPop.querySelector(".companyNm").value;
        const userEmail = userAddPop.querySelector(".email").value;
        const doc = userAddPop.querySelector(".doc").value;
        const ctpv = userAddPop.querySelector(".ctpv") === null ? '' : document.querySelector(".ctpv").value;
        const stty = userAddPop.querySelector(".stty") === null ? '' : document.querySelector(".stty").value;
        const sgg = userAddPop.querySelector(".sgg") === null ? '' : document.querySelector(".sgg").value;
        const stli = userAddPop.querySelector(".stli") === null ? '' : document.querySelector(".stli").value;
        const userEndYmd = userAddPop.querySelector(".userEndYmd").value;
        const stdgCd = ctpv + sgg + stty + stli;
        const data = {userId:userId, companyNm:companyNm , userEmail:userEmail , doc:doc , userEndYmd:userEndYmd , stdgCd:stdgCd};
        console.log(data)
        Axios.post("/userMng/userAdd",data)
            .then((response)=>{
                alert("가입이 완료 되었습니다.");
                pop(document.querySelector(".addUserPop"),false);
                document.querySelector(".userTableBody").innerHTML='';
                this.#page = 0;
                this.createUserTable(0);
            })
    }

    /**
     * 사용자 상세보기 팦업을 만들고 display 값을변경하여 표출
     * @param userId 팦업창에 들어갈 사용자 아이디
     */
    createUserDetails(userId) {
        const popDiv = document.querySelector(".memberForm");
        this.getUserDetail(userId);
        pop(popDiv, true);
    }

    /**
     * 사용자 정보를 가져오기
     * @param userId 불러올 사용자 아이디
     */
    getUserDetail(userId) {
        const ctpvDiv = document.querySelector(".stdg");
        const params = {userId: userId};
        Axios.get('/userMng/getUserDetail', {params})
            .then((response) => {
                const data = response.data;
                document.querySelector(".userId").value = data.userId;
                document.querySelector(".companyNm").value = data.companyNm;
                document.querySelector(".email").value = data.userEmail;
                document.querySelector(".lockYn").value = data.lockYn;
                document.querySelector(".failCnt").value = data.failCnt;
                document.querySelector(".userEndYmd").value = data.userEndYmd;
                document.querySelector(".doc").value = data.doc;
                stdgCdBox(ctpvDiv, data.stdgCd);
            })
    }

    /**
     * 사용자 정보 수정
     */
    userUpdate() {
        const that = this;
        const userId = document.querySelector(".userId").value;
        const companyNm = document.querySelector(".companyNm").value;
        const userEmail = document.querySelector(".email").value;
        const lockYn = document.querySelector(".lockYn").value;
        const doc = document.querySelector(".doc").value;
        const ctpv = document.querySelector(".ctpv") === null ? '' : document.querySelector(".ctpv").value;
        const stty = document.querySelector(".stty") === null ? '' : document.querySelector(".stty").value;
        const sgg = document.querySelector(".sgg") === null ? '' : document.querySelector(".sgg").value;
        const stli = document.querySelector(".stli") === null ? '' : document.querySelector(".stli").value;
        const stdgCd = ctpv + sgg + stty + stli;
        const failCnt = document.querySelector(".failCnt").value;
        const userEndYmd = document.querySelector(".userEndYmd").value;
        const data = {
            userId: userId,
            companyNm: companyNm,
            userEmail: userEmail,
            lockYn: lockYn,
            doc: doc,
            stdgCd: stdgCd,
            failCnt: failCnt,
            userEndYmd: userEndYmd
        };
        Axios.put("/userMng/userUpdate", data)
            .then((response) => {
                const data = response.data;
                if (data >= 1) {
                    alert("수정되었습니다.");
                    pop(document.querySelector(".memberForm"),false);
                    document.querySelector(".userTableBody").innerHTML='';
                    this.#page = 0;
                    that.createUserTable(0);
                } else {
                    alert("ERROR");
                }
            })
    }

    /**
     * 사용자 삭제
     */
    userDelete(){
        const that = this;
        const userId = document.querySelector(".userId").value;
        const params = {userId:userId}
        const yn= confirm("사용자를 제거 합니다");
        if(yn){
            Axios.delete("/userMng/userDelete",{params})
                .then((response)=>{
                    alert("제거되었습니다.");
                    pop(document.querySelector(".memberForm"),false);
                    document.querySelector(".userTableBody").innerHTML='';
                    that.createUserTable(0);
                })
        }
    }


}

export default new UserMng();
