function refreshChart(){
    var a = $('input[name="rdoChartTransparent"]:radio:checked').val();
    //var a = $("#selChartTransparent").val();
    if (a == "0") {
        try {
            c1.onRemove(map);
        } catch (e) { }
        try {
            c2.onRemove(map);
        } catch (e) { }
    } else if (a == "1") {
        try {
            c1.onRemove(map);
        } catch (e) { }
        try {
            c2.onRemove(map);
        } catch (e) { }
       
    }
    map.removeLayer(vectorChart);
        vectorChart = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://127.0.0.1:8080/wms',
                params: {
                    'LAYERS': 'ENC',
                    'CSBOOL': GetCSBOOL(),
                    'CSVALUE': GetCSVALUE(),
                    'CRS': 'EPSG:3395',
                    'TRANSPARENT': 'false'
                },
                serverType: 'geoserver',
                //crossOrigin: 'anonymous'
            })
        });
        map.addLayer(vectorChart);                
}//海图图层显示参数
function GetCSBOOL() {
    
    //添加
    //strChartInfo += $("#selChartTransparent").val() + "|";
    strChartInfo = $('input[name="rdoChartTransparent"]:radio:checked').val() + "|";
    //添加
    var strCSBOOL = "";
    for (var i = 16; i > 0; i--) {
        var istrue = $('input[name="cbxChartCSBOOL"][value="' + i + '"]').is(':checked');
        if (istrue) {
            strCSBOOL = strCSBOOL + '1';
        } else {
            strCSBOOL = strCSBOOL + '0';
        }
    }
    //将二进制转换成十六进制
    strCSBOOL= parseInt(strCSBOOL, 2).toString(16);
    //添加
    return strCSBOOL;
}
function GetCSVALUE(){
   var CSVALUE = txtChart1.value + "," + txtChart2.value + "," + txtChart3.value + "," + txtChart4.value + ",";
    CSVALUE += $("#selChart5").val() + "," + $("#selChart6").val() + "," + $("#selChart7").val() + ",";
    CSVALUE += txtChart8.value + "," + txtChart9.value + "," + txtChart10.value + ",";
    CSVALUE += $("#selChart11").val();
    return CSVALUE;
}