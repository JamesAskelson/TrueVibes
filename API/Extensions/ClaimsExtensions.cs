using System;
using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsExtensions
{
    public static string GetUsername(this ClaimsPrincipal user){
        var username = user.FindFirstValue(ClaimTypes.Name)
            ?? throw new Exception("No username found");
        return username;
    }

    public static int GetId(this ClaimsPrincipal user){
        var id = int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No id found"));
        return id;
    }
}
