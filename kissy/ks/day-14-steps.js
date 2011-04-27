KISSY.add('steps', function(S) {
    /**
    * 步骤条组件
    * @class Steps
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
    }
    //继承于KISSY.Base
    S.extend(Steps, S.Base);
    /**
     * 设置参数
     */
    Steps.ATTRS = {
        //步骤条颜色
        color : {
            value : 'red'
        }
    };
    /**
     * 方法
     */
    S.augment(Steps, {
        /**
         * 运行
         * @return {Object} 对象
         */
        render : function(){
            var self = this;
            self.fire('render',{author:'明河共影'});
            return self;
        }
    });

    S.Steps = Steps;
}, { requires: ['core'] });
