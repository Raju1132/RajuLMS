import moment from "moment";
import momenttz from "moment-timezone";


export function toTitleCase(str) {
    return str
        ?.toLowerCase()
        .split(/(\s|-|_)/)
        .map(word => {
            return /^[a-zA-Z0-9]/.test(word)
                ? word.charAt(0).toUpperCase() + word.slice(1)
                : word;
        })
        .join('');
}

export function formatDatePickerDate(utcDate) {
    const utc = new Date(utcDate); // Parse the UTC date
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
    const istDate = new Date(utc.getTime() + istOffset); // Add IST offset
    return istDate.toISOString().split('T')[0]; // Extract YYYY-M
}
export function extractDate(dateTime) {
    if (dateTime) {
        const date = dateTime.split(" / ")[0];
        return date
    }

}


export const getCurrentFinancialYear = () => {
    const today = moment();
    const currentYear = today.year();
    const currentMonth = today.month();

    if (currentMonth >= 3) {
        return `${currentYear}-${currentYear + 1}`;
    } else {
        return `${currentYear - 1}-${currentYear}`;
    }
};

export const getCurrentMonth = () => {
    return moment().tz("Asia/Kolkata").format("MMMM");
}
