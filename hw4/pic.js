var programmers=[ 
  {"s_pic":"images/photo_A.jpg",
  "name":"薛玉娥",
  "add":"合肥",
  "age":"51岁",
  "b_pic":"images/photob1.jpg",
  "name1":"薛玉娥 女",
  "add1":"合肥","age1":"51岁",
  "year":"服用绿A年限：8年"},】
  var html='';
    for(var i=0,len=programmers.length; i<len; i++){
        html+='<li>\
  <div class="thumb"><a href="javascript:;"><img class="s_pic" src="'+programmers[i].s_pic+'" alt="" /></a></div>\
<div class="info">\
<p class="name">'+programmers[i].name+'</p>\
                            <p class="add">'+programmers[i].add+'</p>\
                            <p class="age">'+programmers[i].age+'</p>\
</div>\
<div class="layer_float">\
                            <div class="float_box">\
                                <div class="float_up">\
                                    <div class="f_img"><img id="head_img" class="b_pic" src="'+programmers[i].b_pic+'" /></div>\
                                    <div class="f_info">\
                                        <p class="info_b name1">'+programmers[i].name1+'</p>\
                                        <p class="add1">'+programmers[i].add1+'</p>\
                                        <p class="age1">'+programmers[i].age1+'</p>\
                                        <p class="year">'+programmers[i].year+'</p>\
                                    </div>\
                                </div>\
                                <div class="float_down">\
                                    <div class="scrollbar">\
                                        <div class="content">\
                                            <div class="viewport">\
                                                <div class="overview">\
                                                    <p class="user_t">'+programmers[i].user_t+'</p>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
</div>\
</li>'
    }
// var innerHtml= '
$('#l_pic_show').html(html);