const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
};

const options2 = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
};
const currency = new Intl.NumberFormat("en-US", options);
export const intCurrency = new Intl.NumberFormat("en-US", options2)
export default currency