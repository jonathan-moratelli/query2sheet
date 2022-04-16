const passport = require("passport");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dev = process.env.NODE_ENV !== "production";

// rotas que não passarão pela verificação do token JWT
const JWT_EXCEPTION_PATHS = [
    '/teste'
];


exports.getToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.JWT_EXPIRE_SECS),
    });
};

exports.getRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
        expiresIn: eval(process.env.JWT_EXPIRE_REFRESH_SECS),
    });
    return refreshToken;
};

//exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyUser = (req, res, next) => {

    for (path of JWT_EXCEPTION_PATHS) {
        if (req.path.startsWith(path)) {
            return next();
        }
    }
    
    passport.authenticate("jwt", { session: false })(req, res, next);
};


exports.validPassword = (password, hash, salt) => {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

exports.genPassword = (password) => {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}
