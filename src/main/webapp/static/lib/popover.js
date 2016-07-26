;(function($){
	$.fn.popover = function(option){
		var defaults = {
			template : '<div class="popover" role="tooltip"><div class="arrow"></div></div>',
			width: '160px',
			height: '',
			identity : 'popover',
			placement:'top',
			html : '',
		}
		var options = $.extend(true, defaults, option);
		var classnames = $(this).prop('className').split(' ');
		var classname = '';
		$.each(classnames, function(index, val) {
		 	 calssname = classname + '.' +val;
		 }); 
		$(document).on('click',classname,function(){
			$(options.template).attr('id',options.identity).appendTo('body').show();
			$(html).appendTo(options.identity);
		})
	}
}(jQuery));