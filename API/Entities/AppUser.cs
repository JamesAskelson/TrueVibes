namespace API.Entities
{
    public class AppUser
    {
        // Entity only works with public
        public int Id { get; set; }

        public required string UserName { get; set; }
    }
}
