;(function($){
	$.fn.seatlayout = function(option){
		var defaults = {
			row: 0,
			col : 0,
			edit : true,
			data:false,
			sold:false,
			max:10000,
			locked:false,
			change : function(){}
		}
		var s = $.extend(true, defaults, option);
		$(this).html('');
		var $this = $(this);
		var virtual_data = {};
		$(this).append('<div class="car_head">车头</div>');
		if(s.data){
			for (var key in s.data){
				virtual_data[parseInt(key.replace(/[^0-9]/ig,""))] = s.data[key];
			}
			if(s.edit){
				var i=0;
				$.each(virtual_data,function(index,val){
					var seat = '',row='';
					i++;
					for (var ele in val){
						if(val[ele]){
							seat += '<div class="car_seat active">'+(i+ele)+'</div>';
						}else{
							seat += '<div class="car_seat"></div>'
						}
					}
					row += '<div class="car_row">'+seat+'</div>';
					$this.append(row);
				})
			}else{
				var i=0;

				$.each(virtual_data,function(index,val){
					var seat = '',row='';
					i++;
					for (var ele in val){
						if(val[ele]){
							seat += '<div class="car_seat book">'+(i+ele)+'</div>';
						}else{
							seat += '<div class="car_seat none"></div>'
						}
					}
					row += '<div class="car_row">'+seat+'</div>';
					$this.append(row);
				})
				$.each(s.sold,function(r, val) {
					//r = parseInt(r.replace(/[^0-9]/ig,""))-1;
					//	$.each(val,function(c, el) {
					//		$('.car_row').eq(r).find('.car_seat').eq(el.charCodeAt() - 65).addClass('booked');
					//	};
					$('.car_row').eq(parseInt(val)-1).find('.car_seat').eq(val[val.length-1].charCodeAt() - 65).addClass('booked');
				});
				if(s.locked){
					$('.car_row').eq(parseInt(s.locked)-1).find('.car_seat').eq(s.locked[s.locked.length-1].charCodeAt() - 65).removeClass('booked').addClass('locked');
				}
			}
		}else{
			for (var i = 1; i <= s.row; i++) {
				var seat = '',row='';
				for (var j = 1; j <= s.col; j++) {
					seat += '<div class="car_seat"></div>';
				};
				row += '<div class="car_row">'+seat+'</div>';
				$(this).append(row);
			};
		}
		$(this).append('<div class="car_foot">车尾</div>');
		if(s.edit){
			$(this).find('.car_seat').not('.none').click(function(event) {
				if($(this).hasClass('active')){
					$(this).removeClass('active').html('');
				}else{
					$(this).addClass('active').html($(this).parents('.car_row').index()+String.fromCharCode($(this).index()+65));
				}
				s.change({row:s.row,col:s.col,capacity:$('.active').length});
			});
		}else{
			$(this).find('.car_seat').not('.booked,.none').click(function(event) {
				if($(this).hasClass('locked')){
					$(this).removeClass('locked');
				}else{
					if($('.locked').length<s.max){
						$(this).addClass('locked');
					}else{
						$('.locked').eq(0).removeClass('locked');
						$(this).addClass('locked');
					}
				}
			});
		}
		var layout=function(){
			if(s.edit){
				var seats = [];
				$this.find('.car_seat').each(function(index, el) {
					seats.push({row:$(this).parents('.car_row').index(),col:String.fromCharCode(index%s.col + 65),type: $(this).hasClass('active')?1:0
					});
				});
				return seats;
			}else{
				var seats=[];
				$this.find('.locked').each(function(index,el){
					seats.push($(el).html());
				})
				if(seats.length==1){
					seats = seats[0];
				}else if(seats.length==0){
					seats = false;
				}
				return seats;
			}

		}
		return {
			layout:layout
		}
	}
})(jQuery);