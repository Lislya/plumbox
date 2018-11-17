$(function () {
    $(document).ready(function () {


            custom_dialog_toggle();
    });
});

function custom_dialog_toggle(text) {

    if (typeof text !== 'undefined') {
        $('#dlg-content').html(text);
    }
}
