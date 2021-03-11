var http = require('http');
var fs = require('fs');
var express = require("express");
var dotenv = require('dotenv').config({ path: '.env' });
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var saml = require('passport-saml');
var router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  done(null, user);
});

var samlStrategy = new saml.Strategy({
  // URL that goes from the Identity Provider -> Service Provider
  callbackUrl: process.env.CALLBACK_URL,
  // URL that goes from the Service Provider -> Identity Provider
  entryPoint: process.env.ENTRY_POINT,
  // Usually specified as `/shibboleth` from site root
  issuer: process.env.ISSUER,
  identifierFormat: null,
  // Service Provider private key
  decryptionPvk: fs.readFileSync(__dirname + '/../cert/key.pem', 'utf8'),
  // Service Provider Certificate
  privateKey: fs.readFileSync(__dirname + '/../cert/key.pem', 'utf8'),
  // Identity Provider's public key
  cert: fs.readFileSync(__dirname + '/../cert/idp_cert.pem', 'utf8'),
  validateInResponseTo: false,
  disableRequestedAuthnContext: true
}, function(profile, done) {
  return done(null, profile); 
});

passport.use(samlStrategy);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
      return next();
    else
      return res.redirect('/login');
  }
  
  router.get('/',
    ensureAuthenticated, 
    function(req, res) {
      console.log("line : 59, /");
      res.send('Authenticated');
    }
  );
  router.get('/login',
  passport.authenticate('saml', { failureRedirect: '/login/fail' }),
  function (req, res) {
    console.log("line : 67, /login");
    res.redirect('/');
  }
);

// Release the metadata publicly
router.get('/metadata', (req, res) => {
    res.type('application/xml');
    res.status(200).send(samlStrategy.generateServiceProviderMetadata(fs.readFileSync(__dirname + '/../cert/cert.pem', 'utf8')));
});

// Access URL for implementing SP-init SSO
// router.get('/spinitsso-redirect', (req, res) => {
//     const { id, context } = sp.createLoginRequest(idp, 'redirect');
//     return res.redirect(context);
// });

// If your application only supports IdP-initiated SSO, just make this route is enough
// This is the assertion service url where SAML Response is sent to
router.post('/acs', (req, res) => {
    console.log('/acs')
    sp.parseLoginResponse(idp, 'post', req)
        .then(parseResult => {
            // ...
            console.log("parseResult: ", parseResult)
        })
        .catch(err => {
            console.log('err: ', err)
        });
});
module.exports = router;
