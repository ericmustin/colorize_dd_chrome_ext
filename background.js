'use strict';

var printData;

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
  if(request.result) {

    // BEHOLD, the hackiest url validation ever
    if( /^(ftp|http|https):\/\/[^ "]+$/.test(request.data) ){
      fetchUrl(request.data)
    } else {
      fetchColors(request.data)
    }
  }
  return true;
});

var fetchUrl = function(requestData) {
  printData = requestData;

  // TODO: this is bad + race condition, clean up
  window.oldId = null;
  chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray){ 
      window.oldId = tabArray[0].id;
    }
  )
  
  chrome.tabs.create(
    { url: printData, active: true }
  ,function(newTab) {
    var relevantId = newTab.id;

    // TODO: refactor, yes this is setTimeout is awful but tbh if your site takes >4 seconds
    // to load stop fiddling with this chrome extension and maybe go fix that first
    window.setTimeout(function(){

      chrome.tabs.captureVisibleTab(null, {format:"png"}, function(data) {
        // TODO: remove one of these
        chrome.tabs.sendMessage(window.oldId,{ picture: true, data: data });
        chrome.runtime.sendMessage({ picture: true, data: data });
        
        // switch back to original tab and close screenshot tab
        chrome.tabs.update(window.oldId, {"active": true});
        chrome.tabs.remove(relevantId);
      });


    }, 4000);
  });
}

var fetchColors = function(requestData) {
  printData = requestData;

  window.oldId = null;
  chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray){ 
      window.oldId = tabArray[0].id;

      // TODO: remove one of these
      chrome.tabs.sendMessage(window.oldId,{ csv: true, data: requestData });
    }
  )  

}
