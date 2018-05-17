/**
 * [formatDate description]
 * @param  {[type]} timestamp [description]
 * @param  {[type]} timestyle [description]
 * @return {[type]}           [description]
 */
function formatDate(timestamp,timestyle){
    var date = new Date(timestamp),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        seconds = date.getSeconds(),
        timearr = timestyle.match(/[YMDhms]/g);
    month = (month<10) ? ('0' + month) : month;
    day = (day<10) ? ('0' + day) : day;
    hour = (hour<10) ? ('0' + hour) : hour;
    minute = (minute<10) ? ('0' + minute) : minute;
    seconds = (seconds<10) ? ('0' + seconds) : seconds;
    for(var i=0;i<timearr.length;i++){
        switch(timearr[i]){
            case 'Y': timestyle = timestyle.replace(/Y/,year);break;
            case 'M': timestyle = timestyle.replace(/M/,month);break;
            case 'D': timestyle = timestyle.replace(/D/,day);break;
            case 'h': timestyle = timestyle.replace(/h/,hour);break;
            case 'm': timestyle = timestyle.replace(/m/,minute);break;
            case 's': timestyle = timestyle.replace(/s/,seconds);break;
        }
    }
    return timestyle;
}
// formatDate(123321321321321,'Y-M-D h:m:s')

export default formatDate;
