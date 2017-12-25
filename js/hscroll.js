//竖向的滚动条，四个参数，可视区域ID，内容区域Id，滚动条区域，滚动条，  
function HScroll(id1,id2,id3,id4){  
    var container  = document.getElementById(id1),//可视区域  
        content    = document.getElementById(id2),//内容区域  
        scrollArea = document.getElementById(id3),//滚动条活动区域  
        scroll      = document.getElementById(id4),//滚动条  
          startY   = 0,//开始位置    
          lastY    = 0,//结束位置  
            YN     = false,  
              bBtn = true;//判断滚动条上滚还是下滚  
       
        var scrollHeight=container.offsetHeight*scrollArea.offsetHeight/content.offsetHeight;
        var scrollFill=scrollHeight>=scrollArea.offsetHeight?true:false;
        content.style.top="0";
        scroll.style.top="0"
        scroll.style.display="block";

        //判断是否
        if(scrollFill==true){
             scroll.style.display="none";
        }
        scroll.style.height=scrollHeight+"px";
 
        scroll.onmousedown=function(e){
            startY = e.clientY - this.offsetTop;    
            this.setCapture && this.setCapture();//避免IE下拖拽过快鼠标失去对象  
            YN = true;  
            return false;  
        }

        scroll.onmousemove=function(e){
            var maxVal = scrollArea.offsetHeight - this.offsetHeight;  
            if(YN){  
                lastY = e.clientY - startY;  
                lastY = lastY < 0 ? 0 :lastY;  
                lastY = lastY > maxVal ? maxVal : lastY;  
                this.style.top=lastY+"px";
                content.setAttribute("style","top:"+-scrollArea.offsetHeight*lastY/this.offsetHeight+'px')
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 防止拖动文本    
                e.stopPropagation();   
            }  
            return false;  
        }

        scroll.onmouseup=function(e){
            YN = false;  
            NumY = lastY;  
            return false;  
        }
       
        //为内容区域添加滑轮滚动事件  
        if(content.addEventListener){  
            content.addEventListener("DOMmouseScrolloll",mouseScroll,false);  
            scrollArea.addEventListener("DOMmouseScrolloll",mouseScroll,false);  
        }  

        content.onmousewheel = mouseScroll;  
        scrollArea.onmousewheel = mouseScroll;  

        function mouseScroll(ev){  
            console.log("gg");
            var ev = ev || window.event,  
              TopY = 0;  
              //如果内容少不需要滚动条，直接return，不在执行判断
             if(scrollFill==true){
                return
            }
            if(ev.detail){  
                bBtn = ev.detail>0  ?  true : false;  
            }  
            else{  
                bBtn = ev.wheelDelta<0  ?  true : false;  
            }  
            if(bBtn){   //下  
                TopY = content.offsetTop -10;  
            }  
            else{  //上  
                TopY = content.offsetTop +10;  
            }  
            var maxTop = content.offsetHeight-container.offsetHeight;  
            TopY = TopY > 0 ? 0 : TopY;  
            TopY = TopY < -maxTop ? -maxTop : TopY;  
            content.style.top =TopY+"px";
            scroll.style.top =scroll.offsetHeight*Math.abs(TopY)/scrollArea.offsetHeight+"px";

            if(ev.preventDefault){  
                ev.preventDefault();  
            }  
            else{  
                return false;  
            }  
        }  
}  
 