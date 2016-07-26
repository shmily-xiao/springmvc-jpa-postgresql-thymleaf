//时间控件的渲染和时间绑定
function tbody_date(time){
	if(time==undefined){
		var myDate = new Date();
	}else{
		if(typeof time=="object") {
			var myDate = time;
		} else {
			time = time.replace(',','-');
			var timeArray = time.split('-');
			var myDate = new Date(timeArray[0],timeArray[1]-1,1);
		}
	}
	$('.tbody').html('');
	myDate.setDate(1);
	var s;
	var now = new Date();
	var mnow = now.getMonth();
	var dnow = now.getDate();
	var myear = now.getFullYear();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	var start = myDate.getDay();
	myDate.setMonth(myDate.getMonth()+1);
	myDate.setDate(0);
	var days = myDate.getDate();
	var firstrow='',row='',prev,next;
	for(var i = 0 ; i<start;i++){
			firstrow += '<span class="past"></span>';
		}
	for (var i = 1; i <= 7-start; i++) {
		if(myear > year){
			firstrow += '<span class="past">' + i + '</span>';
		}else if(myear == year){
			if((mnow+1)>month) {
				firstrow += '<span class="past">' + i + '</span>';
			}else if((mnow+1)<month){
				firstrow += '<span>' + i + '</span>'
			}else{
				firstrow += ( i>dnow ? '<span>' + i + '</span>':'<span class="past">' + i + '</span>');
			}
		}else{
			firstrow += '<span>' + i + '</span>';
		}
	};
	$('<div class="trow"><div class="trow_title">'+firstrow+'</div><div class="clear"></div></div>').appendTo('.tbody');
	for (var j = 8-start; j <= days;) {
		row = '';
		if(myear > year){
			for (var m = 0 ; m<7&&j<=days; m++) {
				row += ('<span class="past">'+j+'</span>');
				j++;
			};
		}else if(myear == year){
			if((mnow+1)>month){
				for (var m = 0 ; m<7&&j<=days; m++) {
					row += ('<span class="past">'+j+'</span>');
					j++;
				};
			}else if((mnow+1)<month){
				for (var m = 0 ; m<7&&j<=days; m++) {
					row += ('<span>'+j+'</span>');
					j++;
				};
			}else{
				for (var m = 0 ; m<7&&j<=days; m++) {
					row += ( j >= dnow? ('<span>' + j + '</span>'):('<span class="past">' + j + '</span>'));
					j++;
				};
			}
		}else{
			for (var m = 0 ; m<7&&j<=days; m++) {
				row += ('<span>'+j+'</span>');
				j++;
			};
		}

		$('<div class="trow"><div class="trow_title">'+row+'</div><div class="clear"><div></div>').appendTo('.tbody');
	};
	$('.date input').val(year+'.'+month);
	if(month==1){
		prev = 12;
		next = 2;
	}else if(month==12){
		prev = 11;
		next = 1;
	}else{
		prev = month - 1;
		next = month + 1;
	}
	$('.prev span:last').html(prev+'月');
	$('.next span:last').html(next+'月');
	$('.trow span:not(.past)').hover(function() {
		if(!$(this).hasClass('readonly')){
			if(!$(this).hasClass('exist')){
				if(!$(this).hasClass('lock')){
					s = $(this).html();
					$(this).data('date', s);
					$(this).addClass('hover').html('');
				}
			}
		}
	}, function() {
		if(!$(this).hasClass('exist')) {
			$(this).removeClass('hover').html($(this).data('date'));
		}
	});
	$('.route_date:not(.plan)  .trow span:not(.past)').click(function(event) {
		if(!$(this).hasClass('lock')){
			$('.lock').removeClass('lock');
			//$(this).addClass('lock');
			if(!$(this).hasClass('exist')) {
				$('.popover.add,.popover.sales_date_add.bottom').data('date', $(this).data('date')).show().css({
					'left': $(this).position().left,
					'top': $(this).position().top + 48
				}).siblings('.popover').hide();
				//$('.popover.add').find('input[type=text]').val('');
				//$('.popover.add').find('input[type=radio]').parents('.radio').removeClass('selected');
				//$('.popover.add').find('input[type=radio]:checked').attr('checked',false);
			}
		}
	});

}
$('.dt').datetimepicker({
	format:'yyyy.mm',
	language: 'zh-CN',
	maxView : 4,
	minView : 3,
	startView : 3,
	autoclose : true
}).on('changeMonth',function(ev){
	tbody_date(ev.date);
});
//tbody render
;(function($){
	var colorArray = ['#17a64a','#0066ff','#ffcc00','#ff9966','#ff0033'];
	function hasItem(x,y,y1,ci,index,item,html){
			var flag = false;
			group = $('.trow').eq(x).find('.bus_no_item').length/7;
			for (var i = 1; i <= group;i++) {
				flag = false;
				for (var j = y; j <= y1; j++) {
					if($('.trow').eq(x).find('div:not(.trow_title)').eq(j+(i-1)*7).hasClass('occupied')){
						flag = true;
					}
				};
				if (!flag) {
					groupId = i-1;
					break;
				};
			};
			if(flag == true){
				for (var i = 0; i <= 6; i++) {
					if(i<y){
						$('<div class="bus_no_item"></div>').insertBefore($('.trow').eq(x).find('.clear'));
					}else if(i>=y&&i<=y1){
						if(html&&i==y){
							$('<div class="bus_no_item occupied" index="'+index+'">'+html+'</div>').data('item',item).insertBefore($('.trow').eq(x).find('.clear')).css('backgroundColor', ci);
						}else{
							$('<div class="bus_no_item occupied" index="'+index+'"></div>').insertBefore($('.trow').eq(x).find('.clear')).css('backgroundColor', ci);
						}
					}else{
						$('<div class="bus_no_item"></div>').insertBefore($('.trow').eq(x).find('.clear'));
					}
				};
			}else{
				for (var i = y; i <= y1; i++) {
					if(html&&i==y){
						$('.trow').eq(x).find('.bus_no_item').eq(i+(groupId*7)).addClass('occupied').css('backgroundColor', ci).html(html).attr('index',index).data('item',item);
					}else{
						$('.trow').eq(x).find('.bus_no_item').eq(i+(groupId*7)).addClass('occupied').css('backgroundColor', ci).attr('index',index);
					}
				};
			}
		}
	function noItem(x,y,y1,ci,index,item,html){
		for (var i = 0; i <= 6; i++) {
			if(i<y){
				$('<div class="bus_no_item"></div>').insertBefore($('.trow').eq(x).find('.clear'));
			}else if(i>=y&&i<=y1){
				if(html&&i==y){
					$('<div class="bus_no_item occupied" index="'+index+'">'+html+'</div>').data('item',item).insertBefore($('.trow').eq(x).find('.clear')).css('backgroundColor', ci);
				}else{
					$('<div class="bus_no_item occupied" index="'+index+'"></div>').insertBefore($('.trow').eq(x).find('.clear')).css('backgroundColor', ci);
				}
			}else{
				$('<div class="bus_no_item"></div>').insertBefore($('.trow').eq(x).find('.clear'));
			}
		};
	}
	function init(data,template,attr){
		$('.route_date .trow span').each(function(){
			$(this).removeClass('exist');
			if(attr && attr.readonly){
				$(this).addClass('readonly');
			}
		});
		var getRandomColor = function(){
			return '#' + getRgb() + getRgb() + getRgb();
		};
		var getRgb = function(){
			var str = Math.floor(Math.random()*160).toString(16);
			return str.length == 1? '0'+str:str
		};
		var licenseArray = [];
		$.each(data,function(index,value){
			if(!this.len){
				var start = new Date(this.day).getDate(),
					end = new Date(this.day).getDate(),
					item = this;
			}else{
				var start = new Date(this.day).getDate(),
					end = new Date((this.day+this.len*86400000)).getDate(),
					smonth = new Date(this.day).getMonth(),
					send = new Date((this.day+this.len*86400000)).getMonth(),
					item = this,
					allDayMonth = new Date(this.day).getMonth();
					var allDay = new Date(this.day);
					allDay.setMonth(allDayMonth+1);
					allDay.setDate(0);
					var allDayDate = allDay.getDate();
			}
			if(!attr){
				$('.route_date .trow span').each(function(){
					if($(this).text() == start){
						$(this).addClass('exist');
					}
				});
			}
			var days = end - start + 1;
			var color;
			var $busId = this.busId;
			if(this.busId >= 0){
				var flag = true;
				$.each(licenseArray,function(){
					if(this.busId == $busId){
						flag = false;
						color = this.color;
						return false;
					}
				});
				if(flag){
					var licenseColor = getRandomColor();
					color = licenseColor;
					licenseArray.push({busId:this.busId,color:licenseColor});
				}
			}else{
				color = getRandomColor();
			}
			var x,y,x1,y1,group,groupId;
			var html = template[index];
			$('.tbody span').each(function(index, el) {
				if($(this).html() == start){
					y = index%7 ;
					x = $(this).parents('.trow').index();
				}
				if($(this).html() == end && smonth == send){
					y1 = index%7 ;
					x1 = $(this).parents('.trow').index();
				}
				if(smonth && send && smonth != send){
					y1 = allDayDate-start+y;
				}
			});
			if(x==x1 && $('.trow').eq(x).find('div:not(.trow_title)').hasClass('bus_no_item')){
				var $len = $('.trow').eq(x).find('div:not(.trow_title)').filter('.bus_no_item').length/7;
				var $flag = false;
				for(var i = 0;i<$len;i++){
					if(!$('.trow').eq(x).find('div:not(.trow_title)').eq(y+7*i).hasClass('occupied')){
						$flag = true;
						//return
					}
				}
				if(!$flag){
					noItem(x,y,y1,color,index,item,html);
				}else{
					hasItem(x,y,y1,color,index,item,html);
				}
				//ci = (ci+1)%5;
			}else if(x==x1 && !$('.trow').eq(x).find('div:not(.trow_title)').hasClass('bus_no_item')){
					noItem(x,y,y1,color,index,item,html);
					//ci = (ci+1)%5;
			}else if(x!=x1){
				if(smonth != send){
					if($('.trow').eq(x).find('div:not(.trow_title)').hasClass('bus_no_item')){
						hasItem(x,y,y1,color,index,item,html);
					}else{
						noItem(x,y,y1,color,index,item,html);
					};
				}else{
					if($('.trow').eq(x).find('div:not(.trow_title)').hasClass('bus_no_item')){
						hasItem(x,y,6,color,index,item,html);
					}else{
						noItem(x,y,6,color,index,item,html);
					};
					if ($('.trow').eq(x1).find('div:not(.trow_title)').hasClass('bus_no_item')) {
						hasItem(x1,0,y1,color,index);
					}else{
						noItem(x1,0,y1,color,index);
					};
				}
				//ci = (ci+1)%5;
			}
		})
		var hoverColor = '',index;
		$('.occupied').hover(function() {
			hoverColor = $(this).css('backgroundColor');
			index = $(this).attr('index');
			$('.occupied[index='+index+']').css('backgroundColor', $.xcolor.lighten(hoverColor,1,80).getCSS());
		}, function() {
			$('.occupied[index='+index+']').css('backgroundColor',hoverColor);
		});
	}
	function clear(){
		$('.route_date .bus_no_item').remove();
	}
	$.fn.item = function(data,id,attr){
		var items = data;
		if(attr){
			var localAttr =attr;
		}

		var templates,template=[];
		function replaceall(data,id){
			items = data;
			templates = $.templates(id);
			template = [];
			$.each(items, function(index, val) {
			 	template.push(templates.render(val));
			});
			clear();
			if(localAttr){
				init(items,template,localAttr);
			}else{
				init(items,template);
			}

		};
		function equals(val,data){
			var l=0,l1=0;
			var keys = [],keys1=[],flag=true;
			for(var ele in val){
				l++;
				if(val[ele]!=data[ele]){
					flag = false;
				}
			}
			for(var ele in data){
				l1++;
				keys1.push(ele);
			}
			if(l!=l1||!flag){
				return false;
			}else{
				return true;
			}
		}
		function batchAdd(data,id){
			var i;
			$.each(items,function(index,val){
				if(!val.len){
					if(val.day<data[0].day){
						i = index + 1;
					}
				}else{
					if(val.day<=data[0].day){
						i = index + 1;
					}
				}
			});
			var dataLen = data.length;
			for(j=0;j<dataLen;j++){
				items.splice(i,0,data.pop());
			}
			templates = $.templates(id);
			template = [];
			$.each(items, function(index, val) {
				template.push(templates.render(val));
			});
			clear();
			init(items,template);
		}
		function add(data,id){
			items = items.concat(data);
			items.sort(function(a,b){
				return a.day >= b.day;
			})
			templates = $.templates(id);
			template = [];
			$.each(items, function(index, val) {
			 	template.push(templates.render(val));
			});
			clear();
			if(localAttr){
				init(items,template,localAttr);
			}else{
				init(items,template);
			}
		}
		function replace(dataold,data,id){
			var i;
			$.each(items,function(index,val) {
				if(equals(val,dataold)){
					i =index;
				}
			});
			items.splice(i,1,data);
			templates = $.templates(id);
			template = [];
			$.each(items, function(index, val) {
			 	template.push(templates.render(val));
			});
			clear();
			if(localAttr){
				init(items,template,localAttr);
			}else{
				init(items,template);
			}
		}
		function del(data,id){
			var i;
			$.each(items,function(index,val) {
				if(new Date(val.day).getDate() == new Date(data.day).getDate() && new Date(val.day).getMonth() == new Date(data.day).getMonth()){
					if(data.busId){
						if(data.busId == val.busId){
							i = index;
						}
					}else{
						i =index;
					}
				}
			});
			items.splice(i,1);
			templates = $.templates(id);
			template = [];
			$.each(items, function(index, val) {
			 	template.push(templates.render(val));
			});
			clear();
			if(localAttr){
				init(items,template,localAttr);
			}else{
				init(items,template);
			}
		};
		replaceall(data,id);
		return {
			replaceall:replaceall,
			del:del,
			add:add,
			replace:replace,
			batchAdd:batchAdd
		}
	}
})(jQuery);