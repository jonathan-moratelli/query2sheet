// const config = require('config');
// const passport = require("passport");
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const dev = process.env.NODE_ENV !== "production";

// // rotas que não passarão pela verificação do token JWT
// const JWT_EXCEPTION_PATHS = [
//     '/teste'
// ];


// exports.getToken = (user) => {
//     return jwt.sign(user, config.get('jwt_secret'), {
//         expiresIn: eval(config.get('session_expiry')),
//     });
// };

// exports.getRefreshToken = (user) => {
//     const refreshToken = jwt.sign(user, config.get('refresh_token_secret'), {
//         expiresIn: eval(config.get('refresh_token_expiry')),
//     });
//     return refreshToken;
// };

// //exports.verifyUser = passport.authenticate("jwt", { session: false });

// exports.verifyUser = (req, res, next) => {

//     for (path of JWT_EXCEPTION_PATHS) {
//         if (req.path.startsWith(path)) {
//             return next();
//         }
//     }
    
//     passport.authenticate("jwt", { session: false })(req, res, next);
// };


// exports.validPassword = (password, hash, salt) => {
//     var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
//     return hash === hashVerify;
// }

// exports.genPassword = (password) => {
//     var salt = crypto.randomBytes(32).toString('hex');
//     var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
//     return {
//       salt: salt,
//       hash: genHash
//     };
// }


// rotas que não passarão pela verificação do token da API
const API_AUTH_EXCEPTION_PATHS = [
    '/teste'
];


exports.verifyAuth = (req, res, next) => {
    
    apiToken = process.env.API_TOKEN;
    
    let verifyAPIToken = true;
    for (path of API_AUTH_EXCEPTION_PATHS) {
        if (req.path.startsWith(path)) {
            verifyAPIToken = false;
        }
    }

    if (verifyAPIToken) {
        if (apiToken !== req.get('api-token')) {
            return res.status(403).json({message: 'invalid api-token'});
        }
    }
    
    return next();
};

