;(function(){
    function confirm(option){
        var defaults = {
            title : '确认删除？',
            detailed : '该操作是不可逆的，是否仍然继续？',
            no : '取  消',
            yes : '确认删除',
            delay : '500',
            confirm : function(){},
            cancel : function(){}
        };
        var _ = this;
        var o = $.extend(true, defaults, option);
        this.render=function(){
            var html = '<div class="msgbox" style="bottom:-64px"><div><div class="msg_title">'+
                o.title+'</div><div class="msg_detailed">'+
                o.detailed+'</div></div><div><button class="msg_no">'+
                o.no+'</button><button class="msg_yes">'+
                o.yes+'</button></div></div>';
            $(html).appendTo('body');
        }
        this.hide = function(){
            $('.msgbox').animate({bottom:'-64'}, 500, function() {
                $('.msgbox').remove();
            });
        }
        this.show = function(){
            this.render();
            $('.msgbox').animate({bottom:'0'}, o.delay);
            $('.msg_yes').click(function(event) {
                _.hide();
            });
            $('.msg_yes').bind('click', o.confirm);
            $('.msg_no').click(function(event) {
                _.hide();
            });
            $('.msg_no').bind('click',o.cancel);
        }
    }
    function alert(option){
        var defaults = {
            title : '保存编辑失败，出现了错误哦！',
            detailed : '此提示5秒后关闭',
            button : '关闭',
            delay : 500,
            type:'fail',
            close : function(){}
        };
        var _ = this;
        var o = $.extend(true, defaults, option);
        this.render = function(){
            var html = '<div class="alertmsg" style="top:-88px;"><div><div class="alertmsg_title">'+
                o.title+'</div><div class="alertmsg_detailed">'+
                o.detailed+'</div></div><div><button class="alertmsg_close">'+
                o.button+'</button></div></div>';
            $(html).appendTo('body');
            if(o.type == 'success'){
                $('.alertmsg').css('backgroundColor','#43a047');
            }
        }
        this.hide = function(){
            $('.alertmsg').animate({top:'-88'}, 500, function() {
                $('.alertmsg').remove();
            });
        }
        this.show = function(){
            this.render();
            setTimeout(this.hide,5000);
            $('.alertmsg').animate({top:'0'}, o.delay);
            $('.alertmsg button').click(function(event) {
                _.hide();
            });
            $('.alertmsg button').bind('click',o.close);
        }
    }
    $.alertMsg = {
        confirm : function(option){
            var alertMsg = new confirm(option);
            alertMsg.show();
        },
        alert : function(option){
            var alertMsg = new alert(option);
            alertMsg.show();
        }
    };


})(jQuery);