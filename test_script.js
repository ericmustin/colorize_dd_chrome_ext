'use strict';

(function() {
  var colorThief = new ColorThief();

  var captureHexFromImg = function (request) {
    var customColorsArray = [{}]
    var imgOk = document.createElement('img')
    imgOk.setAttribute('src', request.data);
    imgOk.setAttribute('width', 500);
    imgOk.setAttribute('height', 500);
    imgOk.setAttribute('opacity', 0);
    imgOk.setAttribute('id','thingToCheck');
    document.body.appendChild(imgOk);
    var imgtwo = document.getElementById('thingToCheck');

    if (imgtwo && imgtwo.naturalWidth) {
      onImageLoad();
    } else {
      imgtwo.onload = function() {
        onImageLoad(); 
      }; 
    }

    function onImageLoad() {
      var rgb = colorThief.getPalette(imgtwo,4,5);

      function componentToHex(c) {
          var hex = c.toString(16);
          return hex.length == 1 ? "0" + hex : hex;
      }

      function rgbToHex(r, g, b) {
          return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      }

      rgb.forEach(function(x,index) {
        var temp = ['zero','one','two','three']
        customColorsArray[0]['site-'+temp[index]] = rgbToHex(x[0],x[1],x[2])
      })
      
      imgtwo.parentNode.removeChild(imgtwo);

      applyToScreenboard(customColorsArray)
    }
  }

  var captureFromCSV = function(request) {
    var customColorsArray = [{}];
    var hexArray = request.data.split(",")

    hexArray.forEach(function(hex,index) {
      var temp = ['zero','one','two','three']
      customColorsArray[0]['site-'+temp[index]] = hex;
    })

    applyToScreenboard(customColorsArray)
  }
  
  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
    // TODO: need to promisify all this stuff
    if(request.picture) {
      captureHexFromImg(request)
    } else if(request.csv) {
      captureFromCSV(request)
    } else {
      console.log('ya done messed up a aron')
    }

  });

  var applyToScreenboard = function(customColorsArray) {

    function createClass(name,rules){
        var style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        if(!(style.sheet||{}).insertRule) 
            (style.styleSheet || style.sheet).addRule(name, rules);
        else
            style.sheet.insertRule(name+"{"+rules+"}",0);
    }

    function applyClass(name,element,doRemove){
      if(!element) return;

      if(doRemove){
        element.classList.remove(name)
      }else{      
        element.classList.add(name)
      }
    }    
    

    customColorsArray.forEach(function(movie){
      Object.keys(movie).forEach(function(title){
        createClass("." + title+"-area","fill: " + movie[title] +" !important;");
        createClass("." + title+"-line","stroke: " + movie[title] +" !important;");
      });
    });


    var y = null; 

    $('.widget-layout').each( function(index,x) { 
      
      y = $(x).find('.series.line,.series.area');

      if (y.length > 0){
        y.each(function(index,x) {
          var color_keys = Object.keys(customColorsArray[0])
          var hash = (color_keys.length + index) % color_keys.length

          if (x.classList.toString().indexOf("line") >= 0) {
            applyClass(color_keys[hash]+"-line",x)
          } else {
            applyClass(color_keys[hash]+"-area",x)
          }
        });
      }
    });
  }


})();