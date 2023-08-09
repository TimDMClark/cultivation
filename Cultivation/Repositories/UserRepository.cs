using Cultivation.Models;
using Cultivation.Utils;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Cultivation.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, Name, Email, Password, Bio, ProfilePicture, RelationshipId
                FROM [User]";

                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ProfilePicture = DbUtils.GetBytes(reader, "ProfilePicture"),
                            RelationshipId = DbUtils.GetInt(reader, "RelationshipId")
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }

        public User GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Name, Email, Password, Bio, ProfilePicture, RelationshipId
                FROM [User]
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    User user = null;
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ProfilePicture = DbUtils.GetBytes(reader, "ProfilePicture"),
                            RelationshipId = DbUtils.GetInt(reader, "RelationshipId")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                  SELECT Id, Name, Email, Password, Bio, ProfilePicture, RelationshipId
                FROM [User]
                 WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Email = DbUtils.GetString(reader, "Email"),
                            Password = DbUtils.GetString(reader, "Password"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            ProfilePicture = DbUtils.GetBytes(reader, "ProfilePicture"),
                            RelationshipId = DbUtils.GetInt(reader, "RelationshipId")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void AddUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [User] (Name, Email, Password, Bio, ProfilePicture, RelationshipId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Email, @Password, @Bio, @ProfilePicture, @RelationshipId)";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Password", user.Password);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);

                    SqlParameter imageParameter = new SqlParameter("@ProfilePicture", SqlDbType.Image);
                    if (user.ProfilePicture != null && user.ProfilePicture.Length > 0)
                    {
                        imageParameter.Value = user.ProfilePicture;
                    }
                    else
                    {
                        imageParameter.Value = DBNull.Value;
                    }
                    cmd.Parameters.Add(imageParameter);

                    DbUtils.AddParameter(cmd, "@RelationshipId", user.RelationshipId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                        SET Name = @Name,
                            Email = @Email,
                            Bio = @Bio,
                            ProfilePicture = @ProfilePicture,
                            RelationshipId = @RelationshipId
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);

                    SqlParameter imageParameter = new SqlParameter("@ProfilePicture", SqlDbType.Image);
                    if (user.ProfilePicture != null && user.ProfilePicture.Length > 0)
                    {
                        imageParameter.Value = user.ProfilePicture;
                    }
                    else
                    {
                        // Fetch the current profile picture from the database
                        byte[] existingImage = GetProfilePicture(user.Id);
                        if (existingImage != null)
                        {
                            imageParameter.Value = existingImage;
                        }
                        else
                        {
                            imageParameter.Value = DBNull.Value;
                        }
                    }
                    cmd.Parameters.Add(imageParameter);


                    DbUtils.AddParameter(cmd, "@RelationshipId", user.RelationshipId);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM User WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public byte[] GetProfilePicture(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT ProfilePicture
                FROM [User]
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    byte[] profilePicture = null;
                    if (reader.Read())
                    {
                        profilePicture = DbUtils.GetBytes(reader, "ProfilePicture");
                    }

                    reader.Close();

                    return profilePicture;
                }
            }
        }
    }
}
