using System;

namespace API.DTO;

public class UserDTO
{
    public required string UserName { get; set;}
    public required string Token { get; set;}
    public required string KnownAs { get; set;}
    public string? photoUrl { get; set;}
}
