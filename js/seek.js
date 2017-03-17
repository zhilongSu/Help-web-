$(document).ready(function(){
    
    /*验证手机号码*/
    function isShow(target,status){
        if(!status){
            $(target).next(".warnning").css("color","red");
        }else{
            $(target).next(".warnning").css("color","gray");
        }
    }
    function isHide(target){
        $(target).next(".warnning").css("color","gray");
        $(".btn").removeAttr('disabled').removeClass('btn-off');
    }

    /*登陆验证手机号*/
    $("#register-phone").blur(function(event){

        var target = event.target,
        txt = $(target).val(),
        regexp = /^[0-9]{11}$/i,
        status = regexp.test(txt);

        isShow(target,status);

    })
    .focus(function(event){
        var target = event.target;
        isHide(target);
    });

    //手机验证码
    $(".code-btn").click(function(){
        var phone = $("#register-phone").val();
        $.post("../user/sendSeccode",{phone:phone},function(data){
            // console.log("发送手机验证码：");
            // console.log(data);
        },"json");
    });
    /*密保答案*/
/*    $("#seek-answer").blur(function(event){

        var target = event.target,
        txt = $(target).val(),
        status = (txt.length>0)?true:false;
        isShow(target,status);
    })
    .focus(function(event){
        var target = event.target;
        isHide(target);
    });
*/
    /*设置密码*/
    $("#seek-password").blur(function(event){

        var target = event.target,
        txt = $(target).val(),
        regexp = /^[0-9A-Za-z]{6,16}$/,
        status = regexp.test(txt);

        isShow(target,status);

    })
    .focus(function(event){
        var target = event.target;
        isHide(target);
    });


    $(".seek-btn").click(function(event) {
        var password = $("#seek-password").val(),
            phone = $("#register-phone").val(),
            code = $("#register-code").val();
            var data = {
                newPassword:password,
                phone:phone,
                code :code
            };
            if($(".info-input").val().length===0){
                $(".seek-btn").attr('disabled',"true").addClass('btn-off');
            }else{
                $.post("../user/forgetPassword",data,function(res){
                    if(res.status===false){
                        alert("修改失败，请重试");
                    }else if(res.status===true){
                        var choice = confirm("修改成功，前往登陆？");
                        if(choice){
                            window.location.href="login.html";
                        }
                    }
                })
            }

    });
});