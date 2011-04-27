/**
 * AJBridge Class
 * @author kingfo oicuicu@gmail.com
 */
KISSY.add('ajbridge', function(S) {

    var Flash = S.Flash,
        ID_PRE = '#',
        VERSION = '1.0.14',
		PREFIX = 'ks-ajb-',
		LAYOUT = 100,
        EVENT_HANDLER = 'KISSY.AJBridge.eventHandler'; // Flash 事件抛出接受通道

    /**
     * @constructor
     * @param {String} id       注册应用容器 id
     * @param {Object} config   基本配置同 S.Flash 的 config
     * @param {Boolean} manual  手动进行 init
     */
    function AJBridge(id, config,manual) {
        id = id.replace(ID_PRE, ''); // 健壮性考虑。出于 KISSY 习惯采用 id 选择器
        config = Flash._normalize(config||{}); // 标准化参数关键字

        var self = this,
            target = ID_PRE + id, // 之所以要求使用 id，是因为当使用 ajbridge 时，程序员自己应该能确切知道自己在做什么
            callback = function(data) {
                if (data.status < 1) {
                    self.fire('failed', { data: data });
                    return;
                }
				
                S.mix(self, data);

                // 执行激活 静态模式的 flash
                // 如果这 AJBridge 先于 DOMReady 前执行 则失效
                // 建议配合 S.ready();
                if (!data.dynamic || !config.src) {
						self.activate();
                }
            };
		
		// 自动产生 id	
		config.id = config.id || S.guid(PREFIX);

        // 注册应用实例
        AJBridge.instances[config.id] = self;

        //	动态方式
        if (config.src) {
            // 强制打开 JS 访问授权，AJBridge 的最基本要求
            config.params.allowscriptaccess = 'always';
            config.params.flashvars = S.merge(config.params.flashvars, {
                // 配置 JS 入口
                jsEntry: EVENT_HANDLER,
                // 虽然 Flash 通过 ExternalInterface 获得 obejctId
                // 但是依然存在兼容性问题, 因此需要直接告诉
                swfID: config.id
            });
        }

        // 支持静态方式，但是要求以上三个步骤已静态写入
        // 可以参考 test.html
		
        // 由于完全基于事件机制，因此需要通过监听之后进行初始化 Flash
		
        if(manual)self.__args = [target, config, callback];
		else S.later(Flash.add,LAYOUT,false,Flash,[target, config, callback]);
    }

    /**
     * 静态方法
     */
    S.app(AJBridge, {

        version: VERSION,

        instances: { },

        /**
         * 处理来自 AJBridge 已定义的事件
         * @param {String} id            swf传出的自身ID
         * @param {Object} event        swf传出的事件
         */
        eventHandler: function(id, event) {
            var instance = AJBridge.instances[id];
            if (instance) {
                instance.__eventHandler(id, event);
            }
        },

        /**
         * 批量注册 SWF 公开的方法
         * @param {Class} C
         * @param {String|Array} methods
         */
        augment: function (C, methods) {
            if (S.isString(methods)) {
                methods = [methods];
            }
            if (!S.isArray(methods)) return;
			
			

            S.each(methods, function(methodName) {
                C.prototype[methodName] = function() {
                    try {
                        return this.callSWF(methodName, S.makeArray(arguments));
                    } catch(e) { // 当 swf 异常时，进一步捕获信息
                        this.fire('error', { message: e });
                    }
                }
            });
        }
    });

    S.augment(AJBridge, S.EventTarget, {

        init: function() {
			if(!this.__args)return;
            Flash.add.apply(Flash, this.__args);
			this.__args = null;
			delete this.__args; // 防止重复添加
        },

        __eventHandler: function(id, event) {
            var self = this,
                type = event.type;
			
            event.id = id;   //	弥补后期 id 使用
           
            switch(type){
				case "log":
					 S.log(event.message);
					break;
				default:
					self.fire(type, event);
			}
			
        },

        /**
         * Calls a specific function exposed by the SWF's ExternalInterface.
         * @param func {String} the name of the function to call
         * @param args {Array} the set of arguments to pass to the function.
         */
        callSWF: function (func, args) {
            var self = this;
            args = args || [];
            try {
                if (self.swf[func]) {
                    return self.swf[func].apply(self.swf, args);
                }
            }
            // some version flash function is odd in ie: property or method not supported by object
            catch(e) {
                var params = '';
                if (args.length !== 0) {
                    params = "'" + args.join("','") + "'";
                }
                //avoid eval for compressiong
                return (new Function('self', 'return self.swf.' + func + '(' + params + ');'))(self);
            }
        }
    });

    // 为静态方法动态注册
    // 注意，只有在 S.ready() 后进行 AJBridge 注册才有效。
    AJBridge.augment(AJBridge, ['activate', 'getReady','getCoreVersion']);

    window.AJBridge = S.AJBridge = AJBridge;
});
/**
 * NOTES:
 * 2010/07/22     完成基本代码
 * 2010/08/08     由于KISSY.Flash重构，因此AJBridge也进行了改动。
 * 2010/08/09     AJBridge的 AS3 新增了 静态的动态激活。因此 内部增加了activete()的方法。
 * 2010/08/10     向 sandbox 提交了代码
 * 2010/08/11     修改 eventHandler(event) 转为  eventHandler(id,event).  
 *                变更版本号 1.0.10
 * 2010/08/27     变更 AJBridge 作为  KISSY的独立应用，并注册到全局。
 *                修改 addMethods 更换为 augment
 *                删除  addMethod， 其合并至  augment
 *                变更版本号 1.0.12
 * 2010/10/27     重构基于 Kissy.Flash 1.2版本最新核心
 *                修改手工 init() 转为 默认延时自动模式，即 new 一个实例对象时即创建，同时又保留手工模式，由 manual 决定
 *                新增事件 bridgeReady 作为 ajbridge 创建完成的标准事件。 由于 IE 通过 innerHTML 创建时立即会创建SWF 造成实例合并bug。
 *                当前版本号 1.0.13                
 * 2010/11/18     移除事件 bridgeReady 。由flash内部延迟处理后再需要此事件。
 *                新增 swf 核心版本号. 通过 ajbridge.getCoreVersion() 获取。
 *                新增 swf 核心状态验证. 通过 ajbridge.getReady()获取，其值恒等于 "ready"。
 *                修改匿名 flash 前缀从 "ajb-flash-" 至 "ks-ajb-"  
 *                当前版本号 1.0.14    
 */
