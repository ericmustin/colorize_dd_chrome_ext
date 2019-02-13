'use strict';

(function(){
  var colorThief = new ColorThief();
  var andersonColorsArray = [{
  }]

  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
    if(request.picture) {
      console.log('works')
      // var newImg = $('<img id="dynamic">')

      

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
          console.log('oh boy2')
        var rgb = colorThief.getPalette(imgtwo,4,5);
        console.log(rgb)

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        rgb.forEach(function(x,index) {
          var temp = ['zero','one','two','three']
          andersonColorsArray[0]['site-'+temp[index]] = rgbToHex(x[0],x[1],x[2])
        })
        
        imgtwo.parentNode.removeChild(imgtwo);
      }     
    
    }
  });

}());

