'use strict';

(function() {
  var getDetails = function() {
    // map btwn <select> selected_type options and <input> form_type values
    var options_map = ["color_csv","color_url"]

    var selected_object, selected_value, selected_input;

    selected_object = document.getElementById("selected_type")
    selected_value = selected_object.options[selected_object.selectedIndex].value
    selected_input = document.getElementById(options_map[selected_value-1]).value
    

    // do validation of hex vs url in content script
    chrome.runtime.sendMessage({ result: true, data: selected_input });

  };

  document.getElementById("website_button").onclick = getDetails;
})();
