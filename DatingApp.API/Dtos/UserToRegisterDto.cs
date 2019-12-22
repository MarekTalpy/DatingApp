using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserToRegisterDto
    {
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Username should be between 4 to 8 characters long.")]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
