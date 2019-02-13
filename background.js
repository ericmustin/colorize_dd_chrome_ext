'use strict';

var printData;

chrome.runtime.onMessage.addListener ( function(request, sender, sendResponse){
  if(request.result) {
    // alert('oh boy1', request.data)
    // console.log('oh boy1', request.data)
    console.log('yaaaa', request)
  }
  return true;
})

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse){
  if(request.picture) {
    
    console.log('oh boy2')
  }

  if(request.result) {
    console.log('oy')
    printData = request.data;
    window.oldId = null;
    chrome.tabs.query(
      {currentWindow: true, active : true},
      function(tabArray){ 
        console.log(tabArray);
        window.oldId = tabArray[0].id;
        console.log('old id',window.oldId);
      }
    )
      

    
    chrome.tabs.create(
      { url: printData, active: true }
    ,function(newTab) {
      var relevantId = newTab.id;

      window.setTimeout(function(){

        chrome.tabs.captureVisibleTab(null, {format:"png"}, function(data) {
              // alert('ok this worked somehow')
              console.log('ok this worked somehow', data)
              console.log(chrome.tabs)
              chrome.tabs.sendMessage(window.oldId,{ picture: true, randomThing: 'somestuff', data: data });
              chrome.runtime.sendMessage({ picture: true, randomThing: 'somestuff', data: data });
              var updateProperties = {"active": true};
              chrome.tabs.update(window.oldId, updateProperties);
        });


      }, 4000)
    });
    console.log('yessssssss', printData)
  } else {
    console.log('no')
  }
  return true;
});


// (function() {
//   var okGo = function() {
//     var result = document.getElementById("website")
//     console.log(result.value)
//     var newURL = result.value;
//     var targetId = null;

//     // chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) { 

//     // })

//     chrome.windows.create({ url: newURL, focused: true, height: 500, width: 500 }, function(newWindow,anyinfo) {
//       console.log(newWindow)
//       targetId = newWindow.id;

//       chrome.tabs.captureVisibleTab(newWindow.id, {format:"png"}, function(data) {
//             console.log('data is')
//             console.log(data)

//             alert('ok',data)
//       });

//       // chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) { 
//       //   if (tabId != targetId || changedProps.status != "complete") {
//       //     console.log('no')
//       //     return;
//       //   } else {
//       //     chrome.tabs.onUpdated.removeListener(listener);
//       //     chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, {format:"png"}, function(data) {
//       //       console.log('data is')
//       //       console.log(data)
//       //       // alert('ok',data)
//       //     });
//       //   }
//       // });      
//     });
//   };

//     	// window.setTimeout(function(){

// 	    // 	// chrome.tabs.onUpdated.addListener(function(tabId, info) {

// 	    // 	// })
//      //    console.log(tab,anyinfo)
// 	    //   chrome.tabs.captureVisibleTab(null, {format:"png"}, function(data) {
// 	    //     console.log('in here');


//      //      // var png = img_b64.split(',')[1];

//      //      // var the_file = new Blob([window.atob(png)],  {type: 'image/png', encoding: 'utf-8'});

//      //      // var fr = new FileReader();
//      //      // fr.onload = function ( oFREvent ) {
//      //      //     var v = oFREvent.target.result.split(',')[1]; // encoding is messed up here, so we fix it
//      //      //     v = atob(v);
//      //      //     var good_b64 = btoa(decodeURIComponent(escape(v)));
//      //      //     document.getElementById("uploadPreview").src = "data:image/png;base64," + good_b64;
//      //      // };
//      //      // fr.readAsDataURL(the_file);

// 	    //     // var data = canvas.toDataURL("image/jpeg");



//      //      var w = open();
//      //      w.document.title = 'Export Image';
//      //      w.document.body.innerHTML = 'Left-click on the image to save it.';


//      //      var img = document.createElement('img');
//      //      img.src = data;

//      //      var a = document.createElement('a');
//      //      a.setAttribute("download", "YourFileName.png");
//      //      a.setAttribute("href", data);
//      //      a.appendChild(img);          
//      //      w.document.body.appendChild(a);
// 	    //   });	    	
// 	    //    // result = captureWindowTab(tab.id);
// 	    //    // console.log(result)	
//     	// },4000)
  

//   // document.getElementById("website_button").onclick = getDetails;
// })();
