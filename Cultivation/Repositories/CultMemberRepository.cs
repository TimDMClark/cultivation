using Cultivation.Models;
using Cultivation.Utils;
using System;
using System.Collections.Generic;

namespace Cultivation.Repositories
{
    public class CultMemberRepository : BaseRepository, ICultMemberRepository
    {
        public CultMemberRepository(IConfiguration configuration) : base(configuration) { }

        public List<CultMember> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT Id, UserId, CultId
                FROM CultMember";

                    var reader = cmd.ExecuteReader();

                    var cultMembers = new List<CultMember>();
                    while (reader.Read())
                    {
                        cultMembers.Add(new CultMember()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            CultId = DbUtils.GetInt(reader, "CultId"),
                        });
                    }

                    reader.Close();

                    return cultMembers;
                }
            }
        }

        public List<CultMember> GetCultMembersByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, UserId, CultId
                            FROM CultMember
                           WHERE UserId = @UserId";

                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();

                    var cultMembers = new List<CultMember>();
                    while (reader.Read())
                    {
                        cultMembers.Add(new CultMember()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            CultId = DbUtils.GetInt(reader, "CultId"),
                        });
                    }

                    reader.Close();

                    return cultMembers;
                }
            }
        }

        public List<CultMember> GetCultMembersByCultId(int cultId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, UserId, CultId
                            FROM CultMember
                           WHERE CultId = @CultId";

                    DbUtils.AddParameter(cmd, "@CultId", cultId);

                    var reader = cmd.ExecuteReader();

                    var cultMembers = new List<CultMember>();
                    while (reader.Read())
                    {
                        cultMembers.Add(new CultMember()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            CultId = DbUtils.GetInt(reader, "CultId"),
                        });
                    }

                    reader.Close();

                    return cultMembers;
                }
            }
        }

        public void AddCultMember(CultMember cultMember)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO CultMember (UserId, CultId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @CultId)";

                    DbUtils.AddParameter(cmd, "@UserId", cultMember.UserId);
                    DbUtils.AddParameter(cmd, "@CultId", cultMember.CultId);

                    cultMember.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void RemoveCultMember(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM CultMember WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
