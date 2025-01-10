using System;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{

    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
    {
        var users = await userRepository.GetUsersAsync();

        var mappedUsers = mapper.Map<IEnumerable<MemberDTO>>(users);

        return Ok(mappedUsers);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MemberDTO>> GetUserById(int id)
    {
        var user = await userRepository.GetUserByIdAsync(id);

        var mappedUser = mapper.Map<MemberDTO>(user);

        if(user == null) return NotFound();
        return Ok(mappedUser);
    }

        [HttpGet("{username}")]
    public async Task<ActionResult<MemberDTO>> GetUserByName(string username)
    {
        var user = await userRepository.GetUserByUsernameAsync(username);

        var mappedUser = mapper.Map<MemberDTO>(user);

        if(user == null) return NotFound();
        return Ok(mappedUser);
    }
}
