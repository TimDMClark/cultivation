using Cultivation.Models;
using Cultivation.Utils;

namespace Cultivation.Repositories
{
    public class CultRepository : BaseRepository, ICultRepository
    {
        public CultRepository(IConfiguration configuration) : base(configuration) { }

        public List<Cult> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Id, Name, Created, Description, LeaderId
                            FROM Cult
                        ORDER BY Name";

                    var reader = cmd.ExecuteReader();

                    var cults = new List<Cult>();
                    while (reader.Read())
                    {
                        cults.Add(new Cult()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Created = DbUtils.GetDateTime(reader, "Created"),
                            Description = DbUtils.GetString(reader, "Description"),
                            LeaderId = DbUtils.GetInt(reader, "LeaderId"),
                        });
                    }

                    reader.Close();

                    return cults;
                }
            }
        }

        public Cult GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT Name, Created, Description, LeaderId
                            FROM Cult
                           WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Cult cult = null;
                    if (reader.Read())
                    {
                        cult = new Cult()
                        {
                            Id = id,
                            Name = DbUtils.GetString(reader, "Name"),
                            Created = DbUtils.GetDateTime(reader, "Created"),
                            Description = DbUtils.GetString(reader, "Description"),
                            LeaderId = DbUtils.GetInt(reader, "LeaderId"),
                        };
                    }

                    reader.Close();

                    return cult;
                }
            }
        }

        public void Add(Cult cult)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Cult (Name, Created, Description, LeaderId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Created, @Description, @LeaderId)";

                    DbUtils.AddParameter(cmd, "@Name", cult.Name);
                    DbUtils.AddParameter(cmd, "@Created", cult.Created);
                    DbUtils.AddParameter(cmd, "@Description", cult.Description);
                    DbUtils.AddParameter(cmd, "@LeaderId", cult.LeaderId);

                    cult.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Cult cult)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Cult
                           SET Name = @Name,
                               Created = @Created,
                               Description = @Description,
                               LeaderId = @LeaderId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", cult.Name);
                    DbUtils.AddParameter(cmd, "@Created", cult.Created);
                    DbUtils.AddParameter(cmd, "@Description", cult.Description);
                    DbUtils.AddParameter(cmd, "@LeaderId", cult.LeaderId);
                    DbUtils.AddParameter(cmd, "@Id", cult.Id);

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
                    cmd.CommandText = "DELETE FROM Cult WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
