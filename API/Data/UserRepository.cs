using System;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(DataContext context) : IUserRepository
{
    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        var user = await context.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.Id == id);
        return user;
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.Users.Include(x => x.Photos).ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
