/**
 * Created by lijun on 2015/11/26.
 */
function pagination(searchobj, url) {
    var html = '<form id="pagerform" action="'+url+'" method="get">';
    for(key in searchobj) {
        if(key == "index") {
            var current = searchobj[key];
            $('span[action-type=page]').each(function() {
                if($(this).attr('data-value') == current) {
                    $(this).addClass('pager-current');
                }
            });
        }
        if(searchobj[key]!=null) {
            html += '<input type="hidden" name="' + key + '" value="'+searchobj[key]+'" />'
        }
    }
    html += "</form>";
    $('.table_footer').append(html);
};
$(function () {
    function p(page) {
        $('input[name=index]').val(page);
        $('#pagerform').submit();
    };
    $('span[action-type=page]').click(function (e) {
        p($(e.target).attr('data-value'));
    });
});