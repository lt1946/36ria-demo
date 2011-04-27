describe('KISSY.Steps',function(){
    var S = KISSY, DOM = S.DOM,color='red',steps,
        HTMLSteps = DOM.create('<ol id="steps-demo"><li>1. 买家下单</li><li>2. 买家付款</li> <li>3. 发货</li> <li>4. 买家确认收货</li> <li>5. 评价</li> </ol>');
    beforeEach(function(){
        DOM.append(HTMLSteps,'body');
        steps = new KISSY.Steps(HTMLSteps);
        steps.render();
    });
    afterEach(function() {
       DOM.remove(HTMLSteps);
    });
    it('KISSY.Steps已经运行',function(){
        expect(steps.isRender).toEqual(true);
    });
    describe('激活步骤',function(){
         var act = 2,act2 = '',currentCls = KISSY.Steps.cls.CURRENT,hasCurCls;
         it('确保参数为大于等于0的整数',function(){
              expect(act).toBeGreaterThan(-1);
         });
         it('成功激活步骤',function(){
             steps.set('act',act);
             expect(steps.get('act')).toEqual(act);
         });
        /*
         it('确保该激活步骤设置当前样式',function(){
             //alert(DOM.html(steps.steps[act-1]));
             hasCurCls = DOM.hasClass(s.teps.steps[act-1],currentCls);
             //alert(DOM.attr(steps.steps[act-1],'class'));
             expect(hasCurCls).toEqual(true);
        });
        */
        it('当参数为非数值或小于0时，设置为0',function(){
             steps.set('act',act2);
             expect(steps.get('act')).toEqual(0);
         });
    });
    describe('步骤条颜色',function(){
         var color = 'red',isAllowColor = false;
         it('确保该颜色为组件内置的颜色',function(){
             isAllowColor = steps.isAllowColor(color);
             expect(isAllowColor).toEqual(true);
         });
         it('成功设置颜色',function(){
            steps.set('color',color);
            expect(steps.get('color')).toEqual(color);
         })
    });
    describe('单步骤宽度',function(){
        var widthEmpty = -100,widthNumber = 200,itemWidth;
        it('width为非数值型或小于0，平分步骤条',function(){
            itemWidth = steps.itemWidth;
            steps.set('width',widthEmpty);
            expect(steps.get('width')).toEqual(itemWidth);
        });
        it('自定义单步骤宽度',function(){
            steps.set('width',widthNumber);
            expect(steps.get('width')).toEqual(widthNumber);
        })
    });

});