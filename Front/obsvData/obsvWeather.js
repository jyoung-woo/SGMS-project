import Axios from '../axios';
import {ComnChart} from "../chart/comnChart";
import chart from "ol-ext/style/Chart";

class ObsvData{

    constructor() {
        this.init();
    }
    init() {
        this.getObsvDataBox();
        this.obsvChangeEvt();
        //this.toggleListener();
        this.excelDownload();
    }

    /**
     * 관측소 데이터 리스트
     * */
    obsvList() {
        let obsvCd = document.getElementById('siteCode');
        obsvCd = obsvCd.options[obsvCd.selectedIndex].value;
        let params = {obsvCd: obsvCd};
        Axios.get('/obsvData/obsvWeatherList', {params})
            .then((res) => {
                document.querySelector('.result-data #total').innerText = res.data.cnt;
                const table = document.getElementById('tBody');
                for(let i=0; i<res.data.list.length; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML += `<tr>
                                        <td>${res.data.list[i].obsvNm}</td>
                                        <td>${res.data.list[i].sensorId}</td>
                                        <td>${res.data.list[i].windDir}</td>                
                                        <td>${res.data.list[i].windSpeed}</td>                
                                        <td>${res.data.list[i].airTemp}</td>                
                                        <td>${res.data.list[i].humidity}</td>                
                                        <td>${res.data.list[i].rainfall}</td>                      
                                        <td>${res.data.list[i].atmPressure}</td>                
                                        <td>${res.data.list[i].solarRadiation}</td>                
                                        <td>${res.data.list[i].uv}</td>                
                                    </tr>`
                    table.appendChild(tr);
                }
            })
    }

    /**
     * 관측소 항목 변경시 데이터 변경에 따른 그래프 재생성
     * */
    obsvChangeEvt() {
        document.getElementById('siteCode').addEventListener("change", () => {
            const table = document.getElementById('tBody');
            let removeList = table.querySelectorAll('tr');
            for(let i=0; i<removeList.length; i++) {
                removeList[i].remove();
            }
            const obsvNm = document.getElementById('siteCode');
            let data = obsvNm.options[obsvNm.selectedIndex].value;
            document.getElementById('sensor').options.length = 0;
            this.obsvList();
            this.sensorBox(data);
            this.setChart();
        })
    }

    /**
     * 관측소 항목 옵션 세팅
     * */
    getObsvDataBox() {
        Axios.get('/obsvData/obsvBox')
            .then((res) => {
                const obsvNm = document.getElementById('siteCode');
                let html = '';
                for(let i=0; i<res.data.length; i++) {
                    html = document.createElement('option');
                    html.value = res.data[i].obsvCd;
                    html.innerText = res.data[i].obsvCd;
                    obsvNm.append(html);
                }
                let data = obsvNm.options[obsvNm.selectedIndex].value;
                this.sensorBox(data);
                this.obsvList();
                this.setChart();
            });
    }

    sensorBox(data){
        const params = {obsvCd: data}
        Axios.get('/obsvData/sensorBox', {params})
            .then((res) => {
                let sensorBox = document.getElementById('sensor');
                let html = '';
                for(let i=0; i<res.data.length; i++) {
                    html = document.createElement('option');
                    html.value = res.data[i].sensorId;
                    html.innerText = res.data[i].sensorId;
                    sensorBox.append(html);
                }
            })
    }

        /**
         * 차트 생성
         */
        setChart() {
            const obsvNm = document.getElementById('siteCode');
            let data = obsvNm.options[obsvNm.selectedIndex].value;
            let params = {obsvCd: data};
            let chartData = [];
            Axios.get('/obsvData/obsvWeatherList', {params})
                .then((res) => {
                    let chartData = [];
                    let xAixis = [];
                    let a = document.getElementById('chartdiv1');
                    let b = document.getElementById('chartdiv2');
                    let c = document.getElementById('chartdiv3');

                    for(let i=0; i<res.data.list.length; i++) {
                        if(res.data.list[i].rainfall != null) {
                            chartData[i] = res.data.list[i].rainfall;
                            xAixis[i] = res.data.list[i].msrtDt;
                        }
                    }
                    ComnChart('chartdiv1', "강수량", xAixis, 'EL', 'bar', chartData);

                    for(let i=0; i<res.data.list.length; i++) {
                        if(res.data.list[i].airTemp != null) {
                            chartData[i] = res.data.list[i].airTemp;
                            xAixis[i] = res.data.list[i].msrtDt;
                        }
                    }
                    ComnChart('chartdiv2', "온도", xAixis,'시간', 'line', chartData);

                    for(let i=0; i<res.data.list.length; i++) {
                        if(res.data.list[i].windSpeed != null) {
                            chartData[i] = res.data.list[i].windSpeed;
                            xAixis[i] = res.data.list[i].msrtDt;
                        }
                    }
                    ComnChart('chartdiv3', "풍속", xAixis, '시간', 'line', chartData);
                    this.toggleListener(a, 'rainfall');
                    this.toggleListener(b, 'airTemp');
                    this.toggleListener(c, 'windSpeed');
                }).catch()
        }
            /**
             * 엑셀
             * */
            excelDownload() {
                document.querySelector('.excel').addEventListener('click', () => {
                    let select = document.getElementById('siteCode');
                    let option = select.options[select.selectedIndex].value;
                    const params = {obsvCd: option};
                    Axios.get('/obsvData/weatherExcelDownload', {params, responseType: 'blob'})
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
        toggleListener(div, toggle) {
            document.getElementById(toggle).addEventListener('click', (evt) => {
                if(evt.target.checked) {
                    div.style.display = "block";
                } else {
                    div.style.display = "none"
                }
            });
        }
}
export default new ObsvData();