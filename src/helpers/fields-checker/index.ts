export const fieldsChecker = (param: Array<[string, unknown]>) => {
    return param.reduce((acc, el) => {
        if (!el[1]) {
            return { ...acc };
        }
        return {
            ...acc, [el[0]]: el[1]
        }
    }, {});
}