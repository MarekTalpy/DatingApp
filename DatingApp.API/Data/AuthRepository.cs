using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
  public class AuthRepository : IAuthRepository
  {
    private readonly DataContext _context;

    public AuthRepository(DataContext context) {
        _context = context;
    }
    public async Task<User> Login(string username, string password)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

        if (user == null) return null;

        if (!VerifyHash(user, password)) return null;

        return user;
    }

    public async Task<User> Register(User user, string password)
    {
        byte[] passwordSalt, passwordHash;

        createPasswordHashAndSalt(password, out passwordSalt, out passwordHash);

        user.PasswordHash = passwordHash;
        user.PasswordSalt = passwordSalt;

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return user;
    }

    public async Task<bool> UserExist(string username)
    {
        if (await _context.Users.AnyAsync(x => x.Username == username))
            return true;

        return false;
    }

    private void createPasswordHashAndSalt(string password, out byte[] passwordSalt, out byte[] passwordHash)
    {
        using(var hmac = new System.Security.Cryptography.HMACSHA512()) {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    private bool VerifyHash(User user, string password)
    {
      using(var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt)) {
        var computedPasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

        for (var i = 0; i < computedPasswordHash.Length; i++) {
          if (computedPasswordHash[i] != user.PasswordHash[i]) return false;
        }
      }

      return true;
    }
  }
}