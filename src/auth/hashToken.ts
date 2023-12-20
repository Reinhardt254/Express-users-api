const crypto = require('crypto');

export function hashedToken(token: string) {
   return crypto.createHash('sha512').update(token).digest('hex');
}
