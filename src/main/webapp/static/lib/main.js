$(function(){
	$('.firstNav').niceScroll({cursorborder:'',cursorcolor:'#000',cursoropacitymax:'0.5'});
	$('.secondNav').niceScroll({cursorborder:'',cursorcolor:'#000',cursoropacitymax:'0.5'})
	$('iframe').width($(window).width()-$('.firstNav').outerWidth()-$('.wrap').outerWidth());
	// $('iframe').height($('.main').height());
	$('.close').click(function(event) {
		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$('.firstNav,.firstNav .logo').width(64);
			$('.firstNav li').width(61);
			$('.describe').css('display', 'none');
			$('iframe').width($(window).width()-$('.firstNav').outerWidth()-$('.wrap').outerWidth());
			$('.firstNav').getNiceScroll().resize();
			$('.secondNav').getNiceScroll().resize();
		}else{
			$(this).addClass('open');
			$('.firstNav,.firstNav .logo').width(118);
			$('.firstNav li').width(115);
			$('.describe').css('display', 'table-cell');
			$('iframe').width($(window).width()-$('.firstNav').outerWidth()-$('.wrap').outerWidth());
			$('.firstNav').getNiceScroll().resize();
			$('.secondNav').getNiceScroll().resize();
		}
	});
	$('.firstNav .logo a').click(function(event) {
		$('iframe').attr('src',$(this).attr('href'));
		event.preventDefault();
		$('.secondNav').hide();
		$('iframe').width($(window).width()-$('.firstNav').outerWidth()-$('.wrap').outerWidth());
	});
	$(window).resize(function(){
		$('.firstNav').getNiceScroll().resize();
		$('.secondNav').getNiceScroll().resize();
		$('iframe').width($(window).width()-$('.firstNav').outerWidth()-$('.wrap').outerWidth());
	})
	$('.firstNav .menu li').click(function(event) {
		$(this).addClass('active').siblings('li').removeClass('active');
		$('.secondNav').eq($(this).index()).show().siblings('.secondNav').hide();
		$('iframe').width($(window).width()-$('.firstNav').outerWidth()-$('.wrap').outerWidth());
		$('iframe').attr('src',$(this).attr('href'));
		event.preventDefault();
	});
	$(document).off('click').on('click','.secondNav .category a',function(event){
		event.preventDefault();
		$('iframe').attr('src',$(this).attr('href'));
		$(this).find('span').addClass('click').parents('a').siblings('a').each(function(){
			$(this).find('span').removeClass('click');
		});
		$(this).parents('.secondNav').siblings('.secondNav').each(function(){
			$(this).find('.category a').each(function(){
				$(this).find('span').removeClass('click');
			})
		})
	})
})
	