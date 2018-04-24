//清空所有选中元素
function clearCompleted(){
	$(".completed").remove();
}

$(function(){
	function childAffectParent(){
		//全选/全不选的情况---子变化影响父变化
		if($(".mycontent>div").hasClass("default")){
			$(".bb>img").prop("src","assets/img/cancelSelectAll.png");
		}else{
			$(".bb>img").prop("src","assets/img/selectAll.png");
		}  
	}

	//判断子元素是否有选中状态的
	function childHasSelected(){
		if($(".default").length<$(".mycontent>div").length){
			$(".clear-completed").show();
			return true;
		}else{
			$(".clear-completed").hide();
			return false;
		} 
	}
	$(".selected").parent().css({"border-radius":"5px","border":"1px solid pink"});
	if($(".mycontent").html()){
		$(".panel").show();
	}else{
		$(".panel").hide();
	}
	$(document).keydown(function(event){
		if(event.keyCode==13){
			var val=$("#search").val().replace(/^\s+|\s+$/g," ");//去除左右空格
			if(val!=""){
				$("#search").val("");
				var str='<div class="row default"><div class="col-md-1 aa"><img src="assets/img/beforeselect.png"/></div><div class="col-md-9" style="text-align:left;">'+val+'</div><div class="col-md-2"><i class="glyphicon glyphicon-remove"></i></div></div>';
				$(".mycontent").append(str);
				$(".panel").show();
				$(".panel-footer strong").html($(".row>.aa").length);

				//每次添加时调用--------------------原系统存在此项bug，还有就是当增加元素时item count无变化
				childAffectParent();
			}
		} 
	});
	$(".panel-footer strong").html($(".row>.aa").length);

	$(".mycontent").bind("click","i",function(event){
        var target = $(event.target);
        if(target.prop("nodeName")=="I"){
        	target.parent().parent().remove();
        	$(".panel-footer strong").html($(".row>.aa").length);
    	}
    });


	//选中筛选条件
    $(".filters").bind("click","a",function(event){
    	$(".selected").parent().css({"border-radius":"","border":""});
    	$(".selected").removeAttr("class");
        var target = $(event.target);
        if(target.prop("nodeName")=="A"){
        	target.prop("class","selected");
        	$(".selected").parent().css({"border-radius":"5px","border":"1px solid pink"});
        	if(target.html()==="Active"){
        		$(".completed").hide();
        		$(".default").show();
        		$(".panel-footer strong").html($(".default").length);
        		$(".clear-completed").hide();
        	}else if(target.html()==="Completed"){
        		$(".completed").show();
        		$(".default").hide();
        		$(".panel-footer strong").html($(".completed").length);

        		childHasSelected()
        	}else{
        		$(".completed").show();
        		$(".default").show();
        		$(".panel-footer strong").html($(".row>.aa").length);

        		childHasSelected()
        	}
    	}
    });
    //点击li时加上----对号
    $(".mycontent").bind("click","img",function(event){
        var target = $(event.target);
        if(target.prop("nodeName")=="IMG"){
        	//判断一个字符串中是否包含另一个字符串-indexOf()
        	if(target.prop("src").indexOf("assets/img/selected.png")>=0){
				target.prop("src","assets/img/beforeselect.png");
				if(!target.parent().parent().hasClass("default")){
        			target.parent().parent().addClass("default");
        		}
        	}else{
        		target.prop("src","assets/img/selected.png");
        		if(!target.parent().parent().hasClass("completed")){
        			target.parent().parent().addClass("completed");
        		}
        		if(target.parent().parent().hasClass("default")){
        			target.parent().parent().removeClass("default");
        		}
        	}

        	childAffectParent();

        	childHasSelected()
    	}
    });

    $(".bb img").on('click',function(){
    	if($(this).prop("src").indexOf("assets/img/cancelSelectAll.png")>=0){
    		$(this).prop("src","assets/img/selectAll.png");
    		$(".aa>img").prop("src","assets/img/selected.png");
    		//子标签都加上completed类
    		if($(".aa").parent().hasClass("default")){
    			$(".aa").parent().removeClass("default");
    		}
    		$(".aa").parent().addClass("completed");
    	}else{
    		$(this).prop("src","assets/img/cancelSelectAll.png");
    		$(".aa>img").prop("src","assets/img/beforeselect.png");
    		//子标签都加上default类
    		if($(".aa").parent().hasClass("completed")){
    			$(".aa").parent().removeClass("completed");
    		}
    		$(".aa").parent().addClass("default");
    	}
    	//判断是否有选中状态的元素
    	childHasSelected()
    });
});