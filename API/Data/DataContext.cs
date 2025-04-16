using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<AppUser, AppRole, int,
    IdentityUserClaim<int>, AppUserRole,
    IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>(options)
{
    public DbSet<Photo> Photos { get; set;}
    public DbSet<UserLike> Likes { get; set;}
    public DbSet<Message> Messages { get; set;}

//Code below makes models on creation much easier to grasp and read
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

        modelBuilder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();

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

        modelBuilder.Entity<Message>()
            .HasOne(s => s.Recipient)
            .WithMany(l => l.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(s => s.Sender)
            .WithMany(l => l.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
