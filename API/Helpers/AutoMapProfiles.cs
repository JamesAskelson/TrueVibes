using System;
using API.DTO;
using API.Entities;
using AutoMapper;


namespace API.Helpers;

public class AutoMapProfiles : Profile
{
    public AutoMapProfiles()
    {
        // CreateMap<AppUser, MemberDTO>()
        //     .ForMember(x => x.PhotoUrl, y => y.MapFrom(s => s.Photos.FirstOrDefault(d => d.IsMain)!.Url));
        CreateMap<AppUser, MemberDTO>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain)!.Url))
            .ForMember(dest => dest.Photo, opt => opt.MapFrom(src => src.Photos)); // Explicitly map Photos
        CreateMap<Photo, PhotoDTO>();
        CreateMap<MemberUpdateDTO, AppUser>();
    }
}
