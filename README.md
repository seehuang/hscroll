# hscroll
一款基于原生的js自定义滚动条组件，并且兼容低版本浏览器。兼容IE8

考虑到低版本浏览器无法使用伪元素等方式来进行调整滚动条样式，所以需要用原生的js来开发一款兼容低版本浏览器的区域性组件。

另外还有一个jquery版本，命名为hscroll-jquery.js.

## 工作原理
  
  4个区域，固定高度的显示区，不固定高度的内容区，滚动条容器区，滚动条
 ![Image text](https://github.com/iiling/hscroll/blob/master/img/01.png)

## 使用方法
  实例化构造函数，并传入四个区域的id值
  > HScroll('sec01','sec02','sec03','sec04'); 
  ### jquery版本传参
  > HScroll('#sec01','#sec02','#sec03','#sec04'); 
  
## 最终效果
  ![Image text](https://github.com/iiling/hscroll/blob/master/img/02.gif)
