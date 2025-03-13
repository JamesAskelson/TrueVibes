using System.Security.Claims;
using API.DTO;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<PagedList<MemberDTO>>> GetUsers([FromQuery]UserParams userParams)
    {
        var users = userRepository.GetUsers();
        userParams.CurrentUsername = User.GetUsername();
        users = users.Where(x => x.UserName.ToLower() != userParams.CurrentUsername);

        if(userParams.Gender != null) {
            users = users.Where(x => x.Gender == userParams.Gender);
        }

        var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge-1));
        var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));
        users = users.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);
        users = userParams.OrderBy switch
        {
            "created" => users.OrderByDescending(x => x.Created),
            _ => users.OrderByDescending(x => x.LastActive)
        };

        var queriedUsers = await PagedList<AppUser>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        var mappedUsers = mapper.Map<IEnumerable<MemberDTO>>(queriedUsers);
        Response.AddPaginationHeader(queriedUsers);
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

    [HttpPut]
    public async Task<ActionResult<MemberUpdateDTO>> UpdateUser(MemberUpdateDTO memberUpdateDTO) {

        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

        if (user == null) return BadRequest("Could not find user");

        mapper.Map(memberUpdateDTO, user);

        if (await userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update the user");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file) {
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

        if(user == null) return BadRequest("Cannot update user");

        var result = await photoService.AddPhotoAsync(file);

        if(result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId,
        };

        if(user.Photos.Count == 0) photo.IsMain = true;

        user.Photos.Add(photo);
        if (await userRepository.SaveAllAsync())
            return CreatedAtAction(nameof(GetUserByName),
                new {username = user.UserName}, mapper.Map<PhotoDTO>(photo));

        return BadRequest("Problem adding photo");
    }

    [HttpPut("set-main-photo/{photoId:int}")]
    public async Task<ActionResult> SetMainPhoto(int photoId) {
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

        if(user == null) return BadRequest("User doesn't exist");

        var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

        if(photo == null || photo.IsMain) return BadRequest("This is already the main photo");

        var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
        if(currentMain != null) currentMain.IsMain = false;
        photo.IsMain = true;

        if(await userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problem setting main photo");
    }

    [HttpDelete("delete-photo/{photoId:int}")]
    public async Task<ActionResult> DeletePhoto(int PhotoId) {
        var user = await userRepository.GetUserByUsernameAsync(User.GetUsername());

        if(user == null) return BadRequest("User not found");

        var photo = user.Photos.FirstOrDefault(x => x.Id == PhotoId);

        if(photo == null || photo.IsMain) return BadRequest("Photo does not exist or is the main photo");

        if(photo.PublicId != null) {
            var result = await photoService.DeletePhotoAsync(photo.PublicId);
            if(result.Error != null) return BadRequest(result.Error.Message);
        }

        user.Photos.Remove(photo);

        if (await userRepository.SaveAllAsync()) return Ok();

        return BadRequest("Issue deleting photo");

    }
}
