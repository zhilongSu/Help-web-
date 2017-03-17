$(function(){

	//全局变量
	var userName,userPhone,userImage,userPassword;
	var userInfo = {
		name : userName,
		phone : userPhone,
		image : userImage,
		password : userPassword
	};

	//1.3找回密码（忘记密码）
	
	// function forgetPassword(){
	// 	var newPassword = $(this).val();
	// 	var phone;
	// 	// var secret;
	// 	// var secretAnswer;
	// 	var pw1 = {
	// 		newPassword : newPassword,
	// 		phone : phone
	// 		// secret : secret,
	// 		// secretAnswer : secretAnswer
	// 	};
	// 	$.post("../user/forgetPassword",pw1,function(data){
	// 		console.log("找回密码信息：");
	// 		console.log(data);
	// 		if(data.status==true){
	// 			alert("成功更改密码");
	// 		}else{
	// 			console.log("更改密码失败");
	// 			alert(data.cause);
	// 		}
	// 	},"json");
	// }

	//2.0获取头像
	// function getImage(){
	// 	$.get("../static/images/"+userInfo.phone+".png","json");
	// }

	//2.1修改头像
	//预览头像
	function showPhoto(file){
		var reader = new FileReader();
		reader.onload = function (e) {
			var dataURL = reader.result;
			var img = $('<div filename='+file.name+' class="file_img"><img src='+dataURL+' /><span><img src="../images/p_btn_delete.png" class="delete_upload"></span></div>');
			img.insertBefore($("#add")[0]);
		}
		reader.readAsDataURL(file);
	}	

	function changeImage(){
		var pho = this.files;
		if(file.length>0){
			showPhoto(pho);
		}
	}
	$(".change-cover").click(function(){
		var formdata = new FormData();
		formdata.append("userImage",pho);
		$.post("../user/changeImage",formData,function(data){
		// $.post("http://mock.eoapi.cn/success/Xt8WeKSpsCr5I3JaEbCn6we8lhq9W1a3",formData,function(data){
			console.log("上传头像信息：");	
			console.log(data);
			if(data.status==true){
				alert("头像上传成功！");
			}else{
				alert("头像上传失败！");
				console.log("头像上传失败原因："+data.cause);
			}
		},"json");
	});
	

	//2.2修改昵称
	$("#info-name").blur(function(){
		var name = $(this).val();
		$.post("../user/changeName",{name:name},function(data){
			console.log("修改昵称信息：");
			console.log(data);
			if(data.status==true){
				alert("修改昵称成功！");
			}else{
				alert("修改昵称失败！");
				console.log("修改昵称失败原因："+data.cause);
			}
		},"json");
	});

	//2.3修改密码
	$(".info-btn").click(function(){
		var oldPw = $("#old-password").val();
		var newPw = $("#new-password").val();
		var pw = {
			oldPassword : oldPw,
			newPassword : newPw
		};
		$.post("../user/changePassword",pw,function(data){
			console.log("修改密码失败的原因：");
			console.log(data);
			if(data.status==true){
				alert("修改密码成功！");
			}else{
				alert(data.cause);
			}
		},"json");
	});

	//2.4修改手机号
	$(".code-btn").click(function(){
		var newPhone = $("#new-phone").val();
		$.post("../user/sendSeccode",newPhone,function(data){
			// console.log("发送手机验证码：");
			// console.log(data);
		},"json");
	});
	function changePhone(){
		// var password = $().val();
		var oldPhone = $("#old-phone").val();
		var newPhone = $("#new-phone").val();
		var code = $("#info-code").val();
		var obj = {
			pw : password,
			oldPhone : oldPhone,
			newPhone : newPhone,
			code : code
		};
		$.post("../user/changePhone",obj,function(data){
			console.log("修改手机号信息：");
			console.log(data);
			if(data.status==true){
				alert("修改手机号成功！");
			}else{
				alert(data.cause);
			}
		},"json");
	};

	//2.5设置亲友列表
	function relativeNote(phone,name){
		this.phone = phone;
		this.name = name;
	}
	var relatList = new Array(11);
	// for(var i=1;i<=10;i+1){
	// 	relatList.push(new relativeNote("",""));
	// }
	//查看亲友列表
	function viewRelatives(){
		$.get("../user/relatives",function(obj){
			console.log("查看亲友列表：");
			console.log(obj);
			if(obj.status==true){
				for(var i=1;i<=10;i++){
					var name = "name"+i;
					var phone = "relatives"+i;
					relatList.push(new relativeNote(obj.data.phone,obj.data.name));
				}
			userInfo.phone = obj.data.userPhone;
			}else{
				alert(obj.cause);
				console.log("查看亲友列表失败！");
			}
			
		},"json");
	}
	$(".info-friend").click(viewRelatives());
	//更改亲友列表
	function changeRelatives(){
		$.post("../user/changeRelatives",{relatives:relatList},function(data){
			console.log("更改亲友列表信息：");
			console.log(data);
			if(data.status==true){
				alert("更改亲友列表成功！");
				//跳转至查看亲友列表页面
				viewRelatives();
			}else{
				alert(data.cause);
			}
		},"json");
	}

	//2.6积分充值兑换
	//默认积分为120？？？
	// var source = 120;
	// //A.查看积分
	// function sourceAccount(){
	// 	$.get("../user/sourceAccount",function(obj){
	// 		console.log("查看积分信息：");
	// 		console.log(obj);
	// 		if(obj.status==true){
	// 			source = obj.data.source;
	// 		}else{
	// 			alert(obj.cause);
	// 		}
	// 	},"json");
	// }
	// $(".info-money").click(sourceAccount());

	// //B.充值积分
	// function sourceAdd(add){
	// 	// var add = $().val();
	// 	$.post("../user/sourceAdd",{source:add},function(data){
	// 		console.log("充值积分信息：");
	// 		console.log(data);
	// 		if(data.status==true){
	// 			alert("充值积分成功！");
	// 			sourceAccount();
	// 		}else{
	// 			alert(data.cause);
	// 		}
	// 	},"json");
	// }
	// $(".register-btn").click(sourceAdd($("#money-number").val()));
    //
	// //C.积分提现
	// function sourceReduce(cash){
	// 	// var cash = $().val();
	// 	$.post("../user/sourceReduce",{source:cash},function(data){
	// 		console.log("积分提现：");
	// 		console.log(data);
	// 		if(data.status==true){
	// 			alert("恭喜你已提现"+cash+"元！");
	// 			sourceAccount();
	// 		}else{
	// 			alert(data.cause);
	// 		}
	// 	},"json");
	// }
	// $(".register-btn").click(sourceReduce($("#money-get").val()));

	//2.7更改是否接受短信的权限
	var flag;
	function changeFlag(flag){
		$.post("../user/changeFlag",{flag:flag},function(data){
			console.log("接收短信权限信息：");
			console.log(data);
			if(data.status==true){
				alert("成功更改接受短信的权限");
			}else{
				console.log("更改接受短信权限失败"+data.cause);
				alert("更改失败");
			}
		},"json")
	}




})