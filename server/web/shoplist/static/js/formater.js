function currencyFormatted(amount) {
    var i = parseFloat(amount);
    if(isNaN(i)) { i = 0.00; }
    var minus = '';
    if(i < 0) { minus = '-'; }
    i = Math.abs(i);
    i = parseInt((i + .005) * 100);
    i = i / 100;
    s = new String(i);
    if(s.indexOf('.') < 0) { s += '.00'; }
    if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
    s = minus + s;
    return s;
}
function formatTimestamp(ts) {
    var d = new Date(ts*1000);
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDay() 
           + '  ' + d.getHours() + ':' + d.getMinutes() ;
}
