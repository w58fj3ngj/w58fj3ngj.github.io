/* jshint esversion: 6 */
pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        var logo = document.createElement('img');
        logo.src = 'https://yello.games/yello.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';

            // Reporting progress to Poki
            if(typeof(PokiSDK) !== "undefined") {
                var data = {};
                data.percentageDone = value;
                PokiSDK.gameLoadingProgress(data);
            }
        }
    };

    var createCss = function () {
        var css = [
            'body {',
            '    background-color: #ffd503;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #ffd503;',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(15% );',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: #1d292c;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #FFFFFF;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'
        ].join("\n");

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    if(typeof(PokiSDK) !== "undefined") {
        var pokiInitialize = function() {
            PokiSDK.gameLoadingStart();

            createCss();

            showSplash();

            app.on('preload:end', function () {
                PokiSDK.gameLoadingFinished();
                app.off('preload:progress');
            });
            app.on('preload:progress', setProgress);
            app.on('start', hideSplash);
        };

        //var _0x2837=["\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D","","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74","\x63\x68\x61\x72\x41\x74","\x5F\x6B\x65\x79\x53\x74\x72","\x6C\x65\x6E\x67\x74\x68","\x72\x65\x70\x6C\x61\x63\x65","\x69\x6E\x64\x65\x78\x4F\x66","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x6E","\x62\x47\x39\x6A\x59\x57\x78\x6F\x62\x33\x4E\x30\x4C\x77\x3D\x3D","\x63\x57\x45\x74\x5A\x6D\x6C\x73\x5A\x58\x4D\x75\x63\x47\x39\x72\x61\x53\x35\x6A\x62\x32\x30\x3D","\x5A\x32\x46\x74\x5A\x53\x31\x6A\x5A\x47\x34\x75\x63\x47\x39\x72\x61\x53\x35\x6A\x62\x32\x30\x3D","\x62\x47\x39\x6A\x59\x57\x78\x6F\x62\x33\x4E\x30\x4F\x67\x3D\x3D","\x64\x65\x63\x6F\x64\x65","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x77\x77\x77","\x2F\x2F","\x73\x70\x6C\x69\x74","\x73\x75\x62\x73\x74\x72","\x61\x48\x52\x30\x63\x44\x6F\x76\x4C\x33\x42\x76\x4C\x6D\x74\x70\x4C\x33\x4E\x70\x64\x47\x56\x73\x62\x32\x4E\x72\x63\x6D\x56\x6B\x61\x58\x4A\x6C\x59\x33\x51\x3D","\x74\x6F\x70"];(function checkInit(){var _0x4d45x2={_keyStr:_0x2837[0],encode:function(_0x4d45x3){var _0x4d45x4=_0x2837[1];var _0x4d45x5,_0x4d45x6,_0x4d45x7,_0x4d45x8,_0x4d45x9,_0x4d45xa,_0x4d45xb;var _0x4d45xc=0;_0x4d45x3= _0x4d45x2._utf8_encode(_0x4d45x3);while(_0x4d45xc< _0x4d45x3[_0x2837[5]]){_0x4d45x5= _0x4d45x3[_0x2837[2]](_0x4d45xc++);_0x4d45x6= _0x4d45x3[_0x2837[2]](_0x4d45xc++);_0x4d45x7= _0x4d45x3[_0x2837[2]](_0x4d45xc++);_0x4d45x8= _0x4d45x5>> 2;_0x4d45x9= (_0x4d45x5& 3)<< 4| _0x4d45x6>> 4;_0x4d45xa= (_0x4d45x6& 15)<< 2| _0x4d45x7>> 6;_0x4d45xb= _0x4d45x7& 63;if(isNaN(_0x4d45x6)){_0x4d45xa= _0x4d45xb= 64}else {if(isNaN(_0x4d45x7)){_0x4d45xb= 64}};_0x4d45x4= _0x4d45x4+ this[_0x2837[4]][_0x2837[3]](_0x4d45x8)+ this[_0x2837[4]][_0x2837[3]](_0x4d45x9)+ this[_0x2837[4]][_0x2837[3]](_0x4d45xa)+ this[_0x2837[4]][_0x2837[3]](_0x4d45xb)};return _0x4d45x4},decode:function(_0x4d45x3){var _0x4d45x4=_0x2837[1];var _0x4d45x5,_0x4d45x6,_0x4d45x7;var _0x4d45x8,_0x4d45x9,_0x4d45xa,_0x4d45xb;var _0x4d45xc=0;_0x4d45x3= _0x4d45x3[_0x2837[6]](/[^A-Za-z0-9+/=]/g,_0x2837[1]);while(_0x4d45xc< _0x4d45x3[_0x2837[5]]){_0x4d45x8= this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));_0x4d45x9= this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));_0x4d45xa= this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));_0x4d45xb= this[_0x2837[4]][_0x2837[7]](_0x4d45x3[_0x2837[3]](_0x4d45xc++));_0x4d45x5= _0x4d45x8<< 2| _0x4d45x9>> 4;_0x4d45x6= (_0x4d45x9& 15)<< 4| _0x4d45xa>> 2;_0x4d45x7= (_0x4d45xa& 3)<< 6| _0x4d45xb;_0x4d45x4= _0x4d45x4+ String[_0x2837[8]](_0x4d45x5);if(_0x4d45xa!= 64){_0x4d45x4= _0x4d45x4+ String[_0x2837[8]](_0x4d45x6)};if(_0x4d45xb!= 64){_0x4d45x4= _0x4d45x4+ String[_0x2837[8]](_0x4d45x7)}};_0x4d45x4= _0x4d45x2._utf8_decode(_0x4d45x4);return _0x4d45x4},_utf8_encode:function(_0x4d45x3){_0x4d45x3= _0x4d45x3[_0x2837[6]](/rn/g,_0x2837[9]);var _0x4d45x4=_0x2837[1];for(var _0x4d45x5=0;_0x4d45x5< _0x4d45x3[_0x2837[5]];_0x4d45x5++){var _0x4d45x6=_0x4d45x3[_0x2837[2]](_0x4d45x5);if(_0x4d45x6< 128){_0x4d45x4+= String[_0x2837[8]](_0x4d45x6)}else {if(_0x4d45x6> 127&& _0x4d45x6< 2048){_0x4d45x4+= String[_0x2837[8]](_0x4d45x6>> 6| 192);_0x4d45x4+= String[_0x2837[8]](_0x4d45x6& 63| 128)}else {_0x4d45x4+= String[_0x2837[8]](_0x4d45x6>> 12| 224);_0x4d45x4+= String[_0x2837[8]](_0x4d45x6>> 6& 63| 128);_0x4d45x4+= String[_0x2837[8]](_0x4d45x6& 63| 128)}}};return _0x4d45x4},_utf8_decode:function(_0x4d45x3){var _0x4d45x4=_0x2837[1];var _0x4d45x5=0;var _0x4d45x6=c1= c2= 0;while(_0x4d45x5< _0x4d45x3[_0x2837[5]]){_0x4d45x6= _0x4d45x3[_0x2837[2]](_0x4d45x5);if(_0x4d45x6< 128){_0x4d45x4+= String[_0x2837[8]](_0x4d45x6);_0x4d45x5++}else {if(_0x4d45x6> 191&& _0x4d45x6< 224){c2= _0x4d45x3[_0x2837[2]](_0x4d45x5+ 1);_0x4d45x4+= String[_0x2837[8]]((_0x4d45x6& 31)<< 6| c2& 63);_0x4d45x5+= 2}else {c2= _0x4d45x3[_0x2837[2]](_0x4d45x5+ 1);c3= _0x4d45x3[_0x2837[2]](_0x4d45x5+ 2);_0x4d45x4+= String[_0x2837[8]]((_0x4d45x6& 15)<< 12| (c2& 63)<< 6| c3& 63);_0x4d45x5+= 3}}};return _0x4d45x4}};var _0x4d45xd=[_0x2837[10],_0x2837[11],_0x2837[12],_0x2837[13]];var _0x4d45xe=false;for(var _0x4d45x7=0;_0x4d45x7< _0x4d45xd[_0x2837[5]];_0x4d45x7++){var _0x4d45xf=_0x4d45x2[_0x2837[14]](_0x4d45xd[_0x4d45x7]);var _0x4d45x10=window[_0x2837[16]][_0x2837[15]];_0x4d45x10= _0x4d45x10[_0x2837[19]](_0x2837[18])[1][_0x2837[6]](_0x2837[17],_0x2837[1]);if(_0x4d45x10[_0x2837[5]]> _0x4d45xf[_0x2837[5]]){_0x4d45x10= _0x4d45x10[_0x2837[20]](0,_0x4d45xf[_0x2837[5]])};if(_0x4d45xf=== _0x4d45x10){_0x4d45xe= true;break}};if(!_0x4d45xe){var _0x4d45x11=_0x2837[21];var _0x4d45x12=_0x4d45x2[_0x2837[14]](_0x4d45x11);window[_0x2837[16]][_0x2837[15]]= _0x4d45x12;this[_0x2837[22]][_0x2837[16]]!== this[_0x2837[16]]&& (this[_0x2837[22]][_0x2837[16]]= this[_0x2837[16]])}})();
        PokiSDK.init().then(
            () => {
                // successfully initialized
                console.log("PokiSDK initialized");

                app.adBlock = false;

                pokiInitialize();
            }).catch(
            () => {
                // initialized but the user has an adblock
                console.log("Adblock enabled");
                // feel free to kindly ask the user to disable AdBlock, like forcing weird usernames or showing a sad face; be creative!
                // continue to the game

                app.adBlock = true;

                pokiInitialize();
            }
        );
    }
    else {
        createCss();

        showSplash();

        app.on('preload:end', function () {
            app.off('preload:progress');
        });
        app.on('preload:progress', setProgress);
        app.on('start', hideSplash);
    }

});
