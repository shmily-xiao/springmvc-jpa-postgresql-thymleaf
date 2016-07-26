;(function(){
    function dialog(selector){
        this.show = function(){
            $(selector).show();
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
            $(selector).css({
                left: ($(window).width()+ w - $(selector).outerWidth())/2 - w,
                top: ($(window).height()-$(selector).outerHeight())/2
            });
        }
        this.checkbox = function(){
            $('.dialog_content input[type=radio]').each(function(index, el) {
                if(!$(this).parents('.radio').hasClass('radio')){
                    $(this).wrap($(this).is(':checked')?'<span class="radio selected"></span>':'<span class="radio"></span>');
                    $(this).parents('.radio').click(function(event) {
                        var name = $(this).children().attr('name');
                        $('input[name='+name+']').parent().removeClass('selected');
                        $(this).addClass('selected');
                    });
                }
            });
            $('.dialog_content input[type=checkbox]').each(function(index, el) {
                if(!$(this).parents('.mcheckbox').hasClass('mcheckbox')){
                    var h;
                    if ($(this).attr('disabled') == 'disabled') {
                        h = '<span class="mcheckbox disabled"></span>';
                    }else{
                        h = $(this).is(':checked')?'<span class="mcheckbox selected"></span>':'<span class="mcheckbox"></span>';
                    };
                    $(this).wrap(h);
                    $(this).parents('.mcheckbox').click(function(event) {
                        $(this).hasClass('selected')?$(this).removeClass('selected'):$(this).addClass('selected');
                    });
                }
            });
        }
        this.hide = function(){
            $(selector).hide();
            $('.dialog_content .gridcar,.dialog_content .grid').getNiceScroll().resize();
            $(selector).remove();
            $('.cover').remove();
            $('.maincover',top.document).remove();
        }
        this.resize = function(){
            var w = $('.firstNav',top.document).outerWidth()+$('.wrap',top.document).outerWidth();
            $('.maincover',top.document).css({
                top: 0,
                bottom : 0,
                left: 0,
                right: $(window).outerWidth()
            });
            $(selector).css({
                left: ($(window).width()+ w - $(selector).outerWidth())/2 - w,
                top: ($(window).height()-$(selector).outerHeight())/2
            });
            $('.dialog_content .gridcar').getNiceScroll().resize();
        };
    }
    this.dialogmodal = (function(){
        var dialogmodal = new dialog('.dialog');
        return {
            load : function(option){
                var defaults = {
                    loadurl : false,
                    searchurl : false,
                    wrapid : false,
                    id : false,
                    loadid:false,
                    footer:false,
                    loaded:function(){},
                    beforerender:function(data){},
                    beforepost:function(){},
                    type:false
                };
                var o = $.extend(true, defaults, option);
                $($.templates(o.wrapid).render()).appendTo('html');
                var button_data = {};
                if(o.id){
                    button_data.id = function(data){return o.id};
                }else{
                    button_data.id = o.beforerender;
                }
                if(o.searchurl){
                    button_data.url = function(data){return o.searchurl};
                }else{
                    button_data.url = o.beforepost;
                }
                if(o.type){
                    button_data.type = o.type;
                }
                $('.dialog_header button').data('data',button_data);
                dialogmodal.show();
                $('.dialog_content .grid,.dialog_content .gridcar').niceScroll({cursorborder:'',cursorcolor:'#000',cursoropacitymax:'0.5'});
                if(o.loadurl){
                    $.post(o.loadurl,function(data) {
                        if(data.data){
                            $('.dialog .grid tbody').html($.templates(o.loadid).render(data.data));
                            $.each(data.data, function(index, val) {
                                $('.dialog .grid tbody tr').eq(index).data('data',val);
                            });
                        }
                    });
                    $('.dialog_content .grid,.dialog_content .gridcar').getNiceScroll().resize();
                    dialogmodal.checkbox();
                }
                o.loaded();
                $('.dialog_content .grid,.dialog_content .gridcar').getNiceScroll().resize();
                if(o.footer){
                    $('<div style="text-align:right;margin-bottom: 10px;"></div>').html(o.footer).insertBefore('.ops')
                }
            },
            search : function(url,data,id,type){
                var posturl = url();
                $('.dialog .grid tbody').empty();
                if(!type){
                    $.post(posturl, data, function(v) {
                        if(v.code == 0){
                            $('.dialog_header input[name=index]').val(parseInt($('.dialog_header input[name=index]').val())+1);
                            $('.dialog .grid tbody').html($.templates(id(v.data)).render(v.data));
                            $('.dialog_content .grid,.dialog_content .gridcar').getNiceScroll().resize();
                            $.each(v.data, function(index, val) {
                                $('.dialog .grid tbody tr').eq(index).data('data',val);
                            });
                            dialogmodal.checkbox();
                            $('.dialog_header button').attr('disabled',false);
                            var scrollFunc = function (e) {
                                var direct = 0;
                                e = e || window.event;
                                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                                    if (e.wheelDelta > 0) { //当滑轮向上滚动时
                                        direct = 0;
                                    }
                                    if (e.wheelDelta < 0) { //当滑轮向下滚动时
                                        direct = 1;
                                    }
                                } else if (e.detail) {  //Firefox滑轮事件
                                    if (e.detail> 0) { //当滑轮向上滚动时
                                        direct = 0;
                                    }
                                    if (e.detail< 0) { //当滑轮向下滚动时
                                        direct = 1;
                                    }
                                }
                                if(direct){
                                    if(!$(this).parents('.dialog_content').find('.loading').hasClass('loading')){
                                        var trHeight = 0;
                                        $(this).find('tr').each(function(){
                                            trHeight += $(this).outerHeight();
                                        });
                                        if($(this).parent('.grid').height()+$(this).parent('.grid').scrollTop() >= trHeight){
                                            $('.dialog_content .grid').append('<div class="loading" style="text-align: center;">加载中</div>');
                                            $.post(posturl,$('.dialog_header form').serialize()).done(function(d){
                                                if(d.code==0){
                                                    $('.dialog_header input[name=index]').val(parseInt($('.dialog_header input[name=index]').val())+1);
                                                    $('.dialog .grid tbody').append($.templates(id(d.data)).render(d.data));
                                                    $.each(d.data, function(index, val) {
                                                        $('.dialog .grid tbody tr').eq(index+($('.dialog_header input[name=index]').val()-2)*$('.dialog_header input[name=size]').val()).data('data',val);
                                                    });
                                                    $('.dialog_content .grid,.dialog_content .gridcar').getNiceScroll().resize();
                                                    $('.loading').remove();
                                                    dialogmodal.checkbox();
                                                }else if(d.code == 2){
                                                    $('.loading').hide();
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                            function scrollajax(){
                                //FF绑定滚动事件
                                $('.dialog_content .grid table').each(function(){if (this.addEventListener) {
                                    this.addEventListener('DOMMouseScroll', scrollFunc, false);
                                }});
                                //IE chorme绑定滚动事件
                                $('.dialog_content .grid table').each(function(){
                                    var $this =$(this);
                                    this.onmousewheel = scrollFunc;
                                });
                            }
                            scrollajax();
                        }else{
                            $('.dialog_header button').attr('disabled',false);
                        }
                    });
                }else{
                    $.ajax({
                        url:posturl,
                        data:JSON.stringify(data),
                        type:'post',
                        contentType:'application/json;charset=UTF-8',
                        dataType:'json',
                        success:function(v) {
                            if(v.code == 0){
                                $('.dialog_header input[name=index]').val(parseInt($('.dialog_header input[name=index]').val())+1);
                                $('.dialog .grid tbody').html($.templates(id(v.data)).render(v.data));
                                $('.dialog_content .grid,.dialog_content .gridcar').getNiceScroll().resize();
                                $.each(v.data, function(index, val) {
                                    $('.dialog .grid tbody tr').eq(index).data('data',val);
                                });
                                dialogmodal.checkbox();
                                $('.dialog_header button').attr('disabled',false);
                                var scrollFunc = function (e) {
                                    var direct = 0;
                                    e = e || window.event;
                                    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                                        if (e.wheelDelta > 0) { //当滑轮向上滚动时
                                            direct = 0;
                                        }
                                        if (e.wheelDelta < 0) { //当滑轮向下滚动时
                                            direct = 1;
                                        }
                                    } else if (e.detail) {  //Firefox滑轮事件
                                        if (e.detail> 0) { //当滑轮向上滚动时
                                            direct = 0;
                                        }
                                        if (e.detail< 0) { //当滑轮向下滚动时
                                            direct = 1;
                                        }
                                    }
                                    if(direct){
                                        if(!$(this).parents('.dialog_content').find('.loading').hasClass('loading')){
                                            var trHeight = 0;
                                            $(this).find('tr').each(function(){
                                                trHeight += $(this).outerHeight();
                                            });
                                            if($(this).parent('.grid').height()+$(this).parent('.grid').scrollTop() >= trHeight){
                                                $('.dialog_content .grid').append('<div class="loading" style="text-align: center;">加载中</div>');
                                                var scrollA = $('.dialog_header form').serializeArray();
                                                var scrollO = {};
                                                $.each(scrollA, function() {
                                                    if (scrollO[this.name]) {
                                                        if (!scrollO[this.name].push) {
                                                            scrollO[this.name] = [scrollO[this.name]];
                                                        }
                                                        scrollO[this.name].push(this.value || '');
                                                    } else {
                                                        scrollO[this.name] = this.value || '';
                                                    }
                                                });
                                                $.ajax({
                                                    url:posturl,
                                                    contentType: "application/json; charset=utf-8",
                                                    data:JSON.stringify(scrollO),
                                                    success:function(d){
                                                if(d.code==0){
                                                    $('.dialog_header input[name=index]').val(parseInt($('.dialog_header input[name=index]').val())+1);
                                                    $('.dialog .grid tbody').append($.templates(id(d.data)).render(d.data));
                                                    $.each(d.data, function(index, val) {
                                                        $('.dialog .grid tbody tr').eq(index+($('.dialog_header input[name=index]').val()-2)*$('.dialog_header input[name=size]').val()).data('data',val);
                                                    });
                                                    $('.dialog_content .grid,.dialog_content .gridcar').getNiceScroll().resize();
                                                    $('.loading').remove();
                                                    dialogmodal.checkbox();
                                                }else if(d.code == 2){
                                                    $('.loading').hide();
                                                }
                                            },
                                                    type:'post',
                                                    dataType:'json'
                                                })
                                            }
                                        }
                                    }
                                }
                                function scrollajax(){
                                    //FF绑定滚动事件
                                    $('.dialog_content .grid table').each(function(){if (this.addEventListener) {
                                        this.addEventListener('DOMMouseScroll', scrollFunc, false);
                                    }});
                                    //IE chorme绑定滚动事件
                                    $('.dialog_content .grid table').each(function(){
                                        var $this =$(this);
                                        this.onmousewheel = scrollFunc;
                                    });
                                }
                                scrollajax();
                            }else{
                                $('.dialog_header button').attr('disabled',false);
                            }
                        }
                    })
                }
            },
            close : function(){
                dialogmodal.hide();
            },
            resize : function(){
                dialogmodal.resize();
            }
        }
    })();
}).apply(jQuery);
jQuery(document).ready(function($) {
    $(document).on('click', '.dialog_footer .ops a', function(event) {
        event.preventDefault();
        $.dialogmodal.close();
    });
    $(document).on('click', '.dialog_header button', function(event) {
        event.preventDefault();
        $(this).attr('disabled','disabled');
        if($(this).parents('form').find('input[name=index]').length == 0 ){
            $(this).parents('form').append('<input type="hidden" name="index" value="1">');
            $(this).parents('form').append('<input type="hidden" name="size" value="10">');
        }else{
            $(this).parents('form').find('input[name=index]').val(1);
        }
        var data = $(this).parents('form').serialize();
        var url = $(this).data('data').url;
        var id = $(this).data('data').id;
        if($(this).data('data').type){
            var a = $(this).parents('form').serializeArray();
            var o = {};
            $.each(a, function() {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            $.dialogmodal.search(url,o,id,$(this).data('data').type);
        }else{
            $.dialogmodal.search(url,data,id);
        }
    });
    $(window).resize(function(event) {
        $.dialogmodal.resize();
    });
});