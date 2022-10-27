!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var o=t();for(var d in o)("object"==typeof exports?exports:e)[d]=o[d]}}(self,(function(){return(()=>{"use strict";var e={394:function(e,t,o){var d=this&&this.__assign||function(){return d=Object.assign||function(e){for(var t,o=1,d=arguments.length;o<d;o++)for(var n in t=arguments[o])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},d.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0});var n=o(743),i=o(236),r=function(){function e(e){this.ui={},this.options={sendData:!0},console.log(e),this.options=d(d({},this.options),e),this.prepareElement()}return e.prototype.destroy=function(){document.body.contains(this.ui.el)&&document.querySelector(".cloud-gaming-keyboard").remove()},e.prototype.hide=function(){this.getKeyboardElement().style.display="none"},e.prototype.show=function(){this.getKeyboardElement().style.display="block"},e.prototype.getKeyboardElement=function(){return document.querySelector(".cloud-gaming-keyboard")},e.prototype.prepareElement=function(){var e=this;this.ui.el&&document.querySelector(".cloud-gaming-keyboard").remove();var t=window.TCGSDK.getInitOptions().mount;this.ui.el=document.createElement("div"),this.ui.el.className="cloud-gaming-keyboard",document.getElementById(t).appendChild(this.ui.el),i.KEY_MAP.forEach((function(t){var o=document.createElement("ul");o.className="cloud-gaming-keyboard-line",t.forEach((function(t){var d=t.key,i=t.code,r=t.style,l=document.createElement("li");l.className="cloud-gaming-keyboard-key",l.innerHTML=d,l.style.width="".concat(r.width,"px"),(0,n.isMobile)()?(l.ontouchstart=function(){var t,o;l.style.border=e.options.keyPressedBorderColor?"1px solid ".concat(e.options.keyPressedBorderColor):"1px solid #2684FF",e.options.sendData&&window.TCGSDK.sendKeyboardEvent({key:i,down:!0}),null===(o=(t=e.options).onTouchEvent)||void 0===o||o.call(t,{type:"touchstart",key:d,code:i})},l.ontouchend=function(){var t,o;l.style.border=e.options.keyBorderColor?"1px solid ".concat(e.options.keyBorderColor):"1px solid #4a525a",e.options.sendData&&window.TCGSDK.sendKeyboardEvent({key:i,down:!1}),null===(o=(t=e.options).onTouchEvent)||void 0===o||o.call(t,{type:"touchend",key:d,code:i})},l.ontouchcancel=function(){var t,o;l.style.border=e.options.keyBorderColor?"1px solid ".concat(e.options.keyBorderColor):"1px solid #4a525a",e.options.sendData&&window.TCGSDK.sendKeyboardEvent({key:i,down:!1}),null===(o=(t=e.options).onTouchEvent)||void 0===o||o.call(t,{type:"touchcancel",key:d,code:i})}):(l.onmousedown=function(){var t,o;l.style.border=e.options.keyPressedBorderColor?"1px solid ".concat(e.options.keyPressedBorderColor):"1px solid #2684FF",e.options.sendData&&window.TCGSDK.sendKeyboardEvent({key:i,down:!0}),null===(o=(t=e.options).onTouchEvent)||void 0===o||o.call(t,{type:"touchstart",key:d,code:i})},l.onmouseup=function(){var t,o;l.style.border=e.options.keyBorderColor?"1px solid ".concat(e.options.keyBorderColor):"1px solid #4a525a",e.options.sendData&&window.TCGSDK.sendKeyboardEvent({key:i,down:!1}),null===(o=(t=e.options).onTouchEvent)||void 0===o||o.call(t,{type:"touchend",key:d,code:i})}),o.appendChild(l)})),e.getKeyboardElement().appendChild(o)})),this.applyStyles()},e.prototype.applyStyles=function(){var e="\n      .cloud-gaming-keyboard {\n        position: absolute;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        width: 100%;\n        color: #EEEEEC;\n        border: 1px solid ".concat(this.options.keyBorderColor||"#4a525a",";\n        box-sizing: border-box;\n        -webkit-transform: translateZ(0);\n        transform: translateZ(0);\n      }\n      .cloud-gaming-keyboard-line {\n        display: flex;\n        height: 30px;\n        text-align: center;\n        line-height: 30px;\n        list-style: none;\n        padding: 0;\n      }\n      .cloud-gaming-keyboard-key {\n        background: rgba(0,0,0,0.50);\n        border: 1px solid ").concat(this.options.keyBorderColor||"#4a525a",";\n        border-radius: 1px;\n        user-select: none;\n        display: list-item;\n        text-align: -webkit-match-parent;\n      }\n    "),t=document.createElement("style");t.id="cloud-gaming-keyboard-inserted-css",document.querySelector("#cloud-gaming-keyboard-inserted-css")||(document.querySelector("head").append(t),t.appendChild(document.createTextNode(e)))},e}();t.default=r,window.CloudGamingPlugin?window.CloudGamingPlugin.keyboard=r:window.CloudGamingPlugin={keyboard:r}},236:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.KEY_MAP=t.KEYCODE=void 0,function(e){e[e.Backspace=8]="Backspace",e[e.Tab=9]="Tab",e[e.Enter=13]="Enter",e[e.Shift=16]="Shift",e[e.Ctrl=17]="Ctrl",e[e.Alt=18]="Alt",e[e.PauseBreak=19]="PauseBreak",e[e.CapsLock=20]="CapsLock",e[e.Escape=27]="Escape",e[e.Space=32]="Space",e[e.PageUp=33]="PageUp",e[e.PageDown=34]="PageDown",e[e.End=35]="End",e[e.Home=36]="Home",e[e.LeftArrow=37]="LeftArrow",e[e.UpArrow=38]="UpArrow",e[e.RightArrow=39]="RightArrow",e[e.DownArrow=40]="DownArrow",e[e.Insert=45]="Insert",e[e.Delete=46]="Delete",e[e.Zero=48]="Zero",e[e.ClosedParen=48]="ClosedParen",e[e.One=49]="One",e[e.ExclamationMark=49]="ExclamationMark",e[e.Two=50]="Two",e[e.AtSign=50]="AtSign",e[e.Three=51]="Three",e[e.PoundSign=51]="PoundSign",e[e.Hash=51]="Hash",e[e.Four=52]="Four",e[e.DollarSign=52]="DollarSign",e[e.Five=53]="Five",e[e.PercentSign=53]="PercentSign",e[e.Six=54]="Six",e[e.Caret=54]="Caret",e[e.Hat=54]="Hat",e[e.Seven=55]="Seven",e[e.Ampersand=55]="Ampersand",e[e.Eight=56]="Eight",e[e.Star=56]="Star",e[e.Asterik=56]="Asterik",e[e.Nine=57]="Nine",e[e.OpenParen=57]="OpenParen",e[e.A=65]="A",e[e.B=66]="B",e[e.C=67]="C",e[e.D=68]="D",e[e.E=69]="E",e[e.F=70]="F",e[e.G=71]="G",e[e.H=72]="H",e[e.I=73]="I",e[e.J=74]="J",e[e.K=75]="K",e[e.L=76]="L",e[e.M=77]="M",e[e.N=78]="N",e[e.O=79]="O",e[e.P=80]="P",e[e.Q=81]="Q",e[e.R=82]="R",e[e.S=83]="S",e[e.T=84]="T",e[e.U=85]="U",e[e.V=86]="V",e[e.W=87]="W",e[e.X=88]="X",e[e.Y=89]="Y",e[e.Z=90]="Z",e[e.LeftWindowKey=91]="LeftWindowKey",e[e.RightWindowKey=92]="RightWindowKey",e[e.SelectKey=93]="SelectKey",e[e.Numpad0=96]="Numpad0",e[e.Numpad1=97]="Numpad1",e[e.Numpad2=98]="Numpad2",e[e.Numpad3=99]="Numpad3",e[e.Numpad4=100]="Numpad4",e[e.Numpad5=101]="Numpad5",e[e.Numpad6=102]="Numpad6",e[e.Numpad7=103]="Numpad7",e[e.Numpad8=104]="Numpad8",e[e.Numpad9=105]="Numpad9",e[e.Multiply=106]="Multiply",e[e.Add=107]="Add",e[e.NumpadDecimal=108]="NumpadDecimal",e[e.Subtract=109]="Subtract",e[e.DecimalPoint=110]="DecimalPoint",e[e.Divide=111]="Divide",e[e.F1=112]="F1",e[e.F2=113]="F2",e[e.F3=114]="F3",e[e.F4=115]="F4",e[e.F5=116]="F5",e[e.F6=117]="F6",e[e.F7=118]="F7",e[e.F8=119]="F8",e[e.F9=120]="F9",e[e.F10=121]="F10",e[e.F11=122]="F11",e[e.F12=123]="F12",e[e.NumLock=144]="NumLock",e[e.ScrollLock=145]="ScrollLock",e[e.SemiColon=186]="SemiColon",e[e.Equal=187]="Equal",e[e.Comma=188]="Comma",e[e.Dash=189]="Dash",e[e.Period=190]="Period",e[e.UnderScore=189]="UnderScore",e[e.Minus=189]="Minus",e[e.PlusSign=187]="PlusSign",e[e.ForwardSlash=191]="ForwardSlash",e[e.Tilde=192]="Tilde",e[e.GraveAccent=192]="GraveAccent",e[e.Backquote=192]="Backquote",e[e.OpenBracket=219]="OpenBracket",e[e.BracketLeft=219]="BracketLeft",e[e.Backslash=220]="Backslash",e[e.ClosedBracket=221]="ClosedBracket",e[e.BracketRight=221]="BracketRight",e[e.Quote=222]="Quote"}(o=t.KEYCODE||(t.KEYCODE={})),t.KEY_MAP=[[{key:"ESC",code:o.Escape,style:{width:230}},{key:"F1",code:o.F1,style:{width:135}},{key:"F2",code:o.F2,style:{width:135}},{key:"F3",code:o.F3,style:{width:135}},{key:"F4",code:o.F4,style:{width:135}},{key:"F5",code:o.F5,style:{width:135}},{key:"F6",code:o.F6,style:{width:135}},{key:"F7",code:o.F7,style:{width:135}},{key:"F8",code:o.F8,style:{width:135}},{key:"F9",code:o.F9,style:{width:135}},{key:"F10",code:o.F10,style:{width:135}},{key:"F11",code:o.F11,style:{width:135}},{key:"F12",code:o.F12,style:{width:135}}],[{key:"`",code:o.Backquote,style:{width:155}},{key:"1",code:o.One,style:{width:130}},{key:"2",code:o.Two,style:{width:130}},{key:"3",code:o.Three,style:{width:130}},{key:"4",code:o.Four,style:{width:130}},{key:"5",code:o.Five,style:{width:130}},{key:"6",code:o.Six,style:{width:130}},{key:"7",code:o.Seven,style:{width:130}},{key:"8",code:o.Eight,style:{width:130}},{key:"9",code:o.Nine,style:{width:130}},{key:"0",code:o.Zero,style:{width:130}},{key:"-",code:o.Minus,style:{width:130}},{key:"=",code:o.Equal,style:{width:130}},{key:"&#9003;",code:o.Backspace,style:{width:130}}],[{key:"Tab",code:o.Tab,style:{width:155}},{key:"Q",code:o.Q,style:{width:130}},{key:"W",code:o.W,style:{width:130}},{key:"E",code:o.E,style:{width:130}},{key:"R",code:o.R,style:{width:130}},{key:"T",code:o.T,style:{width:130}},{key:"Y",code:o.Y,style:{width:130}},{key:"U",code:o.U,style:{width:130}},{key:"I",code:o.I,style:{width:130}},{key:"O",code:o.O,style:{width:130}},{key:"P",code:o.P,style:{width:130}},{key:"[",code:o.BracketLeft,style:{width:130}},{key:"]",code:o.BracketRight,style:{width:130}},{key:"\\",code:o.Backslash,style:{width:130}}],[{key:"Caps",code:o.CapsLock,style:{width:220}},{key:"A",code:o.A,style:{width:130}},{key:"S",code:o.S,style:{width:130}},{key:"D",code:o.D,style:{width:130}},{key:"F",code:o.F,style:{width:130}},{key:"G",code:o.G,style:{width:130}},{key:"H",code:o.H,style:{width:130}},{key:"J",code:o.J,style:{width:130}},{key:"K",code:o.K,style:{width:130}},{key:"L",code:o.L,style:{width:130}},{key:";",code:o.SemiColon,style:{width:130}},{key:"'",code:o.Quote,style:{width:130}},{key:"Enter",code:o.Enter,style:{width:200}}],[{key:"Shift",code:o.Shift,style:{width:265}},{key:"Z",code:o.Z,style:{width:118.5}},{key:"X",code:o.X,style:{width:118.5}},{key:"C",code:o.C,style:{width:118.5}},{key:"V",code:o.V,style:{width:118.5}},{key:"B",code:o.B,style:{width:118.5}},{key:"N",code:o.N,style:{width:118.5}},{key:"M",code:o.M,style:{width:118.5}},{key:",",code:o.NumpadDecimal,style:{width:118.5}},{key:".",code:o.Period,style:{width:118.5}},{key:"/",code:o.ForwardSlash,style:{width:125}},{key:"&uarr;",code:o.UpArrow,style:{width:200}},{key:"Shift",code:o.Shift,style:{width:200}}],[{key:"Ctrl",code:o.Ctrl,style:{width:210}},{key:"Alt",code:o.Alt,style:{width:210}},{key:"Space",code:o.Space,style:{width:856}},{key:"&larr;",code:o.LeftArrow,style:{width:210}},{key:"&darr;",code:o.DownArrow,style:{width:200}},{key:"&rarr;",code:o.RightArrow,style:{width:200}}]]},743:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sleep=t.isAndroid=t.isMobile=t.isPressed=t.getScroll=t.getJoystickElement=t.getPluginContainerElement=void 0,t.getPluginContainerElement=function(){var e,t=document.getElementById("cloud-gaming-plugin-container");if(t)return t;var o=document.createElement("div");o.className="cloud-gaming-plugin-container";var d=window.TCGSDK;return document.getElementById(null===(e=d.getInitOptions())||void 0===e?void 0:e.mount).append(o),o},t.getJoystickElement=function(e){return void 0===e&&(e=0),document.getElementById("cloud-gaming-joystick-".concat(e))},t.getScroll=function(){var e=void 0!==window.pageXOffset?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft,t=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;return{x:null!=e?e:0,y:null!=t?t:0}},t.isPressed=function(e){return isNaN(e.buttons)?0!==e.pressure:0!==e.buttons},t.isMobile=function(){return!!(/Android|iPhone|iPad|iOS/i.test(navigator.userAgent)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>0)},t.isAndroid=function(){var e,t;return(null===(e=null===navigator||void 0===navigator?void 0:navigator.userAgent)||void 0===e?void 0:e.includes("Android"))||(null===(t=null===navigator||void 0===navigator?void 0:navigator.userAgent)||void 0===t?void 0:t.includes("Adr"))},t.sleep=function(e){return new Promise((function(t){setTimeout(t,e)}))}}},t={};return function o(d){var n=t[d];if(void 0!==n)return n.exports;var i=t[d]={exports:{}};return e[d].call(i.exports,i,i.exports,o),i.exports}(394)})()}));