if (!window.Favorites) {
    window.Favorites = {};
}

Favorites.cardHeader = '<div class="thumbnail"><div class="caption">';
Favorites.cardFooter = '</div></div>';

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
    Favorites.populateByGroup('asec');
    // $('#anchor-group').click(Favorites.populateByGroup);
    // $('#anchor-name').click(Favorites.populateByName);
    // $('#anchor-age').click(Favorites.populateByAge);
    // $('#anchor-zodiac').click(Favorites.populateByZodiac);
    // $('#anchor-chinese').click(Favorites.populateByChinese);
    // $('#anchor-city').click(Favorites.populateByCity);
    // $('#anchor-country').click(Favorites.populateByCountry);
    // $('#anchor-agency').click(Favorites.populateByAgency);

    $('#group-asc').click(function () { Favorites.populateByGroup('asec'); });
    $('#name-asc').click(function () { Favorites.populateByName('asec'); });
    $('#age-asc').click(function () { Favorites.populateByAge('asec'); });
    $('#zodiac-asc').click(function () { Favorites.populateByZodiac('asec'); });
    $('#chinese-asc').click(function () { Favorites.populateByChinese('asec'); });
    $('#city-asc').click(function () { Favorites.populateByCity('asec'); });
    $('#country-asc').click(function () { Favorites.populateByCountry('asec'); });
    $('#agency-asc').click(function () { Favorites.populateByAgency('asec'); });

    $('#group-desc').click(function () { Favorites.populateByGroup('desc'); });
    $('#name-desc').click(function () { Favorites.populateByName('desc'); });
    $('#age-desc').click(function () { Favorites.populateByAge('desc'); });
    $('#zodiac-desc').click(function () { Favorites.populateByZodiac('desc'); });
    $('#chinese-desc').click(function () { Favorites.populateByChinese('desc'); });
    $('#city-desc').click(function () { Favorites.populateByCity('desc'); });
    $('#country-desc').click(function () { Favorites.populateByCountry('desc'); });
    $('#agency-desc').click(function () { Favorites.populateByAgency('desc'); });

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
}

Favorites.populateByGroup = function (direction) {
    Favorites.turnOn(1);
    Favorites.populateByPerson(1, 'groupName ' + direction + ', name', 1);
    Favorites.populateByPerson(2, 'groupName ' + direction + ', name', 1);
}

Favorites.populateByPerson = function (person, orderBy, position) {
    $div = $('#biases-' + person + '-div');
    var string = '';

    var previous = null;
    var firstTime = true;
    biases({ person: person }).order(orderBy).each(function (item) {
        if (firstTime) {
            previous = Favorites.getPrevious(item, position);
            string += '<div class="thumbnail"><div class="caption"><div class="row"><div class="col-md-12"><a href="javascript:void(0);" style="color:brown;"><b>' + previous + '</b></a></div></div></div></div>';
            firstTime = false;
        } else {
            var change = Favorites.isChange(item, position, previous);
            previous = Favorites.getPrevious(item, position);
            if (change) {
                string += '<div class="thumbnail"><div class="caption"><div class="row"><div class="col-md-12"><a href="javascript:void(0);" style="color:brown;"><b>' + previous + '</b></a></div></div></div></div>';
            }
        }

        string += Favorites.cardHeader;

        string += '<div class="row"><div class="col-md-12"><h4><a href="javascript:void(0);"><b>';
        string += item.name + ' - ' + item.groupName;
        string += '</b></a></h4></div></div>';

        string += '<div class="row">';
        string += '<div class="col-md-3"><b>Birthday:</b><br/>' + Common.fromYYYYMMDDToDDMMYYYY(item.birthDate) + '</div>';
        string += '<div class="col-md-2"><b>Age:</b><br/>' + item.age + '</div>';
        string += '<div class="col-md-3"><b>Country:</b><br/>' + item.country + '</div>';
        string += '<div class="col-md-4"><b>Real Name:</b><br/>' + item.realName + '</div>';
        string += '</div>';

        string += '<div class="row">';
        string += '<div class="col-md-3"><b>Zodiac:</b><br/>' + item.zodiac + '</div>';
        string += '<div class="col-md-2"><b>Chinese:</b><br/>' + item.chineseZodiac + '</div>';
        string += '<div class="col-md-3"><b>City:</b><br/>' + item.city + '</div>';
        string += '<div class="col-md-4"><b>Agency:</b><br/>' + item.agency + '</div>';
        string += '</div>';

        string += '<div class="row">';
        string += '<div class="col-md-12"><b>Positions:</b><br/>' + item.positions + '</div>';
        string += '</div>';

        string += Favorites.cardFooter;

        previous = Favorites.getPrevious(item, position);
    });

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
        case 6:
            return item.city !== previous;
        case 7:
            return item.country !== previous;
        case 8:
            return item.agency !== previous;
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
        case 6:
            return item.city;
        case 7:
            return item.country;
        case 8:
            return item.agency;
        default:
            return null;
    }
}

Favorites.populateByName = function (direction) {
    Favorites.turnOn(2);

    Favorites.populateByPerson(1, 'name ' + direction + ', groupName', 2);
    Favorites.populateByPerson(2, 'name ' + direction + ', groupName', 2);
}

Favorites.populateByAge = function (direction) {
    Favorites.turnOn(3);

    Favorites.populateByPerson(1, 'birthDate ' + direction, 3);
    Favorites.populateByPerson(2, 'birthDate ' + direction, 3);
}

Favorites.populateByZodiac = function (direction) {
    Favorites.turnOn(4);

    Favorites.populateByPerson(1, 'zodiacId ' + direction, 4);
    Favorites.populateByPerson(2, 'zodiacId ' + direction, 4);
}

Favorites.populateByChinese = function (direction) {
    Favorites.turnOn(5);

    Favorites.populateByPerson(1, 'chineseZodiacId ' + direction, 5);
    Favorites.populateByPerson(2, 'chineseZodiacId ' + direction, 5);
}

Favorites.populateByCity = function (direction) {
    Favorites.turnOn(6);

    Favorites.populateByPerson(1, 'city ' + direction, 6);
    Favorites.populateByPerson(2, 'city ' + direction, 6);
}

Favorites.populateByCountry = function (direction) {
    Favorites.turnOn(7);

    Favorites.populateByPerson(1, 'country ' + direction, 7);
    Favorites.populateByPerson(2, 'country ' + direction, 7);
}

Favorites.populateByAgency = function (direction) {
    Favorites.turnOn(8);

    Favorites.populateByPerson(1, 'agency ' + direction, 8);
    Favorites.populateByPerson(2, 'agency ' + direction, 8);
}

Favorites.turnOn = function (position) {
    switch (position) {
        case 1:
            $('#anchor-group').removeClass('bold').addClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            $('#anchor-city').removeClass('bold');
            $('#anchor-country').removeClass('bold');
            $('#anchor-agency').removeClass('bold');
            break;
        case 2:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold').addClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            $('#anchor-city').removeClass('bold');
            $('#anchor-country').removeClass('bold');
            $('#anchor-agency').removeClass('bold');
            break;
        case 3:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold').addClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            $('#anchor-city').removeClass('bold');
            $('#anchor-country').removeClass('bold');
            $('#anchor-agency').removeClass('bold');
            break;
        case 4:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold').addClass('bold');
            $('#anchor-chinese').removeClass('bold');
            $('#anchor-city').removeClass('bold');
            $('#anchor-country').removeClass('bold');
            $('#anchor-agency').removeClass('bold');
            break;
        case 5:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold').addClass('bold');
            $('#anchor-city').removeClass('bold');
            $('#anchor-country').removeClass('bold');
            $('#anchor-agency').removeClass('bold');
            break;
        case 6:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            $('#anchor-city').removeClass('bold').addClass('bold');
            $('#anchor-country').removeClass('bold');
            $('#anchor-agency').removeClass('bold');
            break;
        case 7:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            $('#anchor-city').removeClass('bold');
            $('#anchor-country').removeClass('bold').addClass('bold');
            $('#anchor-agency').removeClass('bold');
            break;
        case 8:
            $('#anchor-group').removeClass('bold');
            $('#anchor-name').removeClass('bold');
            $('#anchor-age').removeClass('bold');
            $('#anchor-zodiac').removeClass('bold');
            $('#anchor-chinese').removeClass('bold');
            $('#anchor-city').removeClass('bold');
            $('#anchor-country').removeClass('bold');
            $('#anchor-agency').removeClass('bold').addClass('bold');
            break;
    }
}