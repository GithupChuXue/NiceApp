//初始触发，从头刷新数据库
function refresh() {
	window.idx_num = 0;
	console.log("idx_num = 0");
}

//请求本地资源数据
function read_local(filepath) {
	var idx = "idx"+window.idx_num.toString();
	idx_num = idx_num+1;
	console.log(idx);
	if (window) { //网页
		let xhr = null
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest()
		} else {
			// eslint-disable-next-line
			xhr = new ActiveXObject('Microsoft.XMLHTTP')
		};
		//const okStatus = document.location.protocol === 'file' ? 0 : 200
		xhr.open('GET', filepath, false) //初始化请求(HTTP请求方法，请求的URL，是否为异步方式)
		//xhr.overrideMimeType('text/html;charset=utf-8') //覆写由服务器返回的MIME类型
		xhr.send(null) //发送请求(传递的信息)
		/*
		xhr.onload = function(){
			if(xhr.status == 200) {
				 var content = JSON.parse(xhr.responseText);//将获取的信息解析为json对象
			}
		}*/
		console.log(xhr.responseText);
		var content = JSON.parse(xhr.responseText);//将获取的信息解析为json对象
		if (content[idx]){
			console.log(content[idx]);
			return content[idx];
		}
		else{
			return null;
		};
		
	} 
	else if (wx) { //小程序
		wx.request({
			url: filepath,
			method: 'GET',
			success(res){
				console.log('request success',res);
			},
			fail(){  
				console.log('fail!')
			},
			complete(){   
				console.log('complete!')   
			}
		});
		console.log(res);
		var content = JSON.parse(res);//将获取的信息解析为json对象
		return content.content;
	};
};

export default {
	refresh,
	read_local
}