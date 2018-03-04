// 设置一个cookie
function setCookie(key, value, t) {

    var oDate = new Date();

    oDate.setDate(oDate.getDate() + t);

    document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();
}

//取得某一个cookie数据的函数
function getCookie(key) {

	var arr1 = document.cookie.split(';');

	for(var i=0; i<arr1.length; i++) {

		var arr2 = arr1[i].split('=');

		if(arr2[0] == key) {

			return decodeURI(arr2[1]);
		}

			
	}
}

//删除一个cookie
function removeCookie(key) {

	setCookie(key, '', -1);
	
}