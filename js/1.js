// $(function () {
//     // Load the Visualization API and the corechart package.
//     google.charts.load('current', {'packages': ['corechart']});
//
//     // Set a callback to run when the Google Visualization API is loaded.
//     google.charts.setOnLoadCallback(drawChart);
//
//     // Callback that creates and populates a data table,
//     // instantiates the pie chart, passes in the data and
//     // draws it.
//     function drawChart() {
//
//         // Create the data table.
//         var data = new google.visualization.DataTable();
//         data.addColumn('string', 'Products');
//         data.addColumn('number', 'Quantity');
//         data.addRows([
//             ['Apple iPad Pro 12.9 256Gb', 3],
//             ['Acer Aspire Switch 10 V 564Gb', 1],
//             ['Sony Xperia XZ Dual', 1],
//             ['Quadcopter Walkera QR X350 Premium', 1],
//             ['PC DEXP Mars E180', 2]
//         ]);
//
//         // Set chart options
//         var options = {
//             'title': 'Plumbox Statistic',
//             'width': 500,
//             'height': 300
//         };
//
//         // Instantiate and draw our chart, passing in some options.
//         var chart = new google.visualization.PieChart($("#piechart")[0]);
//         chart.draw(data, options);
//     }
//
// });
var element, circle, d, x, y;
var i = 1;
var queue = [];

$(".inner").click(function (e) {
    element = $(this);

    // remove old items from queue and DOM
    // allow max 5 to be loaded
    if (queue.length > 5) {
        $("._" + queue.shift()).remove();
    }

    // Assume user can't click more than 1000 times / second
    //terrible overflow protection.
    if (i > 1000) {
        i = 0;
    }

    // add next item to queue
    i++;
    queue.push(i);

    // Build element
    element.append("<span class='circle _" + i + "'></span>");
    circle = element.find("._" + i);

    // Make it big enough to cover whole parent
    if (!circle.height() && !circle.width()) {
        d = Math.max(element.outerWidth(), element.outerHeight());
        circle.css({height: d, width: d});
    }

    // Get origin
    x = e.pageX - element.offset().left - circle.width() / 2;
    y = e.pageY - element.offset().top - circle.height() / 2;

    // Set location and animate
    circle.css({top: y + 'px', left: x + 'px'}).addClass("animate");
});

function imgList() {
    //get file names in file input for product images
    for (let i = 0; i < this.files.length; i++) {
        $('#file-list').append('<li>' + this.files[i].name + '</li>');
    }
}

function firstUpperCase(str) {
    str = str[0].toUpperCase() + str.substr(1).toLowerCase();
    return str;
}

function changeCardState(cardTab, cardVal, cardImg) {
    let out = '';
    let border, header;
    let footer = $(`div [data-card="${cardVal}"]>.card-footer`);
    switch (cardTab) {
        case 'main':
            cardImg.show();
            header = 'card-header bg-dark';
            border = 'card border-dark';
            out += `<h5 class="card-title">${firstUpperCase(cardVal)} category management</h5>`;
            out += `<p class="card-text">Here you can <span class="text-success">add</span> new ${cardVal}s, <span
                    class="text-warning">update</span> prices & quantity,
                    <span class="text-danger">remove</span> old slots. Be careful while and pay much attention.</p>`;
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
            break;
        case 'update':
            header = 'card-header bg-warning';
            border = 'card border-warning';
            break;
        case 'remove':
            header = 'card-header bg-danger';
            border = 'card border-danger';
            break;
    }
    $(`div[data-card="${cardVal}"]>.card-header>.nav>.nav-item>.nav-link`).attr('class', 'nav-link');
    $(`div[data-card="${cardVal}"]`).attr('class', border);
    $(`div[data-card="${cardVal}"]>.card-header`).attr('class', header);
    $(`div[data-card="${cardVal}"]>.card-body`).html(out);
    $('#product_img').on('change', imgList); //show img names

}

$(function () {
    $('.nav-link').on('click', function (e) {
        e.preventDefault(); //remove reload from clicking on hypertext
        let cardTabVal = $(this).attr('data-tab');
        let card = $(this).closest('.card'); //search for closest parent with card class
        let cardImg = $(this).closest('.card-header').siblings('.card-image').find('img'); //search card image elem
        let cardVal = card.attr('data-card');
        changeCardState(cardTabVal, cardVal, cardImg);
        $(this).attr('class', 'nav-link active'); //set active style for active nav tab
    });
    $('.chosen-select').chosen({no_results_text:"Oops, nothing found!"});
});