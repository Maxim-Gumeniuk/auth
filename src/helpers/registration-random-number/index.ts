export const generateRandomRegistrationNumber = () => {
    const randomNumbers = [];
    for (let i = 0; i < 4; i++) {
        randomNumbers.push(Math.floor(Math.random() * 10));
    }
    return randomNumbers.join('');
}
////change name of file