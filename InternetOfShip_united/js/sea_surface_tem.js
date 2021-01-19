var blur = document.getElementById('blur');
var radius = document.getElementById('radius');

var sst_vector = new ol.layer.Heatmap({
  source: new ol.source.Vector({
    url: 'http://localhost:8086',
    format: new ol.format.KML({
      extractStyles: false,
    }),
  }),
  blur: parseInt(blur.value, 40),
  radius: parseInt(radius.value, 40),
  weight: function (feature) {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it from
    // the Placemark's name instead.
    var name = feature.get('name');
    var magnitude = parseFloat(name.substr(1));
    return magnitude - 273.15;
  },
});

var blurHandler = function () {
  sst_vector.setBlur(parseFloat(blur.value, 40));
};
blur.addEventListener('input', blurHandler);
blur.addEventListener('change', blurHandler);

var radiusHandler = function () {
  sst_vector.setRadius(parseFloat(radius.value, 40));
};
radius.addEventListener('input', radiusHandler);
radius.addEventListener('change', radiusHandler);