/*
Copyright 2011, KISSY UI Library v1.1.5
MIT Licensed
build time: Jan 5 11:39
*/
AJBridge.add("uploader",function(c){function b(g,a){a=a||{};var f={};d.each(["ds","dsp","btn","hand"],function(e){if(e in a)f[e]=a[e]});a.params=a.params||{};a.params.flashvars=d.merge(a.params.flashvars,f);b.superclass.constructor.call(this,g,a)}var d=KISSY;d.extend(b,c);c.augment(b,["setFileFilters","filter","setAllowMultipleFiles","multifile","browse","upload","uploadAll","cancel","getFile","removeFile","lock","unlock","setBtnMode","useHand","clear"]);b.version="1.0.1";c.Uploader=b});
