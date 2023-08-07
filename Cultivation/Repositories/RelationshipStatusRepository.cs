using Cultivation.Models;
using Cultivation.Utils;
using System.Collections.Generic;

namespace Cultivation.Repositories
{
    public class RelationshipStatusRepository : BaseRepository, IRelationshipStatusRepository
    {
        public RelationshipStatusRepository(IConfiguration configuration) : base(configuration) { }

        public List<RelationshipStatus> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Status FROM RelationshipStatus";
                    var reader = cmd.ExecuteReader();

                    var statuses = new List<RelationshipStatus>();
                    while (reader.Read())
                    {
                        statuses.Add(new RelationshipStatus()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Status = DbUtils.GetString(reader, "Status")
                        });
                    }

                    reader.Close();

                    return statuses;
                }
            }
        }
    }
}
