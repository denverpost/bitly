/********************* jCookie **********************/
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options=$.extend({},options);options.expires=-1;}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}expires='; expires='+date.toUTCString();}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');
for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}return cookieValue;}};

/******************** jQuery RSS ********************/
(function(h){h.fn.rssfeed=function(q,f,r){f=h.extend({limit:10,header:!0,titletag:"h4",date:!0,content:!0,snippet:!0,media:!0,showerror:!0,errormsg:"",key:null,ssl:!1,linktarget:"_self"},f);return this.each(function(s,l){var p=h(l),d="";f.ssl&&(d="s");p.hasClass("rssFeed")||p.addClass("rssFeed");if(null==q)return!1;d="http"+d+"://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+encodeURIComponent(q);null!=f.limit&&(d+="&num="+f.limit);null!=f.key&&(d+="&key="+f.key);h.getJSON(d+"&output=json_xml",
function(b){if(200==b.responseStatus){var e=b.responseData,b=f,g=e.feed;if(g){var a="",d="odd";if(b.media){var j=e.xmlString;"Microsoft Internet Explorer"==navigator.appName?(e=new ActiveXObject("Microsoft.XMLDOM"),e.async="false",e.loadXML(j)):e=(new DOMParser).parseFromString(j,"text/xml");j=e.getElementsByTagName("item")}b.header&&(a+='<div class="rssHeader"><a href="'+g.link+'" title="'+g.description+'">'+g.title+"</a></div>");a+='<div class="rssBody"><ul>';for(e=0;e<g.entries.length;e++){var c=
g.entries[e],i;c.publishedDate&&(i=new Date(c.publishedDate),i=i.toLocaleDateString()+" "+i.toLocaleTimeString());a+='<li class="rssRow '+d+'"><'+b.titletag+'><a href="'+c.link+'" title="View this article at '+g.title+'">'+c.title+"</a></"+b.titletag+">";b.date&&i&&(a+="<div>"+i+"</div>");b.content&&(a+="<p>"+(b.snippet&&""!=c.contentSnippet?c.contentSnippet:c.content)+"</p>");if(b.media&&0<j.length){c=j[e].getElementsByTagName("enclosure");if(0<c.length){for(var a=a+'<div class="rssMedia"><div>Media files</div><ul>',
k=0;k<c.length;k++)var m=c[k].getAttribute("url"),n=c[k].getAttribute("type"),o=c[k].getAttribute("length"),m='<li><a href="'+m+'" title="Download this media">'+m.split("/").pop()+"</a> ("+n+", ",n=Math.floor(Math.log(o)/Math.log(1024)),o=(o/Math.pow(1024,Math.floor(n))).toFixed(2)+" "+"bytes,kb,MB,GB,TB,PB".split(",")[n],a=a+(m+o+")</li>");a+="</ul></div>"}a+="</li>"}d="odd"==d?"even":"odd"}h(l).html(a+"</ul></div>");h("a",l).attr("target",b.linktarget)}h.isFunction(r)&&r.call(this,p)}else f.showerror&&
(g=""!=f.errormsg?f.errormsg:b.responseDetails),h(l).html('<div class="rssError"><p>'+g+"</p></div>")})})}})(jQuery);

/********************** vTicker *********************/
(function(a){a.fn.vTicker=function(b){var c={speed:700,pause:4000,showItems:3,animation:"",mousePause:true,isPaused:false,direction:"up",height:0};var b=a.extend(c,b);moveUp=function(g,d,e){if(e.isPaused){return}var f=g.children("ul");var h=f.children("li:first").clone(true);if(e.height>0){d=f.children("li:first").height()}f.animate({top:"-="+d+"px"},e.speed,function(){a(this).children("li:first").remove();a(this).css("top","0px")});if(e.animation=="fade"){f.children("li:first").fadeOut(e.speed);if(e.height==0){f.children("li:eq("+e.showItems+")").hide().fadeIn(e.speed)}}h.appendTo(f)};moveDown=function(g,d,e){if(e.isPaused){return}var f=g.children("ul");var h=f.children("li:last").clone(true);if(e.height>0){d=f.children("li:first").height()}f.css("top","-"+d+"px").prepend(h);f.animate({top:0},e.speed,function(){a(this).children("li:last").remove()});if(e.animation=="fade"){if(e.height==0){f.children("li:eq("+e.showItems+")").fadeOut(e.speed)}f.children("li:first").hide().fadeIn(e.speed)}};return this.each(function(){var f=a(this);var e=0;f.css({overflow:"hidden",position:"relative"}).children("ul").css({position:"absolute",margin:0,padding:0}).children("li").css({margin:0,padding:0});if(b.height==0){f.children("ul").children("li").each(function(){if(a(this).height()>e){e=a(this).height()}});f.children("ul").children("li").each(function(){a(this).height(e)});f.height(e*b.showItems)}else{f.height(b.height)}var d=setInterval(function(){if(b.direction=="up"){moveUp(f,e,b)}else{moveDown(f,e,b)}},b.pause);if(b.mousePause){f.bind("mouseenter",function(){b.isPaused=true}).bind("mouseleave",function(){b.isPaused=false})}})}})(jQuery);

/******************* write capture ******************/
(function(E,a){var j=a.document;function A(Q){var Z=j.createElement("div");j.body.insertBefore(Z,null);E.replaceWith(Z,'<script type="text/javascript">'+Q+"<\/script>")}E=E||(function(Q){return{ajax:Q.ajax,$:function(Z){return Q(Z)[0]},replaceWith:function(Z,ad){var ac=Q(Z)[0];var ab=ac.nextSibling,aa=ac.parentNode;Q(ac).remove();if(ab){Q(ab).before(ad)}else{Q(aa).append(ad)}},onLoad:function(Z){Q(Z)},copyAttrs:function(af,ab){var ad=Q(ab),aa=af.attributes;for(var ac=0,Z=aa.length;ac<Z;ac++){if(aa[ac]&&aa[ac].value){try{ad.attr(aa[ac].name,aa[ac].value)}catch(ae){}}}}}})(a.jQuery);E.copyAttrs=E.copyAttrs||function(){};E.onLoad=E.onLoad||function(){throw"error: autoAsync cannot be used without jQuery or defining writeCaptureSupport.onLoad"};function P(ab,aa){for(var Z=0,Q=ab.length;Z<Q;Z++){if(aa(ab[Z])===false){return}}}function v(Q){return Object.prototype.toString.call(Q)==="[object Function]"}function p(Q){return Object.prototype.toString.call(Q)==="[object String]"}function u(aa,Z,Q){return Array.prototype.slice.call(aa,Z||0,Q||aa&&aa.length)}function D(ab,aa){var Q=false;P(ab,Z);function Z(ac){return !(Q=aa(ac))}return Q}function L(Q){this._queue=[];this._children=[];this._parent=Q;if(Q){Q._addChild(this)}}L.prototype={_addChild:function(Q){this._children.push(Q)},push:function(Q){this._queue.push(Q);this._bubble("_doRun")},pause:function(){this._bubble("_doPause")},resume:function(){this._bubble("_doResume")},_bubble:function(Z){var Q=this;while(!Q[Z]){Q=Q._parent}return Q[Z]()},_next:function(){if(D(this._children,Q)){return true}function Q(aa){return aa._next()}var Z=this._queue.shift();if(Z){Z()}return !!Z}};function i(Q){if(Q){return new L(Q)}L.call(this);this.paused=0}i.prototype=(function(){function Q(){}Q.prototype=L.prototype;return new Q()})();i.prototype._doRun=function(){if(!this.running){this.running=true;try{while(this.paused<1&&this._next()){}}finally{this.running=false}}};i.prototype._doPause=function(){this.paused++};i.prototype._doResume=function(){this.paused--;this._doRun()};function M(){}M.prototype={_html:"",open:function(){this._opened=true;if(this._delegate){this._delegate.open()}},write:function(Q){if(this._closed){return}this._written=true;if(this._delegate){this._delegate.write(Q)}else{this._html+=Q}},writeln:function(Q){this.write(Q+"\n")},close:function(){this._closed=true;if(this._delegate){this._delegate.close()}},copyTo:function(Q){this._delegate=Q;Q.foobar=true;if(this._opened){Q.open()}if(this._written){Q.write(this._html)}if(this._closed){Q.close()}}};var e=(function(){var Q={f:j.getElementById};try{Q.f.call(j,"abc");return true}catch(Z){return false}})();function I(Q){P(Q,function(Z){var aa=j.getElementById(Z.id);if(!aa){l("<proxyGetElementById - finish>","no element in writen markup with id "+Z.id);return}P(Z.el.childNodes,function(ab){aa.appendChild(ab)});if(aa.contentWindow){a.setTimeout(function(){Z.el.contentWindow.document.copyTo(aa.contentWindow.document)},1)}E.copyAttrs(Z.el,aa)})}function s(Z,Q){if(Q&&Q[Z]===false){return false}return Q&&Q[Z]||o[Z]}function x(Z,ai){var ae=[],ad=s("proxyGetElementById",ai),ag=s("writeOnGetElementById",ai),Q={write:j.write,writeln:j.writeln,finish:function(){},out:""};Z.state=Q;j.write=ah;j.writeln=aa;if(ad||ag){Q.getEl=j.getElementById;j.getElementById=ab;if(ag){findEl=af}else{findEl=ac;Q.finish=function(){I(ae)}}}function ah(aj){Q.out+=aj}function aa(aj){Q.out+=aj+"\n"}function ac(ak){var aj=j.createElement("div");ae.push({id:ak,el:aj});aj.contentWindow={document:new M()};return aj}function af(al){var aj=E.$(Z.target);var ak=j.createElement("div");aj.parentNode.insertBefore(ak,aj);E.replaceWith(ak,Q.out);Q.out="";return e?Q.getEl.call(j,al):Q.getEl(al)}function ab(ak){var aj=e?Q.getEl.call(j,ak):Q.getEl(ak);return aj||findEl(ak)}return Q}function V(Q){j.write=Q.write;j.writeln=Q.writeln;if(Q.getEl){j.getElementById=Q.getEl}return Q.out}function N(Q){return Q&&Q.replace(/^\s*<!(\[CDATA\[|--)/,"").replace(/(\]\]|--)>\s*$/,"")}function b(){}function d(Z,Q){console.error("Error",Q,"executing code:",Z)}var l=v(a.console&&console.error)?d:b;function S(aa,Z,Q){var ab=x(Z,Q);try{A(N(aa))}catch(ac){l(aa,ac)}finally{V(ab)}return ab}function O(Z){var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(Z);return Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)}function T(Q){return new RegExp(Q+"=(?:([\"'])([\\s\\S]*?)\\1|([^\\s>]+))","i")}function k(Q){var Z=T(Q);return function(aa){var ab=Z.exec(aa)||[];return ab[2]||ab[3]}}var r=/(<script[\s\S]*?>)([\s\S]*?)<\/script>/ig,n=T("src"),X=k("src"),q=k("type"),Y=k("language"),C="__document_write_ajax_callbacks__",B="__document_write_ajax_div-",g="window['"+C+"']['%d']();",m=a[C]={},w='<script type="text/javascript">'+g+"<\/script>",H=0;function c(){return(++H).toString()}function G(Z,aa){var Q;if(v(Z)){Q=Z;Z=null}Z=Z||{};Q=Q||Z&&Z.done;Z.done=aa?function(){aa(Q)}:Q;return Z}var z=new i();var y=[];var f=window._debugWriteCapture?function(){}:function(Q,aa,Z){y.push({type:Q,src:aa,data:Z})};var K=window._debugWriteCapture?function(){}:function(){y.push(arguments)};function W(Q){var Z=c();m[Z]=function(){Q();delete m[Z]};return Z}function J(Q){return w.replace(/%d/,W(Q))}function R(ac,ag,aa,ae){var ad=aa&&new i(aa)||z;ag=G(ag);var ab=s("done",ag);var Q="";var Z=s("fixUrls",ag);if(!v(Z)){Z=function(ah){return ah}}if(v(ab)){Q=J(function(){ad.push(ab)})}return ac.replace(r,af)+Q;function af(aj,av,ai){var an=X(av),am=q(av)||"",aB=Y(av)||"",aA=(!am&&!aB)||am.toLowerCase().indexOf("javascript")!==-1||aB.toLowerCase().indexOf("javascript")!==-1;f("replace",an,aj);if(!aA){return aj}var aw=W(ap),ao=B+aw,au,al={target:"#"+ao,parent:ae};function ap(){ad.push(au)}if(an){an=Z(an);av=av.replace(n,"");if(O(an)){au=az}else{if(s("asyncAll",ag)){au=ay()}else{au=at}}}else{au=ax}function ax(){ah(ai)}function at(){E.ajax({url:an,type:"GET",dataType:"text",async:false,success:function(aC){ah(aC)}})}function ak(aE,aC,aD){l("<XHR for "+an+">",aD);ad.resume()}function aq(){return J(function(){ad.resume()})}function ay(){var aE,aD;function aC(aG,aF){if(!aE){aD=aG;return}try{ah(aG,aq())}catch(aH){l(aG,aH)}}E.ajax({url:an,type:"GET",dataType:"text",async:true,success:aC,error:ak});return function(){aE=true;if(aD){ah(aD)}else{ad.pause()}}}function az(aC){var aE=x(al,ag);ad.pause();f("pause",an);E.ajax({url:an,type:"GET",dataType:"script",success:aD,error:ak});function aD(aH,aG,aF){f("out",an,aE.out);ar(V(aE),J(aE.finish)+aq());f("resume",an)}}function ah(aD,aC){var aE=S(aD,al,ag);aC=J(aE.finish)+(aC||"");ar(aE.out,aC)}function ar(aD,aC){E.replaceWith(al.target,R(aD,null,ad,al)+(aC||""))}return'<div style="display: none" id="'+ao+'"></div>'+av+g.replace(/%d/,aw)+"<\/script>"}}function F(Z,aa){var Q=z;P(Z,function(ab){Q.push(ac);function ac(){ab.action(R(ab.html,ab.options,Q),ab)}});if(aa){Q.push(aa)}}function U(Q){var Z=Q;while(Z&&Z.nodeType===1){Q=Z;Z=Z.lastChild;while(Z&&Z.nodeType!==1){Z=Z.previousSibling}}return Q}function h(Q){var aa=j.write,ad=j.writeln,Z,ab=[];j.writeln=function(ae){j.write(ae+"\n")};var ac;j.write=function(af){var ae=U(j.body);if(ae!==Z){Z=ae;ab.push(ac={el:ae,out:[]})}ac.out.push(af)};E.onLoad(function(){var ah,ak,af,aj,ai;Q=G(Q);ai=Q.done;Q.done=function(){j.write=aa;j.writeln=ad;if(ai){ai()}};for(var ag=0,ae=ab.length;ag<ae;ag++){ah=ab[ag].el;ak=j.createElement("div");ah.parentNode.insertBefore(ak,ah.nextSibling);af=ab[ag].out.join("");aj=ae-ag===1?R(af,Q):R(af);E.replaceWith(ak,aj)}})}var t="writeCapture";var o=a[t]={_original:a[t],fixUrls:function(Q){return Q.replace(/&amp;/g,"&")},noConflict:function(){a[t]=this._original;return this},debug:y,proxyGetElementById:false,_forTest:{Q:i,GLOBAL_Q:z,$:E,matchAttr:k,slice:u,capture:x,uncapture:V,captureWrite:S},replaceWith:function(Q,aa,Z){E.replaceWith(Q,R(aa,Z))},html:function(Q,ab,Z){var aa=E.$(Q);aa.innerHTML="<span/>";E.replaceWith(aa.firstChild,R(ab,Z))},load:function(Q,aa,Z){E.ajax({url:aa,dataType:"text",type:"GET",success:function(ab){o.html(Q,ab,Z)}})},autoAsync:h,sanitize:R,sanitizeSerial:F}})(this.writeCaptureSupport,this);(function(g,d,n){var c={html:h};g.each(["append","prepend","after","before","wrap","wrapAll","replaceWith","wrapInner"],function(){c[this]=i(this)});function a(q){return Object.prototype.toString.call(q)=="[object String]"}function p(u,t,s,r){if(arguments.length==0){return o.call(this)}var q=c[u];if(u=="load"){return l.call(this,t,s,r)}if(!q){j(u)}return b.call(this,t,s,q)}g.fn.writeCapture=p;var k="__writeCaptureJsProxied-fghebd__";function o(){if(this[k]){return this}var r=this;function q(){var t=this,s=false;this[k]=true;g.each(c,function(v){var u=r[v];if(!u){return}t[v]=function(y,x,w){if(!s&&a(y)){try{s=true;return p.call(t,v,y,x,w)}finally{s=false}}return u.apply(t,arguments)}});this.pushStack=function(){return o.call(r.pushStack.apply(t,arguments))};this.endCapture=function(){return r}}q.prototype=r;return new q()}function b(t,s,u){var q,r=this;if(s&&s.done){q=s.done;delete s.done}else{if(g.isFunction(s)){q=s;s=null}}d.sanitizeSerial(g.map(this,function(v){return{html:t,options:s,action:function(w){u.call(v,w)}}}),q&&function(){q.call(r)}||q);return this}function h(q){g(this).html(q)}function i(q){return function(r){g(this)[q](r)}}function l(t,s,v){var r=this,q,u=t.indexOf(" ");if(u>=0){q=t.slice(u,t.length);t=t.slice(0,u)}if(g.isFunction(v)){s=s||{};s.done=v}return g.ajax({url:t,type:s&&s.type||"GET",dataType:"html",data:s&&s.params,complete:f(r,s,q)})}function f(r,s,q){return function(u,t){if(t=="success"||t=="notmodified"){var v=m(u.responseText,q);b.call(r,v,s,h)}}}var e=/jquery-writeCapture-script-placeholder-(\d+)-wc/g;function m(s,r){if(!r||!s){return s}var t=0,q={};return g("<div/>").append(s.replace(/<script(.|\s)*?\/script>/g,function(u){q[t]=u;return"jquery-writeCapture-script-placeholder-"+(t++)+"-wc"})).find(r).html().replace(e,function(u,v){return q[v]})}function j(q){throw"invalid method parameter "+q}g.writeCapture=d})(jQuery,writeCapture.noConflict());


var fullUrl   = document.location;
var domainUrl = find_in_url('domain'); // sitename.com
var article   = /ci_/i.exec(fullUrl);  // if this is an article page or not
var tablet    = detectTablet();        // if user is on a tablet or not
var jBardocT  = detect_Doctype();      // detect what DoctType is being used
var jBar_x=fullUrl.toString().split(".");
//for jbar on beta
if (jBar_x[1] == "betalive") {
    jBar_x.splice(1, 1);
}
//for jbar on qa2live
if (jBar_x[1] == "qa2live") {
    jBar_x.splice(1, 1);
}

var jBar_y=jBar_x[1]; 
var jBar_z=jBar_x[2].split("/"); 
//get section name or set section to index if on homepage
if (jBar_z == undefined) {
    jbar_z = "";
    var dom=jBar_y+'.'+"index"; 
    var subSec="index";
} else {
    var dom=jBar_y+'.'+jBar_z[0]; 
    var subSec=jBar_z[1];
}
var subSec2   = /\#/i.exec(subSec); 
if ( document.location.hash == '#dev' ) window.console && console.log('subSec2: ' + subSec2 + 'subSec: ' + subSec);
if (subSec2 != -1) { 
    var adsubSec = subSec.split("#"); 
    subSec = adsubSec[0]; 
}
var jsonFile  = 'http://extras.mnginteractive.com/live/js/jquery/jBar/json/'+jBar_y+'.html';
var jBarLayout_Left=jBarLayout_Right='';
var smrtPhone = false;
var jBarIsIE=100; if (document.all) {if (window.atob){jBarIsIE=10} else if (document.addEventListener){jBarIsIE=9} else if (document.documentMode){jBarIsIE=8}  else if (window.XMLHttpRequest){jBarIsIE=7}}

//drop the url parameters off because it is causing ads to break
if(subSec.indexOf('?') !== -1) {subSec = subSec.substring(0, subSec.indexOf('?'));}
/*************** adTags ***************/
if (subSec == "") {
    var dfm_ad_loc = '/8013/' + domainUrl;
} else {
    var dfm_ad_loc = '/8013/' + domainUrl + '/' + subSec;
}
var ATC2_tagOrd = Math.random()*10000000000000000;
var AT2_tagOrd = Math.random()*10000000000000000;

//var adTeaserCodeUrl = 'http://pubads.g.doubleclick.net/gampad/adx?iu='+DFM_ad_loc+'&t=kv%3Dtoolbar&sz=300x250&c='+tagOrd;
var adTeaserCode2 = '<iframe width="300px" height="30px" frameborder=0 scrolling=no seamless src="http://pubads.g.doubleclick.net/gampad/adx?iu='+dfm_ad_loc+'&t=kv%3Dtoolbar&sz=300x30&c='+ATC2_tagOrd+'"></iframe>';
var adTag2 = '<iframe width="300px" height="250px" frameborder=0 scrolling=no seamless src="http://pubads.g.doubleclick.net/gampad/adx?iu='+dfm_ad_loc+'&t=kv%3Dtoolbar&sz=300x250&c='+AT2_tagOrd+'"></iframe>';

/************* End adTags *************/
switch (domainUrl)
{
  case 'vivacolorado.com': jQuery.ajax({ async: false, url: jsonFile, dataType: 'jsonp' });
            break;
  case 'bocopreps.com': jQuery.ajax({ async: false, url: jsonFile, dataType: 'jsonp' }); 
            break;
  default: jQuery.ajax({ async: false, url: jsonFile, dataType: 'jsonp' }); 
}

// the ajax call above uses jsonp to write a script file to the page and then that file calls to the josh function below which starts it all
function josh(data) {
    var JSONoutput = '<scr'+'ipt type="text/javascript" language="JavaScript">';
    jQuery.each(data, function(key, val) {
        if ((key=='styles')&&(val!='')) {
            JSONoutput += '</scr'+'ipt><style>';
            JSONoutput += val;
            JSONoutput += '</style><scr'+'ipt type="text/javascript" language="JavaScript">';
            }
        else if (val!='[object Object]') { JSONoutput+='var '+key+' = "'+val+'"; '; }
        else { // val == [object] so create an array out of this
            JSONoutput+='var '+key+' = []; ';
            jQuery.each(val, function(key, val) { JSONoutput+=key+' = "'+val+'"; '; });
            }

        if (key=='done') {
            JSONoutput += '</scr'+'ipt>';
            jQuery('body').append(JSONoutput);
            /* Only load the jBar if user is not on a smartphone */
            if (jBardocT=='Standards') { wrapperStyle = '#'+wrapperStyle; }
            else { wrapperStyle = '.page-body'; }
            if (navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/)||navigator.userAgent.match(/Windows Phone/i)||navigator.userAgent.match(/ZuneWP7/i)){ 
                smrtPhone=true;
                if (typeof jBarTwitFollow == 'undefined') { jBarTwitterFollow=''; } else { jBarTwitterFollow=jBarTwitFollow; } // have to do this so the check_sharebar() function can read it
                if ( document.location.hash == '#dev' ) console.log("JBAR1: ", jBarTwitterFollow);
                check_sharebar();
            } else {
                jQuery('body').append('<link type="text/css" rel="stylesheet" href="http://extras.mnginteractive.com/live/js/jquery/jBar/jBarStyles.css">');
                if (jBarIsIE<10) { // only do this in IE 9 and below
                    // jQuery('body').append('<div id="jBarHolderMenu"></div><div id="youMightLikeMenu"></div><script>var youMightLikeMenuTracker=jBarHolderMenuTracker=0;</script>');
                    if (jBardocT=='Quirks') { // only do this in Quirks
                        if (fullUrl=='http://www.denverpost.com/') { jQuery('body').append('<style>body { width: 100% !important; height: 100% !important; overflow: hidden !important; } '+wrapperStyle+' { width: 100.3% !important; height: 100% !important; overflow-y: scroll !important; overflow-x: auto !important; } #jBar {position: absolute;} </style>'); }
                        else                                       { jQuery('body').append('<style>body { width: 100% !important; height: 100% !important; overflow: hidden !important; } '+wrapperStyle+' { width: 100% !important; height: 100% !important; overflow-y: scroll !important; overflow-x: auto !important; } #jBar {position: absolute;} </style>'); }
                        }
                    }

                var siteIcon     = '<span><a href="/"><img id="jBarSiteIcon" src="http://extras.mnginteractive.com/live/js/jquery/jBar/images/icons/'+jBar_y+'.png"></a></span><span id="jBarSpacer"></span>';
                var holder       = '<span class="jBarShow" onclick="location.href=\''+holderlink+'\#'+dom+'?source=JBarContentPromo\'"><li class="jBarText" id="jBarHolder"><ul></ul></li></span>';
                var adTeaser     = '<span id="adTeaser" style="display: none;"></span>'; 
                var dailyDeals   = '<span class="jBarShow" id="jBar_dailyDeals"><a href="'+URL_dailyDeals+'"><img src="'+dailyDealsIcon+'"></a></span>';
                var searchBar    = '<span class="jBar_Search"><form id="jBar_Search" name="jBarSearch" action="/circare/html/sca_template.jsp" method="get"><input type="hidden" name="runSearch" value="true"><input valign="middle" type="text" style="width: 180px;" name="query" value="" size=15 maxlength="512"><img src="http://extras.mnginteractive.com/live/js/jquery/jBar/images/jBarSearch.gif"></form></span>';
                var rssScroller  = '<span><span id="jBarRssScroll"></span></span>';

                //anything added to the BarLayout_Left variable will float left
                jBarLayout_Left += adTeaser;
                
                //jBarLayout_Left += holder;
                
                jBarLayout_Left += dailyDeals;
                jBarLayout_Left += rssScroller;

                //anything added to the jBarLayout_Right variable will float right
                jBarLayout_Right += siteIcon;
                
                jQuery(window).load(function() {
                    if(typeof activatejBar!='undefined') { // do not create the jBar if activatejBar is defined
                    setTimeout('checkSharBarLate()', 500);
                        }
                    else {
                        jBarCreation();
                        }
                    });
                }
            }
        });
    }

/************************** Begin Functions *************************/

var positionHold=widthHold=[];
var toolCount=jBarScrollBar=adMark=adHeight=jBarTwitterFollow=RSSCounter=bindStyle=siteIDtemp=siteIDtemp2=siteID=checkAdDivId=articleEnd=articleStart=0;
var jBarArticleBox= '.articleBox';
var ad_patt=/ut_sp/i;

function checkSharBarLate() {
    if(article!=null) {
        if (typeof jBarTwitFollow == 'undefined') { jBarTwitterFollow=''; } else { jBarTwitterFollow=jBarTwitFollow; }
        if ((jBarIsIE<10)&&(jBardocT=='Quirks')) { bindStyle = wrapperStyle; }
        else { bindStyle=window }
        check_articlePopUp();
        check_sharebar();
        }
    }

function updateScrollBarMenus(data) {
    var tempyTemp = parseInt(jQuery('#jBarHolderMenu').children('ul').css('bottom'));
    if (data=='scrollbar') { jQuery('#jBarHolderMenu').css('bottom',tempyTemp+28); }
    else                   { jQuery('#jBarHolderMenu').css('bottom',tempyTemp-28); }
    }

function animate_jBar(data) {
    var numb=40;
    var retractNumb=32;
    if (jBarIsIE<10)  {
        numb=38;
        retractNumb=30;
        if ((jQuery('body').width() < 1010)&&(jBardocT=='Quirks')) { jBarScrollBar=1; }
        else { jBarScrollBar=0; }
    }
    if (data!=undefined) { // Browser just loaded the jBar, read the cookie and adjust accordingly
        if(jQuery.cookie('jBar')=="down") {
            jQuery('#jBarRetractUp').show();
            jQuery('#jBarRetractDown').hide();
            if (jBarScrollBar==1) {
                jQuery('#jBarRetract').css('bottom','17');
                if (jQuery(bindStyle).width()>870) { jQuery('#jBar').removeClass('width1000'); }
                else { jQuery('#jBar').addClass('width1000'); }
                }
            } 
        else {
            jQuery('#jBarRetractDown').show();
            jQuery('#jBarRetractUp').hide();
            if (jBarScrollBar==1) { jQuery('#jBar').addClass('width1000').animate({'bottom':'56'}, 'slow'); jQuery('#jBarRetract').animate({'bottom': '48'}, 700); }
            else { jQuery("#jBar").animate({"bottom":numb}, "slow"); jQuery('#jBarRetract').animate({'bottom': retractNumb}, 700); }
            }
        if (jBarScrollBar==1) { // if your in IE and there is a horizontal scrollbar
            var tempyTemp = jQuery('#jBarHolderMenu').children('ul').css('bottom');
            jQuery('#jBarHolderMenu').css('bottom',parseInt(tempyTemp)+28);
            }

        jQuery('#jBar').show();
        if (jQuery(bindStyle).width()>870) { jQuery('#jBar').removeClass('width1000'); }
        else { jQuery('#jBar').addClass('width1000'); }
        }
    else {
        if (jQuery('#jBarRetractUp').css('display')!='block') { // if jBar is up, move it down
            jQuery.cookie('jBar', 'down', {expires:1});
            if (adMark==1){ 
                jQuery('#riseUpAd').css('bottom',-1000); 
                adMark=0; 
            }
            jQuery('#jBar').animate({'bottom': -numb}, 'slow', function() { if (adMark==1) { jQuery('#riseUpAd').css('bottom',-1000); adMark=0; } });
            jQuery('#jBarRetractDown').hide();
            jQuery('#jBarRetractUp').show();
            if (jBarScrollBar==1) { jQuery('#jBarRetract').animate({'bottom': '17'}, 300); }
            else { jQuery('#jBarRetract').animate({'bottom': '0'}, 300); }
            }
        else { // if jBar is down, move it up
            jQuery.cookie('jBar', 'up', {expires:1});
            jQuery('#jBarRetractDown').show();
            jQuery('#jBarRetractUp').hide();
            if (jBarScrollBar==1) { 
                jQuery('#jBar').animate({'bottom': +56}, 'slow', function() { if (adMark==1) { jQuery('#riseUpAd').css('bottom',-1000); adMark=0; } }); 
                jQuery('#jBarRetract').animate({'bottom': '48'}, 700); 
            }
            else { 
                jQuery('#jBar').animate({'bottom': +numb}, 'slow', function() { if (adMark==1) {jQuery('#riseUpAd').css('bottom',-1000); adMark=0; } }); 
                jQuery('#jBarRetract').animate({'bottom': retractNumb}, 700); 
            }
        }
    }
}

function find_in_url(data) { 
    var xx = fullUrl.toString();
    if ( document.location.hash == '#dev' ) window.console && console.log('fullUrl1: ' + fullUrl);
    if (xx.indexOf('http://') != -1) {
        xx=xx.split('//'); 
        var xxDomain = xx[1];
        if (xxDomain.indexOf('www') == -1) {
            window.console && console.log('fullUrl2: ' + xxDomain); 
            fullUrl = 'www.' + xxDomain;            
        }       
    } 
    if ( document.location.hash == '#dev' ) window.console && console.log('fullUrl3: ' + fullUrl);
    if (typeof fullUrl === 'string') {
        var x=fullUrl.split("."); 
    } else {
        var x=fullUrl.toString().split("."); 
    }
    var y=x[1];     
    if ( document.location.hash == '#dev' ) window.console && console.log('y: ' + y);
    var z=x[2].split("/"); 
    if (data=='domain') {
        return y+'.'+z[0];
    } else if ((data=='sub')&&(z[1])) {
        return z[1];
    } else {return 'noSub';}
}
function detectTablet()    { 
    if (navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Kindle/i)||navigator.userAgent.match(/Xoom/i)) {
        return true
    } else {
        return false
    }
}
function detect_Doctype()  { var mode=document.compatMode,m; if(mode) { if (mode=='BackCompat') m='Quirks'; else if (mode=='CSS1Compat') m='Standards'; else m='Other'; return m;}}

function shortBarAlign() {
    var tablePos  = jQuery(shareBarWrapper+'>table').offset();      /* table based layout, not IE */
    var spanPos   = jQuery(shareBarWrapper+'>span>table').offset(); /* table based layout, IE */
    var divPos    = jQuery(shareBarWrapper+'>span>div').offset();   /* div based layout */
    var hybridPos = jQuery('.story').offset();                      /* Hybrid layout */

    if      (tablePos!=null) { var newLeftPos = tablePos.left;  }
    else if (spanPos!=null)  { var newLeftPos = spanPos.left;   }
    else if (divPos!=null)   { var newLeftPos = divPos.left;    }
    else /* Hybrid layout */ { var newLeftPos = hybridPos.left; }

    jQuery('#jBar').css('left', newLeftPos);
    jQuery('#riseUpAd').css('left', newLeftPos+15); 
    }

function jBarCreation() {
    var jBarOutput  = '<div style="display:none" id="jBar"><div id="jBarFrame">';
         jBarOutput += '<div id="mainBar">';
         jBarOutput += '<span id="jBarLayout_Left">'+jBarLayout_Left+'</span><span id="jBarLayout_Right">'+jBarLayout_Right+'</span>';
         jBarOutput += '</div>';
         jBarOutput += '</div></div>';
         jBarOutput += '<span id="jBarRetract" onclick ="javascript:animate_jBar()"><div id="jBarRetractUp"></div><div id="jBarRetractDown"></div><div class="jBarRetractLine"></div><div class="jBarRetractLine"></div><div class="jBarRetractLine"></div></span>';
         jBarOutput += '<span id="riseUpAd" style="display: none; bottom:-1000;"></span>'; 
    
    jQuery('body').prepend(jBarOutput);

    if ((jBardocT=='Quirks')&&(jBarIsIE<10)) {
        jQuery('#jBar').css('width','98.8%');
        jQuery('body').append('<div id="After" style="display:none">'+jBarIsIE+'</div>');
        }

    if ((domainUrl=='denverpost.com')&&(jBarIsIE<10)) { // use a short version of the toolbar for DPO in IE
        jQuery('#jBar').width('1000');
        jQuery('#jBarRssScroll').width('328');
        shortBarAlign();
        jQuery(window).bind('resize', function(){ shortBarAlign() });
        }
    
    if (holderRSS != '') {
        if (jQuery('#jBarHolder').html()!=null) { 
            jQuery('#jBarHolder').css('background-image', holderImageUrl).children('ul').rssfeed(holderRSS, { limit: 5, media: false, header: false, date: false, content: false, showerror: false, errormsg: '' }, function(e) {   
                jQuery('#jBarHolder, #jBarHolderMenu')
                .find('.rssBody').unwrap() // remove this so the rss feed does not scroll
                .find('ul').unwrap()       // remove this so the rss feed does not scroll
                .css('bottom','30px')
                .find('li').hover(
                    function() { jQuery(this).css({'cursor':'pointer', 'background-color':'#E0E0E0'}); jQuery(this).find('a').css('color','#000000') },
                    function() { jQuery(this).css({'cursor':'default', 'background-color':'#222222'}); jQuery(this).find('a').css('color','#FFFFFF') }
                    )
                .find('a').unwrap();
                });
        }
    }
    
    // remove the daily deals if URL_dailyDeals is empty in the json file
    if (URL_dailyDeals=='') { jQuery('#jBar_dailyDeals').remove(); }
    
    jQuery('#youMightLikeMenu, #jBarHolderMenu').insertAfter('#jBar'); // these objects only appear in IE

    if ((jBarIsIE<10)&&(jBardocT=='Quirks')) { bindStyle = wrapperStyle; }
    else { bindStyle=window }

    jQuery(bindStyle).bind('resize', function(){
        if ((jBarIsIE<10)&&(jBardocT=='Quirks')) { // if IE and not hybrid
            if (jQuery('body').width() < 1010) { // if there is a horizontal scrollbar in the browser
                if (jQuery('#jBarRetractUp').css('display')!='block') { // if jBar is up
                    jQuery('#jBar').css({'bottom':'56','display':'block'}).addClass('width1000');
                    jQuery('#jBarRetract').css('bottom','48');
                    if (jBarScrollBar==0) {
                        var tempyTemp = jQuery('#jBarHolderMenu').children('ul').css('bottom');
                        jQuery('#jBarHolderMenu, #youMightLikeMenu').css('bottom',parseInt(tempyTemp)+28);
                        jBarScrollBar=1;
                        }
                    }
                else { // if jBar is down
                    jQuery('#jBarRetract').css({'bottom':'17','display':'block'});
                    jQuery("#jBar").css('bottom','-32').addClass('width1000');
                    if (jBarScrollBar==1) {
                        var tempyTemp = jQuery('#jBarHolderMenu').children('ul').css('bottom');
                        jQuery('#jBarHolderMenu, #youMightLikeMenu').css('bottom',parseInt(tempyTemp)-28);
                        jBarScrollBar=0;
                        }
                    }
                } // end if there is a scrollbar
            else { // if there is no scrollbar
                if (jQuery('#jBarRetractUp').css('display')!='block') { // if jBar is up
                    jQuery('#jBar').css({'bottom':'38','display':'block'});
                    jQuery('#jBarRetract').css('bottom','30');
                    }
                else { jQuery('#jBarRetract').css('bottom','0'); jQuery('#jBar'); }
                if (jBarScrollBar==1) {
                    var tempyTemp = jQuery('#jBarHolderMenu').children('ul').css('bottom');
                    jQuery('#jBarHolderMenu, #youMightLikeMenu').css('bottom',parseInt(tempyTemp)+10);
                    jBarScrollBar=0;
                    }
                jQuery('#jBar').removeClass('width1000');
                }
            } // end if IE and not hybrid
        if (jBarScrollBar==0) {
            if (jQuery(bindStyle).width()>1000) { jQuery('#jBar').removeClass('width1000'); }
            else { jQuery('#jBar').addClass('width1000'); }
            }
        else { // if they are in IE and there is a horizontal scrollbar
            if (jQuery(bindStyle).width()>870) { jQuery('#jBar').removeClass('width1000'); }
            else { jQuery('#jBar').addClass('width1000'); }
            }
        if (jQuery(bindStyle).width()>1050) { jQuery('#jBarRssScroll').show(); }
        else { jQuery('#jBarRssScroll').hide(); }
        });

    jQuery('.jBarShow, #jBarRetract').hover(
        function() { jQuery(this).addClass('bg-222').find('a').css('color','#FFFFFF'); },
        function() { jQuery(this).removeClass('bg-222').find('a').css('color','#000000'); }
        );
    jQuery('#jBarHolder, #jBarRetract, #adTeaser, #jBarImg, #riseUpAd').hover( 
    /*jQuery('#jBarHolder, #jBarRetract, #adTeaser, #adTeaser2, #jBarImg, #riseUpAd2').hover(*/
        function() { jQuery(this).css('cursor','pointer') },
        function() { jQuery(this).css('cursor','default') }
        );

    jQuery('#jBarHolder').find('li').hover(
        function() { jQuery(this).css({'cursor':'pointer', 'background-color':'#E0E0E0'}); jQuery(this).find('a').css('color','#000000') },
        function() { jQuery(this).css({'cursor':'default', 'background-color':'#222222'}); jQuery(this).find('a').css('color','#FFFFFF') }
        );

    if (jBarIsIE>9) { // NOT IE9 or below
        jQuery('#jBarHolder').hover( // In IE this is taken care of in the function jBarHolderMenuTrack()
            //function() { jQuery(this).css('background-position','5px -22px'); },
            function() { jQuery(this).css('background-position','5px 6px'); },
            function() { jQuery(this).css('background-position','5px 6px'); }
            );
        
        jQuery('#jBarHolder').hover(
            function() { jQuery(this).css('color','#FFFFFF').children('ul').css('color','#FFFFFF').show(); jQuery('#jBarRetract').css('z-index','100'); },
            function() { jQuery(this).css('color','#000000').children('ul').css('color','#000000').hide(); jQuery('#jBarRetract').css('z-index','5400000'); }
            );
        }

    if (jBarIsIE<10) {  jQuery('#jBarHolder').children('ul').appendTo('#jBarHolderMenu'); }

    if (adTimer=='on') {
        jQuery("#adTeaser").show().hover(
            function () { if (adMark!=1) { jQuery('#adTeaserBack').stop().animate({ width:300 }, 1500, 'linear', function() {   finishRiseUpAd();   }); }}, 
            function () { jQuery('#adTeaserBack').stop().animate({ width:0 }, 1, 'linear'); }
            ); 
        }
    else { 
        jQuery("#adTeaser").show().hover( function() { jQuery('#riseUpAd').animate({'bottom': adHeight+30}, 1000); }, function() {} ); 
    }
    
    RSSFinder(); // Check RSS feeds for Alerts/Breaking News to display in the RSS scroller
    finishTeaserAd(); 

    if (tablet==true) { activateTabletLinks(); }

    if (typeof jBarTwitFollow == 'undefined') { jBarTwitterFollow=''; } else { jBarTwitterFollow=jBarTwitFollow; } // have to do this so the check_sharebar() function can read it
    if ( document.location.hash == '#dev' ) console.log("JBAR1: ", jBarTwitterFollow);
    if (article!=null) { check_articlePopUp(); check_sharebar(); }
    setTimeout('jBarOmniture()',1000);       // add Omniture to all links in the jBar
    setTimeout('fixWallPaperAds()',1000);    // fix the wallpaper ads z-index
    setTimeout('animate_jBar("init")',1100); // wait one second before activating the toolBar to allow everything in it to render
    } // end jBarCreation

function fixWallPaperAds() {
    var adx=/adx_/i;
    jQuery('body').children('div').each(function() {
        if (jBarIsIE<10) {
            var ad_divID  = jQuery(this).attr('id');
            var ad_result = ad_patt.exec(ad_divID);
            if(ad_result!=null) { jQuery(this).css('zIndex','-1'); }

            var adx2 = jQuery(this).attr('id');
            var adx3 = adx.exec(adx2);
            if(adx3!=null) { if (parseInt($(this).css('left'))>1000) { jQuery(this).css('zIndex','-1'); } }
            }
        else if (jQuery(this).children().size()!=0) {
            var ad_divID  = jQuery(this).children('div').attr('id');
            var ad_result = ad_patt.exec(ad_divID);
            if(ad_result!=null) {
                jQuery(this).children('div').each(function(){
                    jQuery(this).css('z-index','100');
                    });
                }
            }
        });
    }

function toggleJbarMenu(data) { // This only happens on tablets, this changes the youMightLike and holder menu functionality.
    if (jQuery('#jBarHolder').children('ul').css('display')=='none') {
        jQuery('#jBarHolder').css('background-position','5px 6px').children('ul').css('display','block');
        jQuery('#jBar_youMightLike').children('ul').css('display','none'); // close the youMightLike menu if its open
        jQuery('#jBarRetract').css('z-index','100').parent().removeClass('bg-222');
        }
    else {
        jQuery('#jBarHolder').children('ul').css('display','none');
        jQuery('#jBarHolder').css({'color':'#000000','background-position':'5px 6px'}).parent().removeClass('bg-222');
        jQuery('#jBarRetract').css('z-index','5400000');
        }
    /* for the IE menus */
    if (jBarHolderMenuTracker==0) { jQuery('#jBarHolderMenu').show(); jBarHolderMenuTracker=1 }
    else { jQuery('#jBarHolderMenu').hide(); jBarHolderMenuTracker=0 }
    }

function activateTabletLinks() { // This only happens on tablets, this changes the youMightLike and holder menu functionality.
    jQuery('#jBarHolder').parent().attr('onclick', 'javascript: toggleJbarMenu("jBarHolder")');
    jQuery('#jBar_youMightLike').attr('onclick', 'javascript: toggleJbarMenu("youMightLike")');
    }

function jBarHolderMenuTrack() {
    if (jBarHolderMenuTracker==0) { jQuery('#jBarHolderMenu').hide(); jQuery('#jBarHolder').css({'background-position':'5px 6px','background-color':''}).removeClass('bg-222'); }
    //else { jQuery('#jBarHolder').css('background-position','5px -22px').addClass('bg-222'); }
    else { jQuery('#jBarHolder').css('background-position','5px 6px'); }
    }

function jBarOmniture() {
    jQuery('.jBarRssScroll').find('a').each(function() { jQuery(this).attr('href', jQuery(this).attr('href') + '?source=jBarTicker'); });
    jQuery('#jBarHolder, #youMightLikeMenu, #jBarHolderMenu').find('a').each(function() { jQuery(this).attr('href', jQuery(this).attr('href') + '?source=jBarContentPromo'); });
    jQuery('#jBarHolder').find('li').each(function() { jQuery(this).attr('href', jQuery(this).attr('href') + '?source=jBarContentPromo'); });
    jQuery('#jBar_dailyDeals').children('a').each(function () {
        var dd_href = jQuery(this).attr('href');
        jQuery(this).attr('href', dd_href + '?source=jBarDD');
    });
    //jQuery('#jBarSiteIcon').parent().attr('href', jQuery(this).attr('href') + '?source=jBarHome');
    jQuery('#jBarSiteIcon').parent().attr('href', fullUrl.origin + '?source=jBarHome');
    jQuery('#popCont').find('a').attr('href', jQuery(this).attr('href') + '?source=jBarFlyout');
    }

function RSSFinder() {
    if (jQuery('#jBarRssScroll').find('ul').children().size() == 0) {
        jQuery('#jBarRssScroll').rssfeed(RSS_Scoller_Feeds[RSSCounter], {
            titletag: 'div', limit: 999 , media: false, header: false, date: false, content: false }, function(e) {
            jQuery('#jBar .rssBody').vTicker({ speed: 700, pause: 4000, showItems: 99, height: 0 });
            });
        if (RSSCounter >= RSS_Scoller_Feeds.length) {
            jQuery('#jBarRssScroll').rssfeed(RSS_Scoller_Default, { titletag: 'div', limit: 999 , media: false, header: false, date: false, content: false }, function(e) {
            jQuery('#jBar .rssBody').vTicker({ speed: 700, pause: 4000, showItems: 99, height: 0 });
            });
            setTimeout("finishRssScroll()", 500);
            return;
            }
        RSSCounter+=2;
        // set a timer to make sure the it has time to write the code before running the function again to check if there is content yet
        setTimeout('RSSFinder()', 2000);
        }
    else {
        // an alert RSS feed has content, set the background color and prevent article rotation
        var BGColor = RSS_Scoller_Feeds[RSSCounter-=1];
        if (RSSCounter < RSS_Scoller_Feeds.length) { jQuery('#jBarRssScroll').find('li').css('background-color',BGColor); }
        if (jBarIsIE<10) { // IE
            jQuery('head').append('<style> #jBar .rssBody{height: 100% !important;}#jBar .rssBody li{float: left; margin-top: 0px !important; padding-top: 7px !important;} </style>');
            }
        else { // not IE
            jQuery('head').append('<style> #jBar .rssBody{height: 100% !important;}#jBar .rssBody li{height: 100% !important; width: 100%;}#jBar .rssRow div{margin-top: -8px; padding-top: 8px;} </style>');
            }
        jQuery('#jBarRssScroll').find('.rssRow').unwrap(); // this prevents the rssScroller from scrolling
        }
    }

function finishRssScroll() {
    jQuery('#jBarRssScroll').find('.rotate').css('position','relative'); // this is needed for it to show movement when rotating
    jQuery('#jBarRssScroll').find('li').each(function() { // add Omniture to all the article links in the scroller
        var x = jQuery(this).find('a').attr('href');
        var y = x.split("?");
        jQuery(this).find('a').attr('href', y[0]+'?source=jBarTicker');
        });
    }

function browserStyles() {
    jQuery('#jBarSpacer').width('20px');
    jQuery("#adTeaserBack").css({ opacity: 0.5 });
    if (jBarIsIE<10) {
        jQuery('#mainBar').children().children('span').each(function() { jQuery(this).css('border-right','1px solid #999999'); });
        jQuery('#jBarHolderMenu').css({'z-index':'5500001','position':'absolute','bottom': 29,'line-height':'1.8em','display':'none','color':'#FFFFFF'});
        // In IE the pop up ad breaks the jBar if its set to display: inline, must set it to display: block to fix this
        jQuery('#riseUpAd').css({ 'width':'0px','padding-right':'15px','display':'block !important','margin-left':'20px !important' });
        jQuery('#jBarRetract').css('margin-left','50%');
        jQuery('#jPopUpX').hover( function() { jQuery(this).css({'cursor':'pointer','color':'#000000'}); }, function() { jQuery(this).css({'cursor':'default','color':'#999999'}); } );
        jQuery('#jBarSpacer').css('height','30px');
        if ((sharebar=='yes')&&(article!=null)) { setTimeout("jQuery('.shareBarFacebook').find('iframe').css({'width':'105'})", 2000); }
        if (jBardocT=='Quirks') { jQuery('body').append('<style>#analyticsIframe{display: none !important;}</style>'); }
        else { jQuery('#jBarHolderMenu').css('position','fixed'); }
        }
    jQuery('#jBar, #jBarLayout_Right').css('background-color',backgroundColor);
    setTimeout('fixjBarRetractor()', 1500);
    setTimeout('finishMenus()', 2000);
    }
    
function fixjBarRetractor() {
    var retractPos = jQuery('#jBarRetract').offset(); // fix the retractor button if its not centered
    if (typeof retractPos !== "undefined") {
        if ( retractPos.left==0) { jQuery('#jBarRetract').css('margin-left','50%'); }
        else { jQuery('#jBarRetract').css('margin-left','0px !important'); }
    }
}

function finishMenus() {
    if (jBarIsIE<10) {
        if (jQuery('#jBarHolder').html()!=null) { var pos = jQuery('#jBarHolder').parent().offset(); jQuery('#jBarHolderMenu').css('left', pos.left); }

        jQuery('#jBarHolder').hover(
            //function() { jQuery(this).css({'background-color':'#222222','background-position':'5px -22px'}); jQuery('#jBarHolderMenu').show(); jBarHolderMenuTracker=1; },
            function() { jQuery(this).css({'background-color':'rgb(224, 224, 224)','background-position':'5px 6px'});; jQuery('#jBarHolderMenu').show(); jBarHolderMenuTracker=1; },
            function() { jBarHolderMenuTracker=0; setTimeout('jBarHolderMenuTrack()', 200); }
            );

        var holderWidth   = jQuery('#jBarHolderMenu').width();
        var youMightWidth = jQuery('#youMightLikeMenu').width();

        jQuery('#jBarHolderMenu').find('li').each(function() {
            jQuery(this)
                .hover(
                    function() { jQuery(this).css('background-color','#E0E0E0'); jBarHolderMenuTracker=1; },
                    function() { jBarHolderMenuTracker=0; setTimeout('jBarHolderMenuTrack()', 200); }
                    )
                .children('a').width(holderWidth);
            });
        }
    else { // if not IE
        jQuery('#jBarHolder').find('li').each(function() { jQuery(this).attr('onclick', 'window.location.href=\''+jQuery(this).children('a').attr('href')+'\''); });
        }
    jQuery('#adTeaser').children('a').removeAttr('href');
    }

function finishTeaserAd() {
    jQuery('#adTeaser')
        .css({'float':'left'})
        .writeCapture().html('<span id="teaserStopClick" style="position:absolute; width:300px; height:30px; background:transparent;" onclick="javascript: finishRiseUpAd()"></span><div id="adTeaserBack" onclick="javascript: finishRiseUpAd()" style="background-color: #666; position: absolute; height: 30px; margin-left: 0px;"></div><div id="adTeaser2">'+adTeaserCode2+'</div>')
        //.append('<div id="adTeaser2">'+adTeaserCode2+'</div>')
        .show();
    browserStyles();
    }
    
function finishRiseUpAd() {
    if (jQuery('#riseUpAd').html()=='') {
        var adHeight = jQuery('#riseUpAd').outerHeight();
        if ((jBarIsIE<10)&&(jBardocT=='Quirks')) { adHeight = adHeight-20; setTimeout('jQuery("#riseUpAdX").css("margin-left", jQuery("#riseUpAd").width())', 600); }
        jQuery("#riseUpAd")
            //.writeCapture().html('<span id="riseUpAdX" onclick="javascript: adDrop()">&#215;</span>'+adTag+'<div id="dfppAd">'+adTag2+'</div>')
            .writeCapture().html('<span id="riseUpAdX" onclick="javascript: adDrop()">&#215;</span><div id="dfppAd">'+adTag2+'</div>')
            .animate({'bottom': adHeight}, 1000)
            .css({'background-color':backgroundColor,'float':'left','display':'block'})
            .hover(function() {}, function() { adDrop(); } );
        if ((jBarIsIE<10)&&(jBardocT!='Quirks')) { jQuery("#riseUpAd").css('width','auto'); jQuery("#riseUpAdX").css('margin-right','-15px'); }

        adMark=1;
        }
        else { jQuery("#riseUpAd").animate({'bottom': 30}, 1000); adMark=1; }
    }
    
function adDrop() { jQuery('#riseUpAd').animate({'bottom': -1000}, 1000); adMark=0; }
/********************************* End jBar setup ********************************/
/*********************************************************************************/
/****************************** Begin article pop Up *****************************/

function check_articlePopUp() {
    var popUpPos=0; // This is used to make sure the article popup only happens once
    var jPopUp_RSS_Feed = '';
    var jPopCat = '';

    var subSec = find_in_url('sub');

    for (i=0;i<article_PopUp_RSS.length;i++) {
        var x = article_PopUp_RSS[i].toLowerCase().indexOf(subSec); if(x!=-1) {
            jPopCat = article_PopUp_RSS[i];
            i++;
            jPopUp_RSS_Feed = article_PopUp_RSS[i];
            if (i%2 != 0) { break; } // verify jPopCat is not an RSS feed, if i is an even number then it is an RSS feed and will break the pop up
            else { jPopCat=jPopUp_RSS_Feed=''; }
            }
        }

    if (jPopUp_RSS_Feed=='') { jPopUp_RSS_Feed = article_PopUp_Default; }

    jQuery(document).ready(function(){
        var jPopPosition = wrapperStyle;
        if ((jBardocT=='Standards')&&(jBarIsIE<10)) { jPopPosition = 'body'; }
        jQuery('<div id="jPopUp"><span id="jPopUpText">NEXT ARTICLE IN </span><a href=""><span id="popCat"></span></a><span id="jPopUpX" onclick="jPopDown()">&#215;</span><div></div><span id="popCont">&#187;<a href=""> Continue to article...</a></span></div>').appendTo(jPopPosition);
        
        if (jBardocT!='Standards') { 
            if(article != null) {
                jBarArticleBox='.articleBox'; 
            } else {
                jBarArticleBox='.story'; 
            }
        }

        articleEnd = jQuery(jBarArticleBox).height() - 400;

        jQuery(bindStyle).scroll(function(){
            var t = jQuery(bindStyle).scrollTop();
            if ((t>articleEnd)&&(popUpPos!=1)) {
                popUpPos=1;
                jQuery('#jPopUp').animate({right: 0, bottom: 0}, 1200, function() {});
                }
            });

        jQuery('<div id="jBarRssfeed" style="display:none"></div>').appendTo('body');
        jQuery('#jBarRssfeed').rssfeed(jPopUp_RSS_Feed, {titletag: 'div', header: false, date: false, content: false, fn: makeArray4jPopUp()});

        if(jPopCat=='') {
            jQuery('#popCat').html('NEWS');
            if (typeof article_PopUp_Default_Link != 'undefined') {
                if(article_PopUp_Default_Link=='') { jQuery('#popCat').parent().attr('href', '/NEWS?source=JBarFlyout'); }
                else { jQuery('#popCat').parent().attr('href', '\/'+article_PopUp_Default_Link+'?source=JBarFlyout'); }
                }
            }
        else {
            jPopCatSplit = jPopCat.split('/');
            if(jPopCatSplit[1] != undefined) {
                jQuery('#popCat').html(jPopCatSplit[0]).parent().attr('href', '\/'+jPopCatSplit[1]+'?source=JBarFlyout');
                }
            else {
                jQuery('#popCat').html(jPopCat).parent().attr('href', '\/'+jPopCat+'?source=JBarFlyout');
                }
            }
        });

    setTimeout("finishArticlePopUp()",2500);
    } // end check_articlePopUp()

function jPopDown() {jQuery('#jPopUp').animate({bottom:'-=250'}, 1000, function() {});}

var jPopUp_rssArray=[];
var jPopUp_rssCount=0; // prevents infinite loop
function makeArray4jPopUp() {
    if ((jQuery('#jBarRssfeed').html()=='')&&(jPopUp_rssCount<3)) { setTimeout('makeArray4jPopUp()', 1000); jPopUp_rssCount++; }
    else {
        jQuery('#jBarRssfeed').find('.rssRow').each(function() {
            var x = jQuery(this).find('a').attr('href');
            var y = x.split('?');
            jQuery(this).find('a').attr('href', y[0]+'?source=JBarTicker');
            jPopUp_rssArray.push(jQuery(this).children('div').html());
            });
        var artTitle = jQuery.trim(jQuery('#articleTitle').text());
        for (i=0;i<jPopUp_rssArray.length;i++) {
            var checkArr = jPopUp_rssArray[i].indexOf(artTitle);
            if (checkArr != -1) {
                if (jPopUp_rssArray[i+1] != undefined) {// check to see if you have reached the end of the rss feed
                    jQuery('#jPopUp').children('div').html(jPopUp_rssArray[i+1]);
                    }
                else { // if you've reached the end, go back to the beginning
                    jQuery('#jPopUp').children('div').html(jPopUp_rssArray[0]);
                    }
                break; // if we find the article get out of the loop
                }
            else { jQuery('#jPopUp').children('div').html(jPopUp_rssArray[0]); }
            }
        }
    }

function finishArticlePopUp() {
    jQuery('#jBarRssfeed').remove();
    jQuery('#popCont').children('a').attr('href', jQuery('#jPopUp').children('div').children('a').attr('href'));
    jQuery('#jPopUpX').hover(
            function() { jQuery(this).css({'cursor':'pointer','color':'#335577'}); },
            function() { jQuery(this).css({'cursor':'default','color':'#999999'}); }
            );
    }

/*************************** End article pop Up ********************************/
/*******************************************************************************/
/***************************** Begin shareBar **********************************/

    var thisURL = window.location.href;
    var thisOriginalURL = window.location.href;
    var relatedTweeter = '';

    // Denver Post-specific logic for adding URL shortcodes
    function get_url(url) 
    {
        var http = new XMLHttpRequest();
        http.open('GET', url, false);
        http.send();
        if ( http.status == 404 )
        {
            return false;
        }
        return http;
    }

    if ( window.location.host.indexOf('denverpost') > -1 && typeof articleId != 'undefined' && articleId != '' )
    {
        // Let's give someone some more followers.
        var featuredTweeter = 'LAColacioppo';
        relatedTweeter = ' data-related="' + featuredTweeter + '"';

        // Let's give credit to the twitter account of the reporter, if there is one.
        if ( typeof jQuery("meta[name='twitter:creator']").attr('content') != 'undefined' )
        {
            // The substr trims off the "@" at the beginning of the string.
            var jBarTwitterFollowReporter = jQuery("meta[name='twitter:creator']").attr('content').substr(1);
        }

        // Check if the shortcode exists:
        // We know that the articleId variable will exist by the time this script is called.
        var shortcodeDir = articleId.substr(0,1) + '/' + articleId.substr(1,1) + '/' + articleId.substr(2,1) + '/' + articleId.substr(3,1) + '/' + articleId.substr(4,1) + '/';
        var exists = get_url('http://extras.denverpost.com/cache/shortcodes/denverpost/NGPS/' + shortcodeDir + articleId + '.js');
        if ( exists == false )
        { 
            // If we don't have a shortcode, we make a request to the server that generates the shortcodes and use that.
            var url_bits = document.location.pathname.split('/');
            var offset = 0;
            var secName = ''

            // If the indicators of an article are in the third position, we know the section is in the
            // second position, and that we should offset the descriptiveUrl by one.
            if ( url_bits[2].substr(0,3) == 'ci_' )
            {
                offset = 1;
                secName = url_bits[1];
            }
            //var articleId = url_bits[offset + 1].substr(3,8);
            var descriptiveUrl = url_bits[offset + 2];

            exists = get_url('http://denverpostplus.com/app/shortcodes/?article_id=' + articleId + '&section=' + secName + '&slug=' + descriptiveUrl + '&domain=denverpost');
        }

        // The value here will be a URL, but we want to make sure.
        // If it's not a URL we'll just stick with the existing thisURL value.
        if ( exists.response.indexOf('http') > -1 )
        {
            thisURL = exists.response;
        }
    }
    var thisTitle = document.title;
    var thisTumb = thisURL.replace(/.*?:\/\//g, "");

//jQuery("html").attr("xmlns:fb","http://ogp.me/ns/fb#");
document.write('<div id="shareBarContents" style="opacity: 0; height: 0px; overflow: hidden;">');
document.write('<div id="fb-root"></div>');
document.write('<script>');
document.write('(function(d, s, id) {');
document.write('var js, fjs=d.getElementsByTagName(s)[0];');
document.write('if (d.getElementById(id)) return;');
document.write('js = d.createElement(s);');
document.write('js.id = id; js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";');
document.write('fjs.parentNode.insertBefore(js, fjs);}');
document.write('(document, \'script\', \'facebook-jssdk\'));');
document.write('</script>');
document.write('<div class="fb-like" data-href="'+thisURL+'" data-send="false" data-layout="box_count" data-width="450" data-show-faces="false" data-share="true"></div>');
//document.write('<div class="fb-like"><fb:like href="https://developers.facebook.com/docs/plugins/" layout="standard" action="like" show_faces="true" share="true"></fb:like></div>');
document.write('</div>');


function check_sharebar() {

        if (jBardocT=='Quirks') { var artTitle = jQuery.trim(jQuery('#articleTitle').text()); }
        else                    { var artTitle = jQuery.trim(jQuery('.entry-title').text()); }
        siteIDtemp = jQuery('.privacyPolicyLink').attr('href');
        if (siteIDtemp!=undefined)  {
            siteIDtemp2 = siteIDtemp.split('=');
            if (siteIDtemp2!=undefined) { siteID = siteIDtemp2[1]; }
            else { siteID=''; }
            }
        else if (dfm.api('data','siteId')!=undefined) { siteID=dfm.api('data','siteId'); }
        else { siteID=''; }
        var jBarTwitterRelated = '';

        // If we have a value for the twitter account of the reporter, we use that instead of the default 
        // institutional twitter account.
        if ( typeof jBarTwitterFollowReporter != 'undefined' ) jBarTwitterFollow = jBarTwitterFollowReporter;
        if ( document.location.hash == '#dev' ) window.console && console.log("JBAR2: ", jBarTwitterFollow, jBarTwitterRelated);
        var output = '<div id="shareBarWrapper" style="display:none;">';
            output += '<link href="http://extras.mnginteractive.com/live/js/jquery/jBar/nsharebar.css" type="text/css" rel="stylesheet">';
            output += ' <div class="share-barADD">';
            output += '     <ul>';
            output += '         <li class="facebook">';
            output += '         <a>#</a>';
            output += '             <ul class="share-options">';
            output += '                     <li class="shareBarFacebook"></li>';
            output += '             </ul>';
            output += '         </li>';
            output += '         <li class="twitter">';
            output += '             <a>#</a>';
            output += '                 <ul class="share-options">';
            output += '                     <li><a href="https://twitter.com/share" class="twitter-share-button" data-count="vertical" data-url="'+thisURL+'" data-via="'+jBarTwitterFollow+'" data-counturl="' + thisOriginalURL + '" data-text="' + ArticleTitle + ':" ' + relatedTweeter + '>Tweet</a>';
            output += '                          <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script></li>';
            output += '                     <li><a href="https://twitter.com/'+jBarTwitterFollow+'" class="twitter-follow-button" data-show-count="false" data-show-screen-name="false">Follow @'+jBarTwitterFollow+'</a>';
            output += '                          <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script></li>';
            output += '                 </ul>';
            output += '         </li>';
            output += '         <li class="google">';
            output += '                 <a onclick="javascript:window.open(\'http://plus.google.com/share?url='+thisURL+'\', \'gpluswin\', \'left=20,top=20,width=500,height=500,toolbar=1,resizable=1\')"></a>';
            output += '         </li>';
            output += '                 <li class="reddit"><a href="javascript:void(open(\'http://reddit.com/submit?url='+thisURL+'&title='+thisTitle+'\'));"';
            output += '                     title="Share on Reddit"><i class="reddit"></i>Reddit</a></li>';
            output += '                 <li class="pinterest"><a href="javascript:javascript:void((function(){var e=document.createElement(\'script\');e.setAttribute(\'type\',\'text/javascript\');e.setAttribute(\'charset\',\'UTF-8\');e.setAttribute(\'src\',\'http://assets.pinterest.com/js/pinmarklet.js?r=\'+Math.random()*99999999);document.body.appendChild(e)})());" title="Pin It!"';
            output += '                     title="Share on Pinterest"><i class="pinterest"></i>Pinterest</a></li>';
/*  Commented Out Until Disqus Uniformly Deployed.      output += '         <li class="comments-share">';
            output += '                 <div id="shareDisqus"></div>';
            output += '                 <script type="text/javascript">';
            output += '                    $(\'#disqusHiddenTemp a\').appendTo($(\'#shareDisqus\'));';          
            output += '                    $(\'#disqusHiddenTemp\').remove();';         
            output += '                 </script>';
            output += '         </li>';
*/          output += '         <li class="more">';
            output += '             <a>...</a>';
            output += '                 <script type="text/javascript">';
            output += '                         addthis_pub = \'mngi\';';
            output += '                         var addthis_config = {"data_track_clickback": true};';
            output += '                 </script>';
            output += '                 <ul class="more-share-options">';
            output += '                 <li><a href="javascript:popup(\'email\',\'\/portlet\/article\/html\/fragments\/email_article.jsp?articleId='+articleId+'&section=/'+secName+'\',700,500);" title="Email this to a friend"><img src="http://extras.mnginteractive.com/live/std/icon-email.gif" border="0">E-mail</a></li>';
            output += '                 <li><a href="." onClick="CleanPrintPrintHtml();return false;" title="Print this article"><img src="http://extras.mnginteractive.com/beta/std/icon-print.gif" border="0">Print</a></li>';
            output += '                 <li><a href="javascript:void(open(\'https://www.tumblr.com/share?s=&v=3&t='+thisTitle+'&u='+thisTumb+'\'));"';
            output += '                     title="Share on Tumblr"><i class="tumblr"></i>Tumblr</a></li>';
            output += '                 <li><a href="javascript:void(open(\'http://www.linkedin.com/shareArticle?mini=true&url='+thisURL+'&title='+thisTitle+'&source='+thisURL+'\'));"';
            output += '                     title="Share on LinkedIn"><i class="linkedin"></i>LinkedIn</a></li>';
            output += '                 <li><a href="javascript:void(open(\'https://www.stumbleupon.com/submit?url='+thisURL+'&title='+thisTitle+'\'));"';
            output += '                     title="Share on StumbleUpon"><i class="stumbleupon"></i>StumbleUpon</a></li>';
            output += '             </ul>';
            output += '         </li>';
            output += '     </ul>';
            output += ' </div>';
    
    if ((sharebar=='yes')&&(article!=null)&&(smrtPhone==false)&&(tablet==false)) {
        jQuery(output).prependTo('body');
        jQuery(bindStyle).bind('resize', function(){ alignHorzShareBar(); });
        jQuery(bindStyle).scroll(function(){ alignVertShareBar(); });

        setTimeout('alignHorzShareBar()' ,1000);
        setTimeout('alignVertShareBar()' ,1200);
        if (jBarTwitterFollow=='') { jQuery('.shareBarTwitter').remove(); }
        }

    
}

function alignHorzShareBar() {
    var tablePos  = jQuery(shareBarWrapper+'>table').offset();      /* table based layout, not IE */
    var spanPos   = jQuery(shareBarWrapper+'>span>table').offset(); /* table based layout, IE */
    /*var divPos    = jQuery(shareBarWrapper+'>span>div').offset();    div based layout */
    var divPos    = jQuery('#outerOuterRegion').offset(); 
    var hybridPos = jQuery('.story').offset();                      /* Hybrid layout */
    
    if      (tablePos!=null) { var newLeftPos = tablePos.left  - jQuery('#shareBarWrapper').outerWidth(); }
    else if (spanPos!=null)  { var newLeftPos = spanPos.left   - jQuery('#shareBarWrapper').outerWidth(); }
    else if (divPos!=null)   { var newLeftPos = divPos.left    - jQuery('#shareBarWrapper').outerWidth(); }  
    else /* Hybrid layout */ { var newLeftPos = hybridPos.left - jQuery('#shareBarWrapper').outerWidth(); }
    newLeftPos = newLeftPos - 0;
    
    jQuery('#shareBarWrapper').css('left', newLeftPos);
    }

function alignVertShareBar() {
    var t = jQuery(bindStyle).scrollTop();

    var articleOffset = jQuery(jBarArticleBox).offset().top - t;

    if ((jBardocT=='Quirks')&&(jBarIsIE<10)) { // IE quirks
        var articleTop = jQuery(jBarArticleBox).offset().top;
        var articleBot = jQuery(jBarArticleBox).offset().top + jQuery(jBarArticleBox).height();

        if (jQuery(jBarArticleBox).offset().top>100) { jQuery('#shareBarWrapper').css({'top':articleTop,'margin-top':0}); }
        else if (t>articleEnd+400) { jQuery('#shareBarWrapper').css({'margin-top':articleBot-300 }); }
        else { jQuery('#shareBarWrapper').css({'top':100,'margin-top':0}); }
        }
    else { // not IE quirks
        var newArticleEnd = articleEnd+jQuery(jBarArticleBox).offset().top;
        if (articleOffset>100)    { jQuery('#shareBarWrapper').css({'top':articleOffset,'position':'fixed','margin-top':0}); }
        else if (t>newArticleEnd) { jQuery('#shareBarWrapper').css({'position':'absolute','margin-top':newArticleEnd }); }
        else                      { jQuery('#shareBarWrapper').css({'top':100,'position':'fixed','margin-top':0}); }
        }

    if(jQuery('#shareBarContents').html()) { // this only happens the first time the page loads
        jQuery('.shareBarFacebook').append(jQuery('#shareBarContents').find('.fb-like'));
        jQuery('.shareBarFacebook').append(jQuery('#shareBarContents').find('#fb-root'));
        jQuery('#shareBarContents').remove();
        jQuery('#shareBarWrapper').show();
        if(navigator.userAgent.indexOf('Chrome') == -1) { // if not Chrome
            jQuery("body").append("<div id='hackToFixFacebookWidget' style='height:0px; overflow:hidden;'>"+$(".share-barADD .facebook .share-options").html()+"</div>");
            
        }
    }

    else { jQuery('#shareBarContents').remove(); jQuery('#hackToFixFacebookWidget').remove(); }
    jQuery('#shareBarWrapper').css({'display':'block'});
    }
