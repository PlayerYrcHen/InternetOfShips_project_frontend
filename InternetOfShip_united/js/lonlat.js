

  function netShow(){
    if(this.clicked){
        this.clicked = 0;
        // map.getLayers().item(2).setVisible(false);
        map.removeLayer(graticule);
        
    }
    else{
        clicked = 1;
        //  map.getLayers().item(2).setVisible(true);
        map.addLayer(graticule);
        // console.log("111");
    }
    }
