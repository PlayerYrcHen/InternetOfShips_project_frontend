

var styleFunction = function(feature) {
    var offset = 0;
    var name = feature.get('name'); // e.g. GMT -08:30
    var match = name.match(/([\-+]\d{2}):(\d{2})$/);
    if (match) {
      var hours = parseInt(match[1], 10);
      var minutes = parseInt(match[2], 10);
      offset = 60 * hours + minutes;
    }
    var date = new Date();
    var local = new Date(date.getTime() +
        (date.getTimezoneOffset() + offset) * 60000);
    // offset from local noon (in hours)
    var delta = Math.abs(12 - local.getHours() + (local.getMinutes() / 60));
    if (delta > 12) {
      delta = 24 - delta;
    }
    var opacity = 0.75 * (1 - delta / 12);
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [0xff, 0xff, 0x33, opacity]
      }),
      stroke: new ol.style.Stroke({
        color: '#ffffff'
      })
    });
  };

var vector = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'https://openlayers.org/en/latest/examples/data/kml/timezones.kml',
      format: new ol.format.KML({
        extractStyles: false
      })
    }),
    style: styleFunction
  });

  function showTimeZ(elem){
    var info = $('#info');
    info.tooltip({
      animation: false,
      trigger: 'manual'
    });
    
    var displayFeatureInfo = function(pixel) {
        info.css({
          left: pixel[0] + 'px',
          top: (pixel[1] - 15) + 'px'
        });
        var feature = map.forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
        });
        if (feature) {
          info.tooltip('hide')
            .attr('data-original-title', feature.get('name'))
            // .tooltip('fixTitle')
            .tooltip('show');
        } else {
          info.tooltip('hide');
        }
      };

      function add(evt) {
        if (evt.dragging) {
          info.tooltip('hide');
          return;
        }
        displayFeatureInfo(map.getEventPixel(evt.originalEvent));
      }

      if(elem.clicked){
        elem.clicked = 0;
        map.removeLayer(vector);
        ol.Observable.unByKey(key1);
        ol.Observable.unByKey(key2);
        info.tooltip('hide');
      }
      else{
          elem.clicked =  1;
          map.addLayer(vector);
          vector.setZIndex(5);
          key1 = map.on('pointermove', add.bind(this));
          key2 = map.on('click', function(evt) {
            displayFeatureInfo(evt.pixel);
          }.bind(this));
      }
      
  }