;(function($){
    function popover(option,$this){
        var defaults = {
            width : '',
            height : '',
            init_title : '热门目的地',
            init_url : '',
            posturl : '',
            template_id:'',
            this:false,
            change : function(){}
        };
        var o  = $.extend(true, defaults, option);
        var _ = this;
        this.wrap = function(){
            $('<div class="popover right mine"><div class="arrow"></div><div><div class="popover_title"><div><input type="text"></div></div><div class="popover_content"></div></div><div class="popover_footer"><button>关闭</button></div></div>').appendTo('body');
            $('.popover_footer button').click(function(){
                _.hide();
            })
        }
        this.init = function(){
            var template = $.templates('#template_recommend');
            if(o.init_url != '') {
                $.post(o.init_url,function (data) {
                    if(data.data){
                        $('.popover_content').empty()
                        .append('<div class="recommend">' + o.init_title + '</div><div class="recommend"></div>')
                        .find('.recommend:last')
                        .html($(template.render(data.data)));
                        $.each(data.data, function (index, val) {
                            var v = val;
                            $('.recommend span').each(function (i, el) {
                                if (index == i) {
                                    $(this).data('data', v);
                                }
                            });
                        });
                    }
                });
            }else{
                $('.popover_content').empty();
            }
        };
        this.render = function(){
            var template = $.templates(o.template_id);
            $.post(o.post_url,{name:$('.popover.right input').val()},function(data) {
                if(data.data){
                    $('.popover_content').empty().html(template.render(data.data));
                    $.each(data.data, function(index, val) {
                        var v = val;
                        $('.search').each(function(i, el) {
                            if(index == i){
                                $(this).data('data',v);
                            }
                        });
                    });
                }else{
                    $('.popover_content').empty();
                }
            });
        };
        this.show = function(){
            _.hide();
            _.wrap();
            _.init();
            $('.popover').css({
                left:o.this.offset().left + o.this.outerWidth()+5,
                top:o.this.offset().top - o.this.outerHeight()
            }).width(o.width).height(o.height).find('.popover_content').height(o.height-85);
            $('.popover .arrow').css('top', o.this.outerHeight()*3/2);
            $('.popover').data('data', o.this);
        }
        this.hide = function(){
            $('.popover.right').remove();
        }
        this.change = o.change;
    }
    $.popoverlist = {
        show : function(option){
            var popoverlist = new popover(option);
            popoverlist.show();
            $('.popover input').keyup(function(event) {
                if($(this).val()==''){
                    popoverlist.init();
                }else{
                    popoverlist.render();
                }
            });
            popoverlist.change();
        },
        hide : function(){
            $('.popover.right').remove();
        }
    }
})(jQuery);