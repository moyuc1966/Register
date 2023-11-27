//格式化时间 -- 年月日
function formatDate(time) {
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
        (month < 10 ? '0' + month : month) + '-' +
        (day < 10 ? '0' + day : day)
    return newTime;
}

// 格式化时间，年月日时分秒
function formatDateTime(time) {
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
        (month < 10 ? '0' + month : month) + '-' +
        (day < 10 ? '0' + day : day) + ' ' +
        (hour < 10 ? '0' + hour : hour) + ':' +
        (min < 10 ? '0' + min : min) + ':' +
        (sec < 10 ? '0' + sec : sec);
    return newTime;
}
//获取上一周第一天和最后一天
function PrevWeek() {
    const Time = new Date()
    let weekNum = Time.getDay()
    weekNum = weekNum == 0 ? 7 : weekNum
    let lastDate = new Date(Time.getTime() - weekNum * 24 * 60 * 60 * 1000)
    let fitstDate = new Date(
        Time.getTime() - (weekNum + 6) * 24 * 60 * 60 * 1000
    )
    let startDate = `${fitstDate.getFullYear()}-${fitstDate.getMonth() + 1 < 10 ? '0' + (fitstDate.getMonth() + 1) : fitstDate.getMonth() + 1
        }-${fitstDate.getDate() < 10 ? '0' + fitstDate.getDate() : fitstDate.getDate()
        }`
    let endDate = `${lastDate.getFullYear()}-${lastDate.getMonth() + 1 < 10 ? '0' + (lastDate.getMonth() + 1) : lastDate.getMonth() + 1
        }-${lastDate.getDate() < 10 ? '0' + lastDate.getDate() : lastDate.getDate()
        }`
    return [startDate, endDate]
}
//获取下一周的一天和最后一天
function NextWeek() {
    const Time = new Date()
    let weekNum = Time.getDay()
    weekNum = weekNum == 0 ? 7 : weekNum
    let fitstDate = new Date(
        Time.getTime() + (7 - weekNum + 1) * 24 * 60 * 60 * 1000
    )
    let lastDate = new Date(
        Time.getTime() + (7 - weekNum + 7) * 24 * 60 * 60 * 1000
    )
    let startDate = `${fitstDate.getFullYear()}-${fitstDate.getMonth() + 1 < 10 ? '0' + (fitstDate.getMonth() + 1) : fitstDate.getMonth() + 1
        }-${fitstDate.getDate() < 10 ? '0' + fitstDate.getDate() : fitstDate.getDate()
        }`
    let endDate = `${lastDate.getFullYear()}-${lastDate.getMonth() + 1 < 10 ? '0' + (lastDate.getMonth() + 1) : lastDate.getMonth() + 1
        }-${lastDate.getDate() < 10 ? '0' + lastDate.getDate() : lastDate.getDate()
        }`
    return [startDate, endDate]
}

//获取本周的第一天和最后同一天
function CurrWeek() {
    const currentDate = new Date()
    const week = currentDate.getDay()
    const millisecond = 1000 * 60 * 60 * 24
    const minusDay = week != 0 ? week - 1 : 6
    const monday = new Date(currentDate.getTime() - minusDay * millisecond)
    const sunday = new Date(monday.getTime() + 6 * millisecond)
    return [formatDate(monday), formatDate(sunday)]
}

module.exports = {
    formatDate,
    formatDateTime,
    PrevWeek,
    NextWeek,
    CurrWeek
}