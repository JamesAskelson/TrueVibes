using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<Photo> Photos { get; set;}
    public DbSet<UserLike> Likes { get; set;}

//Code below makes models on creation much easier to grasp and read
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserLike>()
            .HasKey(k => new {k.SourceUserId, k.TargetUserId});

        modelBuilder.Entity<UserLike>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserLike>()
            .HasOne(s => s.TargetUser)
            .WithMany(l => l.LikedbyUser)
            .HasForeignKey(s => s.TargetUserId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
