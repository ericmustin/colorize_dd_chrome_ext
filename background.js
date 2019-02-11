'use strict';

(function() {
  var getDetails = function() {
    var result = document.getElementById("website")
    console.log(result.value)
    var newURL = result.value;
    var targetId = null;

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) { 

    }

    chrome.tabs.create({ url: newURL, active: true }, function(tab,anyinfo) {
      targetId = tab.id;

      chrome.tabs.captureVisibleTab(null, {format:"png"}, function(data) {
            console.log('data is')
            console.log(data)

            alert('ok',data)
      });

      chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) { 
        if (tabId != targetId || changedProps.status != "complete") {
          console.log('no')
          return;
        } else {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, {format:"png"}, function(data) {
            console.log('data is')
            console.log(data)
            // alert('ok',data)
          });
        }
      });      
    });
  };

    	// window.setTimeout(function(){

	    // 	// chrome.tabs.onUpdated.addListener(function(tabId, info) {

	    // 	// })
     //    console.log(tab,anyinfo)
	    //   chrome.tabs.captureVisibleTab(null, {format:"png"}, function(data) {
	    //     console.log('in here');


     //      // var png = img_b64.split(',')[1];

     //      // var the_file = new Blob([window.atob(png)],  {type: 'image/png', encoding: 'utf-8'});

     //      // var fr = new FileReader();
     //      // fr.onload = function ( oFREvent ) {
     //      //     var v = oFREvent.target.result.split(',')[1]; // encoding is messed up here, so we fix it
     //      //     v = atob(v);
     //      //     var good_b64 = btoa(decodeURIComponent(escape(v)));
     //      //     document.getElementById("uploadPreview").src = "data:image/png;base64," + good_b64;
     //      // };
     //      // fr.readAsDataURL(the_file);

	    //     // var data = canvas.toDataURL("image/jpeg");



     //      var w = open();
     //      w.document.title = 'Export Image';
     //      w.document.body.innerHTML = 'Left-click on the image to save it.';


     //      var img = document.createElement('img');
     //      img.src = data;

     //      var a = document.createElement('a');
     //      a.setAttribute("download", "YourFileName.png");
     //      a.setAttribute("href", data);
     //      a.appendChild(img);          
     //      w.document.body.appendChild(a);
	    //   });	    	
	    //    // result = captureWindowTab(tab.id);
	    //    // console.log(result)	
    	// },4000)
  

  document.getElementById("website_button").onclick = getDetails;
})();
