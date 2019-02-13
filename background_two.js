'use strict';

(function() {
  var getDetails = function() {

    console.log('this is executed')
    var result = document.getElementById("website")
    console.log(result.value)
    var newURL = result.value;
    
    
    chrome.runtime.sendMessage({ result: true, data: newURL });
  };

  document.getElementById("website_button").onclick = getDetails;
})();
