using System;
using API.DTO;
using API.Entities;

namespace API.Interfaces;

public interface ILikesRepository
{
    Task<UserLike?> GetUserLike(int SourceUserId, int TargetUserId);
    Task<IEnumerable<MemberDTO>> GetUserLikes(string predicate, int userId);
    Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId);
    void DeleteLike(UserLike like);
    void AddLike(UserLike like);
    Task<bool> SaveChanges();
}
