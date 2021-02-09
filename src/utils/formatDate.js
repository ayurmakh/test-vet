export const formatDate = (dateTime) => {
    let day = dateTime.getDate().toString()
    if (day.length < 2) {
        day = `0${day}`
    }
    let month = (dateTime.getMonth() + 1).toString()
    if (month.length < 2) {
        month = `0${month}`
    }
    const year = dateTime.getFullYear()
    let hours = dateTime.getHours().toString()
    if (hours.length < 2) {
        hours = `0${hours}`
    }
    let minutes = dateTime.getMinutes().toString()
    if (minutes.length < 2) {
        minutes = `0${minutes}`
    }
    return `${year}-${month}-${day} ${hours}:${minutes}`
}
