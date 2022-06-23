if (!window.Favorites) {
    window.Favorites = {};
}

Favorites.tableHeaderB = '<table class="table table-condensed"><tr><th><b>Group</b></th><th><b>Name</b></th><th><b>Birth date</b></th><th><b>Age</b></th><th><b>Zodiac</b></th><th><b>Chinese</b></th></tr>';
Favorites.tableFooterB = '</table>';

Favorites.avg1 = 0;
Favorites.you1 = 0;
Favorites.old1 = 0;
Favorites.youName1 = '';
Favorites.oldName1 = '';
Favorites.total1 = 0;

Favorites.avg2 = 0;
Favorites.you2 = 0;
Favorites.old2 = 0;
Favorites.youName2 = '';
Favorites.oldName2 = '';
Favorites.total2 = 0;

$(function () {
    Favorites.updateTotals();
    Favorites.populateByGroup();
    $('#anchor-group').click(Favorites.populateByGroup);
    $('#anchor-name').click(Favorites.populateByName);
    $('#anchor-age').click(Favorites.populateByAge);
    $('#anchor-zodiac').click(Favorites.populateByZodiac);
    $('#anchor-chinese').click(Favorites.populateByChinese);
});

Favorites.updateTotals = function () {
    var countAges = 0;
    var sumAges = 0;
    var oldestBday = 21001231;
    var youngestBday = 19000101;
    biases({ person: 1 }).each(function (item) {
        countAges++;
        sumAges += item.age;
        if (item.birthDate <= oldestBday) {
            oldestBday = item.birthDate;
            Favorites.old1 = item.age;
            Favorites.oldName1 = item.name + '[ ' + item.groupName + ' ]';
        }
        if (item.birthDate >= youngestBday) {
            youngestBday = item.birthDate;
            Favorites.you1 = item.age;
            Favorites.youName1 = item.name + '[ ' + item.groupName + ' ]';
        }
    });
    Favorites.avg1 = sumAges / countAges;
    Favorites.total1 = countAges;

    countAges = 0;
    sumAges = 0;
    oldestBday = 21001231;
    youngestBday = 19000101;
    biases({ person: 2 }).each(function (item) {
        countAges++;
        sumAges += item.age;
        if (item.birthDate <= oldestBday) {
            oldestBday = item.birthDate;
            Favorites.old2 = item.age;
            Favorites.oldName2 = item.name + '[ ' + item.groupName + ' ]';
        }
        if (item.birthDate >= youngestBday) {
            youngestBday = item.birthDate;
            Favorites.you2 = item.age;
            Favorites.youName2 = item.name + '[ ' + item.groupName + ' ]';
        }
    });
    Favorites.avg2 = sumAges / countAges;
    Favorites.total2 = countAges;

    // console.log(Favorites.avg1.toFixed(2));
    // console.log(Favorites.you1);
    // console.log(Favorites.old1);
    // console.log(Favorites.youName1 );
    // console.log(Favorites.oldName1 );

    // console.log(Favorites.avg2.toFixed(2));
    // console.log(Favorites.you2);
    // console.log(Favorites.old2);
    // console.log(Favorites.youName2 );
    // console.log(Favorites.oldName2 );

}

Favorites.populateByGroup = function () {
    Favorites.turnOn(1);

    Favorites.populateByPerson(1, 'groupName, name', 1);
    Favorites.populateByPerson(2, 'groupName, name', 1);
}

Favorites.populateByPerson = function (person, orderBy, position) {
    $div = $('#biases-' + person + '-div');
    var string = Favorites.tableHeaderB;
    var previous = null;
    var cssName = 'info';
    biases({ person: person }).order(orderBy).each(function (item) {
        var change = Favorites.isChange(item, position, previous);
        if (change) {
            cssName = cssName === 'info' ? 'warning' : 'info';
        }
        string += '<tr class="' + cssName + '">'
        string += '<td>' + item.groupName + '</td>';
        string += '<td>' + item.name + '</td>';
        string += '<td>' + Common.fromYYYYMMDDToDDMMYYYY(item.birthDate) + '</td>';
        string += '<td>' + item.age + '</td>';
        string += '<td>' + item.zodiac + '</td>';
        string += '<td>' + item.chineseZodiac + '</td>';
        previous = Favorites.getPrevious(item, position);
    });

    string += Favorites.totalHtml(person);
    string += Favorites.tableFooterB;

    $div.html(string);
}

Favorites.totalHtml = function (person) {
    var string = '';
    if (person === 1) {
        string += '<tr class="danger"><td><b>Avg:</b> ' + Favorites.avg1.toFixed(2) + '</td><td><b>Youngest:</b> ' + Favorites.you1 + '</td><td><b>Oldest:</b> ' + Favorites.old1
            + '</td><td colspan=\"2\"><b>Total:</b> ' + Favorites.total1 + '</td><td></td></tr>';
        string += '<tr class="danger"><td colspan="3"><b>Youngest:</b> ' + Favorites.youName1 + '</td><td colspan="3"><b>Oldest:</b> ' + Favorites.oldName1 + '</td></tr>';
    } else if (person === 2) {
        string += '<tr class="danger"><td><b>Avg:</b> ' + Favorites.avg2.toFixed(2) + '</td><td><b>Youngest:</b> ' + Favorites.you2 + '</td><td><b>Oldest:</b> ' + Favorites.old2
            + '</td><td colspan=\"2\"><b>Total:</b> ' + Favorites.total2 + '</td><td></td></tr>';
        string += '<tr class="danger"><td colspan="3"><b>Youngest:</b> ' + Favorites.youName2 + '</td><td colspan="3"><b>Oldest:</b> ' + Favorites.oldName2 + '</td></tr>';
    }
    return string;
}

Favorites.isChange = function (item, position, previous) {
    switch (position) {
        case 1:
            return item.groupName !== previous;
        case 2:
            return item.name !== previous;
        case 3:
            return item.age !== previous;
        case 4:
            return item.zodiac !== previous;
        case 5:
            return item.chineseZodiac !== previous;
        default:
            return false;
    }
}

Favorites.getPrevious = function (item, position) {
    switch (position) {
        case 1:
            return item.groupName;
        case 2:
            return item.name;
        case 3:
            return item.age;
        case 4:
            return item.zodiac;
        case 5:
            return item.chineseZodiac;
        default:
            return null;
    }
}

Favorites.populateByName = function () {
    Favorites.turnOn(2);

    Favorites.populateByPerson(1, 'name, groupName', 2);
    Favorites.populateByPerson(2, 'name, groupName', 2);
}

Favorites.populateByAge = function () {
    Favorites.turnOn(3);

    Favorites.populateByPerson(1, 'age', 3);
    Favorites.populateByPerson(2, 'age', 3);
}

Favorites.populateByZodiac = function () {
    Favorites.turnOn(4);

    Favorites.populateByPerson(1, 'zodiacId', 4);
    Favorites.populateByPerson(2, 'zodiacId', 4);
}

Favorites.populateByChinese = function () {
    Favorites.turnOn(5);

    Favorites.populateByPerson(1, 'chineseZodiacId', 5);
    Favorites.populateByPerson(2, 'chineseZodiacId', 5);
}

Favorites.turnOn = function (position) {
    switch (position) {
        case 1:
            $('#anchor-group').removeClass('bold').addClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            break;
        case 2:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold').addClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            break;
        case 3:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold').addClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            break;
        case 4:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold').addClass('bold');
            $('#anchor-chinese').removeClass('bold');
            break;
        case 5:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold').addClass('bold');
            break;
    }
}