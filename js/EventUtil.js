//视情况分别使用DOM0级、DOM2级或IE方法来添加事件

//添加事件处理程序
function addHandler(element, type, handler) {

	if(element.addEventListener) {
        //DOM2级
		element.addEventListener(type, handler, false);

	}else if(element.addachEvent) {
        //IE
		element.addachEvent('on' + type, handler);

	}else {
        //DOM1级
		element['on' + type] = handler;
	}
}

//得到事件对象 返回对event对象的引用
function getEvent(event) {

	return event ? event : window.event; //标准 ：IE

}

//得到事件的实际目标
function getTarget(event) {
    
    return event.target || event.srcElement;

}

//取消事件默认行为
function preventDefault(event) {

	if(event.preventDefault) {

		event.preventDefault();        //标准

	}else {

		event.returnValue = false;     //IE

	}
}

//移除事件处理程序
function removeHandler(element, type, handler) {

	if(element.removeEventListener) {
        //DOM2级
		element.removeEventListener(type, handler, false);

	}else if(element.detachEvent) {
        //IE
		element.detachEvent('on' + type, handler);

	}else {
        //DOM1级
		element['on' + type] = null;
	}
}

//阻止事件流 捕捉或冒泡（跨浏览器下只能用来阻止事件冒泡 -> IE不支持事件捕捉）
function stopPropagation(event) {

	if(event.stopPropagation) {

		event.stopPropagation();   //标准

	}else {

		event.cancelBubble = true; //IE
	}
}





//视情况分别使用DOM0级、DOM2级或IE方法来添加事件

// var EventUtil = {
//     //添加事件处理程序
// 	addHandler: function(element, type, handler) {

// 		if(element.addEventListener) {
//             //DOM2级
// 			element.addEventListener(type, handler, false);

// 		}else if(element.addachEvent) {
//             //IE
// 			element.addachEvent('on' + type, handler);

// 		}else {
//             //DOM1级
// 			element['on' + type] = handler;
// 		}
// 	}，

// 	//得到事件对象 返回对event对象的引用
// 	getEvent: function(event) {

// 		return event ? event : window.event; //标准 ：IE

// 	},
//     //（考虑IE）在使用该方法时，必须假设有一个事件对象传入到事件程序中，而且要把变量传递给这个方法
//     // 例：btn.onclick = function(event) {
//     // 	       event = EventUtil.getEvent(event);
//     //     }


// 	//得到事件的实际目标
// 	getTarget: function(event) {
        
//         return event.target || event.srcElement;

// 	},
// 	// 例：btn.onclick = function(event) {
//     // 	      var target = EventUtil.getTarget(event);
//     //    }
  

// 	//取消事件默认行为
// 	preventDefault: function(event) {

// 		if(event.preventDefault) {

// 			event.preventDefault();        //标准

// 		}else {

// 			event.returnValue = false;     //IE

// 		}
// 	},
// 	// 例：var link = document.getElementById('mylink');
// 	//     link.onclick = function(event) {
//     // 	       event = EventUtil.getEvent(event);
//     // 	       EventUtil.preventDefault(event);
//     //     }
    


// 	//移除事件处理程序
// 	removeHandler: function(element, type, handler) {

// 		if(element.removeEventListener) {
//             //DOM2级
// 			element.removeEventListener(type, handler, false);

// 		}else if(element.detachEvent) {
//             //IE
// 			element.detachEvent('on' + type, handler);

// 		}else {
//             //DOM1级
// 			element['on' + type] = null;
// 		}
// 	},

// 	//阻止事件流 捕捉或冒泡（跨浏览器下只能用来阻止事件冒泡 -> IE不支持事件捕捉）
//     stopPropagation: function(event) {

//     	if(event.stopPropagation) {

//     		event.stopPropagation();   //标准

//     	}else {

//     		event.cancelBubble = true; //IE
//     	}
//     }
//     // 例：var oBtn = document.getElementById('btn');
// 	//     oBtn.onclick = function(event) {
//     // 	       event = EventUtil.getEvent(event);
//     // 	       EventUtil.stopPropagation(event);
//     //     };
//     //     document.body.onclick = function() {          //不会执行
//     //         alert('hi');
//     //     };
	
// }