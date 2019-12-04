function switchStyle(title) {

    var link_list = document.getElementsByTagName('link');

    for (var i = 0, l = link_list.length; i < l; i++) {

        var rel = link_list[i].getAttribute('rel'),
            tmp_title = link_list[i].getAttribute('title');

        if (rel.indexOf('style') != - 1 && tmp_title)
            link_list[i].disabled = tmp_title != title;
    }

}

$('.styleswitcher-button').click(function() {

    var $styleswitcher = $('#styleswitcher');

    if ($styleswitcher.hasClass('styleswitcher-showed')) {
        $styleswitcher.removeClass('styleswitcher-showed');
    } else {
        $styleswitcher.addClass('styleswitcher-showed');
    }

});

$('#styleswitcher-dark-modals').on('change', function() {
    if ($(this).prop('checked') == true) $('.modal-dialog').addClass('modal-dark');
    else $('.modal-dialog').removeClass('modal-dark');
});