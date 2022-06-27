if (!window.Counters) {
    window.Counters = {};
}

Counters.tableHeaderN = '<table class="table table-condensed"><tr><th><b>Name</b></th><th><b>Group</b></th><th><b>Count1</b></th><th><b>Count2</b></th><th><b>Total</b></th></tr>';
Counters.tableFooterN = '</table>';
Counters.tableHeaderG1 = '<table class="table table-condensed"><tr><th class="group-name" colspan="4"><b>[ ';
Counters.tableHeaderG2 = ' ]</b></th></tr><tr><th><b>Name</b></th><th><b>Count 1</b></th><th><b>Count 2</b></th><th><b>Total</b></th></tr>';
Counters.tableFooterG = '</table>';

Counters.counterTotal1 = 0;
Counters.counterTotal2 = 0;
Counters.counterTotal = 0;

$(function () {
    Counters.updateTotals();
    Counters.populateByName('desc');

    $('#name-asc').click(function () { Counters.populateByName('asec'); });
    $('#group-asc').click(function () { Counters.populateByGroup('asec'); });

    $('#name-desc').click(function () { Counters.populateByName('desc'); });
    $('#group-desc').click(function () { Counters.populateByGroup('desc'); });

    // $('.js-anchor-name').click(Counters.populateByName);
    // $('.js-anchor-group').click(Counters.populateByGroup);
});

Counters.updateTotals = function () {
    artists().each(function (item) {
        Counters.counterTotal1 += item.counter1;
        Counters.counterTotal2 += item.counter2;
        Counters.counterTotal += item.counter;
    });
}

Counters.populateByName = function (direction) {
    Counters.turnOn(1);
    Counters.populateByNameDiv('#counter-1-div', direction, 1);
    Counters.populateByNameDiv('#counter-2-div', direction, 2);
    Counters.populateByNameDiv('#counter-div', direction, 0);
}

Counters.showAscDesc = function () {
    $('.js-asc-desc').show();
}

Counters.populateByNameDiv = function (divId, direction, counterType) {
    var $div = $(divId);
    var string = Counters.tableHeaderN;

    var orderBy = counterType === 1 ? 'counter1 ' + direction : (counterType === 2 ? 'counter2 ' + direction : 'counter ' + direction);

    artists().order(orderBy).each(function (item) {
        string += Counters.populateRowByName(item, counterType);
    });

    string += '<tr class="success"><td></td><td></td><td class="td-right"><b>' + Counters.counterTotal1
        + '</b></td><td class="td-right"><b>' + Counters.counterTotal2
        + '</b></td><td class="td-right"><b>' + Counters.counterTotal + '</b></td></tr>';

    string += Counters.tableFooterN;
    $div.html(string);
}

Counters.getCss = function (counter) {
    return counter >= 10 ? 'danger' : (counter === 0 ? 'warning' : 'info');
}

Counters.populateRowByName = function (item, counterType) {
    var cssStyle = counterType === 1 ? Counters.getCss(item.counter1) : (counterType === 2 ? Counters.getCss(item.counter2) : Counters.getCss(item.counter));
    var string = '<tr class="' + cssStyle + '">';
    string += '<td>' + item.name + '</td>';
    string += '<td>' + item.groupName + '</td>';
    string += '<td class="td-right">' + (counterType === 1 ? Common.b1 : '') + item.counter1 + (counterType === 1 ? Common.b2 : '') + '</td>';
    string += '<td class="td-right">' + (counterType === 2 ? Common.b1 : '') + item.counter2 + (counterType === 2 ? Common.b2 : '') + '</td>';
    string += '<td class="td-right">' + (counterType === 0 ? Common.b1 : '') + item.counter + (counterType === 0 ? Common.b2 : '') + '</td>';
    string += '</tr>';
    return string;
}

Counters.turnOn = function (position) {
    switch (position) {
        case 1:
            $('.js-anchor-name').removeClass('bold').addClass('bold');
            $('.js-anchor-group').removeClass('bold');
            break;
        case 2:
            $('.js-anchor-name').removeClass('bold');
            $('.js-anchor-group').removeClass('bold').addClass('bold');
            break;
    }
}

Counters.populateByGroup = function (direction) {
    Counters.turnOn(2);
    var groupNameArr = Counters.filterGroupNames(direction);
    Counters.populateByGroupDiv('#counter-1-div', groupNameArr, direction, 1);
    Counters.populateByGroupDiv('#counter-2-div', groupNameArr, direction, 2);
    Counters.populateByGroupDiv('#counter-div', groupNameArr, direction, 0);
}

Counters.filterGroupNames = function (direction) {
    var groupNameArr = [];
    artists().order('groupName ' + direction).each(function (item) {
        if (!groupNameArr.includes(item.groupName)) {
            groupNameArr.push(item.groupName);
        }
    });
    return groupNameArr;
}

Counters.populateByGroupDiv = function (divId, groupNameArray, direction, counterType) {
    var $div = $(divId);
    var string = '';

    var orderBy = counterType === 1 ? 'counter1 ' + direction : (counterType === 2 ? 'counter2 ' + direction : 'counter ' + direction);
    orderBy += ', name asc';

    for (var i = 0; i < groupNameArray.length; i++) {
        string += Counters.tableHeaderG1;
        var gName = groupNameArray[i];
        string += gName + Counters.tableHeaderG2;

        var c1 = 0, c2 = 0, c = 0;

        artists({ groupName: gName }).order(orderBy).each(function (item) {
            var cssStyle = counterType === 1 ? Counters.getCss(item.counter1) : (counterType === 2 ? Counters.getCss(item.counter2) : Counters.getCss(item.counter));
            string += '<tr class="' + cssStyle + '">';
            string += '<td>' + item.name + '</td>';
            string += '<td class="td-right">' + (counterType === 1 ? Common.b1 : '') + item.counter1 + (counterType === 1 ? Common.b2 : '') + '</td>';
            string += '<td class="td-right">' + (counterType === 2 ? Common.b1 : '') + item.counter2 + (counterType === 2 ? Common.b2 : '') + '</td>';
            string += '<td class="td-right">' + (counterType === 0 ? Common.b1 : '') + item.counter + (counterType === 0 ? Common.b2 : '') + '</td>';
            string += '</tr>';

            c1 += item.counter1;
            c2 += item.counter2;
            c += item.counter;
        });

        string += '<tr class="success"><td></td><td class="td-right"><b>' + c1 + '</b></td><td class="td-right"><b>' + c2 + '</b></td><td class="td-right"><b>' + c + '</b></td></tr>';

        string += Counters.tableFooterG;
    }

    $div.html(string);
}