/*
* @Author: hc
* @Date:   2018-02-02 09:30:50
* @Last Modified by:   hc
* @description 首页业务代码封装
* @Last Modified time: 2018-02-02 14:39:39
*/



(function(window,$){

	window.My = window.My || {};

	My.mainPage = {

		/**
		 * @Author   hc
		 * @DateTime 2018-02-02
		 * @Describe 初始化入口
		 * @return   {[type]}   [description]
		 */
		init:function(){

			this.json = [
				{
					"faClass":"电商1",
					"sonClass":["111","111","111","111","111","111","111","111","111","111","111","111","111","111","111"]
				},
				{
					"faClass":"电商2",
					"sonClass":["222","222","222"]
				}
			],
			this.initEvent();
		},
		initEvent:function(){
			this.countFontNumber("mtitleMid",20,"mtitleSpan");
			this.countFontNumber("mintroMid",20,"mintroSpan");
			this.showWorksClass(this.json);
			this.spliceTag();
		},
		/**
		 * @Author   hc
		 * @DateTime 2018-02-02
		 * @Describe
		 * @param    {[type]}   nodeid     [传入需要计算的控件的ID名字]
		 * @param    {[type]}   total      [允许输入的字符个数]
		 * @param    {[type]}   spannodeid [显示当前字符数的节点标签ID]
		 * @return   {[type]}              [description]
		 */
		countFontNumber:function(nodeid,total,spannodeid){
			var inputNode=$("#"+nodeid);
			var spanNode=$("#"+spannodeid);
			inputNode.keyup(function(){
				spanNode.html(inputNode.val().length);
			})
		},
		/**
		 * @Author   hc
		 * @DateTime 2018-02-02
		 * @Describe 展示下拉列表
		 * @return   {[type]}   [description]
		 */
		showWorksClass:function(json1){
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
				My.HScroll.init('mtitleSelRight','mtitleSelRightUL','Con_Scorll','Do_Scorll');  
			})
			//分类选择 事件代理，右边边二级栏目
			mtitleSelRightUL.delegate("li","click",function(e){
				$(this).css("background-color","#f6f6f6");
				$(this).siblings("li").css("background-color","#fff");
				$("#mclassMid").val($(this).find("div").html());
				$("#mtitleSelect").hide();
			})
		},
		/**
		 * @Author   hc
		 * @DateTime 2018-02-02
		 * @Describe //输入框 字符串转标签  数组切割
		 * @param    {[type]}   nodeid [description]
		 * @return   {[type]}        [description]
		 */
		spliceTag:function(nodeid){
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
	}


	My.mainPage.init();

})(window,jQuery)