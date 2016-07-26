(function($){
	$.fn.dropdown = function(option){
		var defaults = {n : 5,width : 69, inherit :false , change : function(){}};
		var s = $.extend(true, defaults, option),$this = $(this),h=(s.n*30)+'px',
			option = function(name,value,selected){
				return $(selected?'<option selected></option>':'<option></option>').val(value).text(name)[0];
			},sync=function(){
				var lis = [];
				if(s.inherit){
					$this.find('option').each(function() {
						var attrList = $(this)[0].attributes;
						var li = '<li ';
						for(var i=0;i<attrList.length;i++){
							li += attrList[i].name+'='+attrList[i].value+' ';
						}
						li+='>';
						lis.push(li+$(this).text()+'</li>');
					});
				}else{
					$this.find('option').each(function() {
						lis.push('<li>'+$(this).text()+'</li>');
					});
				}
				$this.parents('.dropdown').find('.selected').html($this.find('option:selected').text());
				$('ul',$this.parents('.dropdown')).empty().append(lis.join(''));
				$this.parents('.dropdown').find('li').bind('click',function(event) {
					var text =$(this).html();
					var liIndex = $(this).index();
					$this.parents('.dropdown').find('.selected').html(text);
					//$this.parents('.dropdown').find('option').each(function(index, el) {
					//	if($(this).text() == text){
					//		$(this).attr('selected',true);
					//	}
					//});
                    $this.parents('.dropdown').find('select').val($this.parents('.dropdown').find('option').eq(liIndex).attr('value'));
                    //$this.parents('.dropdown').find('option').eq(liIndex).attr('selected',true);
					$this.parents('.dropdown').find('div').hide().end().find('select').trigger('change');
				});
				if($this.find('option').length == 0){
					$this.parents('.dropdown').hide();
				}else{
					$this.parents('.dropdown').show();
				}
			};
		if($this.parents('.dropdown').hasClass('dropdown')) return {update:sync};
		$this.wrap('<div class="dropdown"><span class="old"></span></div>').parents('.dropdown').width(s.width);
		$this.parents('.dropdown').append('<span class="selected"></span><div style="height:'+h+'"><ul style="height:'+h+'"></ul></div>').find('.selected').width(s.width-20);
		sync();
		$this.parents('.dropdown').hover(function() {
			$(this).find('div').show();
		}, function() {
			$(this).find('div').hide();
		});
		if ($this.css('display')=='none') {
			$this.parents('.dropdown').hide();
		};
		var rel=$this.attr('rel'),$rel=rel?$('#'+rel):false,refUrl=$rel?$rel.attr('ref'):false,$next=refUrl?$rel.dropdown(s,$this):false;
		$(this).change(function(event) {
			var selected = $(this).val();
			s.change.call($(this),selected);
			if(refUrl&&selected!==''){
				$rel.empty().show().parents('.dropdown').show()    ;
				$.getJSON([refUrl.replace(/(?:\/+|\s+)$/g,''),selected].join('/'), function(json) {
					if(json['code']==0){
						$.each(json['data'], function() {
							$rel.append(option(this['name'],this['value'],this['selected']?true:false));
						});
						$next.update();
						$rel.trigger('change');
					}
				});
			}else if($rel){
				$rel.hide().parents('.dropdown').hide();
				$rel.val('').trigger('change').parents('.dropdown').find('.selected').html();
			}
		});
		return {
			update:sync
		}
	}
})(jQuery);