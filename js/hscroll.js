/*
* @Author: hc
* @Date:   2018-02-02 09:30:50
* @Last Modified by:   hc
* @Last Modified time: 2018-02-02 13:04:50
* @description 该组件使用原生js编写，不需要引用JQuery
*/


(function(window){

   /**
     * 声明一个全局对象My，作用于整个多页应用，后期应该配置在统一的config.js中
     * @type {Object}
     */
    window.My = window.My || {};

    window.My.HScroll = {

        /**
         * @Author   hc
         * @DateTime 2018-02-02 
         * @Describe 初始化所有滚动条所需要的数据，包括四个dom节点，以及位置和状态
         * @param    {[type]}   id1 [可视区域div]
         * @param    {[type]}   id2 [内容区域div]
         * @param    {[type]}   id3 [滚动条活动区域div]
         * @param    {[type]}   id4 [滚动条div]
         * @return   {[type]}       [description]
         */
        init:function(id1,id2,id3,id4){
            this.container  = document.getElementById(id1),//可视区域  
            this.content    = document.getElementById(id2),//内容区域  
            this.scrollArea = document.getElementById(id3),//滚动条活动区域  
            this.scroll     = document.getElementById(id4),//滚动条  
            this.startY    = 0,  //开始位置    
            this.lastY     = 0,  //结束位置  
            this.YN      = false, //是否是拖动状态，true则允许拖动滚动条
            this.bBtn  = true;   //判断滚动条上滚还是下滚 
            this.initEvent();
        },
        initEvent:function(){
            this.initScrollState();
            this.initScrollEvent();
            this.initContentEvent();
        },
        /**
         * @Author   hc
         * @DateTime 2018-02-02
         * @Describe 初始化滚动条的状态，根据内容的高度来设置滚动条的长度。每次初始化都要设置各个节点的初始位置为0
         * @return   {[type]}   [description]
         */
        initScrollState:function(){
            this.content.style.top = "0";  //内容区域位置初始化
            this.scroll.style.top = "0";  //滚动条高度初始化
            var scrollHeight = this.container.offsetHeight * this.scrollArea.offsetHeight / this.content.offsetHeight;
            //根据内容高度判断是否需要滚动条
            var ifScrollFill = scrollHeight >= this.scrollArea.offsetHeight ? true : false;
            //ifScrollFill为true 则不需要滚动条
           
            this.scroll.style.display="block";
            this.scroll.style.height=scrollHeight+"px";
             if(ifScrollFill == true){
                this.scroll.style.display="none";

            }
        },
        /**
         * @Author   hc
         * @DateTime 2018-02-02
         * @Describe 滚动条的事件监听
         * @return   {[type]}   [description]
         */
        initScrollEvent:function(){
            var _this = this;
            this.scroll.onmousedown=function(e){
                var e = e || window.event; //获取事件对象
                _this.startY = e.clientY - this.offsetTop;    
                this.setCapture && this.setCapture();//避免IE下拖拽过快鼠标失去对象  
                _this.YN = true;  
                return false;  
            }
            this.scroll.onmousemove=function(e){
                var e = e || window.event; //获取事件对象
                var maxVal = _this.scrollArea.offsetHeight - this.offsetHeight;  
                if(_this.YN){  
                    _this.lastY = e.clientY - _this.startY;  
                    _this.lastY = _this.lastY < 0 ? 0 :_this.lastY;  
                    _this.lastY = _this.lastY > maxVal ? maxVal : _this.lastY;  
                    this.style.top=_this.lastY+"px";
                    _this.content.setAttribute("style","top:"+ -_this.scrollArea.offsetHeight*_this.lastY / this.offsetHeight+'px')
                    // 防止拖动文本
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();  
                    try{
                        e.stopPropagation();   
                    }
                    catch(e){

                    }
                }  
                return false;  
            }
            this.scroll.onmouseup=function(e){
                var e = e || window.event; //获取事件对象
                _this.YN = false;  
                NumY = _this.lastY;  
                return false;  
            }
        },
        /**
         * @Author   hc
         * @DateTime 2018-02-02
         * @Describe 初始化内容区域的的事件，为内容区域添加滑轮滚动事件
         * @return   {[type]}   [description]
         */
        initContentEvent:function(){
            var _this = this;
            if(this.content.addEventListener){  
                this.content.addEventListener("DOMmouseScrolloll",contentMouseScroll,false);  
                this.scrollArea.addEventListener("DOMmouseScrolloll",contentMouseScroll,false);  
            }
            this.content.onmousewheel = contentMouseScroll;  
            this.scrollArea.onmousewheel = contentMouseScroll;  
            
            /**
             * @Author   hc
             * @DateTime 2018-02-02
             * @Describe    这里如果提取出来一个函数 用call和apply来修改ths指向都不行，只能用bind来修改this。但是bind不兼容IE8
             * @param    {[type]}   ev [description]
             * @return   {[type]}      [description]
             */
            function contentMouseScroll(ev){
                console.log(_this)
                var ev = ev || window.event,  
                TopY = 0;  
                //如果内容少不需要滚动条，直接return，不在执行判断
                if(_this.ifScrollFill == true){
                    return
                }
                if(ev.detail){  
                    _this.bBtn = ev.detail>0  ?  true : false;  
                }  
                else{  
                    _this.bBtn = ev.wheelDelta<0  ?  true : false;  
                }  
                if(_this.bBtn){   //下 
                    console.log(_this.content) 
                    TopY = _this.content.offsetTop -10;  
                }  
                else{  //上  
                    TopY = _this.content.offsetTop +10;  
                }  
                var maxTop = _this.content.offsetHeight-_this.container.offsetHeight;  
                TopY = TopY > 0 ? 0 : TopY;  
                TopY = TopY < -maxTop ? -maxTop : TopY;  
                _this.content.style.top = TopY+"px";
                _this.scroll.style.top =_this.scroll.offsetHeight*Math.abs(TopY)/_this.scrollArea.offsetHeight+"px";
                if(ev.preventDefault){  
                    ev.preventDefault();  
                }  
                else{  
                    return false;  
                }  
            }

        },
        /**
         * @Author   hc
         * @DateTime 2018-02-02
         * @Describe  内容区域滑轮滚动  事件处理函数 暂时没有调用的。
         * @return   {[type]}   [description]
         */
        contentMouseScroll:function(ev){
            console.log(this)
            var ev = ev || window.event,  
            TopY = 0;  
            //如果内容少不需要滚动条，直接return，不在执行判断
            if(this.ifScrollFill == true){
                return
            }
            if(ev.detail){  
                this.bBtn = ev.detail>0  ?  true : false;  
            }  
            else{  
                this.bBtn = ev.wheelDelta<0  ?  true : false;  
            }  
            if(this.bBtn){   //下 
                console.log(this.content) 
                TopY = this.content.offsetTop -10;  
            }  
            else{  //上  
                TopY = this.content.offsetTop +10;  
            }  
            var maxTop = this.content.offsetHeight-this.container.offsetHeight;  
            TopY = TopY > 0 ? 0 : TopY;  
            TopY = TopY < -maxTop ? -maxTop : TopY;  
            this.content.style.top = TopY+"px";
            this.scroll.style.top =this.scroll.offsetHeight*Math.abs(TopY)/this.scrollArea.offsetHeight+"px";
            if(ev.preventDefault){  
                ev.preventDefault();  
            }  
            else{  
                return false;  
            }  
        },
        /**
         * @Author   hc
         * @DateTime 2018-02-02
         * @Describe 组件内垃圾回收
         * @return   {[type]}   [description]
         */
        recycling:function(){

        }

    }

})(window)
