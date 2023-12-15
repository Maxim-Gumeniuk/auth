function conversation(currency: string, value: number, exchange: number ) {
    if (currency === 'euro') {
        return value * exchange
    }

    return value;
}


export const currencyHelpers = {
    conversation
}
