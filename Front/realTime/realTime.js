import Axios from '../axios'
import {error} from "ol/console";

class RealTime{
    constructor() {
        this.init();
    }
    init() {
        this.getList();
        this.searchFunc();
        this.excelDownload();
    }

    /**
     * realtime 리스트, 검색
     * @searchType : 검색 항목
     * @searchKeyword : 검색 키워드
     * @params : 관측소 코드
     * */
    getList() {
        let select = document.getElementById('searchCondition');
        let option = select.options[select.selectedIndex].value;
        let searchKeyword = document.getElementById('searchKeyword').value;
        let params = {searchType: option, searchKeyword: searchKeyword}
        const table = document.getElementById('tBody');
        Axios.get('/realTime/realTimeState/realTimeList', {params})
            .then((res) => {
                document.querySelector('.result-data #rn').innerText = res.data.cnt;
                for( let i = 0; i < res.data.list.length; i++ ) {
                    const tr = document.createElement('tr');
                    tr.innerHTML +=     `<tr>
                                            <td> ${i+1} </td>
                                            <td> ${res.data.list[i].obsvNm} </td>
                                            <td> ${res.data.list[i].obsvCd} </td>
                                            <td> ${res.data.list[i].modemTel} </td>
                                            <td> ${res.data.list[i].msrtDt} </td>
                                            <td> ${res.data.list[i].digDepth} </td>
                                            <td> ${res.data.list[i].elev} </td>
                                            <td> ${res.data.list[i].el} </td>
                                            <td> ${res.data.list[i].gl} </td>
                                            <td> ${res.data.list[i].temp} </td>
                                            <td> ${res.data.list[i].ec} </td>
                                            <td> ${res.data.list[i].bar} </td>
                                            <td> ${res.data.list[i].battery} </td> 
                                        </tr>`;
                    table.appendChild(tr);
                    tr.addEventListener('click', () => {
                        let td = tr.children;
                        let obCd = td[2].innerHTML;
                        obCd = obCd.replaceAll(" ", "");

                        let params = {obsvCd: obCd}
                        Axios.get('/obsvData/detail', {params})
                            .then((res) => {
                            location.href=`/obsvData/detail?obsvCd=${obCd}`;
                        })
                            .catch((error));
                    }); //..evtLsn
                }
            });
    }

    /**
     * 엑셀 다운로드
     * */
    excelDownload() {
        document.querySelector('.excel').addEventListener('click', () => {
            let select = document.getElementById('searchCondition');
            let option = select.options[select.selectedIndex].value;
            let searchKeyword = document.getElementById('searchKeyword').value;
            const params = {searchType: option, searchKeyword: searchKeyword};
            Axios.get('/realTime/realTimeState/excelDownload', {params, responseType: 'blob'})
                .then((res) => {
                    console.log('success');
                    const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers["content-type"] }));
                    const link = document.createElement("a");
                    const fileName = res.headers["content-disposition"].split("=")[1];
                    link.href = url;
                    link.download = fileName;
                    link.click();
                    window.URL.revokeObjectURL(url);
            });
        })
    }

    /**
     * 검색 버튼 이벤트
     */
    searchFunc() {
        document.querySelector('.search-btn').addEventListener('click', () => {
            document.getElementById('tBody').innerText = "";
            this.getList();
        });
    }
}

export default new RealTime();