$(".lbtn").on('click',function(){
	var username=$("#lusername").val();
	var password=$("#lpassword").val();
	var params={
		"name":username,
		"password":password
	};
	//登陆
	$.ajax({
		url:basepath+"login",
		type:"post",
		data:params,
		success:function(data){
			if(data.code=="200"){
				location.href="success.html";
				sessionStorage.username=username;
			}else{
				spop('<strong>'+data.info+'</strong>', 'error');
			}
		},error:function(){
			console.log("请求失败");
		}
	});
});
//注册
$(".rbtn").on('click',function(){
	var username=$("#rusername").val();
	var password=$("#rpassword").val();
	var conpassword=$("#conpassword").val();
	if(password!=conpassword){
		spop('<strong>两次输入的密码不一致!</strong>', 'warning');
	}else{
		var params={
			"name":username,
			"password":password
		};
		//注册
		$.ajax({
			url:basepath+"signup",
			type:"post",
			data:params,
			success:function(data){
				if(data.code=="200"){
					spop('<h4 class="spop-title">Success</h4>'+data.info, 'success');
					setTimeout(function(){
						location.href="index.html";
					},2000);
					
				}else{
					spop('<strong>'+data.info+'</strong>', 'error');
				}
			},
			error:function(){
				console.log("请求失败");
			}
		});
	}
});