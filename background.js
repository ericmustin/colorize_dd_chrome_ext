'use strict';

(function() {
  // var ga = document.createElement('script'); ga.type =
'text/javascript'; ga.async = true;
  // ga.src = 'https://ssl.google-analytics.com/ga.js';
  // var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
  console.log('hello werld2');


  function captureWindowTab(tabid) {
    chrome.tabs.update(tabid, {}, function() {
      chrome.tabs.captureVisibleTab(27, {format:"png"}, function(dataUrl) {
        console.log('in here');
        console.log(dataUrl);
      });
    });
  }

  var getDetails = function() {
    var result = document.getElementById("website")
    console.log(result.value)
    var newURL = result.value;
    chrome.tabs.create({ url: newURL, active: false }, function(tab) {
       result = captureWindowTab(tab.id);
       console.log(result)
    });
  }

  document.getElementById("website_button").onclick = getDetails;
})();
