
    $(document).ready(function(){
        
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

        /*设置名字*/
        $("#register-name").blur(function(event){

            var target = event.target,
            txt = $(target).val(),
            status = (txt.length<11&&txt.length>0)?true:false;
            isShow(target,status);

        })
        .focus(function(event){
            var target = event.target;
            isHide(target);
        });

        /*设置密码*/
        $("#register-password").blur(function(event){

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

        /*输入身份证号码*/
        $("#register-id").blur(function(event){

            var target = event.target,
            txt = $(target).val(),
            regexp = /^[0-9A-Za-z]{2,50}$/,
            status = regexp.test(txt);
            isShow(target,status);
        })
        .focus(function(event){
            var target = event.target;
            isHide(target);
        });

/*        /*密保答案*/
 /*       $("#register-answer").blur(function(event){

            var target = event.target,
            txt = $(target).val(),
            status = (txt.length>0)?true:false;
            isShow(target,status);
        })
        .focus(function(event){
            var target = event.target;
            isHide(target);
        });*/

        /*验证码*/
        $("#register-code").blur(function(event){

            var target = event.target,
                txt = $(target).val(),
                regexp = /^[0-9A-Za-z]{0,100}$/i,
                status = regexp.test(txt);

                if(!status){
                    $(".code-warn").css("color","red");
                }
        }).
        focus(function(event){
                var target = event.target;
                $(".code-warn").css("color","gray");
                $(".btn").removeAttr('disabled').removeClass('btn-off');
            });

        /*注册按钮*/
        $(".register-btn").click(function(event){
            var target = event.target,
                seccode = $("#register-code").val(),
                phone = $("#register-phone").val(),
                password = $("#register-password").val(),
                secretAnswer = $("#register-answer").val(),
                userSecret = $("#register-question option:selected").val(),
                userId = $("#register-id").val(),
                name = $("#register-name").val(),

                data ={    
                    seccode:seccode,              
                    phone:phone,
                    password:password,
                    name:name,
                    identity:userId,
                    secretAnswer:secretAnswer,
                    userSecret:userSecret
                    };
            if($(".info-input").val().length===0){
                $(".register-btn").attr('disabled',"true").addClass('btn-off');
            }else{  
                    $.post('../user/register',data,function(res) {
                        if(res.status===false){
                            alert(res.cause);
                        }else if(res.status===true){
                            var choice = confirm("注册成功，前往登陆？");
                            if(choice){
                                window.location.href="login.html";
                            }
                        }
                    },"json");
            }
        })


        /*获取短信验证码*/
        $(".code-btn").click(function(event){

            var e = event.target,
                btn = $(".code-btn")[0],
                phone = $("#register-phone").val(),
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




    })
