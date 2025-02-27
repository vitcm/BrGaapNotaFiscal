using NotaFiscalAPIBRGaap.Data;
using NotaFiscalAPIBRGaap.Domain.Entities;

namespace NotaFiscalAPIBRGaap.Repositories
{
    public class NotaFiscalRepository : INotaFiscalRepository
    {
        private readonly ApplicationDbContext _context;

        public NotaFiscalRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<NotaFiscal> GetAll()
        {
            return _context.NotasFiscais.ToList();
        }

        public NotaFiscal? GetById(int id)
        {
            return _context.NotasFiscais.Find(id);
        }

        public void Add(NotaFiscal notaFiscal)
        {
            _context.NotasFiscais.Add(notaFiscal);
            _context.SaveChanges();
        }
    }
}
