
// 海图图层
var vectorChart = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        //服务器地址
    // url: 'http://152.136.119.91:4022/wms',
              //本机服务地址
    url: 'http://127.0.0.1:8080/wms',
        params: {
          'LAYERS': 'ENC',
          'CSVALUE': '10,5,20,10,1,1,1,300000,100000,200000,1',
          'CRS': 'EPSG:3395',
          'TRANSPARENT': 'false',
          'CSBOOL': '4183'    //CSBOOL为显示控制参数
        },
        serverType: 'geoserver',
        // crossOrigin: 'anonymous'
    })
});

// OSM街景图
var OSMMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
});

// 高德地图
var gaodeMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url:'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
    })
});


// 雅虎地图
var yahooMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        tileSize: 512,
        url:'https://{0-3}.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?lg=ENG&ppi=250&token=TrLJuXVK62IQk0vuXFzaig%3D%3D&requestid=yahoo.prod&app_id=eAdkWGYRoc4RfxVo0Z4B'
    })
});

// google地图层
var googleMapLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        url:'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
    })
});

//经纬网图层
var graticule =  new ol.layer.Graticule({
  // the style to use for the lines, optional.
  strokeStyle: new ol.style.Stroke({
    color: 'rgba(255,120,0,0.9)',
    width: 2,
    lineDash: [0.5, 4]
  }),
  showLabels: true,
  wrapX: true,
  visible: true,
})


//Draw code start here
  
var source1 = new ol.source.Vector({wrapX: false});
  
var vectorDraw = new ol.layer.Vector({
  source: source1
});

//Draw code end here


//Measure code start here
var source2 = new ol.source.Vector();
var vectorMeasure = new ol.layer.Vector({
  source: source2,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});
//Measure code end here


// 创建地图

var view = new ol.View({
  // 设置成都为地图中心
  // 若要使用ol_echarts渲染风场图层，则必须使用4326坐标系
  center: [-173, 36],
  projection: 'EPSG:4326',
  zoom: 4
  //以下为默认的3857坐标系
    // center: ol.proj.fromLonLat([-173, 36]),
    // zoom: 4
  })

  // 鼠标获取经纬度
  const mousePositionControl1=
      new ol.control.MousePosition({
        coordinateFormat: function(coordinate){
          var lnglat=ol.coordinate.toStringHDMS(coordinate);
          var splited=lnglat.split(/([A-Z]\s)/);
          var lat=splited[0]+splited[1];
          return lat;
        },  //将经纬度对象转字符串，分割，并转换为度分秒格式
        projection: 'EPSG:4326',
        undefinedHTML: '',   //鼠标移到无效区域时，经纬度停留在最后值
        target: document.getElementById('lat')
      });

  const mousePositionControl2=
      new ol.control.MousePosition({
        coordinateFormat: function(coordinate){
          var lnglat=ol.coordinate.toStringHDMS(coordinate);
          var splited=lnglat.split(/([A-Z]\s)/);
          var lng=splited[2];
          return lng;
        },  //将经纬度对象转字符串，分割，并转换为度分秒格式
        projection: 'EPSG:4326',
        undefinedHTML: '',   //鼠标移到无效区域时，经纬度停留在最后值
        target: document.getElementById('lng')
      });

 var map = new ol.Map({
    controls: ol.control.defaults().extend(
      [ mousePositionControl1,
        mousePositionControl2,
        new ol.control.ScaleLine(),
        new ol.control.FullScreen()]
      
      ),
    layers:[
      OSMMapLayer,  //底图层
      vectorMeasure,     //测距层
      // graticule          //经纬网层
      sst_vector
    ],
    // overlays: [overlay],
    view: view,
    target: 'map'
});

function switch2OSM(elem) {
    // 先移除当前的地图，再添加Open Street Map 地图
    map.removeLayer(map.getLayers().item(0));
    map.addLayer(OSMMapLayer);
    OSMMapLayer.setZIndex(0);
    
    // graticule.setZIndex(4);
    // vectorMeasure.setZIndex(3);
    //   OSMMapLayer.setZIndex(2);
    //   console.log(gaodeMapLayer.getZIndex());
    //   if(gaodeMapLayer.getZIndex()>0)
    //   gaodeMapLayer.setZIndex(gaodeMapLayer.getZIndex()-1);
    //   if(googleMapLayer.getZIndex()>0)
    //   googleMapLayer.setZIndex(googleMapLayer.getZIndex()-1);
    
}

function switch2Gaode(elem) {
    map.removeLayer(map.getLayers().item(0));
    map.addLayer(vectorChart);
    vectorChart.setZIndex(0);

    // graticule.setZIndex(4);
    // vectorMeasure.setZIndex(3);
    //   gaodeMapLayer.setZIndex(2);
    //   if(OSMMapLayer.getZIndex()>0)
    //   OSMMapLayer.setZIndex(OSMMapLayer.getZIndex()-1);
    //   if(googleMapLayer.getZIndex()>0)
    //   googleMapLayer.setZIndex(googleMapLayer.getZIndex()-1);
    
}

// function switch2Yahoo() {
//     map.removeLayer(map.getLayers().item(0));
//     if(map.getLayers().item(1) != null)
//     map.removeLayer(map.getLayers().item(1));
//     map.addLayer(yahooMapLayer);
//     if(vectorMeasure != null)
//     map.addLayer(vectorMeasure);
// }

function switch2Google(elem) {
    map.removeLayer(map.getLayers().item(0));
    map.addLayer(googleMapLayer);
    googleMapLayer.setZIndex(0);

    // graticule.setZIndex(4);
    // vectorMeasure.setZIndex(3);
    //   googleMapLayer.setZIndex(2);
    //   if(OSMMapLayer.getZIndex()>0)
    //   OSMMapLayer.setZIndex(OSMMapLayer.getZIndex()-1);
    //   if(gaodeMapLayer.getZIndex()>0)
    //   gaodeMapLayer.setZIndex(gaodeMapLayer.getZIndex()-1);
}

// // Draw code from here.
// var typeSelect = document.getElementById('typeDraw');

// var draw; // global so we can remove it later
// function addInteraction1() {
//   var value = typeSelect.value;
//   if (value !== 'None') {
//     draw = new ol.interaction.Draw({
//       source: source1,
//       type: typeSelect.value
//     });
//     map.addInteraction(draw);
//   }
//   if(value == 'Clear') {
//     source1.clear();
//   }
// }


// /**
//  * Handle change event.
//  */
// typeSelect.onchange = function() {
//   map.removeInteraction(draw);
//   addInteraction1();
// };

// addInteraction1();


// Measure code from here.




function addMsInter(elem){
  //清空测量图层的交互
  function clearMeasure() {

    ol.Observable.unByKey(key1);
    ol.Observable.unByKey(key2);
    source2.clear();
    
    // map.removeLayer(vectorMeasure);
    
    map.getOverlays().clear();//关键点
    
    map.removeInteraction(measure);
  
    
    }
if(elem.clicked){
  elem.clicked = 0;
  clearMeasure();
}
else{
  elem.clicked = 1;

  /**
 * Currently drawn feature.
 * @type {import("../src/ol/Feature.js").default}
 */
var sketch;


/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
var helpTooltipElement;


/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
var helpTooltip;


/**
 * The measure tooltip element.
 * @type {HTMLElement}
 */
var measureTooltipElement;


/**
 * Overlay to show the measurement.
 * @type {Overlay}
 */
var measureTooltip;


/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
var continuePolygonMsg = 'Click to continue drawing the polygon';


/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = 'Click to continue drawing the line';


/**
 * Handle pointer move.
 * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
 */
var pointerMoveHandler = function(evt) {
  if (evt.dragging) {
    return;
  }
  /** @type {string} */
  var helpMsg = 'Click to start drawing';

  if (sketch) {
    var geom = sketch.getGeometry();
    if (geom instanceof ol.geom.Polygon) {
      helpMsg = continuePolygonMsg;
    } else if (geom instanceof ol.geom.LineString) {
      helpMsg = continueLineMsg;
    }
  }

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
};

key1 = map.on('pointermove', pointerMoveHandler.bind(this));

key2 = map.getViewport().addEventListener('mouseout', function() {
  helpTooltipElement.classList.add('hidden');
}.bind(this));

var typeSelectMs = document.getElementById('typeMeasure');

var measure; // global so we can remove it later


/**
* Format length output.
* @param {LineString} line The line.
* @return {string} The formatted length.
*/
var formatLength = function(line) {
  var length = ol.sphere.getLength(line);
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};


/**
* Format area output.
* @param {Polygon} polygon The polygon.
* @return {string} Formatted area.
*/
var formatArea = function(polygon) {
  var area = ol.sphere.getArea(polygon);
  var output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
};

function addInteraction2(){
  var type = (typeSelectMs.value == 'area' ? 'Polygon' : 'LineString');
  if(typeSelectMs.value == 'area' || typeSelectMs.value == 'length') {
  measure = new ol.interaction.Draw({
    source: source2,
    type: type,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });
  map.addInteraction(measure);

  createMeasureTooltip();
  createHelpTooltip();

  var listener;
  measure.on('drawstart',
    function(evt) {
      // set sketch
      sketch = evt.feature;

      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      var tooltipCoord = evt.coordinate;

      listener = sketch.getGeometry().on('change', function(evt) {
        var geom = evt.target;
        var output;
        if (geom instanceof ol.geom.Polygon) {
          output = formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom instanceof ol.geom.LineString) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    });

    measure.on('drawend',
    function() {
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      ol.Observable.unByKey(listener);
    });
  }
  if(typeSelectMs.value == 'clear') {
    clearMeasure();
  }
  
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(helpTooltip);
}


/**
* Creates a new measure tooltip
*/
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}

 /**
 * Let user change the geometry type.
 */
    typeSelectMs.onchange = function() {
        map.removeInteraction(measure);
        addInteraction2();
      };
    addInteraction2();
  }
}

// export default map;