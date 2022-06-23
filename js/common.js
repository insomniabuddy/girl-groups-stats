if (!window.Common) {
    window.Common = {};
}

Common.b1 = '<b>';
Common.b2 = '</b>';

Common.fromYYYYMMDDToDDMMYYYY = function (intDate) {
    var stringDate = intDate.toString();
    return stringDate.substring(6, 8) + '/' + stringDate.substring(4, 6) + '/' + stringDate.substring(0, 4);
}