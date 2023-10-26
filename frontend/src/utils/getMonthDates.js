export function getMonthStartEnd(year, month) {
    // Create a new Date object for the given year and month
    const date = new Date(year, (Number(month) - 1), 1);

    // Get the first date of the month by using the getDate() method
    const firstDate = year + "-" + month + "-" + `${date.getDate()}`.padStart(2, "0");

    // Move to the next month and subtract one day to get the last date of the month
    date.setMonth(date.getMonth() + 1);
    date.setDate(date.getDate() - 1);

    // Get the last date of the month by using the getDate() method
    const lastDate = year + "-" + month + "-" + `${date.getDate()}`.padStart(2, "0")

    // Return an object with the first and last date of the month
    return { firstDate: firstDate, lastDate: lastDate };
}