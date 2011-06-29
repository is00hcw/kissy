/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("ajax/base",function(i,h,j,e){function d(f){f=i.mix(i.clone(r),f||{},undefined,undefined,true);if(f.crossDomain==null){var k=o.exec(f.url.toLowerCase());f.crossDomain=!!(k&&(k[1]!=m[1]||k[2]!=m[2]||(k[3]||(k[1]==="http:"?80:443))!=(m[3]||(m[1]==="http:"?80:443))))}if(f.data&&!i.isString(f.data))f.data=i.param(f.data,undefined,undefined,false);f.type=f.type.toUpperCase();f.hasContent=!p.test(f.type);if(!f.hasContent){if(f.data)f.url+=(/\?/.test(f.url)?"&":"?")+f.data;if(f.cache===false)f.url+=
(/\?/.test(f.url)?"&":"?")+"_ksTS="+(i.now()+"_"+i.guid())}f.dataType=i.trim(f.dataType||"*").split(g);f.context=f.context||f;return f}function a(f,k){c.fire(f,{ajaxConfig:k.config,xhr:k})}function b(f){var k=this.config;f=f.type;this.timeoutTimer&&clearTimeout(this.timeoutTimer);k[f]&&k[f].call(k.context,this.responseData,this.statusText,this);a(f,this)}function c(f){if(f.url){f=d(f);var k=new e(f);a("start",k);var v=new (s[f.dataType[0]]||s["*"])(k);k.transport=v;f.contentType&&k.setRequestHeader("Content-Type",
f.contentType);var t=f.dataType[0],u=f.accepts;k.setRequestHeader("Accept",t&&u[t]?u[t]+(t!=="*"?", */*; q=0.01":""):u["*"]);for(var w in f.headers)k.setRequestHeader(w,f.headers[w]);k.on("complete success error",b);k.readyState=1;a("send",k);if(f.async&&f.timeout>0)k.timeoutTimer=setTimeout(function(){k.abort("timeout")},f.timeout);try{k.state=1;v.send()}catch(x){k.status<2?k.callback(-1,x):i.error(x)}return k}}var g=/\s+/,o=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,l=function(f){return f},
p=/^(?:GET|HEAD)$/,n,m;try{n=location.href}catch(q){n=document.createElement("a");n.href="";n=n.href}m=o.exec(n);n=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/.test(m[1]);var s={},r={type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},converters:{text:{json:h.parse,html:l,text:l,xml:i.parseXML}},contents:{xml:/xml/,html:/html/,
json:/json/}};r.converters.html=r.converters.text;i.mix(c,j.Target);i.mix(c,{isLocal:n,setupConfig:function(f){i.mix(r,f,undefined,undefined,true)},setupTransport:function(f,k){s[f]=k},getTransport:function(f){return s[f]},getConfig:function(){return r}});return c},{requires:["json","event","./xhrobject"]});
KISSY.add("ajax/form-serializer",function(i,h){return{serialize:function(j){j=h.get(j);var e={};i.each(j.elements,function(d){d.disabled||(e[d.name]=h.val(d))});return i.param(e,undefined,undefined,false)}}},{requires:["dom"]});
KISSY.add("ajax/form",function(i,h,j,e){h.on("start",function(d){d=d.xhr.config;if(d.form){var a=j.get(d.form);if((a.encoding||a.enctype).toLowerCase()!="multipart/form-data"){if(a=e.serialize(a))if(d.hasContent){d.data=d.data||"";if(d.data)d.data+="&";d.data+=a}else d.url+=(/\?/.test(d.url)?"&":"?")+a}else{a=d.dataType[0];if(a=="*")a="text";d.dataType.length=2;d.dataType[0]="iframe";d.dataType[1]=a}}});return h},{requires:["./base","dom","./form-serializer"]});
KISSY.add("ajax/iframe-upload",function(i,h,j,e){function d(b){this.xhr=b}var a=document;e.setupConfig({converters:{iframe:e.getConfig().converters.text,text:{iframe:function(b){return b}}}});i.augment(d,{send:function(){var b=this.xhr,c=b.config,g,o=h.get(c.form);this.attrs={target:h.attr(o,"target")||"",action:h.attr(o,"action")||""};this.form=o;var l=i.guid("ajax-iframe");b.iframe=h.create("<iframe  id='"+l+"' name='"+l+"' style='position:absolute;left:-9999px;top:-9999px;'/>");b.iframeId=l;h.prepend(b.iframe,
a.body||a.documentElement);h.attr(o,{target:b.iframeId,action:c.url});if(c.data){c=c.data;c=i.unparam(c,undefined,undefined,false);g=[];for(var p in c){l=i.makeArray(c[p]);for(var n=0;n<l.length;n++){var m=a.createElement("input");m.type="hidden";m.name=p;m.value=l[n];h.append(m,o);g.push(m)}}g=g}this.fields=g;j.on(b.iframe,"load error",this._callback,this);o.submit()},_callback:function(b){var c=this.xhr,g=b.type;b=c.iframe;h.attr(this.form,this.attrs);if(g=="load"){g=b.contentWindow.document;c.responseXML=
g;c.responseText=h.text(g.body);c.callback(200,"success")}else g=="error"&&c.callback(500,"error");h.remove(this.fields);j.detach(b);h.remove(b);c.iframe=null},abort:function(){this._callback(0,1)}});e.setupTransport("iframe",d);return e},{requires:["dom","event","./base"]});
KISSY.add("ajax/jsonp",function(i,h){h.setupConfig({jsonp:"callback",jsonpCallback:function(){return i.guid("jsonp")}});h.on("start",function(j){j=j.xhr;var e=j.config;if(e.dataType[0]=="jsonp"){var d,a=e.jsonpCallback,b=i.isFunction(a)?a():a,c=window[b];e.url+=(/\?/.test(e.url)?"&":"?")+e.jsonp+"="+b;window[b]=function(g){d=[g]};j.on("complete",function(){window[b]=c;if(c===undefined)try{delete window[b]}catch(g){}else d&&c(d[0])});j.converters=j.converters||{};j.converters.script=j.converters.script||
{};j.converters.script.json=function(){d||i.error(" not call jsonpCallback : "+b);return d[0]};e.dataType.length=2;e.dataType[0]="script";e.dataType[1]="json"}});return h},{requires:["./base"]});
KISSY.add("ajax/script",function(i,h){function j(e){if(!e.config.crossDomain&&!e.config.forceScript)return new (h.getTransport("*"))(e);this.xhrObj=e;return 0}h.setupConfig({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{text:{script:function(e){i.globalEval(e);return e}}}});i.augment(j,{send:function(){var e=this,d,a=this.xhrObj.config,b=document.head||document.getElementsByTagName("head")[0]||
document.documentElement;e.head=b;d=document.createElement("script");e.script=d;d.async="async";if(a.scriptCharset)d.charset=a.scriptCharset;d.src=a.url;d.onerror=d.onload=d.onreadystatechange=function(c){c=c||window.event;e._callback((c.type||"error").toLowerCase())};b.insertBefore(d,b.firstChild)},_callback:function(e,d){var a=this.script,b=this.xhrObj,c=this.head;if(d||!a.readyState||/loaded|complete/.test(a.readyState)||e=="error"){a.onerror=a.onload=a.onreadystatechange=null;c&&a.parentNode&&
c.removeChild(a);this.head=this.script=undefined;if(!d&&e!="error")b.callback(200,"success");else e=="error"&&b.callback(500,"scripterror")}},abort:function(){this._callback(0,1)}});h.setupTransport("script",j);return h},{requires:["./base","./xhr"]});
KISSY.add("ajax/xhr",function(i,h){function j(){try{return new window.XMLHttpRequest}catch(a){}}h.xhr=window.ActiveXObject?function(a){var b;if(h.isLocal&&!a)a:{try{b=new window.ActiveXObject("Microsoft.XMLHTTP");break a}catch(c){}b=void 0}return b||j()}:j;var e=h.xhr(),d=false;if(e){if("withCredentials"in e)d=true;e=function(a){this.xhrObj=a};i.augment(e,{send:function(){var a=this,b=a.xhrObj,c=b.config;if(c.crossDomain&&!d)i.error("do not allow crossdomain xhr !");else{var g=h.xhr(),o,l;a.xhr=g;
c.username?g.open(c.type,c.url,c.async,c.username,c.password):g.open(c.type,c.url,c.async);if(o=c.xhrFields)for(l in o)g[l]=o[l];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType);if(!c.crossDomain&&!b.requestHeaders["X-Requested-With"])b.requestHeaders["X-Requested-With"]="XMLHttpRequest";try{for(l in b.requestHeaders)g.setRequestHeader(l,b.requestHeaders[l])}catch(p){}g.send(c.hasContent&&c.data||null);if(!c.async||g.readyState==4)a._callback();else g.onreadystatechange=function(){a._callback()}}},
abort:function(){this._callback(0,1)},_callback:function(a,b){try{var c=this.xhr,g=this.xhrObj,o=g.config;if(b||c.readyState==4){c.onreadystatechange=i.noop;if(b)c.readyState!==4&&c.abort();else{var l=c.status;g.responseHeadersString=c.getAllResponseHeaders();var p=c.responseXML;if(p&&p.documentElement)g.responseXML=p;g.responseText=c.responseText;try{var n=c.statusText}catch(m){n=""}if(!l&&h.isLocal&&!o.crossDomain)l=g.responseText?200:404;else if(l===1223)l=204;g.callback(l,n)}}}catch(q){c.onreadystatechange=
i.noop;b||g.callback(-1,q)}}});h.setupTransport("*",e);return h}},{requires:["./base"]});
KISSY.add("ajax/xhrobject",function(i,h){function j(a){var b=a.responseText,c=a.responseXML,g=a.config,o=g.converters,l=a.converters||{},p,n,m=g.contents,q=g.dataType;if(b||c){for(g=a.mimeType||a.getResponseHeader("Content-Type");q[0]=="*";)q.shift();if(!q.length)for(p in m)if(m[p].test(g)){q[0]!=p&&q.unshift(p);break}q[0]=q[0]||"text";if(q[0]=="text"&&b!=undefined)n=b;else if(q[0]=="xml"&&c!=undefined)n=c;else i.each(["text","xml"],function(r){var f=q[0];if(l[r]&&l[r][f]||o[r]&&o[r][f]){q.unshift(r);
n=r=="text"?b:c;return false}})}m=q[0];for(g=1;g<q.length;g++){p=q[g];var s=l[m]&&l[m][p]||o[m]&&o[m][p];if(!s)throw"no covert for "+m+" => "+p;n=s(n);m=p}a.responseData=n}function e(a){i.mix(this,{responseData:null,config:a||{},timeoutTimer:null,responseText:null,responseXML:null,responseHeadersString:"",responseHeaders:null,requestHeaders:{},readyState:0,state:0,statusText:null,status:0,transport:null})}var d=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg;i.augment(e,h.Target,{setRequestHeader:function(a,b){this.requestHeaders[a]=
b;return this},getAllResponseHeaders:function(){return this.state===2?this.responseHeadersString:null},getResponseHeader:function(a){var b;if(this.state===2){if(!this.responseHeaders)for(this.responseHeaders={};b=d.exec(this.responseHeadersString);)this.responseHeaders[b[1]]=b[2];b=this.responseHeaders[a]}return b===undefined?null:b},overrideMimeType:function(a){if(!this.state)this.mimeType=a;return this},abort:function(a){a=a||"abort";this.transport&&this.transport.abort(a);this.callback(0,a);return this},
callback:function(a,b){if(this.state!=2){this.state=2;this.readyState=4;var c;if(a>=200&&a<300||a==304)if(a==304){b="notmodified";c=true}else try{j(this);b="success";c=true}catch(g){b="parsererror : "+g}else if(a<0)a=0;this.status=a;this.statusText=b;c?this.fire("success"):this.fire("error");this.fire("complete");this.transport=undefined}}});return e},{requires:["event"]});
KISSY.add("ajax",function(i,h){i.mix(h,{get:function(j,e,d,a,b){if(i.isFunction(e)){a=d;d=e}return h({type:b||"get",url:j,data:e,success:d,dataType:a})},post:function(j,e,d,a){if(i.isFunction(e)){a=d;d=e;e=undefined}return h.get(j,e,d,a,"post")},jsonp:function(j,e,d){if(i.isFunction(e)){d=e;e=null}return h.get(j,e,d,"jsonp")},getScript:i.getScript,getJSON:function(j,e,d){return h.get(j,e,d,"json")},upload:function(j,e,d,a,b){if(i.isFunction(d)){a=d;d=null}return h({url:j,type:"post",dataType:b,form:e,
data:d,success:a})}});return h},{requires:["ajax/base","ajax/xhrobject","ajax/xhr","ajax/script","ajax/jsonp","ajax/form","ajax/iframe-upload"]});