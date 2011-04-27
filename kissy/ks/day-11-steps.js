/**
 * @fileOverview 步骤条组件
 * @extends  KISSY.Base
 * @creator 剑平（明河共影）<riahome@126.com>
 * @depends  ks-core
 * @version 2.0
 * @update 2011-01-02
 * @example
 *     var steps = new S.Steps("#steps-1");
 */
KISSY.add('steps', function(S) {
    var DOM = S.DOM,EMPTY = '',LI = 'li';
    /**
    * 步骤条组件
    * @class xx
    * @constructor
    * @param {Object} container 表单容器
    * @param {Object} config 配置对象
    */
    function Steps(container ,config){
        var self = this;

        if (!(self instanceof Steps)) {
            return new Steps(config);
        }
        /**
         * 目标容器
         * @type HTMLElement
         */
        self.container = S.get(container);
        //超类初始化
        Steps.superclass.constructor.call(self, config);
        //初始化
        self._init();
    }
    //继承于KISSY.Base
    S.extend(Steps, S.Base);
    /**
     * 设置参数
     */
    Steps.ATTRS = {
        //是否自动运行
        autoRender : {
            value : false,
            setter : function(v){
                this.render();
                return v;
            }
        },
        //步骤宽度
        width : {
            value : 100,
            setter : function(v){
                alert('当你调用set方法时触发');
                return v;
            }
        }
    };
    /**
     * 方法
     */
    S.augment(Steps, {
        /**
         * 初始化
         */
         _init : function(){

         },
        /**
         * 运行
         * @return {Object} 对象
         */
        render : function(){
            var self = this,event = Steps.event,container = self.container,steps,cls = Steps.cls;
            if(container == null) return false;
            return self;
        }
    });

    S.Steps = Steps;
}, { requires: ['core'] });

