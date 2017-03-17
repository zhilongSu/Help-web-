$(document).ready(function(){

    //click-box的切换
    $(".click-box li").click(function(){
        
        $(this).addClass("currunt").siblings().removeClass('currunt');

        var result = $(this).hasClass("left");
        if(result){
            $("#help-box").show();
            $("#info-box").hide();
        }else 
        {
            $("#help-box").hide();
            $("#info-box").show();
        }

    });

    //help-box的allchoice的切换
    $(".allchoice li.choice").click(function() {
        $(this).addClass("currunt").siblings().removeClass('currunt');
        var index = $(this).index();
        $(".content .a-bank:eq("+index+")").show().siblings().hide();
    });
    //imfo-box的allchoice的切换
    $(".allchoice li.choice").click(function() {
        $(this).addClass("currunt").siblings().removeClass('currunt');
        var index = $(this).index();
        $("#info-box div.a-bank:eq("+index+")").show().siblings().hide();
    });


//全局变量
    var userName,userPhone;
    $.get("../user/information",function(res){
        if(res.status==true){

            userPhone = res.data.userPhone;
            $("#new-name").val(res.data.name);
            $("#old-phone").val(userPhone);
            $(".head-photo").attr("src","../static/images/"+userPhone+".png");
            $(".web-name").html(res.data.name);
            $("#change-photo").attr("src","../static/images/"+userPhone+".png");
        }
    },'json');



    var longitude,latitude;
    /*****************************求助模块************************************/

    //定位功能
    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition,showError);
        }else{
            $("#map").html("该浏览器不支持地理功能...");
        }
    }

    function showPosition(position){
        //经度
        longitude =position.coords.longitude;
        //纬度
        latitude = position.coords.latitude;

        var map = new BMap.Map("map"),    // 创建Map实
            point = new BMap.Point(longitude,latitude);   
            marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.addControl(new BMap.ScaleControl());
        map.enableScrollWheelZoom(); //
        map.centerAndZoom(point, 17);
    }

    function showError(error){ 
        switch(error.code) { 
        case error.PERMISSION_DENIED: 
        alert("定位失败,用户拒绝请求地理定位"); 
        break; 
        case error.POSITION_UNAVAILABLE: 
        alert("定位失败,位置信息是不可用"); 
        break; 
        case error.TIMEOUT: 
        alert("定位失败,请求获取用户位置超时"); 
        break; 
        case error.UNKNOWN_ERROR: 
        alert("定位失败,定位系统失效"); 
        break; 
        } 
    } 

    getLocation();

    $(".help-btn").click(function(event){
        $.post("../help/sendHelp",{longitude:longitude,latitude:latitude},function(res){
            if(res.status===false){
                alert(res.cause);
            }else if(res,status==true){
                alert("您已成功向亲友，附近人，及警方求助!");
                $(this).attr("disabled")
            }
        },"json")
    });
    

    /*****************************个人纪录*******************************************/

        function showTask(which,obj){
        var html ="<li class='task' taskid='"+obj.taskId+"'><i class='bor'></i>"+
                            "<span class='task-time task-b'>"+obj.time+"</span>"+
                        "<span class='task-address task-b'>"+obj.content+'</span>'+
                    "<span class='task-people task-b'>"+obj.number/obj.need+"</span>"+
                            "<span class='task-money task-b'> 40</span>"+
                    "<input type='button' class='task-delete' value='删除记录' />"+
                        "</li>";

            $(which+" ul").append(html);
        }

        $(".my").click(function() {

            $.post("../help/myHelp",function(res){
                if(res.status==true){
                    $(".help-my li.task").remove();
                    var i,len=res.data.length;
                    for(i=0;i<len;i++){
                        showTask(".help-my",res.data[i]);
                    }
                }else if(res.status==false){
                    $(".help-my ul").append("您还没有过求助纪录...");
                }
            },'json');
        });

        $(".others").click(function() {
            $.post("../help/myTask",function(res){
                if(res.status==true){
                    $(".help-others li.task").remove();
                    var i,len=res.data.length;
                    for(i=0;i<len;i++){
                        showTask(".help-others",res.data[i]);
                    }
                }else if(res.status==false){
                    $(".help-my ul").append("您还没有帮助过人...");
                }
            },'json');
        });

        $(".task-list ul").on("click","input",function(event){
            var target = event.target;
            var li = target.parentNode;
            var ul = li.parentNode;
                taskId = li.getAttribute("taskid");
            $.post("../help/deleteTask",{taskId:taskId},function(res){
                if(res.status==true){
                    ul.removeChild(li);
                }else if(res.status==false){
                    alert("删除失败,请重试!");
                }
            },'json');
        })

     /******************************积分模块************************************/
    //2.6积分充值兑换
    var point;
    //A.查看积分
    function sourceAccount(){
        $.get("../user/sourceAccount",function(res){
            if(res.status==true){
                point = res.data;
                $(".left-money").html(point);
            }else{
                alert(res.cause);
            }
        },"json");
    }
    $(".info-money").click(function(){
        sourceAccount();
    });

    //B.充值积分
    function sourceAdd(){
        var add = $("#money-number").val();
        $.post("../user/sourceAdd",{source:add},function(data){
            if(data.status==true){
                sourceAccount();
                alert("充值积分成功！");
                $("#money-number").val('');
            }else{
                alert(data.cause);
            }
        },"json");

    }

    $(".charge-btn").click(function(){
        sourceAdd();
    });

    //C.积分提现
    function sourceReduce(cash){
        // var cash = $().val();
        if(cash>point){
            alert("提现金额超过余额");
        }else {
            $.post("../user/sourceReduce", {source: cash}, function (data) {
                if (data.status == true) {
                    alert("提现成功！");
                    sourceAccount();
                } else {
                    alert(data.cause);
                }
            }, "json");
        }
    }
    $(".withdraw-btn").click(function(){
        var cash = $("#money-get").val();
        sourceReduce(cash);
        $("#money-get").val('');
    });
    /**********************************修改资料*************************/

        //头像模块
        //预览头像
    var fileInput = document.getElementById("change-file1");
    fileInput.onchange=function () {
        var file = this.files;
        if(!file[0].type.match(/image.*/)){
            alert("不支持此类型文件！");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function (e) {
            var data = e.target.result;
            $("#change-photo").attr("src",data);
        }
        return true;
    };
    //提交头像
    $(".change-submit").click(function(){
        $.ajax({
            url: '../user/changeImage',
            type: 'POST',
            cache: false,
            data: new FormData($('#photoPost')[0]),
            processData: false,
            contentType: false,
            success: function(res){
                alert("头像上传成功!");
            },
            error: function(res){
                alert("上传失败，请刷新重试!");
            }
        });
    });

    //修改手机
    /*获取短信验证码*/
    $(".code-btn").click(function(event){

        var e = event.target,
            btn = $(".code-btn")[0],
            phone = $("#new-phone").val(),
            count = 60;
        btn.value = count+"s";
        $(e).attr("disabled","true");

        time = setInterval(function(){
            count = count-1;
            btn.value = count+"s";
        }, 1000);

        setTimeout(function(){
            clearInterval(time);
            btn.value = "点击获取";
            $(e).removeAttr("disabled");
        },60000);

        $.post("../user/sendSeccode",{phone:phone},function(res){

            if(res.status==="false"){
                alert("获取失败，请重试");
            }
        })
    })

    //修改手机号
    function changePhone(){
        // var password = $().val();
        var oldPhone = $("#old-phone").val();
        var newPhone = $("#new-phone").val();
        var password = $("#code-password").val();
        var seccode = $("#info-code").val();
        var obj = {
            oldPhone : oldPhone,
            newPhone : newPhone,
            seccode : seccode,
            password:password
        };
        $.post("../user/changePhone",obj,function(data){
            console.log("修改手机号信息：");
            console.log(data);
            if(data.status==true){
                alert("修改手机号成功！");
                $("#old-phone").val('');
                $("#new-phone").val('');
                $("#code-password").val('');
                $("#info-code").val('');
            }else{
                alert(data.cause);
            }
        },"json");
    };

    $(".phone-btn").click(function(){
        changePhone();
    });

    //修改昵称
    $(".name-btn").click(function(){
        var name = $("#new-name").val();
        $.post("../user/changeName",{name:name},function(data){
            console.log("修改昵称信息：");
            console.log(data);
            if(data.status==true){
                alert("修改昵称成功！");
                $("#new-name").val('');
            }else{
                alert("修改昵称失败！");
                console.log("修改昵称失败原因："+data.cause);
            }
        },"json");
    });

    //修改密码
    $(".password-btn").click(function(){
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
                $("#old-password").val('');
                $("#new-password").val('');
            }else{
                alert(data.cause);
            }
        },"json");
    });




});