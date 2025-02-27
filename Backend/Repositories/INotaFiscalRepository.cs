using NotaFiscalAPIBRGaap.Domain.Entities;

namespace NotaFiscalAPIBRGaap.Repositories
{
    public interface INotaFiscalRepository
    {
        List<NotaFiscal> GetAll();
        NotaFiscal? GetById(int id);
        void Add(NotaFiscal notaFiscal);
    }
}