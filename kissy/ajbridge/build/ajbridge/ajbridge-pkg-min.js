/*
Copyright 2011, KISSY UI Library v1.1.5
MIT Licensed
build time: Jan 5 11:39
*/
KISSY.add("ajbridge",function(c){function f(b,a,d){b=b.replace(i,"");a=g._normalize(a||{});var e=this;b=i+b;var j=function(h){if(h.status<1)e.fire("failed",{data:h});else{c.mix(e,h);if(!h.dynamic||!a.src)e.activate()}};a.id=a.id||c.guid(k);f.instances[a.id]=e;if(a.src){a.params.allowscriptaccess="always";a.params.flashvars=c.merge(a.params.flashvars,{jsEntry:l,swfID:a.id})}if(d)e.__args=[b,a,j];else c.later(g.add,m,false,g,[b,a,j])}var g=c.Flash,i="#",k="ks-ajb-",m=100,l="KISSY.AJBridge.eventHandler";
c.app(f,{version:"1.0.14",instances:{},eventHandler:function(b,a){var d=f.instances[b];d&&d.__eventHandler(b,a)},augment:function(b,a){if(c.isString(a))a=[a];c.isArray(a)&&c.each(a,function(d){b.prototype[d]=function(){try{return this.callSWF(d,c.makeArray(arguments))}catch(e){this.fire("error",{message:e})}}})}});c.augment(f,c.EventTarget,{init:function(){if(this.__args){g.add.apply(g,this.__args);this.__args=null;delete this.__args}},__eventHandler:function(b,a){var d=a.type;a.id=b;switch(d){case "log":break;
default:this.fire(d,a)}},callSWF:function(b,a){a=a||[];try{if(this.swf[b])return this.swf[b].apply(this.swf,a)}catch(d){var e="";if(a.length!==0)e="'"+a.join("','")+"'";return(new Function("self","return self.swf."+b+"("+e+");"))(this)}}});f.augment(f,["activate","getReady","getCoreVersion"]);window.AJBridge=c.AJBridge=f});
