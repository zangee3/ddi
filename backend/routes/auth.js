var fs = require("fs");
var express = require("express");
var passport = require("passport");
var saml = require("passport-saml");
var router = express.Router();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

var samlStrategy = new saml.Strategy(
  {
    // URL that goes from the Identity Provider -> Service Provider
    callbackUrl: process.env.CALLBACK_URL,
    // URL that goes from the Service Provider -> Identity Provider
    entryPoint: process.env.ENTRY_POINT,
    // Usually specified as `/shibboleth` from site root
    issuer: process.env.ISSUER,
    identifierFormat: null,
    // Service Provider private key
    decryptionPvk: fs.readFileSync(__dirname + "/../cert/key.pem", "utf8"),
    // Service Provider Certificate
    privateKey: fs.readFileSync(__dirname + "/../cert/key.pem", "utf8"),
    // Identity Provider's public key
    cert: fs.readFileSync(__dirname + "/../cert/idp_cert.pem", "utf8"),
    validateInResponseTo: false,
    disableRequestedAuthnContext: true,
  },
  function (profile, done) {
    return done(null, profile);
  }
);

passport.use(samlStrategy);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  else return res.redirect("/login0");
}

router.get("/", ensureAuthenticated, function (req, res) {
  console.log("line : 59, /");
  res.send("Authenticated");
});

// passport.authenticate("saml", { failureRedirect: "/login/fail" }),

router.get("/login", passport.authenticate("saml", { failureRedirect: "/login/fail" }), function (req, res) {
  // const userData = {
  //   issuer: "https://idp.myid-stg.disney.com",
  //   sessionIndex: "fPeUHuImEdxRt44iU-941zzLjZp",
  //   nameID: "e88c264b-a033-47de-b17f-514b28e17872",
  //   nameIDFormat: "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
  //   nameQualifier: undefined,
  //   spNameQualifier: undefined,
  //   firstname: "Ahmed",
  //   email: "ahmed.x.shams.-nd@disney.com",
  //   lastname: "Shams",
  // };
  // const newUserData = {};
  // Object.keys(userData).forEach((val) => {
  //   if (
  //     val === "issuer" ||
  //     val === "sessionIndex" ||
  //     val === "firstname" ||
  //     val === "lastname" ||
  //     val === "email"
  //   ) {
  //     newUserData[val] = userData[val];
  //   }
  // });
  res.redirect('/')
  // res.redirect(
  //   `http://localhost:3001/callback/?${convertJsontoQueryString(newUserData)}`
  // );
});

router.post(
  "/login/callback",
  passport.authenticate("saml", { failureRedirect: "/login/fail" }),
  function (req, res) {
    const updatedUserData = res.req.user;
    const filteredDataClientSide = {};
    Object.keys(updatedUserData).forEach((val) => {
      if (
        val === "issuer" ||
        val === "sessionIndex" ||
        val === "firstname" ||
        val === "lastname" ||
        val === "email"
      ) {
        filteredDataClientSide[val] = filteredDataClientSide[val];
      }
    });

    res.redirect(
      `http://localhost:3001/callback/?${convertJsontoQueryString(
        filteredDataClientSide
      )}`
    );
  }
);

convertJsontoQueryString = (params) => {
  return Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");
};

router.get("/login/fail", function (req, res) {
  res.status(401).send("Login failed");
});

// Release the metadata publicly
router.get("/metadata", (req, res) => {
  res.type("application/xml");
  res
    .status(200)
    .send(
      samlStrategy.generateServiceProviderMetadata(
        fs.readFileSync(__dirname + "/../cert/cert.pem", "utf8")
      )
    );
});

module.exports = router;
