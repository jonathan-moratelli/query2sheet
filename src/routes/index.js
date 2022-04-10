const express = require('express');

const { verifyAuth } = require('../midlewares/authentication');


// const authRoute = require('./auth.route');
const testeRoute = require('./teste.route');




const routes = express.Router();

// inclui a verificação de autenticação para todas as requests
// routes.all('*', verifyAuth);

/////////////
//  rotas  //
/////////////

// routes.post('/customer/verify', authRoute.verifyCustomer);
// routes.post('/customer/token', authRoute.getCustomerToken);


routes.get('/seguro', testeRoute.seguro);
routes.get('/teste/:param1', testeRoute.teste);



module.exports = routes;
