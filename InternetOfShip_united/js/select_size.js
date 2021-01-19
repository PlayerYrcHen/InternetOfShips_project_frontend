
$('#ship-detail-box').ready(function(){
    var clickTimes = 1;
    $(".s1").click(function(){
        if(clickTimes == 1) {
            selectPoint(0, 40)
            clickTimes = clickTimes + 1;
          }else {
            map.removeLayer(selectedLayer);
            shipPiont();
            clickTimes = clickTimes -1;
          }
    })
    $(".s2").click(function(){
        if(clickTimes == 1) {
            selectPoint(41, 48)
            clickTimes = clickTimes + 1;
          }else {
            map.removeLayer(selectedLayer);
            shipPiont();
            clickTimes = clickTimes -1;
          }
    })
    $(".s3").click(function(){
      if(clickTimes == 1) {
          selectPoint(81, 120)
          clickTimes = clickTimes + 1;
        }else {
          map.removeLayer(selectedLayer);
          shipPiont();
          clickTimes = clickTimes -1;
        }
    })
    $(".m1").click(function(){
      if(clickTimes == 1) {
          selectPoint(121, 160)
          clickTimes = clickTimes + 1;
        }else {
          map.removeLayer(selectedLayer);
          shipPiont();
          clickTimes = clickTimes -1;
        }
    })
    $(".m2").click(function(){
      if(clickTimes == 1) {
          selectPoint(161, 240)
          clickTimes = clickTimes + 1;
        }else {
          map.removeLayer(selectedLayer);
          shipPiont();
          clickTimes = clickTimes -1;
        }
    })
    $(".m3").click(function(){
      if(clickTimes == 1) {
          selectPoint(240, 320)
          clickTimes = clickTimes + 1;
        }else {
          map.removeLayer(selectedLayer);
          shipPiont();
          clickTimes = clickTimes -1;
        }
    })
    $(".b1").click(function(){
      if(clickTimes == 1) {
          selectPoint(320, 99999999)
          clickTimes = clickTimes + 1;
        }else {
          map.removeLayer(selectedLayer);
          shipPiont();
          clickTimes = clickTimes -1;
        }
    })
})

function selectPoint(left, right){
    var layers=map.getLayers().getArray();  //获取层
            var layer=layers[2];    //确定层
            var clusters=layer.getSource().getFeatures();   //获取该层的全部特征
            var cluster=clusters[0];
            var features=cluster.getProperties().features;
            // console.log(features);
            var selectedLayer = null;
            var newCluster={"type": "FeatureCollection","crs": {
                "type": "name",
                "properties": {
                  "name": "EPSG:4326"
                }
            }
            };
            var coordinates=[];
            var properties=[];
            var fea=[];
            var i;
            for(i in features)
                if(features[i].values_.Length <= right && features[i].values_.Length >= left){ 
                    properties.push(features[i].values_);
                    coordinates.push(features[i].values_.geometry.flatCoordinates);
                }
          
            for(i in properties){
                delete properties[i].geometry;
                var geometry={"type": "Point"};
                geometry.coordinates=coordinates[i];
                var trans={"type": "Feature"};
                trans.properties=properties[i];
                trans.geometry=geometry;
                fea.push(trans);
            }
            console.log(fea);
            
            newCluster.features=fea;
            // console.log(newCluster);
            
            styleFunction = function(feature) {
                return styles[feature.getGeometry().getType()];
              };
            var selectedSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(newCluster, { 
                  dataProjection: 'EPSG:4326',
                  featureProjection:'EPSG:4326' })
                });
            selectedLayer = new ol.layer.Vector({
                source: selectedSource,
                style: styleFunction
            });
            map.removeLayer(vectorLayer);
            map.addLayer(selectedLayer);
}
