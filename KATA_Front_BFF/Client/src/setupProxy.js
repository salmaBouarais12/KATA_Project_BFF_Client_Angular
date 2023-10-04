const { createProxyMiddleware } = require("http-proxy-middleware");

 

module.exports = function(app) {

  app.use(

    ["/remote/*", "/bff/*", "/signin-oidc", "/signout-callback-oidc"],

    createProxyMiddleware({

      target: "https://localhost:5262",

      secure: false

    })

  );

};