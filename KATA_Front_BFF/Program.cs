using Duende.Bff;
using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);
builder.Services
      .AddAuthorization()
      .AddSpaStaticFiles(configuration =>
      {
          configuration.RootPath = "Client/dist";
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
    options.Authority = builder.Configuration.GetValue<string>("Url_authority");
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

app.MapRemoteBffApiEndpoint("/api/persons", builder.Configuration.GetValue<string>("ApiUrl_persons"))
            .RequireAccessToken(TokenType.User);
app.MapRemoteBffApiEndpoint("/api/rooms", builder.Configuration.GetValue<string>("ApiUrl_rooms"))
            .RequireAccessToken(TokenType.User);
app.MapRemoteBffApiEndpoint("/api/bookings", builder.Configuration.GetValue<string>("ApiUrl_bookings"))
            .RequireAccessToken(TokenType.User);
app.MapFallbackToFile("index.html");

app.Run();