/**
 * @author kingfo  oicuicu@gmail.com
 */
AJBridge.add('store', function(A) {

    var S = KISSY, UA = S.UA;

    /**
     * 本地存储类
     * @param {String} id                        需要注册的 SWF 应用 ID
     * @param {Object} config                    配置项
     * @param {Boolean} config.useCompression    配置项中的压缩标记。默认 true, 表示存储数据采用压缩
     * @param {Boolean} config.baseOnBrowser     配置项中的浏览器专署标记。默认为 false
     */
    function Store(id, config) {
        config = config || { };

        var flashvars = { },
            useCompression = config.useCompression,
            baseOnBrowser = config.baseOnBrowser;

        switch (baseOnBrowser) {
            case 'core':
                flashvars.browser = UA.core;
                break;
            case 'shell':
                flashvars.browser = UA.shell;
                break;
        }

        flashvars.useCompression = (S.isUndefined(useCompression) ? true : useCompression) + '';
		config.params = config.params || {};
        config.params.flashvars = S.merge(config.params.flashvars, flashvars);
        Store.superclass.constructor.call(this, id, config);
    }

    S.extend(Store, A);

    A.augment(Store,
        [
            'getItem',
            'setItem',
            'removeItem',
            'getLength',
            'key',
            'clear',
            'getModificationDate',
            'hasAdequateDimensions',
            'displaySettings',
            'getUseCompression',
            'getSize',
            'checkout',
            'destroy',
            'setMinDiskSpace'
        ]
        );

    Store.version = '1.0.4';
    A.Store = Store;
});

/**
 * NOTES:
 * 2010/08/12   重构了代码，基于AJBridge 1.0.10
 * 2010/08/27   重构了代码，基于AJBridge 1.0.12
 * 2010/11/21	增加了checkout功能
 */
