'use strict';

(function() {
  function captureWindowTab(tabid) {
    // chrome.tabs.update(tabid, {}, function() {
      chrome.tabs.captureVisibleTab(tabid, {format:"png"}, function(dataUrl) {
        console.log('in here');
        console.log(dataUrl);
      });
    // });
  }

  var getDetails = function() {
    var result = document.getElementById("website")
    console.log(result.value)
    var newURL = result.value;
    chrome.tabs.create({ url: newURL, active: false }, function(tab,anyinfo) {
    	window.setTimeout(function(){

	    	// chrome.tabs.onUpdated.addListener(function(tabId, info) {

	    	// })
        console.log(tab,anyinfo)
	      chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, {format:"png"}, function(dataUrl) {
	        console.log('in here');
	        alert(dataUrl);
	      });	    	
	       // result = captureWindowTab(tab.id);
	       // console.log(result)	
    	},4000)
    	
    });
  };

  document.getElementById("website_button").onclick = getDetails;
})();
