const likeElement = document.getElementById("likes");

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if (getCookie("likes")==="") {
  setCookie("likes", '[]', 365);
}

function getLikes(cb) {
  let url = 'https://stenunblockedserver.stensjogren.repl.co/like?game=' + encodeURIComponent(game);
    const xml = new XMLHttpRequest();
    xml.open("GET", url, true);
    xml.send(null);
    xml.onload=function() {
    if (xml.status === 200) {
      cb( JSON.parse(xml.responseText)['likes'] );
    } else {
      cb( "Error: " + xml.responseText );
    }
    };
}

function like() {
    let js = JSON.parse(getCookie("likes"));
    
    if (js.includes(game)) {
      likeElement.innerText = 'Updating likes...';
      getLikes(function(res) {
        likes[game] = res;
        likeElement.innerText = likes[game] + ' likes';
      });
      return;
    }
  
    let url = 'https://stenunblockedserver.stensjogren.repl.co/like?game=' + encodeURIComponent(game);
    const xml = new XMLHttpRequest();
    xml.open("POST", url, true);
    xml.send(null);
    xml.onload = function(){
      if (xml.status === 200) {
        js.push(game);
          setCookie("likes", JSON.stringify(js));
          getLikes(function(res) {
            likes[game]=res;
            likeElement.innerText = likes[game] + ' likes';
          });
          return;
      }
      cb( "Error: " + xml.responseText);
    };
}

if (getCookie("enabledCookie")=="1") {
  try {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-MY0THGFRYS');
  } catch {
    console.log("[StenUnblocked] Failed to load google analytics!");
  }
}

if (likeElement != null)
  getLikes(function(likeCount) {
    likeElement.innerText = likeCount + " likes";
  });

(function(){
  var gameURL = 'hmm';
  try {
    gameURL = '?game=' + encodeURIComponent(game);
  } catch {
    gameURL = '';
  }

  let xml = new XMLHttpRequest();
  xml.open('POST', 'https://stenunblockedaktieapi--geometrysten.repl.co/view-game' + gameURL, true);
  xml.send(null);
})();