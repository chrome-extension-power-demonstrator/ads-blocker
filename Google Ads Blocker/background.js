var logging = false;
var checkType;

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {

    chrome.tabs.executeScript(tab.id, {file:'remove_ads.js'}, function () {
        var blacklistDefaults = 
        "googleleads.g.doubleclick.net\n" +
        "doubleclick.net\n" +
        "googleadservices.com\n" +
        "www.googleadservices.com\n" +
        "googlesyndication.com\n" +
        "adservices.google.com\n" +
        "appliedsemantics.com";

        var checkTypeDefault = "HEAD";

        setItem("currentUrl", tab.url);
        
        // Set up the defaults if no values are present in LocalStorage
        if (getItem("blacklist") === null) {
            setItem("blacklist", blacklistDefaults);
        }

        if(getItem("checkType") == null){
          setItem("checkType", checkTypeDefault);
        }
       

        var blacklist = getItem("blacklist");
        checkType = getItem("checkType");

        chrome.tabs.sendMessage(tab.id, {bl:blacklist, url:tab.url});
    });
   
  }
})



// OPTIONS: Set items in localstore
function setItem(key, value) {
    try {
      log("Inside setItem:" + key + ":" + value);
      window.localStorage.removeItem(key);
      window.localStorage.setItem(key, value);
    }catch(e) {
      log("Error inside setItem");
      log(e);
    }
    log("Return from setItem" + key + ":" +  value);
}

// OPTIONS: Get items from localstore
function getItem(key) {
    var value;
    log('Get Item:' + key);
    try {
      value = window.localStorage.getItem(key);
    }catch(e) {
      log("Error inside getItem() for key:" + key);
      log(e);
      value = "null";
    }
    log("Returning value: " + value);
    return value;
}

// OPTIONS: Zap all items in localstore
function clearStrg() {
    log('about to clear local storage');
    window.localStorage.clear();
    log('cleared');
}

function log(txt) {
    if(logging) {
      console.log(txt);
    }
}

