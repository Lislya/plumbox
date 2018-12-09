var uid = '';
var menu = '';
var selectedLi;

function creditCardValid() {
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
            selectedItem(selectedLi);
            break;
        case 'uOrder':
            uOrder(data);
            selectedItem(selectedLi);
            break;
        case 'uSettings':
            uSettings();
            selectedItem(selectedLi);
            break;
        case 'uSupport':
            uSupport();
            selectedItem(selectedLi);
            break;
        case 'uManageOrder':
            uManageOrder(data);
            selectedItem(selectedLi);
            break;
        case 'uManageStaff':
            uManageStaff();
            selectedItem(selectedLi);
            break;
        case 'uManageProduct':
            getCategory(uManageProduct);
            selectedItem(selectedLi);
            break;
        case 'uStatistic':
            uStatistic();
            selectedItem(selectedLi);
            break;
    }
}

function selectedItem(item) {
    $('li > a').removeClass('catalog_item_selected');
    $('li:eq(' + item + ') > a').addClass('catalog_item_selected');
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
                $('#payment-alert').html(out).css('display', 'block');
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

function uStatistic() {
    let out;
    out = '<div class="statistic-container">';
    out += '<div class="loading">\n' +
        '            <div class="inner"><p class="ellipsis"></p></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="item" id="piechart">\n' +
        '            <div class="inner"><img src="img/icon/piechart_icon.png" alt=""><p>Piechart</p></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="item">\n' +
        '            <div class="inner"><p>Here you can watch shop statistic, measure your income and check TOP-10 products</p></div>\n' +
        '        </div>\n' +
        '        <div class="item" id="barchart">\n' +
        '            <div class="inner"><img src="img/icon/bar_chart_icon.png" alt=""><p>Barchart</p></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="item" id="income">\n' +
        '            <div class="inner"><img src="img/icon/income_icon.png" alt=""><p>Income</p></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="item" id="top-product">\n' +
        '            <div class="inner"><img src="img/icon/top_product_icon.png" alt=""><p>Top-10</p></div>\n' +
        '        </div>';
    out += '</div>';
    $('.col-9').html(out);
}

function uManageStaff() {
    //show Staff management menu
    let out;
    out = '<div class="statistic-container">';
    out += '<div class="loading">\n' +
        '            <div class="inner"><p class="ellipsis"></p></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="item" id="seller">\n' +
        '            <div class="inner"><img src="img/icon/add_seller_menu_icon.png" alt=""><p>Shop Assistant</p></div>\n' +
        '        </div>\n' +
        '\n' +
        '        <div class="item">\n' +
        '            <div class="inner"><p>Here you can manage shop staff. Pay attention when adding new members to the application</p></div>\n' +
        '        </div>\n' +
        '        <div class="item" id="owner">\n' +
        '            <div class="inner"><img src="img/icon/add_owner_icon.png" alt=""><p>Shop Owner</p></div>\n' +
        '        </div>\n' +
        '        <div class="item" id="administrator">\n' +
        '            <div class="inner"><img src="img/icon/add_administrator_icon.png" alt=""><p>Admin</p></div>\n' +
        '        </div>';
    out += '</div>';
    $('.col-9').html(out);
}

function uManageOrder(data) {
    //show list of all orders for managing
    let order_list = JSON.parse(data); //order list
    let text; //product list
    let out;
    out = '<div class="order-container">';
    out += '<div class="col-sm-2 layout"><p>ID Order</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>STATUS</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>DELIVERY</p></div>\n' +
        '                    <div class="col-sm-2 layout"><p>DATE</p></div>\n' +
        '                    <div class="col-sm-3 layout"><p>PRODUCTS</p></div>';

    //define order status
    for (let key in order_list) {
        var order_status;
        switch (order_list[key].order_stat) {
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
        for (let key in order_list) {
            var delivery_status;
            switch (order_list[key].delivery_stat) {
                case 0:
                    delivery_status = 'Self Pickup';
                    break;
                case 1:
                    delivery_status = "Delivery";
                    break;
            }
        }
        //user's orders output
        //select for order status changing
        let select_order_status = '<select>' +
            '<option selected disabled hidden>' + order_status + '</option>' +
            '<option value="">Booked</option>' +
            '<option value="">Shipped</option>' +
            '<option value="">Delivered</option>' +
            '<option value="">Refund</option>' +
            '</select>';
        out += '<div class="col-sm-2 order"><p>' + key + '</p></div>';
        // out += '<div class="col-sm-2 order"><p>' + order_status + '</p></div>';
        out += '<div class="col-sm-2 order">' + select_order_status + '</div>';
        out += '<div class="col-sm-2 order"><p >' + delivery_status + '</p></div>';
        out += '<div class="col-sm-2 order"><p>' + order_list[key].date + '</p></div>';
        //show order product button
        out += '<div class="col-sm-3 order"><button type="button"' +
            ' data-status="' + order_status + '" data-order="' + key + '" class="dialog_state button">SHOW</button></div>';

    }

    out += '<div class="order-update">\n' +
        '                <button type="button" id="order_update" class="button">UPDATE</button>\n' +
        '            </div>';

    out += '</div>'; //close div - order container
    //pop up window
    out += '<div class="dialog">';
    out += '<div class="dlg-wrap" >';
    out += ' <div id="dlg-close"  role="button"><i>×</i></div>';
    out += '<div id="dlg-content" class="dlg-content"></div>';
    out += '</div>';
    out += '</div>';
    out += '</div>';

    $('.col-9').removeClass('personal-container').html(out);

    //show product pop up window
    $('.dialog_state').on('click', function () {
        text = '';
        let id_order = $(this).attr('data-order');
        for (let prod in order_list[id_order].product) {
            text += '<p>' + prod + ' × ' + order_list[id_order].product[prod].quantity + ' --- ' + order_list[id_order].product[prod].price + ' &#8381' + '</p>';
        }
        $('.dlg-content').html(text); //show product list for the order
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

function uManageProduct(category) {
    //show product control menu
    let out = '';
    category = JSON.parse(category);
    out += '<div class="product-control-container">';
    for (let id in category) {
        // language=HTML
        out += `<div class="card  border-dark" data-card="${category[id]}" data-cat-id="${id}">
                <div class="card-header bg-dark">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" data-tab="main" href="#">Main</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " data-tab="add" href="#">Add</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " data-tab="update" href="#">Update</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " data-tab="remove" href="#">Remove</a>
                        </li>
                    </ul>
                </div>
                <div class="card-image">
                    <img src="img/icon/${category[id]}_card_icon.png" alt="" class="card-img-top icon-card-img">
                </div>
                <div class="card-body ">
                    <h5 class="card-title">${firstUpperCase(category[id])} category management</h5>
                    <p class="card-text">Here you can <span class="text-success">add</span> new ${category[id]}s, <span
                                class="text-warning">update</span> prices & quantity,
                        <span class="text-danger">remove</span> old slots. Be careful while and pay much attention.</p>
                    <!--                    <a href="#" class="btn btn-primary">Go somewhere</a>-->
                </div>
                <div class="card-footer">
                    <small class="text-muted">${firstUpperCase(category[id])}</small>
                </div>
            </div>`
    }
    out += '</div>'; //close product-control-container div
    $('.col-9').attr('class', 'col-9').html(out);
    fadeCard();
    $('.nav-link').on('click', function (e) {
        e.preventDefault(); //remove reload from clicking on hypertext
        let cardTabVal = $(this).attr('data-tab');
        let card = $(this).closest('.card'); //search for closest parent with card class
        let cardImg = $(this).closest('.card-header').siblings('.card-image').find('img'); //search card image elem
        let cardVal = card.attr('data-card'); //category name card
        let cardCatId = card.attr('data-cat-id');
        changeCardState(cardTabVal, cardVal, cardImg, cardCatId);
        $(this).attr('class', 'nav-link active'); //set active style for active nav tab
    });
}

function fadeCard() {
    //show fade cards
    let card = $('.card');
    card.css('animation', `fadein 1s ease-in-out`);
    for (let i = 1; i < card.length; i++) {
        card.eq(i).css('animation', `fadein 1s ease-in-out ${i * 100}ms`).css('animation-fill-mode', 'both');
    }
}

function changeCardState(cardTab, cardVal, cardImg, cardCatId) {
    let out = '', list = '';
    let border, header;
    let footer = $(`div [data-card="${cardVal}"]>.card-footer`);
    let body = $(`div[data-card="${cardVal}"]>.card-body`);
    switch (cardTab) {
        case 'main':
            cardImg.show();
            header = 'card-header bg-dark';
            border = 'card border-dark';
            out += `<h5 class="card-title">${firstUpperCase(cardVal)} category management</h5>`;
            out += `<p class="card-text">Here you can <span class="text-success">add</span> new ${cardVal}s, <span
                    class="text-warning">update</span> prices & quantity,
                    <span class="text-danger">remove</span> old slots. Be careful while and pay much attention.</p>`;
            body.html(out);
            footer.html(`<small class="text-muted">${firstUpperCase(cardVal)}</small>`).show();
            break;
        case 'add':
            cardImg.hide();
            footer.hide();
            header = 'card-header bg-success';
            border = 'card border-success';
            out += '<h5 class="card-title">Add ' + cardVal + '</h5>';
            out += '<form class="card-text" enctype="multipart/form-data" method="post">';
            out += '<label for="name_product">Product:</label>\n' +
                '                        <div class="form-group">\n' +
                '                            <input type="text" name="name_product" id="name_product" placeholder="Product Name"\n' +
                '                                   class="form-control-sm form-control">\n' +
                '                        </div>\n' +
                '                        <div class="form-row">\n' +
                '                            <div class="form-group col-sm-6">\n' +
                '                                <input type="text" id="vendor" name="vendor" placeholder="Vendor Code"\n' +
                '                                       class="form-control-sm form-control">\n' +
                '                            </div>\n' +
                '                            <div class="form-group col-sm-6">\n' +
                '                                <input type="number" id="quantity" name="quantity" placeholder="Quantity" class="form-control-sm form-control">\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="form-row">\n' +
                '                            <div class="form-group col-sm-6">\n' +
                '                                <input type="text" id="price_b" name="price_b" placeholder="Purchase Price"\n' +
                '                                       class="form-control form-control-sm">\n' +
                '                            </div>\n' +
                '                            <div class="form-group col-sm-6">\n' +
                '                                <input type="text" name="price_s" id="price_s" placeholder="Market Price"\n' +
                '                                       class="form-control form-control-sm">\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <textarea name="description" id="description" cols="30" rows="1" class="form-control"\n' +
                '                                          placeholder="Product Description"></textarea>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div class="form-row file-add">\n' +
                '                            <div class="custom-file col-sm-7">\n' +
                '                                <input type="file" class="form-control-file custom-file-input" id="product_img"\n' +
                '                                       name="product_img[]" multiple accept="image/jpeg">\n' +
                '                                <label class="custom-file-label" for="product_img">Choose file...</label>\n' +
                '                            </div>\n' +
                '                            <div class="col-sm-5 filename">\n' +
                '                                <ul id="file-list"></ul>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <a href="#" class="btn btn-success add-btn">Add</a>\n' +
                '                </div>';
            out += '</form>';
            body.html(out);
            break;
        case 'update':
            header = 'card-header bg-info';
            border = 'card border-info';
            $.ajax({
                type: "POST",
                url: "function/core.php",
                data: {action: "getUpdateProductList", category_id: cardCatId},
                success: function (response) {
                    list += getUpdateProductList(response);
                    cardImg.hide();
                    footer.show();
                }
            }).then(function () {
                out += `<h5 class="card-title">Update Slot</h5>
                    <form class="card-text" method="post">
                        <label for="name_product">Product:</label>
                        <div class="form-group">
                            <select id="name_product_${cardVal}" data-placeholder="Choose product" tabindex="2"
                                    class="chosen-select">
                                <option value=""></option>
                                ${list}
                            </select>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <input type="text" name="price_s" id="price_s_${cardVal}" placeholder="Market Price"
                                       class="form-control form-control-sm">
                            </div>
                            <div class="form-group col-sm-6">
                                <input type="number" id="quantity_${cardVal}" name="quantity" placeholder="Quantity"
                                       class="form-control-sm form-control">
                            </div>
                        </div>
                        <div class="form-group">
                                <textarea name="description" id="description_${cardVal}" cols="30" rows="3" class="form-control"
                                          placeholder="Product Description"></textarea>
                        </div>
                        <a href="#" class="btn btn-info add-btn">Update</a>`;
                body.html(out);
                $(`.chosen-select`).chosen({no_results_text: "Oops, found nothing!"});
                $(`#name_product_${cardVal}`).on('change',{category:cardVal},showProdUpdateInfo);
            });
            break;
        case 'remove':
            header = 'card-header bg-danger';
            border = 'card border-danger';
            $.ajax({
                type: "POST",
                url: "function/core.php",
                data: {action:"getUpdateProductList",category_id: cardCatId},
                success: function (response) {
                    cardImg.hide();
                    footer.show();
                    list = getUpdateProductList(response);
                }
            }).then(function () {
                out += ` <h5 class="card-title">Remove Slot</h5>
                    <form class="card-text" method="post">
                        <label for="name_product">Product:</label>
                        <div class="form-group">
                            <select id="name_product_${cardVal}" data-placeholder="Choose product" tabindex="2"
                                    class="chosen-select">
                                <option value=""></option>
                                ${list}
                            </select>
                        </div>
                            <div class="form-group ">
                                <input type="text" name="vendor" id="vendor_${cardVal}" placeholder="Vendor Code"
                                       class="form-control form-control-sm" disabled>
                            </div>
                        <div class="form-group">
                                <textarea name="warning" id="warning" cols="30" rows="3" class="form-control"
                                          placeholder="Be very careful! Pay much attention! Here you can delete product from the database of the shop" disabled></textarea>
                        </div>
                        <a href="#" class="btn btn-danger add-btn">Remove</a>`;
                body.html(out);
                $('.chosen-select').chosen({no_results_text: "Oops! Nothing found!"});
                $(`#name_product_${cardVal}`).on('change',{category: cardVal},showProdUpdateInfo);
            });
            break;
    }
    $(`div[data-card="${cardVal}"]>.card-header>.nav>.nav-item>.nav-link`).attr('class', 'nav-link');
    $(`div[data-card="${cardVal}"]`).attr('class', border);
    $(`div[data-card="${cardVal}"]>.card-header`).attr('class', header);
    // body.html(out);
    $('#product_img').on('change', imgList); //show img names
    $('#vendor').on('keydown', onlyNums); //only nums
    $('#quantity').on('keydown', onlyNums); //only nums



}

function showProdUpdateInfo(event) {
    let idProd = $(`#name_product_${event.data.category} option:selected`).val();
    $.ajax({
        type: "POST",
        url: "function/core.php",
        data: {action: "showUpdateInfo",id_prod: idProd},
        success: function (response) {
            response = JSON.parse(response);
            $(`#price_s_${event.data.category}`).attr('placeholder',response.price_s);
            $(`#quantity_${event.data.category}`).attr('placeholder',response.quantity);
            $(`#description_${event.data.category}`).html(response.description);
            $(`#vendor_${event.data.category}`).attr('placeholder',response.vendor_code);
        }
    });

}

function getUpdateProductList(response) {
    response = JSON.parse(response);
    let out = '';
    for (let id in response) {
        out += `<option value="${id}">${response[id].name_product}</option>`;
    }
    return out;
}

function getCategory(callback) {
    //get category list
    $.post({
        url: "function/core.php",
        data: {action: "getCategory"},
        success: function (response) {
            callback(response);
        }
    });
}

function firstUpperCase(str) {
    str = str[0].toUpperCase() + str.substr(1).toLowerCase();
    return str;
}

function imgList() {
    //get file names in file input for product images
    for (let i = 0; i < this.files.length; i++) {
        $('#file-list').append('<li>' + this.files[i].name + '</li>');
    }
}

function onlyNums(evt) {
    //only nums in vendor code input
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    if (key >= 96 && key <= 105) {
        return;
    } else if (key >= 37 && key <= 40) {
        return;
    } else if (key == 8 || key == 46) {
        return;
    }
    key = String.fromCodePoint(key);
    let regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) {
            theEvent.preventDefault();
        }
    }
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
    let $li = $('li');
    $li.on('click', (function () {
        menu = $(this).attr('data-option');
        selectedLi = $li.index(this);
        if (menu) {
            init(menu, uid);
        }
    }));

});