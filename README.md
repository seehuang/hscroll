# hscroll
<pre>
一款基于原生的js自定义滚动条组件，并且兼容低版本浏览器。兼容IE8

考虑到低版本浏览器无法使用伪元素等方式来进行调整滚动条样式，所以需要用原生的js来开发一款兼容低版本浏览器的区域性组件。

另外还有一个jquery版本，命名为hscroll-jquery.js.
</pre>

## 工作原理
  
  4个区域，固定高度的显示区，不固定高度的内容区，滚动条容器区，滚动条
 ![Image text](https://user-images.githubusercontent.com/16111288/36186691-a357d4fa-117b-11e8-93a8-4865e419f60c.png)

## 使用方法
<pre>
  实例化构造函数，并传入四个区域的id值
  HScroll('sec01','sec02','sec03','sec04'); 
  query版本传参
  HScroll('#sec01','#sec02','#sec03','#sec04'); 
 </pre>
  
## 最终效果
  ![Image text](https://user-images.githubusercontent.com/16111288/36186689-a06e7b72-117b-11e8-8f22-c332500d4add.gif)
