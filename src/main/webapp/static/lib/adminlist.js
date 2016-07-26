$(document).ready(function(){
    $('.grid').height($(window).height()-$('.header').outerHeight()-$('table thead').outerHeight()-$('.sContainer').outerHeight()-$('.table_footer').outerHeight());
    $('.grid').find('tr:first td').each(function(index, el) {
        $(this).outerWidth($('table th').eq(index).outerWidth());
    });
    $('.grid').niceScroll({cursorborder:'',cursorcolor:'#000',cursoropacitymax:'0.5'});
    $(top.window).resize(function(){
        $('.grid').find('tr:first td').each(function(index, el) {
            $(this).outerWidth($('table th').eq(index).outerWidth());
        });
        $('.grid').height($(window).height()-$('.header').outerHeight()-$('table thead').outerHeight()-$('.sContainer').outerHeight()-$('.table_footer').outerHeight()).getNiceScroll().resize();
    })
})