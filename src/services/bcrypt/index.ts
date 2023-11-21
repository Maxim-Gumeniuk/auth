import bcrypt from 'bcrypt';

const makeHashPass = (password: string) => {
    return bcrypt.hash(password, 10);
}

const comparePass = (userPassword: string, password: string) => {
    return bcrypt.compare(password, userPassword);
}

export const bcryptService = {
    makeHashPass,
    comparePass
}
