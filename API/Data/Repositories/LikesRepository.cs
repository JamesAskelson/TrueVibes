using System;
using API.DTO;
using API.Entities;
using API.Interfaces;

namespace API.Data.Repositories;

public class LikesRepository : ILikesRepository
{
    public void AddLike(UserLike like)
    {
        throw new NotImplementedException();
    }

    public void DeleteLike(UserLike like)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId)
    {
        throw new NotImplementedException();
    }

    public Task<UserLike?> GetUserLike(int SourceUserId, int TargetUserId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<MemberDTO>> GetUserLikes(string predicate, int userId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> SaveChanges()
    {
        throw new NotImplementedException();
    }
}
