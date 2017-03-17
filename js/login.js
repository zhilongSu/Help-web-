(function(){
    $(document).ready(function(){

        function isShow(target,status){
            if(!status){
                $(target).next(".warnning").css("display","block");
            }else{
                $(target).next(".warnning").css("display","none");
            }
        }
        function isHide(target){
            $(target).next(".warnning").css("display","none");
            $(".btn").removeAttr('disabled').removeClass('btn-off');
        }


        /*登陆验证账号*/
        $(".user-id").blur(function(event){

            var target = event.target,
            txt = $(target).val(),
            regexp = /^[0-9]{11}$/,
            status = regexp.test(txt);

            isShow(target,status);

        })
        .focus(function() {
            var target = event.target;
            isHide(target);
        });


        /*登陆验证密码*/
        $(".user-password").blur(function(event){

            var target = event.target,
                txt = $(target).val(),
                regexp = /^[0-9A-Za-z]{6,8}$/,
                status = regexp.test(txt);

            isShow(target,status);

        })
        .focus(function(event) {
            var target = event.target;
            isHide(target);
        });

        /*验证码框*/
        $(".i-code").blur(function(event){

            var target = event.target,
                txt = $(target).val(),
                regexp = /^[0-9A-Za-z]{4}$/i,
                status = regexp.test(txt);

                if(!status){
                    $(".code-warn").css("display","block");
                }

        }).
        focus(function(event){
           $(".code-warn").css("display","none");
            $(".btn").removeAttr('disabled').removeClass('btn-off');
        })
 /*       /*获取验证码图片*/
        function getImage(){ 
            var img = $(".i-image"),
                time = new Date().getTime();
                img_url = "../user/seccode?ddd="+time;

            /*$.get(img_url, function(data) {  */             
                   img.attr("src",img_url);
           /* },"json");*/
        }
        getImage();
        /*更换验证码图片*/
        $(".i-change").click(function(){
            getImage();
        }) 

        /*点击登录按钮*/
        $(".login-btn").click(function(event){
            var target = event.target;
            var num = $(".i-code").val(),
                id_value = $(".user-id").val(),
                pwd_value = $(".user-password").val(),
                sel_value = 0;

            if($("#user-remember").is(":checked")){
                sel_value = 1;
            }else{
                sel_value = 0;
            }
            var data ={    
                    seccode:num,              
                    phone:id_value,
                    password:pwd_value,
                    autoIndex:sel_value
                    };
            if($(".warnning").is(":visible")||$(".info-input").val().length===0){
                $(".btn").attr('disabled',"true").addClass('btn-off');
            }else{  
                    $.post('../user/index',data,function(res) {
                        if(res.status==false){
                            alert(res.cause);
                        }else if(res.status==true){
                            console.log("hsh");
                            window.location.href="index.html";
                        }
                    },"json");
            }
            return false;
        })
    })
})()