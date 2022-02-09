import * as bcrypt from 'bcrypt'


export const hash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}


export const isHashValid = async (password, hashPassword): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword)
}