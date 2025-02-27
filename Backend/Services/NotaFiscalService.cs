using NotaFiscalAPIBRGaap.Domain.Entities;
using NotaFiscalAPIBRGaap.Repositories;

namespace NotaFiscalAPIBRGaap.Services
{
    public class NotaFiscalService : INotaFiscalService
    {
        private readonly INotaFiscalRepository _notaFiscalRepository;

        public NotaFiscalService(INotaFiscalRepository notaFiscalRepository)
        {
            _notaFiscalRepository = notaFiscalRepository;
        }

        public List<NotaFiscal> GetAll()
        {
            return _notaFiscalRepository.GetAll();
        }

        public NotaFiscal? GetById(int id)
        {
            return _notaFiscalRepository.GetById(id);
        }

        public void Create(NotaFiscal notaFiscal)
        {
            _notaFiscalRepository.Add(notaFiscal);
        }
    }
}
