using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context) {
        if(await context.Users.AnyAsync()) {
            return;
        }

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if(users == null){
            return;
        }

        foreach(var user in users){
            using var hmac = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }

        public static async Task SeedPhotos(DataContext context) {
        if(await context.Photos.AnyAsync()) {
            return;
        }

        var photoData = await File.ReadAllTextAsync("Data/PhotoSeedData.json");

        var options = new JsonSerializerOptions{PropertyNameCaseInsensitive = true};

        var photos = JsonSerializer.Deserialize<List<Photo>>(photoData, options);

        if(photos == null){
            return;
        }

        foreach(var photo in photos){
            context.Photos.Add(photo);
            Console.WriteLine("dfdafasdas", photo);
        }

        await context.SaveChangesAsync();
    }
}
