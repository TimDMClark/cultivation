using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Cultivation.Models;
using Cultivation.Utils;

namespace Cultivation.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Description, Date, CultId, UserId
                            FROM Post
                        ORDER BY Date";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            CultId = DbUtils.GetInt(reader, "CultId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Description, Date, CultId, UserId
                            FROM Post
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = id,
                            Description = DbUtils.GetString(reader, "Description"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            CultId = DbUtils.GetInt(reader, "CultId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                        };
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (Description, Date, CultId, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Description, @Date, @CultId, @UserId)";

                    DbUtils.AddParameter(cmd, "@Description", post.Description);
                    DbUtils.AddParameter(cmd, "@Date", post.Date);
                    DbUtils.AddParameter(cmd, "@CultId", post.CultId);
                    DbUtils.AddParameter(cmd, "@UserId", post.UserId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                           SET Description = @Description,
                               Date = @Date,
                               CultId = @CultId,
                               UserId = @UserId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Description", post.Description);
                    DbUtils.AddParameter(cmd, "@Date", post.Date);
                    DbUtils.AddParameter(cmd, "@CultId", post.CultId);
                    DbUtils.AddParameter(cmd, "@UserId", post.UserId);
                    DbUtils.AddParameter(cmd, "@Id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
