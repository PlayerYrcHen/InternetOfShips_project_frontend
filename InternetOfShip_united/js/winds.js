/**
 * echarts风场叠加
 * @authors yrc(1293291864@qq.com)
 * @date    2020-05-28
 * @version $Id$
 */
//导入ECharts
import  echarts from 'echarts'
import 'echarts-gl'
//导入自定义的openlayers.echart模块
import ADLayer from './openlayers.echart'
//导入在另一个js中实例化的map
import map from './baseMap'


$(document).ready(function(){
    var clickTime=0;
    var oe;
    $(".winds").click(function(){
        if(clickTime==0){
            //
            
            fetch('http://localhost:8088/')
            .then(function(response) {
                return response.json();
            })
            .then(function(windData) {
                // console.log(windData)
                var data = [];
                var p = 0;
                var maxMag = 0;
                var minMag = Infinity;
                for (var j = 0; j < windData.ny; j++) {
                    for (var i = 0; i <= windData.nx; i++) {
                        // Continuous data.
                        var p = (i % windData.nx) + j * windData.nx;
                        var vx = windData.data[p][0];
                        var vy = windData.data[p][1];
                        var mag = Math.sqrt(vx * vx + vy * vy);
                        // 数据是一个一维数组
                        // [ [经度, 维度，向量经度方向的值，向量维度方向的值] ]
                        data.push([
                            i / windData.nx * 360 - 180,
                            j / windData.ny * 180 - 90,
                            vx,
                            vy,
                            mag
                        ]);
                        maxMag = Math.max(mag, maxMag);
                        minMag = Math.min(mag, minMag);
                    }
                }
                let option = {
                    visualMap: {
                        left: 'right',
                        min: minMag,
                        max: maxMag,
                        dimension: 4,
                        inRange: {
                            // color: ['green', 'yellow', 'red']
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        },
                        realtime: false,
                        calculable: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    series: [{
                        type: 'flowGL',
                        coordinateSystem: 'bmap',
                        data: data,
                        supersampling: 4,
                        particleType: 'line',
                        particleDensity: 128,
                        particleSpeed: 1,
                        // gridWidth: windData.nx,
                        // gridHeight: windData.ny,
                        itemStyle: {
                            opacity: 0.7
                        }
                    }]
                }
                oe= new ADLayer(option,map,echarts);
                oe.render();  
            });
            clickTime++;
        }
        else{
            //
            oe.clear();
            clickTime--;
        }
        console.log(clickTime);
    })
})