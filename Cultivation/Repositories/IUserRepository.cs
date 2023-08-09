using Cultivation.Models;

namespace Cultivation.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        void DeleteUser(int id);
        List<User> GetAllUsers();
        User GetUserById(int id);
        void UpdateUser(User user);
        User GetByEmail(string email);
        byte[] GetProfilePicture(int id);
    }
}