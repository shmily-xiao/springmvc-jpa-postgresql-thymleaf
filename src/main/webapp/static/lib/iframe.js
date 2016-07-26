jQuery(document).ready(function($) {
	$('input[type=radio]').each(function(index, el) {
		$(this).wrap($(this).is(':checked')?'<span class="radio selected"></span>':'<span class="radio"></span>');
		$(this).parents('.radio').click(function(event) {
			$(this).addClass('selected').siblings('.radio').removeClass('selected');
		});
	});
	$('input[type=checkbox]').each(function(index, el) {
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
	});
});