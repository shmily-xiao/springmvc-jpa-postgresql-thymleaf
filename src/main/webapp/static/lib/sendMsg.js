/**
 * Created by L on 15/4/21.
 */
;(function($){
    var interval_flag;
    var sessionArray=[];
    function quickSendMsgRender(option){
        var defaultOption = {
            array : [],
            buttonFunction : function(){}
        };
        var o = $.extend(true, defaultOption, option);
        var html = '<div class="send_message"><div class="send_message_header"><span>快速发送消息</span><a href="#">关闭</a></div><form style="margin: 0"><div class="send_message_content"></div><div class="send_message_footer"><button type="button">发&nbsp;&nbsp;&nbsp;&nbsp;送</button></div></form></div>';
        $(html).appendTo('body');
        $('.cover').show();
        $('body',top.document).append('<div class="maincover"></div>');
        $('.maincover',top.document).show();
        var w = $('.firstNav',top.document).outerWidth()+$('.wrap',top.document).outerWidth();
        $('.maincover',top.document).css({
            top: 0,
            bottom : 0,
            left: 0,
            right: $(window).outerWidth()
        });
        $('.send_message').css({
            left: ($(window).width()+ w - $('.send_message').outerWidth())/2 - w,
            top: ($(window).height()-$('.send_message').outerHeight())/2
        });
        var content = '';
        $.each(o.array, function(index, val) {
            content+='<div class="title"><span>'+val.title+'</span><a href="#">全选</a></div>';
            var group = '<div class="group">';
            $.each(val.custom, function(i, v) {
                if(v.mobile == ''){
                    group+='<div class="item"><div class="check"><input type="checkbox" disabled="disabled"></div><div class="name">'+v.name+'</div><div class="mobile">'+v.mobile+'</div></div>';
                }else{
                    group+='<div class="item"><div class="check"><input type="checkbox"></div><div class="name">'+v.name+'</div><div class="mobile">'+v.mobile+'</div></div>';
                }
            });
            group += '</div>';
            content+=group;
        });
        $(content).appendTo('.send_message_content');
        $.each(o.array, function(index, val) {
            $.each(val.custom, function(i, v) {
                $('.group').eq(index).find('input[type=checkbox]').eq(i).data('data', v);
            });
        });
        $('.send_message_content .title a').click(function(event) {
            event.preventDefault();
            $(this).parents('.title').next('.group').find('input[type=checkbox]').each(function(index, el) {
                if(!$(this).is(':checked')){
                    $(this).trigger('click');
                }
            });
        });
        $('.send_message_content').niceScroll({cursorborder:'',cursorcolor:'#000',cursoropacitymax:'0.5'});
        checkbox();
        $('.send_message_header a').click(function(event) {
            quickSendMsgHide();
        });
        $('.send_message_footer button').click(function(event){
            event.preventDefault();
            o.buttonFunction();
        })
    }
    function sendMsgRender(option){
        var defaultOption = {
            object:{},
            send:function(){

            },
            interval:function(){

            }
        };
        var o = $.extend(true,defaultOption,option);
        myInterval(o.interval);
        var session = '<div class="session_startup"><div class="session_title"><span>'+ o.object.name+'</span><a href="#">关&nbsp;&nbsp;&nbsp;&nbsp;闭</a></div>'+
            '<div class="left"><div class="session_content"><ul></ul></div><div class="session_msg"><div class="show"></div><div class="hidden"></div></div><div class="session_send"><span><span style="float:left;">选择模板：</span><select name="" id=""></select></span><button>发&nbsp;&nbsp;&nbsp;&nbsp;送</button></div></div>'+
            '<div class="right"><div class="right_title">联系人</div><div class="user_group"></div></div></div>';
        $('body').append(session);
        $('.cover').show();
        $('body',top.document).append('<div class="maincover"></div>');
        $('.maincover',top.document).show();
        var w = $('.firstNav',top.document).outerWidth()+$('.wrap',top.document).outerWidth();
        $('.maincover',top.document).css({
            top: 0,
            bottom : 0,
            left: 0,
            right: $(window).outerWidth()
        });
        $('.session_startup').css({
            left: ($(window).width()+ w - $('.session_startup').outerWidth())/2 - w,
            top: ($(window).height()-$('.session_startup').outerHeight())/2
        });
        $('.session_title span').html(o.name);
        var mobileArray = '';
        $.each(o.object.mobiles,function(index,value){
            mobileArray += '<div>'+value+'</div>';
        });
        var options = '';
        if(o.object.availabeTemplates){
            $.each(o.object.availabeTemplates,function(index,value){
                options += '<option value="'+value.id+'" template="'+ value.content +'">'+value.name+'</option>';
            });
            $('.session_send select').append(options);
            $('.session_send select').dropdown({width:'150px',n:4});
            $('.session_send select').change(function(){
                var $this = $(this);
                $.each(o.object.availabeTemplates,function(index,value){
                    if($this.val() == value.id){
                        $('.left .session_msg .show').html(value.content);
                    }
                });
            });
        }else{
            $('.session_send span').hide();
        }
        $('.user_group').html(mobileArray);
        $('.session_title a').click(function(e){
            e.preventDefault();
            sendMsgHide();
        });
        sessionContentRender(o.object);
        $('.session_send button').click(function(e){
            e.preventDefault();
            myClearInterval();
            o.send();
        })
    }
    function getContent(){
        $('.session_msg .hidden').html( $('.session_msg .show').html());
        var vArray = []
        $('.session_msg .show input').each(function(i,v){
            vArray.push($(this).val());
        });
        $('.session_msg .hidden input').each(function(i,v){
            $(this).replaceWith(vArray[i]);
        });
        return $('.session_msg .hidden').text();
    }
    function sessionContentRender(option){
        function dateFormat(second){
            var date = new Date(second*1000);
            return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+(date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes());
        }
        sessionArray = [];
        if(option.tasks.length != 0){
            $.each(option.tasks,function(index,value){
                sessionArray.push({value:value,time:value.submitTime,user:'staff'});
                if(value.sms && value.sms.smsReplies && value.sms.smsReplies.length>0){
                    $.each(value.sms.smsReplies,function(i,v){
                        sessionArray.push({value:v,time: v.replyTime,user:'custom'})
                    })
                }
            });
        }
        if(sessionArray.length > 1){
            sessionArray.sort(function(a,b){
                return a.time > b.time;
            });
        }
        var liArray = '';
        $.each(sessionArray,function(index,value){
            if(value.user=='staff'){
                var send = '';
                var send_content = '';
                var n = 1;
                var m = 0;
                $.each(option.mobiles,function(i,v){
                    if(value.value.retryTimes < 0){
                        send_content +='<div><span class="index">No.'+n+
                        '</span><span class="mobile">'+ v +'</span><span class="status sending">发送中</span></div>';
                        n++;
                    }else if(value.value.status == 'failed'){
                        send_content +='<div><span class="index">No.'+n+
                        '</span><span class="mobile">'+ v +'</span><span class="status">发送失败</span></div>';
                        n++;
                    }else{
                        if(value.value.sms && value.value.sms.smsStatuses && value.value.sms.smsStatuses.length != 0){
                            var flag = true;
                            $.each(value.value.sms.smsStatuses,function(j,val){
                                if(v == val.mobile){
                                    flag = false;
                                }
                            });
                            $.each(value.value.sms.smsStatuses,function(j,val){
                                if(v == val.mobile){
                                    if(val.status == 'fail'){
                                        send_content +='<div><span class="index">No.'+n+
                                        '</span><span class="mobile">'+ val.mobile +'</span><span class="status">发送失败</span></div>';
                                        n++;
                                    }else if(val.status == 'success'){
                                        send_content +='<div><span class="index">No.'+n+
                                        '</span><span class="mobile">'+ val.mobile +'</span><span class="status success">发送成功</span></div>';
                                        n++;
                                        m++;
                                    }else{
                                        send_content +='<div><span class="index">No.'+n+
                                        '</span><span class="mobile">'+ val.mobile +'</span><span class="status sending">发送中</span></div>';
                                        n++;
                                    }
                                }else{
                                    if(flag){
                                        send_content +='<div><span class="index">No.'+n+
                                        '</span><span class="mobile">'+ v +'</span><span class="status sending">已发送但状态未知</span></div>';
                                        n++;
                                        return false;
                                    }
                                }
                            });
                        }else{
                            send_content +='<div><span class="index">No.'+n+
                            '</span><span class="mobile">'+ v +'</span><span class="status sending">已发送但状态未知</span></div>';
                            n++;
                        }

                    }
                });
                send += '<div class="send_title"><span>发送状态（<span class="success">'+ m +'</span>/'+ (n-1) +')</span></div><div class="send_content">'+send_content+'<div>';
                liArray +='<li class="staff"><div><span class="name">客服</span><span class="time">'+ dateFormat(value.time) +'</span></div><div class="msg">'+ value.value.message +'</div>'+ send +'</li>';
            }else{
                liArray +='<li class="custom"><div><span class="name">'+ value.value.mobile +'</span><span class="time">'+dateFormat(value.time)+'</span></div><div class="msg">'+value.value.message+'</div></li>'
            }
        });
        $('.session_content ul').html(liArray);
    }
    function resize(){
        var w = $('.firstNav',top.document).outerWidth()+$('.wrap',top.document).outerWidth();
        $('.maincover',top.document).css({
            top: 0,
            bottom : 0,
            left: 0,
            right: $(window).outerWidth()
        });
        $('.send_message').css({
            left: ($(window).width()+ w - $('.send_message').outerWidth())/2 - w,
            top: ($(window).height()-$('.send_message').outerHeight())/2
        });
        $('.session_startup').css({
            left: ($(window).width()+ w - $('.session_startup').outerWidth())/2 - w,
            top: ($(window).height()-$('.session_startup').outerHeight())/2
        });
    }
    function myInterval(fun){
        interval_flag = setInterval(fun,5000);
    }
    function myClearInterval(){
        clearInterval(interval_flag);
    }
    function checkbox(){
        $('input[type=checkbox]').each(function(index, el) {
            var h;
            if ($(this).attr('disabled') == 'disabled') {
                h = '<span class="mcheckbox disabled"></span>';
            }else{
                h = $(this).is(':checked')?'<span class="mcheckbox selected"></span>':'<span class="mcheckbox"></span>';
            }
            $(this).wrap(h);
            $(this).parents('.mcheckbox').click(function(event) {
                $(this).hasClass('selected')?$(this).removeClass('selected'):$(this).addClass('selected');
            });
        });
    }
    function sendMsgHide(){
        $('.session_startup').hide();
        $('.session_startup .right,.session_startup .left .session_content').getNiceScroll().resize();
        $('.session_startup').remove();
        $('.cover').hide();
        $('.maincover',top.document).remove();
        myClearInterval();
    }
    function quickSendMsgHide(){
        $('.send_message').hide();
        $('.send_message .send_message_content').getNiceScroll().resize();
        $('.send_message').remove();
        $('.cover').hide();
        $('.maincover',top.document).remove();
    }
    function selected(){
        var i =0;
        $('input[type=checkbox]').each(function(index, el) {
            if($(this).is(':checked')){
               if($(this).data('data').certId){
                   $(this).attr('name','certs['+i+'].id');
                   $(this).attr('value',$(this).data('data').certId);
                   i++;
               }else{
                   $(this).attr('name','contact.mobile');
                   $(this).attr('value',$(this).data('data').mobile);
               }
            }else{
                $(this).removeAttr('name');
                $(this).removeAttr('value');
            }
        });
        return $('.send_message form').serialize();
    }
    function quickSendMsgRecover(){
        $('.send_message_footer button').attr('disabled',false);
    }
    function addSessionContentRender(option){
        var d = new Date();
        function dateFormat(second){
            var date = new Date(second*1000);
            return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+(date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes());
        }
        sessionArray.push({value:{add:true,message:option.message},time:parseInt(d.getTime()/1000),user:'staff'});
        var liArray = '';
        $.each(sessionArray,function(index,value){
            if(value.user=='staff'){
                var send = '';
                var send_content = '';
                var n = 1;
                var m = 0;
                $.each(option.mobiles,function(i,v){
                    if(value.value.add){
                        send_content +='<div><span class="index">No.'+n+
                        '</span><span class="mobile">'+ v +'</span><span class="status sending">发送中</span></div>';
                        n++;
                    }
                    else if(value.value.retryTimes < 0){
                        send_content +='<div><span class="index">No.'+n+
                        '</span><span class="mobile">'+ v +'</span><span class="status sending">发送中</span></div>';
                        n++;
                    }else if(value.value.status == 'failed'){
                        send_content +='<div><span class="index">No.'+n+
                        '</span><span class="mobile">'+ v +'</span><span class="status">发送失败</span></div>';
                        n++;
                    }else{
                        if(value.value.sms && value.value.sms.smsStatuses && value.value.sms.smsStatuses.length != 0){
                            var flag = true;
                            $.each(value.value.sms.smsStatuses,function(j,val){
                              if(v == val.mobile){
                                  flag = false;
                              }
                            });
                            $.each(value.value.sms.smsStatuses,function(j,val){
                                if(v == val.mobile){
                                    if(val.status == 'fail'){
                                        send_content +='<div><span class="index">No.'+n+
                                        '</span><span class="mobile">'+ val.mobile +'</span><span class="status">发送失败</span></div>';
                                        n++;
                                    }else if(val.status == 'success'){
                                        send_content +='<div><span class="index">No.'+n+
                                        '</span><span class="mobile">'+ val.mobile +'</span><span class="status success">发送成功</span></div>';
                                        n++;
                                        m++;
                                    }else{
                                        send_content +='<div><span class="index">No.'+n+
                                        '</span><span class="mobile">'+ val.mobile +'</span><span class="status sending">发送中</span></div>';
                                        n++;
                                    }
                                }else{
                                    send_content +='<div><span class="index">No.'+n+
                                    '</span><span class="mobile">'+ v +'</span><span class="status sending">发送中</span></div>';
                                    n++;
                                }
                            });
                        }else{
                            if(flag){
                                send_content +='<div><span class="index">No.'+n+
                                '</span><span class="mobile">'+ v +'</span><span class="status sending">已发送但状态未知</span></div>';
                                n++;
                            }
                        }

                    }
                });
                send += '<div class="send_title"><span>发送状态（<span class="success">'+ m +'</span>/'+ (n-1) +')</span></div><div class="send_content">'+send_content+'<div>';
                liArray +='<li class="staff"><div><span class="name">客服</span><span class="time">'+ dateFormat(value.time) +'</span></div><div class="msg">'+ value.value.message +'</div>'+ send +'</li>';
            }else{
                liArray +='<li class="custom"><div><span class="name">'+ value.value.mobile +'</span><span class="time">'+dateFormat(value.time)+'</span></div><div class="remark">备注</div><div class="msg">'+value.value.message+'</div></li>'
            }
        });
        $('.session_content ul').html(liArray);
    }
    $.sendMsg = {
        quickReply : {
            show:function(option){
                quickSendMsgRender(option);
                $(window).resize(function(event) {
                    resize();
                });
            },
            selected:function(){
                var a = selected();
                return a;
            },
            hide:function(){
                quickSendMsgHide();
            },
            recover:function(){
                quickSendMsgRecover();
            }
        },
        reply : {
            show:function(option){
                sendMsgRender(option);
                $(window).resize(function(event) {
                    resize();
                });
            },
            getContent:function(){
                return getContent();
            },
            hide:function(){
                sendMsgHide();
            },
            recover:function(option){
                sessionContentRender(option);
            },
            add:function(option){
              addSessionContentRender(option);
            },
            interval:function(fun){
                myInterval(fun);
            }
        }
    }
})(jQuery);