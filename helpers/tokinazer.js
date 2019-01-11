const jwt = require('jsonwebtoken');
const secret = "superSecretWord";
const refSecret = "megaSecretWord";
module.exports = (name, email) => {
    if (!email || !name) throw new Error('Enter name or email')

    const accessToken = jwt.sign({email: email}, secret, {expiresIn: 99999999});
    const refreshToken = jwt.sign({name, email}, refSecret, {expiresIn: 999999999999});

    const tokens = {
        accessToken,
        refreshToken
    };

    return tokens
};
