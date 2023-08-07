using Cultivation.Models;

namespace Cultivation.Repositories
{
    public interface IRelationshipStatusRepository
    {
        List<RelationshipStatus> GetAll();
    }
}