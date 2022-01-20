import * as bcrypt from 'bcrypt';

export class Hash {
    static make(plainText) {
        const salt = bcrypt.getSaltSync();
        return bcrypt.HashSync(plainText, salt);
    }

    static compare(plainText, hash) {
        return bcrypt.compareSync(plainText, hash);
    }
}

