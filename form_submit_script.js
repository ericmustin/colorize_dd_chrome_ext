'use strict';

(function() {
  // map btwn <select> selected_type options and <input> form_type values
  var options_map = ["color_csv","color_url"]
  
  var getDetails = function() {


    var selected_object, selected_value, selected_input;

    selected_object = document.getElementById("selected_type")
    selected_value = selected_object.options[selected_object.selectedIndex].value
    selected_input = document.getElementById(options_map[selected_value-1]).value
    

    // do validation of hex vs url in content script
    chrome.runtime.sendMessage({ result: true, data: selected_input });

  };


  var showInput = function(event) {
    console.log(event)

    var value = event.target.options[event.target.selectedIndex].value
    console.log('value now', value)
    console.log(options_map.find(function(x){return (x !== options_map[value-1])}))
    var unhideInput = document.getElementById(options_map[value-1])
    var hideInput = document.getElementById( options_map.find(function(x){return (x !== options_map[value-1])}) )
    
    applyClass("hideInput", hideInput)
    applyClass("hideInput", unhideInput, true)
  }

  function applyClass(name,element,doRemove){
    if(!element) return;

    if(doRemove){
      element.classList.remove(name)
    }else{      
      element.classList.add(name)
    }
  } 
  document.getElementById('selected_type').onchange = showInput;
  document.getElementById("website_button").onclick = getDetails;
})();
