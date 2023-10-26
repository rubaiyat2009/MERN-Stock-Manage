import { getMonthDates } from "./getMonthDates";

export const getMonthlyData = (data, year, month) => {
    const dates = getMonthDates(year, month)
    const startDay = new Date(dates.firstDate).getDate();
    const endDay = new Date(dates.lastDate).getDate();
    const monthArray = [];
    for (let i = startDay; i <= endDay; i++) {
        monthArray.push({ date: i });

    }
    const monthlyData = monthArray.map((singleItem) => {
        const isDataExist = data?.find(item => new Date(item.date).getDate() === singleItem.date);
        if (isDataExist) {
            return { ...isDataExist, date: singleItem.date };
        } else {
            return { ...singleItem }
        }
    })
    let result = [];
    for (let i = 0; i < 4; i++) {
        const week = monthlyData.slice((i * 7), i === 3 ? monthlyData.length : ((i * 7) + 7))
        result.push(week)
    }
    return result
}