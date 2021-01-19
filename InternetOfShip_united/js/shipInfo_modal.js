$(function(){
    //参数、选项
    $('#modalOpen').on('click',function(){
        
        var search_val=$('#searcher').val();
        // console.log(search_val);
        var url ='http://localhost:8888';
        var key;
        fetch(url).then(function(response) {
            return response.json();
        })
        .then(function(json) {
            for(i=0; i<10; i++) {
                if(search_val == json.features[i].properties.MMSI){
                    key=i;
                    break;
                }
            }
            console.log(json.features[key])
            var geoJson = {"type": "FeatureCollection",
            "crs": {
             "type": "name",
             "properties": {
               "name": "EPSG:4326"
             }
           },
           "features":json.features[key],   
        }

        var image_alter = new ol.style.Icon({
            anchor: [0.5, 0.5],
            src: './img/ship_big.png',
            scale: 0.2,
            rotation: -Math.PI/4
          });
          
          var styles= {
            'Point': new ol.style.Style({
              image: image_alter
            })
          };
        var searchedLayer = null;
        styleFunction = function(feature) {
            return styles[feature.getGeometry().getType()];
          };
        var searchedSource = new ol.source.Vector({
            features: (new ol.format.GeoJSON()).readFeatures(geoJson, { 
              dataProjection: 'EPSG:4326',
              featureProjection:'EPSG:4326' })
            });
            searchedLayer = new ol.layer.Vector({
            source: searchedSource,
            style: styleFunction
        });
        map.addLayer(searchedLayer);
        
        $('#ship-detail-box').on('show.bs.modal',function(){
            var modal = $(this);
            var MMSI = json.features[key].properties.MMSI;
            var CallSign = json.features[key].properties.CallSign;
            var IMO = json.features[key].properties.IMO;
            var Type = json.features[key].properties.VesselType;
            var Length = json.features[key].properties.Length;
            var Width = json.features[key].properties.Width;
            var Draft = json.features[key].properties.Draft;
            var COG = json.features[key].properties.COG;
            var SOG = json.features[key].properties.SOG;
            var Lon = json.features[key].geometry.coordinates[0];
            var Lat = json.features[key].geometry.coordinates[1];
            var BaseDateTime = json.features[key].properties.BaseDateTime;
    
            modal.find("span.1").html(MMSI);
            modal.find("span.2").html(CallSign);
            modal.find("span.3").html(IMO);
            modal.find("span.4").html(Type);
            modal.find("span.5").html(Length);
            modal.find("span.6").html(Width);
            modal.find("span.7").html(Draft);
            modal.find("span.8").html(COG);
            modal.find("span.10").html(SOG);
            modal.find("span.11").html(Lon);
            modal.find("span.12").html(Lat);
            modal.find("span.13").html(BaseDateTime);
          });
          $('#ship-detail-box').modal({
            backdrop: 'static',
            keyboard: true,
            show: true
        });
    });
    });
})