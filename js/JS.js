// 完美运动框架
function starMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;    //这一次运动就停止了——所有的属性到达指定目标
		for(var attr in json) {
		    //1、去当前值
			var iStyle = 0;
			if(attr == 'opacity') {
				iStyle = parseInt(parseFloat(getStyle(obj, attr))*100);  //避免使用小数出现的问题
			}else {
	            iStyle = parseInt(getStyle(obj, attr));
			}
            
            //2、算速度
			var iSpeed = (json[attr] - iStyle)/7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            
            // 3、检测停止
            if(iStyle != json[attr]) {
            	bStop = false;
            }
			if(attr == 'opacity') {
                obj.style.opacity = (iStyle  + iSpeed)/100;
                obj.style.filter = 'alpha(opacity: '+ (iStyle  + iSpeed) +')';
			}else {
				obj.style[attr] = iStyle  + iSpeed + 'px';
			}
				
		}
		//在属性到达指定目标后再清理定时器
		if(bStop) {
			clearInterval(obj.timer);
			fn && fn();
		}
	},50)
}

// 链式运动框架
function starMove2(obj, attr, target, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {//将定时器作为对象属性使用，避免多物体使用时占用，导致错误
		var iStyle = 0;
		if(attr == 'opacity') {
			iStyle = parseInt(parseFloat(getStyle(obj, attr))*100);  //避免使用小数出现的问题
		}else {
            iStyle = parseInt(getStyle(obj, attr));
		}
		

		var iSpeed = (target - iStyle)/7;

		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if(iStyle == target) {
			clearInterval(obj.timer);
			fn && fn();
		}else {
			if(attr == 'opacity') {
                obj.style.opacity = (iStyle  + iSpeed)/100;
                obj.style.filter = 'alpha(opacity: '+ (iStyle  + iSpeed) +')';
                document.getElementById('text').value = obj.style.opacity;
			}else {
				obj.style[attr] = iStyle  + iSpeed + 'px';
			}
			
		}
	},50)
}



// 运动函数
function doMove ( obj, attr, dir, target, endFn ) {
	
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		
		var speed = parseInt(getStyle( obj, attr )) + dir;
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target ) {
			clearInterval( obj.timer );
			endFn && endFn();
		}
		
	}, 30);
}

// 透明度运动函数
function opacity(obj, num, target, endFn) {
	
		num = getStyle(obj, 'opacity')*100 < target ? num : -num;
		
		clearInterval( obj.opacity );
		
		obj.opacity = setInterval(function () {
			
			var speed = parseInt(getStyle(obj, 'opacity')*100) + num;
			
			if ( speed > target && num > 0 || speed < target && num < 0 ) {
				speed = target;
			}
			
			obj.style.opacity = speed/100;
			obj.style.filter = 'alpha(opacity='+ speed +')';
			
			if ( speed == target ) {
				clearInterval( obj.opacity );
				endFn && endFn();
			}

		}, 20);
}

// 抖函数
function shake ( obj, attr, endFn ) {
	
	if ( obj.onOff ) { return; }
	
	obj.onOff = true;
	
	var pos = parseInt( getStyle(obj, attr) );			// 有隐患的
	
	var arr = [];
	var num = 0;
	var timer = null;
		
	for ( var i=20; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);
		
	clearInterval( obj.shake );
	obj.shake = setInterval(function (){
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if ( num === arr.length ) {
			clearInterval( obj.shake );
			endFn && endFn();
			obj.onOff = false;
		}
	}, 50);
}

// 获取元素属性函数
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }


//排序  针对数字
function compare(num1, num2) {

	if(num1 > num2) {

		return 1;

	}else if(num1 < num2) {

		return -1;

	}else {

		return 0;

	}
}

//排序 针对所有
function compareAll(value1, value2) {

	return parseInt(value1) - parseInt(value2);

}

//随机排序
function random(value1, value2) {

	return Math.random() - 0.5;

}

//随机数
function randomNum(x, y) {

	return Math.round(Math.random() * (y - x) + x);

}

//字符串倒序输出函数
function reverseStr(str) {

	return str.split('').reverse().join('');

}

// 数组去重复函数
function reMove(arr) {
	
	for(var i=0; i<arr.length; i++) {
 
    	for(var j=i+1; j<arr.length; j++) {

    		if(arr[i] == arr[j]) {

    			arr.splice(j, 1);

    			j--;
    		}
    	}
    }
}

//产生z个不重复的随机数
function reverseNumArr(x, y, z) {

	var arr = [];

	while(true) {

		var onOff = false;

		var random = parseInt(Math.random() * (y - x) + x);

		for(var i=0; i<arr.length; i++) {

			if(random === arr[i]) {

				onOff = true;

				break;
			}
		}
		if(!onOff) {

			arr.push(random);

		}
		if(arr.length === parseInt(z)) {

			break;
		}
	}

	return arr;
}

// 获取元素到页面绝对位置
function getPos( obj ) {

	var pos = {

		left: 0,

		top: 0
	}
	while(obj) {

		pos.left += obj.offsetLeft;

		pos.top += obj.offsetTop;

		obj = obj.offsetParent;
	}
	return pos;
}

//获取class
function getElementsByClassName(parentElement, target, className) {

	var aEles = parentElement.getElementsByTagName(target);

	var arr = [];

	for(var i=0, len=aEles.length; i<len; i++) {

		var aClassName = aEles[i].className.split(' ');

		for(var j=0; j<aClassName.length; j++) {

            if(aClassName[j] == className) {

            	arr.push(aEles[i]);

            	break;  //找到一次，立即跳出循环  防止双class导致错误

            }
		}
	}

	return arr;
}

// 添加class
function addClass(obj, className) {
            
    //如果原来没有class
    if(obj.className == '') {

    	obj.className = className;

    }else {
    	//如果原来有class
    	    
    	var arrClassName = obj.className.split(' ');

    	var _index = arrIndexOf(arrClassName, className);

    	if(_index == -1) {

    		//如果要添加的class在原来的class中不存在
    		obj.className += ' ' + className;
    	}
            //如果要添加的class在原来的class中存在
    }
    
    //检测是否已经存在相同字符串
    function arrIndexOf(arr, v) {

    	for(var i=0; i<arr.length; i++) {

    		if(arr[i] == v) {

    			return i;
    		}
    	}
    	return -1;
    }
}

//移除class
function removeClass(obj, className) {

	//如果原来有class
    if(obj.className != '') {

    	var arrClassName = obj.className.split(' ');

    	var index = arrIndexOf(arrClassName, className);

        alert(arrClassName);
        if(index != -1) {

        	//如果有我们要移除的class
        	alert(1);

        	arrClassName.splice(index, 1);

        	obj.className = arrClassName.join(' ');
        }
    }
	//如果原来没有class
	
	//检测是否已经存在相同字符串
    function arrIndexOf(arr, v) {

    	for(var i=0; i<arr.length; i++) {

    		if(arr[i] == v) {

    			return i;
    		}

    	}
    	return -1;
    }
}

//拖拽函数
 function drag(obj) {

	obj.onmousedown = function(event) {
     
        event = getEvent(event);

        var disX = event.clientX - this.offsetLeft;

        var disY = event.clientY - this.offsetTop;
        
        //设置全局捕获 解决IE下文字选中问题
        if(obj.setCapture) {

        	obj.setCapture();

        }

        document.onmousemove = function(event) {
    	    
    	    event = getEvent(event);

    	    obj.style.left = event.clientX - disX + 'px';

    	    obj.style.top = event.clientY - disY + 'px';
        }


        document.onmouseup = function() {
    	    document.onmousemove = document.onmouseup = null;
    	    //IE : 释放全局捕获 releaseCapture()
    	    if(obj.releaseCapture) {

    	    	obj.releaseCapture();
    	    }
        }
        return false;  //标准下：取消浏览器默认行为
    }
}

// 设置元素样式
function setStyle(obj, json) {
	var attr = '';
	for(attr in json) {
		obj.style[attr] = json[attr];
	}
}
