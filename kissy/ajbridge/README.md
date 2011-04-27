AJBridge - Actionscript and Javascript communication frame library
=======================================
 * Source: <http://github.com/kissyteam/kissy-ajbridge>
 * Docs: <http://kissyteam.github.com/kissy-ajbridge/docs/>
 * Blog: <http://kissyui.com/blog/>

 Vision
--------
"AS做AS的事(code)，JS做JS的事(code)，仅在沟通时用我(bridge)！"
"AS do AS things (code), JS do JS things (code), only communicate with me (bridge)!"

Actionscript and Javascript are doing their own things, only use bridge in communication.

 Structure
-----------
 - assets         一些常用的资源文件.如logo
 - build:         构建好的发布文件
 - docs:          API、实例、教程等文档
 - src:           源码、测试等开发资源
 - thirtd-party:  第三方库
 - tools:         打包压缩等自动化工具

 Convention
------------
原则：尽量避免潜在冲突，同时力求精简短小和见名知意。

 - Flash 容器 hook 命名: FC_xxxx, 如 FC_DynamicPublishing
 - Flash Player hook 命名: FP_xxxx, 如 FP_StaticPublishing
 - class/id 命名: ks-ajb-comp[-xxx],如 ks-ajb-store,ks-ajb-store-alimama,ks-ajb-store-taobao 
 - data 属性命名： data-ks-comp[-xxx] 比如：data-ks-suggest
 - 强烈不鼓励使用全局变量

开发方式：
 - 目录保持一致,以下目录保持在同级目录：
    - kissy (https://github.com/kissyteam/kissy) 
    - ajbridge-as3core (https://github.com/kissyteam/kissy-ajbridge)
    - kissy-ajbridge (https://github.com/kingfo/ajbridge-as3core)
 - 推荐采用  flashdevelop 工具开发 AS 相关工程 (http://www.flashdevelop.org)






Other
----------
封装了 AS 和 JS 通信的包
是 KISSY 的独立子项目
由早期的 AJBridge 迁移过来

借鉴了以下库、包的特性创建而成：
SWFOject		http://code.google.com/p/swfobject/
Flashembed		http://flowplayer.org/tools/toolbox/flashembed.html
YUI2.swf		http://github.com/yui/yui2/blob/master/src/swf/js/swf.js


Questions?
----------
 - Bug：<http://github.com/kissyteam/kissy-ajbridge/issues>
 - 邮件：<oicuicu@gmail.com>
 - 讨论：<http://kissyui.com/forum/>

