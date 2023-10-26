export const twoDecimalValidator = (e) => {
    const t = e.target.value;
    if (t?.indexOf(".") >= 0 && t?.split(".")?.[1]?.length > 1) {
        e.target.value = (t?.substr(0, t?.indexOf(".")) + t?.substr(t?.indexOf("."), 3))
    }
}