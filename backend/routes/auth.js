const saml = require('samlify');
var express = require('express');
var router = express.Router();
const fs = require('fs')

const ServiceProvider = saml.ServiceProvider;
const IdentityProvider = saml.IdentityProvider;

// Configure your endpoint for IdP-initiated / SP-initiated SSO
const sp = ServiceProvider({
    metadata: fs.readFileSync(__dirname + '/../xml/metadata_sp.xml')
});
const idp = IdentityProvider({
    metadata: fs.readFileSync(__dirname + '/../xml/onelogin_metadata_487043.xml')
});

// Release the metadata publicly
router.get('/metadata', (req, res) => res.header('Content-Type','text/xml').send(sp.getMetadata()));

// Access URL for implementing SP-init SSO
router.get('/spinitsso-redirect', (req, res) => {
    const { id, context } = sp.createLoginRequest(idp, 'redirect');
    return res.redirect(context);
});

// If your application only supports IdP-initiated SSO, just make this route is enough
// This is the assertion service url where SAML Response is sent to
router.post('/acs', (req, res) => {
    sp.parseLoginResponse(idp, 'post', req)
        .then(parseResult => {
            // ...
            console.log("parseResult: ", parseResult)
        })
        .catch(console.error);
});
module.exports = router;
