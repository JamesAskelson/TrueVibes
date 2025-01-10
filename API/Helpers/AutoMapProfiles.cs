using System;
using API.DTO;
using API.Entities;
using AutoMapper;


namespace API.Helpers;

public class AutoMapProfiles : Profile
{
    public AutoMapProfiles()
    {
        CreateMap<AppUser, MemberDTO>()
            .ForMember(x => x.PhotoUrl, y => y.MapFrom(s => s.Photos.FirstOrDefault(d => d.IsMain)!.Url));
        CreateMap<Photo, PhotoDTO>();
    }
}
