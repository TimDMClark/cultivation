using Cultivation.Models;

namespace Cultivation.Repositories
{
    public interface ICultMemberRepository
    {
        List<CultMember> GetAll();
        void AddCultMember(CultMember cultMember);
        List<CultMember> GetCultMembersByCultId(int cultId);
        List<CultMember> GetCultMembersByUserId(int userId);
        void RemoveCultMember(int id);
    }
}