var uid = '';
var menu = '';

function creditCardValid(){
    //Credit Card Widget
    var $front = $('#front'); // front side of the CC
    var $bankLink = $('#bank-link'); // backside of the CC
    var $brandLogo = $('#brand-logo'); //logo of payment system | VISA, MASTERCARD
    var $number = $('#number'); // CC number
    var $code = $('#code'); // CVV|CVC
    $number.on('keyup change paste', function () {
        var cardInfo = new CardInfo($number.val()); //CardInfo Object
        if (cardInfo.bankUrl) {
            $bankLink
                .attr('href', cardInfo.bankUrl)
                .css('backgroundImage', 'url("' + cardInfo.bankLogo + '")')
                .show();
        } else {
            $bankLink.hide();
        }
        $front
            .css('background', cardInfo.backgroundGradient)
            .css('color', cardInfo.textColor);
        $code.attr('placeholder', cardInfo.codeName ? cardInfo.codeName : '');
        $number.mask(cardInfo.numberMask);
        if (cardInfo.brandLogo) {
            $brandLogo
                .attr('src', cardInfo.brandLogo)
                .attr('alt', cardInfo.brandName)
                .show();
        } else {
            $brandLogo.hide();
        }
    }).trigger('keyup');

}

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
            uSettings();
            break;
        case 'uSupport':
            uSupport();
            break;
    }
}

function uPersonal(data) {
    //show Personal Information about user
    $('.col-9').removeClass('order-container') //reset container
    let out = '';
    var info = JSON.parse(data);
    switch (info.id_role) {
        case 0:
            out += '<div class="item1"><img src="img/icon/person_admin_icon.png"></div>';
            break;
        case 1:
            out += '<div class="item1"><img src="img/icon/person_owner_icon.png"></div>';
            break;
        case 2:
            out += '<div class="item1"><img src="img/icon/person_seller_icon.png"></div>';
            break;
        case 3:
            out += '<div class="item1"><img src="img/icon/person_icon.png"></div>';
            break;
    }
    out += '<div  class="item2"><p>Your name:</p></div>';
    out += '<div class="item3"><p>Telephone:</p><p>Email:</p></div>';
    out += '<div class="item4">Delivery Address:</div>';
    out += '<div class="item5">' + info.role + '</div>';
    out += '<div class="item6">Post Index:</div>';
    out += '<div class="item7"> ' + info.name + ' ' + info.s_name + '</div>';
    out += '<div class="item8">';
    if (info.tel !== '') {
        out += '<p>+ ' + info.tel + '</p>';
    } else {
        out += '<p>Not Specified</p>';
    }
    out += '<p>' + info.email + '</p>';
    out += '</div>';
    if (info.addr_stat === 1) {
        out += '<div class="item9"> ' + info.region + ', ' + info.city + ', ' + info.street + ', ' + info.house + info.corp + ', flat ' + info.flat + '</div>';
        out += '<div class="item10">' + info.post_index + '</div>';
    } else {
        out += '<div class="item9">Not Specified</div>';
        out += '<div class="item10">Not Specified</div>';
    }


    $('.col-9').addClass('personal-container').html(out);
}

function uOrder(data) {
    // show order info

    var order = JSON.parse(data); //parse order JSON information
    $('.col-9').removeClass('personal-container') //reset output container
    let out = ''; //html output
    let text = ''; //list of products in a pop up window

    //order container header
    out += '<div class="col-sm-2 layout"><p>ID Order</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>STATUS</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>DELIVERY</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>DATE</p></div>\n' +
        '                    <div class="col-sm-3 layout"><p>PRODUCTS</p></div>';

    //define order status
    for (let key in order) {
        var order_status;
        switch (order[key].order_stat) {
            case 0:
                order_status = 'Booked';
                break;
            case 1:
                order_status = 'Shipped';
                break;
            case 2:
                order_status = 'Delivered';
                break;
            case 3:
                order_status = 'Refund';
                break;
        }

        //define delivery status
        for (let key in order) {
            var delivery_status;
            switch (order[key].delivery_stat) {
                case 0:
                    delivery_status = 'Self Pickup';
                    break;
                case 1:
                    delivery_status = "Delivery";
                    break;
            }
        }
        //user's orders output
        out += '<div class="col-sm-2 order"><p>' + key + '</p></div>';
        out += '<div class="col-sm-2 order"><p>' + order_status + '</p></div>';
        out += '<div class="col-sm-2 order"><p >' + delivery_status + '</p></div>';
        out += '<div class="col-sm-2 order"><p>' + order[key].date + '</p></div>';
        //show order product button
        out += '<div class="col-sm-3 order"><button type="button"' +
            ' data-status="' + order_status + '" data-order="' + key + '" class="dialog_state button">SHOW</button></div>';

    }
    //pop up window
    out += '<div class="dialog">';
    out += '<div class="dlg-wrap" >';
    out += ' <div id="dlg-close"  role="button"><i>×</i></div>';
    out += '<div id="dlg-content" class="dlg-content"></div>';
    out += '</div>';
    out += '</div>';
    out += '</div>';

    //add style to container and output the orders
    $('.col-9').addClass('order-container').html(out);

    //show product pop up window
    $('.dialog_state').on('click', function () {
        text = '';
        let id_order = $(this).attr('data-order');
        for (let prod in order[id_order].product) {
            text += '<p>' + prod + ' × ' + order[id_order].product[prod].quantity + ' --- ' + order[id_order].product[prod].price + ' &#8381' + '</p>';
        }
        if ($(this).attr('data-status') === "Booked") {
            text += '<button class="btn button payment">CONFIRM PAYMENT</button>';
        }
        $('.dlg-content').html(text); //show product list for the order
        $('.payment').on('click', {id_order: id_order}, paymentPopup); //show payment window for booked orders
        $('.dialog').attr('id', 'dialog'); //add id "dialog" to div with dialog class
        $('.dlg-wrap').attr('id', 'dlg-wrap'); //add dlg-wrap id to div with dialog-wrap class
        $('.order').css('filter', 'blur(5px)'); //blur effect
    });


    //close pop up
    $('#dlg-close').on('click', function () {
        text = '';
        $('.dialog').removeAttr('id');
        $('.dlg-wrap').removeAttr('id');
        $('.order').css('filter', 'none');
    });
}

function paymentPopup(event) {
    $('#dlg-close').trigger('click'); //close product list
    let out = '<div class="modal-dialog">\n' +
        '                        <div class="modal-content">\n' +
        '                            <div class="modal-header">\n' +
        '                                <h4>Payment</h4>\n' +
        '                                <button class="close" type="button" data-dismiss="modal">×</button>\n' +
        '                            </div>\n' +
        '                            <div class="modal-body mbody">\n' +
        '                                <div class="alert alert-success" id="payment-alert" style="display:none;"></div>\n' +
        '                                <!--CC Widget-->\n' +
        '                                <div id="cards">\n' +
        '                                    <div id="front">\n' +
        '                                        <a target="_blank" href="#" id="bank-link"></a>\n' +
        '                                        <img src="" alt="" id="brand-logo">\n' +
        '                                        <div id="front-fields">\n' +
        '                                            <input class="field" id="number" type="text"\n' +
        '                                                   placeholder="0000 0000 0000 0000">\n' +
        '                                            <label class="label">Valid until</label>\n' +
        '                                            <input class="field expired" id="mm" type="text" placeholder="MM">\n' +
        '                                            <input class="field expired" id="yy" type="text" placeholder="YY">\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div id="back">\n' +
        '                                        <input class="field" id="code" type="password" placeholder="">\n' +
        '                                        <label id="code-label" class="label">CVV/CVC</label>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="modal-footer">\n' +
        '                                <div id="sum">Sum: <span id="summ">1682243 Р</span></div>\n' +
        '                                <button id="change-stat" class="btn btn-success btn-sm">PAY</button>\n' +
        '                        </div>\n' +
        '                    </div>';
    $('#payment').html(out);
    creditCardValid();
    $.ajax({
        url: "function/core.php",
        type: "POST",
        data: {action: "checkSum", id_order: event.data.id_order},
        success: function (response) {
            let out = response + ' ₽';
            $('#summ').html(out);
            $('#payment').modal();
        }
    });
    $('#change-stat').on('click', {id_order: event.data.id_order}, payment);
}

function payment(event) {
    function close() {
        $('.close').trigger('click'); //close payment window
        $('li:eq(1)').trigger('click'); //reload order page
    }

    $.ajax({
        url: "function/core.php",
        data: {action: 'payment', id_order: event.data.id_order},
        success: function (response) {
            if (response == 1) {
                let out = 'Your payment succeed';
                $('#payment-alert').html(out).css('display','block');
                setTimeout(close, 5000);
            }
        }
    });
}


function uSupport() {
    let out = '';
    out += '<div id="form-main">\n' +
        '                    <div id="form-div">\n' +
        '                        <form class="form" id="form1" method="post">\n' +
        '\n' +
        '                            <p class="name">\n' +
        '                                <input name="name" type="text" class="feedback-input" placeholder="Name" id="name" />\n' +
        '                            </p>\n' +
        '\n' +
        '                            <p class="email">\n' +
        '                                <input name="email" type="email" class="feedback-input" id="email" placeholder="Email" />\n' +
        '                            </p>\n' +
        '\n' +
        '                            <p class="text">\n' +
        '                                <textarea name="text" class="feedback-input" id="comment" placeholder="Comment"></textarea>\n' +
        '                            </p>\n' +
        '                            \n' +
        '                            <div class="submit">\n' +
        '                                <input type="button" value="SEND" id="button-blue"/>\n' +
        '                                <div class="ease"></div>\n' +
        '                            </div>\n' +
        '                        </form>\n' +
        '                    </div>';
    $('.col-9').removeClass('personal-container').removeClass('order-container').html(out);
    $('#button-blue').click(function () {
        console.log($('#form1').serialize());
        $.post({
            url: "function/core.php",
            data: {action: "uSupport", data: $('#form1').serialize()},
        });
    });

}

function init(menu, uid) {
    $.post({
        url: "function/core.php",
        data: {action: menu, uid: uid},
        success: showMenu
    });
}


$(document).ready(function () {
    // show number of products if cart is not empty
    if (localStorage.getItem('count') > 0) {
        $('#cart-widget').addClass('cart-widget').html(localStorage.getItem('count'));
    } else {
        $('#cart-widget').removeClass('cart-widget');
    }
    //get id_username
    $.post({
        url: "function/core.php",
        data: {action: "getSession"},
        success: function (response) {
            uid = response;
        }
    });

    //menu clicker
    $('li').on('click', (function () {
        menu = $(this).attr('data-option');
        if (menu) {
            init(menu, uid);
        }
    }));
});