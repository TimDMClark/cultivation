using Cultivation.Models;
using Cultivation.Utils;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

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
                        SELECT Id, Name, Email, Bio, ProfilePicture, RelationshipId
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
                        SELECT Name, Email, Bio, ProfilePicture, RelationshipId
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
                    DbUtils.AddParameter(cmd, "@Password", user.Password); // Note: You should handle password hashing
                    DbUtils.AddParameter(cmd, "@Bio", user.Bio);
                    SqlParameter imageParameter = new SqlParameter("@ProfilePicture", SqlDbType.Image);
                    imageParameter.Value = DBNull.Value;
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
                    imageParameter.Value = DBNull.Value;
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
    }
}
