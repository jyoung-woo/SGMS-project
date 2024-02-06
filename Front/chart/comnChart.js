import * as echarts from 'echarts';

/**
 * 차트
 * @param id 차트를 사용할 div의 id
 * @param title 차트 이름
 * @param legend 범례값
 * @param data 차트에 적용될 데이터
 * @param xAxis x축 값
 * */
export function ComnChart(id, title, xAixs, legend1, style, param1, legend2, style2, param2, legend3, style3, param3, legend4, style4, param4) {
    let chartDiv = echarts.init(document.getElementById(id), null, {width: 1500, height: 400});
    let option = {
        title: {
            text: title,
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: [legend1],
            top: 100,
            right: 0
        },
        legend1: {
            data: [legend1],
            top: 100,
            right: 0
        },
        xAxis: {
            data: xAixs
        },
        yAxis: {},
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [{
            name: legend1,
            type: style,
            barMaxWidth: 60,
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            sampling: 'average',
            itemStyle: {
                color: '#0770FF'
            },
            stack: 'a',
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(58,77,233,0.8)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(58,77,233,0.3)'
                    }
                ])
            },
            data: param1
            },
            {
                name: '강수량',
                type: style2,
                data: param2,
                barMaxWidth: 20,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(194,112,227,0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(194,42,236,0.3)'
                        }
                    ])
                }
            },
            {
                name: '강수량',
                type: style3,
                data: param3,
                barMaxWidth: 20,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(194,112,227,0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(194,42,236,0.3)'
                        }
                    ])
                }
            },
            {
                name: '강수량',
                type: style4,
                data: param4,
                barMaxWidth: 20,
                emphasis: {
                    focus: 'series'
                },
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgba(194,112,227,0.8)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(194,42,236,0.3)'
                        }
                    ])
                }
            }
        ]
    };
    chartDiv.setOption(option);
}