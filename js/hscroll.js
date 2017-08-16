//竖向的滚动条，四个参数，可视区域ID，内容区域Id，滚动条区域，滚动条，  
function HScroll(id1,id2,id3,id4){  
    var $container = $(id1),//可视区域  
        $content   = $(id2),//内容区域  
        $scrollArea = $(id3),//滚动条活动区域  
        $sroll     = $(id4),//滚动条  
          startY   = 0,//开始位置    
          lastY    = 0,//结束位置  
            YN     = false,  
              bBtn = true;//判断滚动条上滚还是下滚  
        
        var srollHeight=$container.height()*$scrollArea.height()/$content.outerHeight();
        var scrollFill=srollHeight>=$scrollArea.height()?true:false;

        $content.css({'top':'0px'});
        $sroll.css({'top':'0px'});
        $sroll.show();

        if(scrollFill==true){
             $sroll.hide();
        }

        $sroll.css({'height':$container.height()*$scrollArea.height()/$content.outerHeight()+'px'});  
        
        $sroll.mousedown(function(e){  
            startY = e.clientY - this.offsetTop;    
            this.setCapture && this.setCapture();//避免IE下拖拽过快鼠标失去对象  
            YN = true;  
            return false;  
        });  

        $sroll.mousemove(function(e){  
            var maxVal = $scrollArea.height() - $(this).height();  
            if(YN){  
                lastY = e.clientY - startY;  
                lastY = lastY < 0 ? 0 :lastY;  
                lastY = lastY > maxVal ? maxVal : lastY;  
                $(this).css({'top':lastY+'px'});  
                $content.css({'top':-$scrollArea.height()*lastY/$(this).height()+'px'});  
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 防止拖动文本    
                e.stopPropagation();   
            }  
            return false;  
        });  

        $sroll.mouseup(function(e){  
            YN = false;  
            NumY = lastY;  
            return false;  
        });  
        //为内容区域添加滑轮滚动事件  
        if($content[0].addEventListener){  
            $content[0].addEventListener('DOMmouseScrolloll',mouseScroll,false);  
            $scrollArea[0].addEventListener('DOMmouseScrolloll',mouseScroll,false);  
        }  

        $content[0].onmousewheel = mouseScroll;  
        $scrollArea[0].onmousewheel = mouseScroll;  

        function mouseScroll(ev){  
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
                TopY = $content.position().top-10;  
            }  
            else{  //上  
                TopY = $content.position().top+10;  
            }  
            var maxTop = $content.outerHeight()-$container.outerHeight();  
            TopY = TopY > 0 ? 0 : TopY;  
            TopY = TopY < -maxTop ? -maxTop : TopY;  

            $content.css({'top':TopY+'px'});  
            $sroll.css({'top':$sroll.height()*Math.abs(TopY)/$scrollArea.height()+'px'});  

            if(ev.preventDefault){  
                ev.preventDefault();  
            }  
            else{  
                return false;  
            }  
        }  
}  
HScroll('#mtitleSelRight','#mtitleSelRightUL','#Con_Scorll','#Do_Scorll');  
 