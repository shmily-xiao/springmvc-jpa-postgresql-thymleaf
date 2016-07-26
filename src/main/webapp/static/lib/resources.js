(function(){
	$.positioning=function(detailed){
		var map = new BMap.Map("map");
		var g = new BMap.Geocoder();
		var navigationControl = new BMap.NavigationControl({
			anchor: BMAP_ANCHOR_TOP_LEFT,
			type: BMAP_NAVIGATION_CONTROL_ZOOM,
			enableGeolocation: true
		});
		map.addControl(navigationControl);
		$('.map_title span span').html('定位中…');
		function failed(){
			g.getPoint('天府广场',function(point){
				if (point) {
					var x = point.lng;
					var y = point.lat;
					$('.map_title input').eq(0).val(detailed).attr('title',detailed);
					$('.longitude input').val('');
					$('.latitude input').val('');
					$('.positioning').removeClass('active');
					map.centerAndZoom(new BMap.Point(x, y),15);
					var marker = new BMap.Marker(new BMap.Point(x,y));
					map.addOverlay(marker);
					marker.enableDragging();
					marker.addEventListener("dragend", function(e){
						$('.map_title input').eq(0).val(detailed).attr('title',detailed);
						$('.longitude input').val(e.point.lng);
						$('.latitude input').val(e.point.lat);
						$('.map_title span span').html('定位成功');
						$('.positioning').addClass('active');
					})
				}
			},'成都市')
		}
		if (!$.trim(detailed)) {
			$('.map_title span span').html('定位失败');
			$('.positioning').removeClass('active');
			failed();
		}else{
			g.getPoint(detailed,function(point){
				if (point) {
					var x = point.lng;
					var y = point.lat;
					$('.positioning').addClass('active');
					$('.map_title input').eq(0).val(detailed).attr('title',detailed);
					$('.longitude input').val(x);
					$('.latitude input').val(y);
					$('.map_title span span').html('定位成功');
					map.centerAndZoom(new BMap.Point(x, y),15);
					var marker = new BMap.Marker(new BMap.Point(x,y));
					map.addOverlay(marker);
					marker.enableDragging();
					marker.addEventListener("dragend", function(e){
						$('.map_title input').eq(0).val(detailed).attr('title',detailed);
						$('.longitude input').val(e.point.lng);
						$('.latitude input').val(e.point.lat);
					})
				}else{
					$('.map_title input').eq(0).val(detailed).attr('title',detailed);
					$('.longitude input').val('');
					$('.latitude input').val('');
					$('.map_title span span').html('定位失败');
					failed();
				};
			})
			map.enableScrollWheelZoom(true);
		}
	}
})(jQuery);
$(document).ready(function(){
	$('.supplier_info .add').parent().click(function(event) {
		$(this).parents('.supplier_info').before($(this).parents('.supplier_info').clone().addClass('clear').find('>span:last').remove().end().append('<span class="del">删除</span><span class="wrong"><span class="wrongicon"></span><span class="wrongmsg">不能为空</span></span><div class="clear"></div>'));
	});
	function map_address(){
		var mad;
		var designation = $('input[name=name]').val();
		if($('input[name=address]').val() == ''){
			mad =  ($('#province').val()!='0'?$('#province').find('option:selected').text():'') + ($('#city').val()!='0'?$('#city').find('option:selected').text():'') + ($('#country')!='0'?$('#country').find('option:selected').text():'') + designation;
		}else{
			mad = ($('#province').val()!='0'?$('#province').find('option:selected').text():'') + ($('#city').val()!='0'?$('#city').find('option:selected').text():'') + ($('#country')!='0'?$('#country').find('option:selected').text():'') + $('input[name=address]').val();
		}
		return mad
	}
	$('.positioning').click(function(event) {
		var $this = $(this).parent('div').prev();
		$('.popover.bottom').show();
		var top = $(this).position().top+30,
			left = $(this).position().left-187;
		$('.popover.bottom').css({
			top: top,
			left: left
		});
		var map_address_detailed=map_address();
		$.positioning(map_address_detailed);
		$('.map_title button:first').unbind('click').bind('click',function(){
			map_address_detailed=map_address();
			$.positioning(map_address_detailed);
		})
	});
	$('#province,#city,#country').change(function(event) {
		var map_address_detailed=map_address();
		$.positioning(map_address_detailed);
	});
	$('input[name=address],input[name=name]').focusout(function(event) {
		var map_address_detailed=map_address();
		$.positioning(map_address_detailed);
	});
	$('.map_title button:last').click(function(event) {
		$('.popover.bottom').hide();
		event.preventDefault();
	});
	$(document).on('click','.supplier_info .del',function(event) {
		$(this).parents('.supplier_info').remove();
	});
})