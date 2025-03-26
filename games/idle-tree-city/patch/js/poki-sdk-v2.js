window.location.xhostname= "localhost";
document.xURL= "https://poki.com/";

var originalEval= eval;
eval= function() {  
  arguments[0]= arguments[0].replace("aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw==", "I3ViZzIzNQ==");
  arguments[0]= arguments[0].replace("'hostname'", "'xhostname'");
  return originalEval.apply(this, arguments);
}

navigator.sendBeacon= function(arg1, arg2) {
  console.log("--fx--navigator.sendBeacon--", arg1, arg2);
}

xwindow = new Proxy(window, {
  get: function(target, property, receiver) {
    // console.log("--fx--xWindow--property--", property, receiver);
    let targetObj = target[property];
    if (typeof targetObj == "function") {
      return (...args) => target[property].apply(target,args);
    } else {
      if (property== "location") {
        return {
          "ancestorOrigins": {},
          "href": "https://poki.com/",
          "origin": "https://poki.com",
          "protocol": "https:",
          "host": "poki.com",
          "hostname": "poki.com",
          "port": "",
          "pathname": "/",
          "search": "",
          "hash": "#ubg235",
        }
      }
      console.log("--fx--xwindow--targetObj--", targetObj);
      return targetObj;
    }
  }
});
// console.log(xwindow.location.href);

PokiSDK= function() {
  // ***** INIT *****
  this.init= function() {
    return new Promise((resolve, reject)=> {
      resolve("InitDone");
    });
  }
  
  this.setDebug= function(debug) {
    console.log("--fx--PokiSDK--setDebug--", debug);    
  }
  
  this.isAdBlocked= function() {
    console.log("--fx--PokiSDK--isAdBlocked--");    
    return false;
  }

  this.happyTime= function(scale) {
    console.log("--fx--PokiSDK--happyTime--", scale);    
  }

  // ***** LOADING *****  
  this.gameLoadingStart= function(){
    console.log("--fx--PokiSDK--gameLoadingStart--");
  }
  
  this.gameLoadingProgress= function(progress){
    console.log("--fx--PokiSDK--gameLoadingProgress--", progress);
  }
  
  this.gameLoadingFinished= function(){
    console.log("--fx--PokiSDK--gameLoadingFinished--");
  }

  // ***** GAME CONTROL *****
  this.gameplayStart= function(){
    console.log("--fx--PokiSDK--gameplayStart--");
  }

  this.gameplayStop= function() {
    console.log("--fx--PokiSDK--gameplayStop--");
  }

  // ***** ADS CONTROL *****
  this.commercialBreak= function(){
    console.log("--fx--PokiSDK--commercialBreak--");
    return new Promise((resolve, reject)=> {
      resolve("commercialBreakDone");
    });
  }

  this.rewardedBreak= function() {
   console.log("--fx--PokiSDK--rewardedBreak--");
    return new Promise((resolve, reject)=> {
      if (window.open("https://ads.games235.com/", "ads_games235")) {
        console.log("--fx--PokiSDK--rewardedBreakDone--");
        resolve(true);
      } else {
        console.log("--fx--PokiSDK--rewardedBreakFailt--");
        reject(false);
      }      
    }); 
  }
}

PokiSDK.prototype.initWithVideoHB= function() {
  console.log("--fx--PokiSDK--initWithVideoHB--");
  return new Promise((resolve, reject)=> {
    resolve("")
  });
}

PokiSDK.prototype.customEvent= function() {
  console.log("--fx--PokiSDK--customEvent--");
}

PokiSDK= new PokiSDK();
