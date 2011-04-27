/*
Copyright 2011, KISSY UI Library v1.1.5
MIT Licensed
build time: Jan 5 11:39
*/
AJBridge.add("store",function(e){function b(h,a){a=a||{};var c={},f=a.useCompression;switch(a.baseOnBrowser){case "core":c.browser=g.core;break;case "shell":c.browser=g.shell}c.useCompression=(d.isUndefined(f)?true:f)+"";a.params=a.params||{};a.params.flashvars=d.merge(a.params.flashvars,c);b.superclass.constructor.call(this,h,a)}var d=KISSY,g=d.UA;d.extend(b,e);e.augment(b,["getItem","setItem","removeItem","getLength","key","clear","getModificationDate","hasAdequateDimensions","displaySettings",
"getUseCompression","getSize","checkout","destroy","setMinDiskSpace"]);b.version="1.0.4";e.Store=b});
