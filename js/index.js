(function($){
	
	countFontNumber("mtitleMid",20,"mtitleSpan");
	countFontNumber("mintroMid",20,"mintroSpan");
	//input标签计算字符输入个数
	//参数说明：
	// 1.传入需要计算的控件的ID名字
	// 2.允许输入的字符个数
	// 3.显示当前字符数的节点标签ID
	function countFontNumber(nodeid,total,spannodeid){
		var inputNode=$("#"+nodeid);
		var spanNode=$("#"+spannodeid);
		inputNode.keyup(function(){
			spanNode.html(inputNode.val().length);
		})
	}

	//作品分类json数据mock
	var json=[
		{
			"faClass":"电商1",
			"sonClass":["111","111","111","111","111","111","111","111","111","111","111","111","111","111","111"]
		},
		{
			"faClass":"电商2",
			"sonClass":["222","222","222"]
		}
	]


	//作品分类  下拉面板  处理
	showWorksClass(json);
	function showWorksClass(json1){
		var mtitleSelect=$("#mtitleSelect");
		var mtitleSelLeftUL=$("#mtitleSelLeftUL");//下拉面板左边部分
		var mtitleSelRightUL=$("#mtitleSelRightUL");
		mtitleSelLeftUL.empty();
		var htmlLeft="";
		for(var i=0;i<json1.length;i++){
			htmlLeft+="<li><div>"+json1[i].faClass+"</div><span></span></li>";
		}
		//选择变色
		mtitleSelLeftUL.append(htmlLeft);
		$("#mclassMid").click(function(){
			mtitleSelect.toggle();
		})
		//分类选择 事件代理，左边一级栏目
		mtitleSelLeftUL.delegate("li","click",function(e){
			mtitleSelRightUL.empty();
			$(this).css("background-color","#f6f6f6");
			$(this).siblings("li").css("background-color","#fff");
			var thisIndex=$(this).index();
			var sonClass=json1[thisIndex].sonClass;
			var htmlRight="";
			for(var j=0;j<sonClass.length;j++){
				htmlRight+="<li><div>"+sonClass[j]+"</div></li>";
			}
			mtitleSelRightUL.append(htmlRight);
			//每次点击刷新滚动条组件
			//HScroll('#mtitleSelRight','#mtitleSelRightUL','#Con_Scorll','#Do_Scorll');  
			HScroll('mtitleSelRight','mtitleSelRightUL','Con_Scorll','Do_Scorll');  
		})
		//分类选择 事件代理，右边边二级栏目
		mtitleSelRightUL.delegate("li","click",function(e){
			$(this).css("background-color","#f6f6f6");
			$(this).siblings("li").css("background-color","#fff");
			$("#mclassMid").val($(this).find("div").html());
			$("#mtitleSelect").hide();
		})
	}

	//输入框 字符串转标签
	spliceTag("mtagMid")
	function spliceTag(nodeid){
		var inputNode=$("#"+nodeid);
		var mtagUL=$("#mtagUL");
		var tagArr=[];
		inputNode.blur(function(){
			mtagUL.show();
			tagArr=$(this).val().split(" ");
			inputNode.val("");
			var html=""
			mtagUL.empty();
			if(tagArr[0]==""&&tagArr.length==1){
				return
			}
			for(var i=0;i<tagArr.length;i++){
				html+="<li><div>"+tagArr[i].slice(0,4)+"</div><span>×</span></li>";
			}
			mtagUL.append(html);
		})
		inputNode.focus(function(){
			inputNode.val(tagArr.join(" "));
			mtagUL.hide();
		})
		mtagUL.delegate("span","click",function(){
			tagArr.splice($(this).parent("li").index(),1);
			$(this).parent("li").remove();
		})
	}

})(jQuery)