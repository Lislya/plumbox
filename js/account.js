var uid = '';
var menu = '';


function showMenu(data) {
    //show menu
    switch (menu) {

        case 'uPersonal':
            uPersonal(data);
            break;
        case 'uOrder':
            uOrder(data);
            break;
        case 'uSettings':
            uSettings(data);
            break;
        case 'uSupport':
            uSupport(data);
            break;
    }

}

function uPersonal(data) {
    //show Personal Information about user
    let out = '';
    var info = JSON.parse(data);
    out += '<h3>' + info['name'] + '</h3>';
    out += '<h3>' + info['s_name'] + '</h3>';
    out += '<h3>' + info['email'] + '</h3>';
    out += '<h3>' + info['tel'] + '</h3>';
    out += '<h3>' + info['role'] + '</h3>';
    out += '<h3>' + info['region'] + '</h3>';
    out += '<h3>' + info['city'] + '</h3>';
    out += '<h3>' + info['street'] + '</h3>';
    out += '<h3>' + info['house'] + '</h3>';
    out += '<h3>' + info['corp'] + '</h3>';
    out += '<h3>' + info['flat'] + '</h3>';
    out += '<h3>' + info['post_index'] + '</h3>';
    $('.col-9').html(out);
}

function uOrder(data) {
    // show order info

    var order = JSON.parse(data);
    console.log(order);
    let out = '';
    let text = '';
    out += '<div class="col-sm-2 layout"><p>ID Order</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>STATUS</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>DELIVERY</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>DATE</p></div>\n' +
        '                    <div class="col-sm-3 layout"><p>SHOW PRODUCTS</p></div>';
    for (let key in order) {
        switch (order[key].order_stat) {
            case 0:
                var status = 'Waiting for payment';
                break;
            case 1:
                status = 'Shipped';
                break;
            case 2:
                status = 'Delivered';
                break;
            case 3:
                status = 'Refund';
                break;
        }
        out += '<div class="col-sm-2 order"><p>' + key + '</p></div>';
        out += '<div class="col-sm-2 order"><p>' + status + '</p></div>';
        out += '<div class="col-sm-2 order"><p>' + order[key].delivery_stat + '</p></div>';
        out += '<div class="col-sm-2 order"><p>' + order[key].date + '</p></div>';
        out += '<div class="col-sm-3 order"><button type="button" class="dialog_state button"></button></div>';
        out += '<div class="dialog" id="dialog">';
        out += '<div class="dlg-wrap" id="dlg-wrap">';
        out += ' <label id="dlg-close"  for="dialog_state"><i>×</i></label>';
        out += '<div id=\'dlg-content\' class="dlg-content">ZHOPAZHOPAZHOPA</div>';
        out += '</div>';
        out += '</div>';
        out += '</div>';


        // for (let prod in order[key].product) {
        //     text += order[id].product[prod].quantity + ' × ' + prod + ' --- ' + order[key].product[prod].price;
        // }

    }

    $('.col-9').css('display', 'flex').css('flex-wrap', 'wrap').css('align-content', 'flex-start').html(out);
    $('.dlg-content').html(text);

}


function init(menu, uid) {
    $.post({
        url: "function/core.php",
        data: {action: menu, uid: uid},
        success: showMenu
    });
}



$(document).ready(function () {
    $.post({
        url: "function/core.php",
        data: {action: "getSession"},
        success: function (response) {
            uid = response;
        }
    });

    $('li').on('click', (function () {
        menu = $(this).attr('data-option');
        if (menu) {
            init(menu, uid);
        }
    }));
});