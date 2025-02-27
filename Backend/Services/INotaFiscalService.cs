using NotaFiscalAPIBRGaap.Domain.Entities;

namespace NotaFiscalAPIBRGaap.Services
{
    public interface INotaFiscalService
    {
        List<NotaFiscal> GetAll();
        NotaFiscal? GetById(int id);
        void Create(NotaFiscal notaFiscal);
    }
}
