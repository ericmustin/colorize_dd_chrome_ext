'use strict';

(function() {
  window.andersonColorsArray = [
    {
      "the-life-aquatic-with-steve-zissou-azure": "#1DACE8",
      "the-life-aquatic-with-steve-zissou-dark-slate-blue": "#1C366B",
      "the-life-aquatic-with-steve-zissou-tomato": "#F24D29",
      "the-life-aquatic-with-steve-zissou-beige": "#E5C4A1",
      "the-life-aquatic-with-steve-zissou-silver": "#C4CFD0"  
    },
    {
      "the-royal-tenenbaums-leather": "#9A872D",
      "the-royal-tenenbaums-light-khaki": "#F5CDB6",
      "the-royal-tenenbaums-blush": "#F7B0AA",
      "the-royal-tenenbaums-pale-peach": "#FDDDA4",
      "the-royal-tenenbaums-greyish-teal": "#76A08A"
    },
    {
      "grand-budapest-hotel-faded-pink": "#D8A49B",
      "grand-budapest-hotel-light-periwinkle": "#C7CEF6",
      "grand-budapest-hotel-faded-blue": "#7496D2"
    },
    {
      "moonrise-kingdom-brick": "#B62A3D",
      "moonrise-kingdom-dull-yellow": "#EDCB64",
      "moonrise-kingdom-dust": "#B5966D",
      "moonrise-kingdom-light-blue-grey": "#DAECED",
      "moonrise-kingdom-greenish-beige": "#CECD7B"
    },
    {
      "fantastic-mr-fox-maize": "#F8DF4F",
      "fantastic-mr-fox-brownish": "#A35E60",
      "fantastic-mr-fox-mud-brown": "#541F12",
      "fantastic-mr-fox-dull-orange": "#CC8B3C",
      "fantastic-mr-fox-beige": "#E8D2B9"  
    },
    {
      "the-darjeeling-limited-greyish": "#AEA8A8",
      "the-darjeeling-limited-brownish-orange": "#CB9E23",
      "the-darjeeling-limited-reddish-grey": "#957A6D",
      "the-darjeeling-limited-clay": "#AC6E49"
    },
    {
      "hotel-chevalier-gunmetal": "#456355",
      "hotel-chevalier-pale-gold": "#FCD16B",
      "hotel-chevalier-silver": "#D3DDDC",
      "hotel-chevalier-pinkish-grey": "#C6B19D"  
    },
    {
      "rushmore-sand": "#DBB165",
      "rushmore-pinkish-tan": "#DEB18B",
      "rushmore-pine": "#2E604A",
      "rushmore-dark": "#27223C",
      "rushmore-faded-red": "#D1362F"  
    }
  ];

  window.andersonColorNames = ['the-life-aquatic-with-steve-zissou-azure', 'the-life-aquatic-with-steve-zissou-dark-slate-blue', 'the-life-aquatic-with-steve-zissou-tomato', 'the-life-aquatic-with-steve-zissou-beige', 'the-life-aquatic-with-steve-zissou-silver', 'the-royal-tenenbaums-leather', 'the-royal-tenenbaums-light-khaki', 'the-royal-tenenbaums-blush', 'the-royal-tenenbaums-pale-peach', 'the-royal-tenenbaums-greyish-teal', 'grand-budapest-hotel-faded-pink', 'grand-budapest-hotel-light-periwinkle', 'grand-budapest-hotel-faded-blue', 'moonrise-kingdom-brick', 'moonrise-kingdom-dull-yellow', 'moonrise-kingdom-dust', 'moonrise-kingdom-light-blue-grey', 'moonrise-kingdom-greenish-beige', 'fantastic-mr-fox-maize', 'fantastic-mr-fox-brownish', 'fantastic-mr-fox-mud-brown', 'fantastic-mr-fox-dull-orange', 'fantastic-mr-fox-beige', 'the-darjeeling-limited-greyish', 'the-darjeeling-limited-brownish-orange', 'the-darjeeling-limited-reddish-grey', 'the-darjeeling-limited-clay', 'hotel-chevalier-gunmetal', 'hotel-chevalier-pale-gold', 'hotel-chevalier-silver', 'hotel-chevalier-pinkish-grey', 'rushmore-sand', 'rushmore-pinkish-tan', 'rushmore-pine', 'rushmore-dark', 'rushmore-faded-red' ];
  window.andersonColors = ["#1DACE8","#1C366B","#F24D29","#E5C4A1","#C4CFD0","#9A872D","#F5CDB6","#F7B0AA","#FDDDA4","#76A08A","#D8A49B","#C7CEF6","#7496D2","#B62A3D","#EDCB64","#B5966D","#DAECED","#CECD7B","#F8DF4F","#A35E60","#541F12","#CC8B3C","#E8D2B9","#AEA8A8","#CB9E23","#957A6D","#AC6E49","#456355","#FCD16B","#D3DDDC","#C6B19D","#DBB165","#DEB18B","#2E604A","#27223C","#D1362F"];

  window.onload = function() {
    console.log("jquery found: ",window.jQuery)

    function createClass(name,rules){
        var style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        if(!(style.sheet||{}).insertRule) 
            (style.styleSheet || style.sheet).addRule(name, rules);
        else
            style.sheet.insertRule(name+"{"+rules+"}",0);
    }

    andersonColorsArray.forEach(function(movie){
      Object.keys(movie).forEach(function(title){
        createClass("." + title+"-area","fill: " + movie[title] +" !important;");
        createClass("." + title+"-line","stroke: " + movie[title] +" !important;");
      });
    });

    function applyClass(name,element,doRemove){
        if(!element) return;
        if(doRemove){
            element.className.remove(name)
        }else{      
            element.classList.add(name)
        }
    }    
    
    var y = null; 

    $('.widget-layout').each( function(index,x) { 
      console.log(index); 
      y = $(x).find('.series.line,.series.area'); 
      if (y.length > 0){
        return false
      }
    });

    y.each(function(index,x) {
      var color_keys = Object.keys(andersonColorsArray[0])
      var hash = (color_keys.length + index) % color_keys.length

      console.log(x)
      if (x.classList.toString().indexOf("line") >= 0) {
        
        applyClass(color_keys[hash]+"-line",x)
      } else {
        
        applyClass(color_keys[hash]+"-area",x)
      }
    });







    // var result = document.getElementsByClassName("series line");

    // if (result.length > 0) {
    //   console.log(typeof result, Array.isArray(result))
    //   for (var index = 0; index < result.length; index++) {
    //     var line = result[index];
    //     var hashedAndersonIndex = andersonColorNames.length - 1 - (index % (andersonColorNames.length - 1))
    //     applyClass(andersonColorNames[hashedAndersonIndex]+"-line",line)
    //   }
      
    // } else {
    //   console.log('not today lil one')
    // }

    // var result = document.getElementsByClassName("series area");

    // if (result.length > 0) {
    //   for (var index = 0; index < result.length; index++) {
    //     var area = result[index];
    //     var hashedAndersonIndex = andersonColorNames.length - 1 - (index % (andersonColorNames.length - 1))
    //     applyClass(andersonColorNames[hashedAndersonIndex]+"-area",area)
    //   }
    // } else {
    //   console.log('not today lil one')
    // }
  }
})();