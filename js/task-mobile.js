$(document).ready(function(){

         function GetQueryString(name)
                {
                     var reg= new RegExp("(^|&)"+name +"=([^&]*)(&|$)");
                     var r = window.location.search.substr(1).match(reg);
                     if(r!=null){
                         
                         return  unescape(r[2]);
                     }
                            return null;
                }
        var taskId = GetQueryString("taskId");

        $.get("http://mock.eoapi.cn/success/4DskdVvvS7rSemRCnPkaHwhiuweeVgSn",{data:taskId},function(res){
            if(res.status==="true"){
                var lng = res.data.latitude,
                    lat = res.data.longitude;

            var map = new BMap.Map("map"),    // 创建Map实
                point = new BMap.Point(116.486588,40.003082);   //替换lng 和lat
                marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);
            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            map.addControl(new BMap.ScaleControl());
            map.centerAndZoom(point, 17);  // 初始化地图,设置中心点坐标和地图级别
            var opts = {
                width : 120,     // 信息窗口宽度
                height: 30,     // 信息窗口高度
                title : "位置" , // 信息窗口标题
                enableAutoPan : true //自动平移
            },
            infoWindow = new BMap.InfoWindow('北京', opts);  // 创建信息窗口对象  //替换res。content
            }else if(res.status==="false"){
                $("#map").html(res.cause);
            }
        },"json")



        $.get("http://mock.eoapi.cn/success/4DskdVvvS7rSemRCnPkaHwhiuweeVgSn"/*,{data:taskId}*/,function(res){
            if(res.status==="true"){
                var lng = res.data.latitude,
                    lat = res.data.longitude;

            var map = new BMap.Map("map"),    // 创建Map实
                point = new BMap.Point(116.486588,40.003082);   //替换lng 和lat
                marker = new BMap.Marker(point);  // 创建标注
            map.addOverlay(marker);
            map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
            map.addControl(new BMap.ScaleControl());
            map.enableScrollWheelZoom(); //
            map.centerAndZoom(point, 17);  // 初始化地图,设置中心点坐标和地图级别
            var opts = {
                width : 120,     // 信息窗口宽度
                height: 30,     // 信息窗口高度
                title : "位置" , // 信息窗口标题
                enableAutoPan : true //自动平移
            },
            infoWindow = new BMap.InfoWindow('北京', opts);  // 创建信息窗口对象  //替换res。content
            }else if(res.status==="false"){
                $("#map").html(res.cause);
            }
        },"json")    
        
    }
)