using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{

    public class AppUser : IdentityUser<int>
    {
        // Entity only works with public
        // ASPNET IdentityUser takes care of the id, username, and password hashing/salting
        public DateOnly DateOfBirth { get; set;}
        public required string KnownAs { get; set;}
        public DateTime Created { get; set;} = DateTime.UtcNow;
        public DateTime LastActive {get; set;} = DateTime.UtcNow;
        public required string Gender {get; set;}
        public string? Introduction {get; set;}
        public string? Interests {get; set;}
        public string? LookingFor {get; set;}
        public required string City {get; set;}
        public required string Country {get; set;}
        public List<Photo> Photos { get; set; } = new List<Photo>();
        public List<UserLike> LikedbyUser { get; set; } = [];
        public List<UserLike> LikedUsers { get; set; } = [];
        public List<Message> MessagesSent { get; set;} = [];
        public List<Message> MessagesReceived { get; set; } = [];
        public ICollection<AppUserRole> UserRoles { get; set;} = [];

        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }


}
