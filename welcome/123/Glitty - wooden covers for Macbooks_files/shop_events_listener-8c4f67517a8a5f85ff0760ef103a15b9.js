!function(){function t(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent&&t.attachEvent("on"+e,n)}function e(t){t=t||window.event;var e=t.target||t.srcElement;if(e&&(e.getAttribute("action")||e.getAttribute("href")))try{window.ShopifyAnalytics.lib.track("Added Product",{currency:window.ShopifyAnalytics.meta.currency,sku:e.id.getAttribute("data-sku")||e.id.value,quantity:e.quantity?e.quantity.value:1})}catch(n){console&&console.warn&&console.warn("[shop_events_listener] Error in handleSubmitCartAdd: "+n.message)}}t(window,"load",function(){for(var n=0;n<document.forms.length;n++){var r=document.forms[n].getAttribute("action");r&&r.indexOf("/cart/add")>=0&&t(document.forms[n],"submit",e)}})}(),function(t){"use strict";function e(t){}function n(t){try{switch(t.url){case"/cart/add.js":t.xhr.responseText&&""!=t.xhr.responseText&&r(JSON.parse(t.xhr.responseText));break;case"/cart/change.js":case"/cart/clear.js":case"/cart.js":}}catch(e){console&&console.warn&&console.warn("[shop_events_listener] Error in handleXhrDone: "+e.message)}}function r(t){window.ShopifyAnalytics.lib.track("Added Product",{currency:window.ShopifyAnalytics.meta.currency,id:t.id,quantity:t.quantity,price:t.price/100,name:t.title,sku:t.sku,brand:t.vendor,category:t.product_type})}var a=t.prototype.open,o=t.prototype.send;t.prototype.open=function(t,n,r,o,i){this._url=n,this._method=t,e({method:t,url:n,xhr:this}),a.call(this,t,n,r,o,i)},t.prototype.send=function(t){function e(){a.readyState==a.DONE&&n({method:s,url:i,body:c,xhr:a}),r&&r()}var r,a=this,i=this._url,s=this._method,c=t;this.addEventListener?this.addEventListener("readystatechange",e,!1):(r=this.onreadystatechange,this.onreadystatechange=e),o.call(this,t)}}(XMLHttpRequest);