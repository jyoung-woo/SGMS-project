import Axios from '../axios';
import {ComnChart} from "../chart/comnChart";

class ObsvData{

    constructor() {
        this.init();
    }
    init() {
        this.firstLoad();
        this.obsvChangeEvt();
        this.excelDownload();
    }

    /**
     * 다른 페이지에서 해당 페이지 최초 이동 요청시 실행
     * */
    firstLoad() {
        let data = window.location.search;
        data = data.replaceAll("?obsvCd=", '');
        this.obsvList(data);
        this.getObsvDataBox(data);
    }

    /**
     * 관측소 데이터 리스트
     * */
    obsvList(data) {
        let params = {obsvCd: data}
        Axios.get('/obsvData/dataList', {params})
            .then((res) => {
                document.querySelector('.result-data #total').innerText = res.data.cnt;
                const table = document.getElementById('tBody');
                for(let i=0; i<res.data.list.length; i++) {
                    const tr = document.createElement('tr');
                    tr.innerHTML += `<tr>
                                        <td>${res.data.list[i].obsvNm}</td>                
                                        <td>${res.data.list[i].sensorId}</td>                
                                        <td>${res.data.list[i].msrtDt}</td>                
                                        <td>${res.data.list[i].el}</td>                
                                        <td>${res.data.list[i].gl}</td>                
                                        <td>${res.data.list[i].temp}</td>                
                                        <td>${res.data.list[i].ec}</td>                
                                        <td>${res.data.list[i].bar}</td>                
                                        <td>${res.data.list[i].battery}</td>                
                                        <td>${res.data.list[i].sbattery}</td>
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
            let data = document.getElementById('siteCode');
            data = data.options[data.selectedIndex].value;
            document.getElementById('siteCode').options.length = 0;
            document.getElementById('sensor').options.length = 0;
            this.getObsvDataBox(data);
        })
    }

    /**
     * 관측소 항목 옵션 세팅
     * */
    getObsvDataBox(data) {
        Axios.get('/obsvData/obsvBox')
            .then((res) => {
                let obsvNm = document.getElementById('siteCode');
                let html = '';
                for(let i=0; i<res.data.length; i++) {
                    html = document.createElement('option');
                    html.value = res.data[i].obsvCd;
                    html.innerText = res.data[i].obsvCd;
                    obsvNm.append(html);
                }
                for(let j=0; j<obsvNm.length; j++) {
                    if(obsvNm.options[j].value == data) {
                        obsvNm.options[j].selected = true;
                    }
                }
                this.sensorBox();
                this.setChart();
            });
    }

    sensorBox() {
        let param = document.getElementById('siteCode');
        param = param.options[param.selectedIndex].value;
        const params = {obsvCd: param}
        Axios.get('/obsvData/sensorBox', {params})
            .then((res) => {
                let sensor = document.getElementById('sensor');
                let html = '';
                for(let i=0; i<res.data.length; i++) {
                    html = document.createElement('option');
                    html.value = res.data[i].sensorId;
                    html.innerText = res.data[i].sensorId;
                    sensor.append(html);
                }
            })
    }

    /**
     * 차트 생성
     * */
    setChart() {
        const siteCode = document.getElementById('siteCode');
        const data = siteCode.options[siteCode.selectedIndex].value;
        let params = {obsvCd: data}
        Axios.get('/obsvData/data', {params})
            .then((res) => {
                const table = document.getElementById('tBody');
                this.obsvList(data);
                let removeList = table.querySelectorAll('tr');
                for(let i=0; i<removeList.length; i++) {
                    removeList[i].remove();
                }
                let chartData = [];
                let xAixis = [];
                let rainfall = [];
                let a = document.getElementById('chartdiv1');
                let b = document.getElementById('chartdiv2');
                let c = document.getElementById('chartdiv3');
                let d = document.getElementById('chartdiv4');
                let e = document.getElementById('chartdiv5');
                let f = document.getElementById('chartdiv6');

                for(let i=0; i<res.data.data.length; i++) {
                    if(res.data.data[i].el != null) {
                        chartData[i] = res.data.data[i].el;
                        xAixis[i] = res.data.data[i].msrtDt;
                        rainfall[i] = res.data.data[i].rainfall;

                    }
                }

                ComnChart('chartdiv1', "수위(EL.m)", xAixis, '수위', 'line', chartData, '강우량', 'bar', rainfall);
                for(let i=0; i<res.data.data.length; i++) {
                    if(res.data.data[i].gl != null) {
                        chartData[i] = res.data.data[i].gl;
                        xAixis[i] = res.data.data[i].msrtDt;
                    }
                }
                ComnChart('chartdiv2', "수위(GL.m)", xAixis,'시간', 'line', chartData);

                for(let i=0; i<res.data.data.length; i++) {
                    if(res.data.data[i].temp != null) {
                        chartData[i] = res.data.data[i].temp;
                        xAixis[i] = res.data.data[i].msrtDt;
                    }
                }
                ComnChart('chartdiv3', "수온(℃)", xAixis, '시간', 'line', chartData);

                for(let i=0; i<res.data.data.length; i++) {
                    if(res.data.data[i].ec != null) {
                        chartData[i] = res.data.data[i].ec;
                        xAixis[i] = res.data.data[i].msrtDt;
                    }
                }
                ComnChart('chartdiv4', "EC(μS/cm)", xAixis,'시간', 'line', chartData);

                this.toggleListener(a, 'el');
                this.toggleListener(b, 'gl');
                this.toggleListener(c, 'temp');
                this.toggleListener(d, 'ec');
                this.toggleListener(e, 'rainfall');
                this.toggleListener(f, 'tm');
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
            Axios.get('/obsvData/excelDownload', {params, responseType: 'blob'})
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