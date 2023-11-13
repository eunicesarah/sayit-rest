import ph from 'password-hash';

export const hashPassword = (password : string) => {
    return ph.generate(password);
}

export const verifyPassword = (password : string, hashedPassword : string) => {
    return ph.verify(password, hashedPassword);
}