var uid = '';
var menu = '';
var selectedLi;
var files;
//load the Visualization API ane corechart package
google.charts.load('current', {'packages': ['corechart']});
google.charts.load('current', {'packages': ['bar']});


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
    //show Statistic menu
    let out = '';
    out += `<div class="statistic-container">
    <div class="loading">
        <div class="inner"><p class="ellipsis"></p></div>
    </div>

    <div class="item" id="piechart">
        <div class="inner"><img src="img/icon/piechart_icon.png" alt="">
            <p>Piechart</p></div>
    </div>

    <div class="item" id="description-side">
        <div class="inner"><p>Here you can watch shop statistic, measure your income and check TOP-5 products</p></div>
    </div>
    <div class="item" id="barchart">
        <div class="inner"><img src="img/icon/bar_chart_icon.png" alt="">
            <p>Barchart</p></div>
    </div>

    <div class="item" id="top-list">
        <div class="inner"><img src="img/icon/top_product_icon.png" alt="">
            <p>Products</p></div>
    </div>

    <div class="item" id="top-product">
        <div class="card border-dark" id="card-statistic">
            <div class="card-header bg-dark text-light">
                <h5 class="text-center">Piechart</h5>
            </div>
            <div class="card-body" id="body-statistic"><h5 class="card-title text-center"></h5><div id="card-chart"></div><div id="card-list"></div></div>
           
            <div class="card-footer">
                <small class="text-muted">Piechart</small>
            </div>
        </div>
    </div>
</div>`;
    $('.col-9').attr('class', 'col-9').html(out);
    $('.statistic-container').flip({
        axis: 'y',
        trigger: 'manual',
        front: '#description-side',
        back: '#top-product',
        autoSize: false
    });
    $('.item:not("#description-side,#top-product")').on('click', function () {
        statisticFlip(($(this).attr('id')));
    });
}

function statisticFlip(card) {
    $('#card-list').hide();
    let chart = $('#card-chart');
    $('.statistic-container').flip('toggle');
    let title = '';
    let header = firstUpperCase(card);
    let cardBackside = $('#card-statistic');
    switch (card) {
        case 'piechart':
            chart.show()
            title += `Shop's category product distribution`;
            $.ajax({
                type: "POST",
                url: 'function/core.php',
                data: {action: "productDistribution"},
                success: function (response) {
                    response = JSON.parse(response);
                    drawCardPiechart(response);
                }
            });
            cardBackside.find('.card-footer').show();
            break;
        case 'barchart':
            chart.show();
            title += `Company Performance`;
            $.ajax({
                typr: "POST",
                url: 'function/core.php',
                data: {action: "companyPerformance"},
                success: function (response) {
                    response = JSON.parse(response);
                    drawCardBarchart(response);
                }
            });
            cardBackside.find('.card-footer').show();
            break;
        case 'top-list':
            title += `The most popular products`;
            $.ajax({
                type: 'POST',
                url: "function/core.php",
                data: {action: 'topProduct'},
                success: function (response) {
                    response = JSON.parse(response);
                    showTop(response);
                }
            });
            cardBackside.find('.card-footer').hide();
            break;
    }
    cardBackside.find('.text-center').html(header);
    cardBackside.find('.card-title').html(title);
    cardBackside.find('.text-muted').html(card);
}

function drawCardPiechart(product) {
    //draw google piechart for product distribution
    let data = new google.visualization.DataTable(); //create data for piechart
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Quantity');

    for (let category in product) {
        data.addRow([category, product[category]]);
    }
    let options = {
        title: 'Shop Categories',
        chartArea: {'width': '100%'},
        titlePosition: 'none'
    };
    let chart = new google.visualization.PieChart($('#card-chart')[0]);
    chart.draw(data, options);

}

function drawCardBarchart(statistic) {
    let data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', 'Sales');
    data.addColumn('number', 'Expenses');
    data.addColumn('number', 'Profit');
    data.addRow(['2018', statistic.sales, statistic.expenses, statistic.profit]);

    let chart = new google.charts.Bar($('#card-chart')[0]);

    chart.draw(data, null);
}

function showTop(topList) {
    //show top list in statistic page
    let out = `<ul class="list-group">`;
    // language=HTML
    for (let product in topList) {
        out += `
            <li class="list-group-item">
                <span class="top-prod-name">${product}</span>
                <span class="badge badge-primary badge-pill float-right">${topList[product]}</span>
            </li>`;
    }
    out += `</ul>`;
    $('#card-chart').hide();
    $("#card-list").html(out).show();
}

function uManageStaff() {
    //show Staff management menu
    let out = '';
    out += `<div class="seller-flip">
    <div class="statistic-container">
        <div class="loading">
            <div class="inner"><p class="ellipsis"></p></div>
        </div>

        <div class="item" id="seller">
            <div class="inner"><img src="img/icon/add_seller_menu_icon.png" alt="">
                <p>Shop Assistant</p></div>
        </div>
        <div class="item" id="frontside">
            <div class="inner">
                <p>Here you can manage shop staff. Pay attention when adding new members to the application</p>
            </div>
        </div>

        <div class="item" id="owner">
            <div class="inner"><img src="img/icon/add_owner_icon.png" alt="">
                <p>Shop Owner</p></div>
        </div>
        <div class="item" id="administrator">
            <div class="inner"><img src="img/icon/add_administrator_icon.png" alt="">
                <p>Admin</p></div>
        </div>
        <div class="item" id="backside">
            <div class="card card-staff border-dark">
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
                <div class="card-image"></div>
                <div class="card-body "></div>
                <div class="card-footer"></div>
            </div>
        </div>
        <div class="item" id="seller-backside">
            <div class="card card-optional border-muted">
                <div class="card-header optional-header bg-muted text-center"><p>Some additional fields</p></div>
                <div class="card-body"></div>
            </div>
        </div>
    </div>
</div>`;
    let staff;
    $('.col-9').attr('class', 'col-9').html(out);
    $('.seller-flip').flip({
        axis: 'x',
        trigger: 'manual',
        front: '#seller',
        back: '#seller-backside',
        autoSize: false
    });
    $('.statistic-container').flip({ //card-staff flip
        axis: 'y',
        trigger: 'manual',
        front: '#frontside',
        back: '#backside',
        autoSize: false
    });
    $('.item:not("#frontside,#backside,#seller-backside")').on('click', function () {
        let role = $(this).attr('id');
        staff = Flip(role);
    });
    $('.nav-link').on('click', function (e) {
        e.preventDefault(); //remove reload from clicking on hypertext
        let cardTab = $(this).attr('data-tab');
        changeTab(cardTab, staff);
    });
}

function Flip(role) {
    $('.card-staff').attr('data-role', role);
    //flip card and define main tab
    let staff = {};
    staff.img = `img/icon/add_${role}_card_icon.png`;
    staff.role = role;
    switch (role) {
        case 'administrator':
            staff.id = 0;
            break;
        case 'owner':
            staff.id = 1;
            break;
        case 'seller':
            staff.id = 2;
            break;
    }
    changeTab('main', staff);
    $('.statistic-container').flip('toggle');
    $('.seller-flip').flip(false);
    return staff;
}

function changeTab(cardTab, staff) {
    let card = $('.card-staff');
    let header = '', border = '', body = '', img = '', sellerBackside = '', list = '';
    let footer = `<small class="text-muted">${firstUpperCase(staff.role)}</small>`;
    let sellerFlip = $('.seller-flip');
    switch (cardTab) {
        case 'main':
            header = 'card-header bg-dark';
            border = 'card card-staff border-dark';
            img = `<img src="${staff.img}" alt="" class="card-img-top icon-card-img">`;
            body += `<h5 class="card-title">${firstUpperCase(staff.role)}'s control panel</h5>
                        <p class="card-text">Here you can <span class="text-success">add</span> new ${staff.role}s, <span
                                    class="text-warning">update</span> their data,
                            <span class="text-danger">hire</span>. Be careful while and pay much attention.</p>`;
            sellerFlip.flip(false);
            card.find('.card-body').html(body);
            break;
        case 'add':
            header = 'card-header bg-success';
            border = 'card card-staff border-success';
            body = `<h5 class="card-title">Add new ${firstUpperCase(staff.role)}</h5>
<form method="post">
    <div class="form-row">
        <div class="form-group col-sm-6">
            <input type="text" name="name" id="name" placeholder="Name" class="form-control-sm form-control" required>
        </div>
        <div class="form-group col-sm-6">
            <input type="text" name="s_name" id="s_name" placeholder="Surname" class="form-control form-control-sm" required>
        </div>
        <div class="form-group col-sm-6">
            <input type="email" name="email" id="email" placeholder="Email" class="form-control form-control-sm" required>
            <small id="alert_email" class="alert-danger" style="display: none;"></small>
        </div>
        <div class="form-group col-sm-6">
            <input type="text" name="username" id="username" placeholder="Username" class="form-control form-control-sm" required>
            <small id="alert_username" class="alert-danger" style="display: none;"></small>
        </div>
        <div class="form-group col-sm-6">
            <input type="password" name="password" id="password" placeholder="Password" class="form-control form-control-sm" required>
            <small id="alert_password" class="alert-danger" style="display: none;"></small>
        </div>
        <div class="form-group col-sm-6">
            <input type="password" name="repass" id="repassword" placeholder="Re-enter Password" class="form-control form-control-sm" required>
            <small id="alert_repassword" class="alert-danger" style="display: none;"></small>
        </div>
        <div class="form-group col-sm-6">
            <input type="date" name="d_birth" id="d_birth"  title="Birthday" class="form-control form-control-sm" required>
        </div>
        <div class="form-group col-sm-6">
            <input type="text" name="tel" id="tel" placeholder="Telephone" class="form-control form-control-sm">
        </div>
    </div>
    <a href="#" id="add-staff" class="btn btn-success add-btn">Add</a>
</form>`;
            // language=HTML
            sellerBackside = `
                <form method="post">
                    <div class="form-row">
                        <div class="form-group col-sm-6">
                            <input type="text" id="passport-num" name="passport-num" placeholder="Passport Number"
                                   class="form-control "
                                   required>
                        </div>
                        <div class="form-group col-sm-6">
                            <input type="date" id="passport-date" name="passport-date" placeholder="Passport Date"
                                   title="Passport Date"
                                   class="form-control"
                                   required>
                        </div>
                    </div>
                    <div class="form-group">
        <textarea id="passport-given" name="passport-given" rows="1" placeholder="Passport District"
                  class="form-control"
                  required></textarea>
                    </div>
                </form>`;
            sellerFlip.flip(true);
            card.find('.card-body').html(body);
            $('#seller-backside').find('.card-body').html(sellerBackside);
            $('#username').on('change', usernameValid).on('keyup', hideAlertUsername);
            $('#email').on('change', emailValid).on('keyup', hideAlertEmail);
            $('#password').on('keyup', passValid);
            $('#repassword').on('keyup', repassValid);
            $('#add-staff').on('click', addStaff);
            break;
        case 'update':
            header = 'card-header bg-info';
            border = 'card card-staff border-info';
            $.ajax({
                type: 'POST',
                url: 'function/core.php',
                data: {action: "getStaffList", id_role: staff.id},
                success: function (response) {
                    list += getStaffList(response);
                }
            }).then(function () {
                // language=HTML
                body = `<h5 class="card-title">Update ${staff.role} Info</h5>
<form method="post">
    <div class="form-group">
        <select id="email" class="chosen-select" tabindex="2" data-placeholder="Enter ${staff.role}'s email">
        <option value=""></option>
        ${list}
        </select>
    </div>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <input type="text" name="name" id="name" placeholder="Name" class="form-control form-control-sm" disabled>
        </div>
        <div class="form-group col-sm-6">
            <input type="text" name="s_name" id="s_name" placeholder="Surname" class="form-control form-control-sm" disabled>
        </div>
    </div>
    <div class="form-group">
        <input type="text" name="tel" id="tel" placeholder="Telephone" class="form-control form-control-sm">
    </div>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <input type="password" name="old-password" id="old-password" placeholder="Old password" class="form-control form-control-sm">
            <small id='alert-old-pass' style="display: none;"></small>
        </div>
        <div class="form-group col-sm-6">
            <input type="password" name="password" id="password" placeholder="New password" class="form-control form-control-sm">
            <small id="alert_password" class="alert-danger" style="display: none;"></small>
        </div>
    </div>
    <a href="#" id="update-staff" class="btn btn-info add-btn">Update</a>
</form>`;
                // language=HTML
                sellerBackside = `
                    <form method="post">
                        <div class="form-row">
                            <div class="form-group col-sm-6">
                                <input type="text" id="passport-num" name="passport-num" placeholder="Passport Number"
                                       class="form-control "
                                       disabled>
                            </div>
                            <div class="form-group col-sm-6">
                                <input type="date" id="passport-date" name="passport-date"
                                       title="Passport Date"
                                       class="form-control"
                                       disabled>
                            </div>
                        </div>
                        <div class="form-group">
        <textarea id="passport-given" name="passport-given" rows="1" placeholder="Passport District"
                  class="form-control"
                  disabled></textarea>
                        </div>
                    </form>`;
                sellerFlip.flip(true);
                card.find('.card-body').html(body);
                $('#seller-backside').find('.card-body').html(sellerBackside);
                $(`.chosen-select`).chosen({no_results_text: "Oops, found nothing!"}); //chosen lib activate
                $('#tel').on('keydown', onlyNums);
                $('#email').on('change', showStaffInfo);
                $('#password').on('keyup', passValid);
                $('#update-staff').on('click', updateStaff);
            });

            break;
        case 'remove':
            header = 'card-header bg-danger';
            border = 'card card-staff border-danger';
            // language=HTML
            $.ajax({
                type: 'POST',
                url: 'function/core.php',
                data: {action: "getStaffList", id_role: staff.id},
                success: function (response) {
                    list += getStaffList(response);
                }
            }).then(function () {
                body = `<h5 class="card-title">Remove ${staff.role} account</h5>
<form method="post">
    <div class="form-group">
        <select id="email" class="chosen-select" tabindex="2" data-placeholder="Enter ${staff.role}'s email">
            <option value=""></option>
            ${list}
        </select>
    </div>
    <div class="form-row">
        <div class="form-group col-sm-6">
            <input type="text" name="name" id="name" placeholder="Name" class="form-control form-control-sm" disabled>
        </div>
        <div class="form-group col-sm-6">
            <input type="text" name="s_name" id="s_name" placeholder="Surname" class="form-control form-control-sm" disabled>
        </div>
    </div>
    <div class="form-group">
        <input type="text" name="passport-num" id="passport-num" placeholder="Passport number" class="form-control form-control-sm" disabled>
    </div>
    <a href="#" id="remove-staff" class="btn btn-danger add-btn">Delete account</a>
    <small class="text-danger">Warning! You may delete wrong person!</small>
</form>`;
                sellerFlip.flip(false);
                card.find('.card-body').html(body);
                $(`.chosen-select`).chosen({no_results_text: "Oops, found nothing!"}); //chosen lib activate
                $('#email').on('change', showStaffInfo);
                $('#remove-staff').on('click', removeStaff);
            });
            break;
    }
    //set optional fields
    card.find('.nav-link').attr('class', 'nav-link'); //set links not active
    card.find(`a[data-tab="${cardTab}"]`).attr('class', 'nav-link active'); //set active link
    card.find('.card-header').attr('class', header); //set header style

    card.find('.card-image').html(img); //set cart img
    // card.find('.card-body').html(body); //set cart body
    card.find('.card-footer').html(footer); //set card footer
    $(`input[type="date"]`).tooltip({placement: "top"}); //tooltip for date input
    $('#tel').on('keydown', onlyNums); //check only nums in tel input
    $('#passport-num').on('keydown', onlyNums); // only nums in passport number input
}

function getStaffList(response) {
    response = JSON.parse(response);
    let out = '';
    for (let id in response) {
        out += `<option value="${id}">${response[id]}</option>`;
    }
    return out;
}

function showStaffInfo() {
    //show info about certain staff
    let idStaff = $(`#email option:selected`).val();
    $.ajax({
        type: 'POST',
        url: 'function/core.php',
        data: {action: "showStaffInfo", uid: idStaff},
        success: function (response) {
            response = JSON.parse(response);
            $('form #name').attr('placeholder', response.name);
            $('form #s_name').attr('placeholder', response.s_name);
            if (response.tel == null || response.tel == '') {
                $('form #tel').attr('placeholder', 'None');
            } else {
                $('form #tel').attr('value', response.tel);
            }
            if (response.passport_num == null) {
                $('form #passport-num').attr('value', 'None');
                $('form #passport-date').attr('value', 'None');
                $('form #passport-given').attr('value', 'None');
            } else {
                $('form #passport-num').attr('value', response.passport_num);
                $('form #passport-date').attr('value', response.passport_date);
                $('form #passport-given').attr('placeholder', response.passport_given);
            }
        }
    });
}

function addStaff() {
    let card = $(this).closest('.card-staff');
    let staff = {
        name: $('#name').val(),
        s_name: $('#s_name').val(),
        username: $('#username').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        d_birth: $('#d_birth').val(),
        passport_num: $('#passport-num').val(),
        passport_date: $('#passport-date').val(),
        passport_given: $('#passport-given').val(),
    };
    switch (card.attr('data-role')) {
        case 'administrator':
            staff.id_role = 0;
            break;
        case 'owner':
            staff.id_role = 1;
            break;
        case 'seller':
            staff.id_role = 2;
            break;
    }
    for (let key in staff) {
        if (staff[key] === '') {
            return false;
        }
    }
    if ($(".alert-danger").css('display') === 'block') {
        return false;
    }
    staff.tel = $('#tel').val();
    staff = JSON.stringify(staff);
    $.ajax({
        post: 'post',
        url: 'function/core.php',
        data: {action: 'addStaff', staff: staff},
        success: function (e) {
            alert(e); //TODO успешное добавление пользователя
        }
    });

    return false;
}

function updateStaff() {
    let oldPass = $('#old-password');
    let newPass = $('#password');
    let staff = {
        email: $('#email option:selected').text(),
        tel: $('#tel').val(),
        oldPass: oldPass.val(),
        newPass: newPass.val()
    };
    if (staff.oldPass === '' || staff.newPass === '' || staff.email === '') {
        oldPass.tooltip({
            title: "Enter the fields, please",
            placement: 'top',
            trigger: 'manual'
        }).tooltip('show');
        setTimeout(function () {
            oldPass.tooltip('hide')
        }, 3000);
        return false;
    }
    staff = JSON.stringify(staff);
    $.ajax({
        type: 'post',
        url: 'function/core.php',
        data: {action: 'updateStaff', staff: staff},
        success: function (e) {
            alert(e); //TODO сделать оповещение о том, что информация изменилась
        }
    });

    return false;
}

function removeStaff() {
    let email = $('#email option:selected').text();
    if (email === '') {
        return false;
    }
    $.ajax({
        type: 'post',
        url: 'function/core.php',
        data: {action: 'removeStaff', email: email},
        success: function (e) {
            alert(e); //TODO сделать оповещение при удалении
        }
    });
    return false;
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
        let select_order_status = `
<select id="${key}" class="order-status">
    <option selected disabled hidden>${order_status}</option>
    <option value="0">Booked</option>
    <option value="1">Shipped</option>
    <option value="2">Delivered</option>
    <option value="3">Refund</option>
</select>`;
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

    $('.col-9').attr('class', 'col-9').html(out);

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
    let update_list = {}; //order update list
    $('.order-status').on('change', function () {
        update_list[this.id] = $(this).find('option:selected').val();
    });
    //update btn listener
    $('#order_update').on('click', {list: update_list}, updateOrderStatus);
}

function updateOrderStatus(event) {
    let updateList = JSON.stringify(event.data.list);
    $.ajax({
        type: 'post',
        url: 'function/core.php',
        data: {action: 'updateOrderStatus', list: updateList},
        success: function (e) {
            alert(e); //TODO сделать всплывающее окно о том, что статусы заказов изменились успешно
        }
    });
}

function uManageProduct(category) {
    //show product control menu
    let out = '';
    category = JSON.parse(category);
    out += '<div class="product-control-container">';
    for (let id in category) {
        // language=HTML
        out += `<div class="card border-dark" data-card="${category[id]}" data-cat-id="${id}">
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
                '                        <a href="#" class="btn btn-success add-btn" id="add-' + cardVal + '" data-category="' + cardVal + '">Add</a>\n' +
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
                        <a href="#" class="btn btn-info add-btn" id="update-${cardVal}" data-category="${cardVal}">Update</a>`;
                body.html(out);
                $(`.chosen-select`).chosen({no_results_text: "Oops, found nothing!"});
                $(`#name_product_${cardVal}`).on('change', {category: cardVal}, showProdUpdateInfo);
                $(`#price_s_${cardVal}`).on('keydown', onlyNums);
                $(`#quantity_${cardVal}`).on('keydown', onlyNums);
                $(`#update-${cardVal}`).on('click', updateProd); //click listener for update button
            });
            break;
        case 'remove':
            header = 'card-header bg-danger';
            border = 'card border-danger';
            $.ajax({
                type: "POST",
                url: "function/core.php",
                data: {action: "getUpdateProductList", category_id: cardCatId},
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
                        <a href="#" class="btn btn-danger add-btn" id="remove-${cardVal}" data-category="${cardVal}">Remove</a>`;
                body.html(out);
                $('.chosen-select').chosen({no_results_text: "Oops! Nothing found!"});
                $(`#name_product_${cardVal}`).on('change', {category: cardVal}, showProdUpdateInfo);
                $(`#remove-${cardVal}`).on('click', removeProd);
            });
            break;
    }
    $(`div[data-card="${cardVal}"]>.card-header>.nav>.nav-item>.nav-link`).attr('class', 'nav-link'); //set other tabs
    $(`div[data-card="${cardVal}"]`).attr('class', border); //set border
    $(`div[data-card="${cardVal}"]>.card-header`).attr('class', header); //set header
    $('#product_img').on('change', imgList); //show img names
    $('#vendor').on('keydown', onlyNums); //only nums
    $('#quantity').on('keydown', onlyNums); //only nums
    $('#price_s').on('keydown', onlyNums); //only nums
    $('#price_b').on('keydown', onlyNums); //only nums


    $(`#add-${cardVal}`).on('click', addNewProd); //listener for add new product button
}

function addNewProd() {
    let category = $(this).data('category'); //define card category
    let card = $(this).closest(`div [data-card="${category}"]`); //define card
    let product = {
        name_product: card.find('#name_product').val(),
        vendor: card.find('#vendor').val(),
        quantity: card.find('#quantity').val(),
        price_b: card.find('#price_b').val(),
        price_s: card.find('#price_s').val(),
        description: card.find('#description').val(),
        catId: card.attr('data-cat-id'),
        category: category
    };

    $.ajax({
        type: 'post',
        url: 'function/core.php',
        data: {action: 'addProd', product: JSON.stringify(product)},
        success: loadImg
    });

    return false;
}

function loadImg(e) {
    if (typeof files === 'undefined') {
        return;
    }
    let data = new FormData();
    $.each(files, function (key, value) {
        data.append(key, value);
    });

    data.append('img_upload', 1);
    data.append(e, 2);

    $.ajax({
        type: 'post',
        url: 'function/uploadhandler.php',
        data: data,
        cache: false,
        // dataType: 'json',
        processData: false,
        contentType: false,
        success: function (respond) {
            if (typeof respond.error === 'undefined') {
                alert('Addition was successful');
            } else {
                alert('Addition failed');
            }
        },
        error: function (jqXHR, status) {
            console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
        }
    });
}

function updateProd() {
    //update product information
    let category = $(this).data('category');
    let card = $(this).closest(`div [data-card="${category}"]`);
    let input = {}; //user input
    input.id_product = card.find(`#name_product_${category}`).val();
    input.price_s = card.find(`#price_s_${category}`).val();
    input.quantity = card.find(`#quantity_${category}`).val();
    input.description = card.find(`#description_${category}`).val();
    input = JSON.stringify(input);
    $.ajax({
        type: 'post',
        url: 'function/core.php',
        data: {action: 'updateProd', product: input},
        success: function (e) {
            alert(e); //TODO сделать всплывающее окно о том, что товар обновлен
        }
    });
    return false;
}

function removeProd() {
    let category = $(this).data('category');
    let card = $(this).closest(`div [data-card="${category}"]`);
    let input = card.find(`#name_product_${category} option:selected`).val(); //id of removing product
    $.ajax({
        type: 'post',
        url: 'function/core.php',
        data: {action: 'removeProd', id_product: input},
        success: function (e) {
            if (e == 1) {
                alert(e); //TODO сделать всплывающее окно при успешном/неуспешном удалении
            } else {
                alert(e);
            }
        }
    });
    return false;
}

function showProdUpdateInfo(event) {
    let idProd = $(`#name_product_${event.data.category} option:selected`).val();
    $.ajax({
        type: "POST",
        url: "function/core.php",
        data: {action: "showUpdateInfo", id_prod: idProd},
        success: function (response) {
            response = JSON.parse(response);
            $(`#price_s_${event.data.category}`).attr('value', response.price_s);
            $(`#quantity_${event.data.category}`).attr('value', response.quantity);
            $(`#description_${event.data.category}`).html(response.description);
            $(`#vendor_${event.data.category}`).attr('value', response.vendor_code);
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
    files = this.files;
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