using Duende.Bff;
using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);
builder.Services
      .AddAuthorization()
      .AddSpaStaticFiles(configuration =>
      {
          configuration.RootPath = "KATA_project_front/dist";
      });

builder.Services
.AddBff()
.AddRemoteApis();

JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
builder.Services
.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = "oidc";
    options.DefaultSignOutScheme = "oidc";
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => options.Cookie.SameSite = SameSiteMode.Strict)
.AddOpenIdConnect("oidc", options =>
{
    options.Authority = "https://localhost:5001/";
    options.ClientId = "web";
    options.ClientSecret = "secret";
    options.ResponseType = "code";
    options.ResponseMode = "query";
    options.Scope.Add("profile");
    options.Scope.Add("openid");
    options.Scope.Add("KataRoomAPI");
    options.SaveTokens = true;
    options.GetClaimsFromUserInfoEndpoint = true;
});
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseBff();
app.UseAuthorization();
app.MapBffManagementEndpoints();

app.MapRemoteBffApiEndpoint("/api/persons", $"http://localhost:5262/api/persons")
            .RequireAccessToken(TokenType.User);
app.MapFallbackToFile("index.html");
app.Run();