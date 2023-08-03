using Cultivation.Models;

namespace Cultivation.Repositories
{
    public interface ICultRepository
    {
        void Add(Cult cult);
        void Delete(int id);
        List<Cult> GetAll();
        Cult GetById(int id);
        void Update(Cult cult);
    }
}