using NotaFiscalAPIBRGaap.Domain.Entities;

namespace NotaFiscalAPIBRGaap.Services
{
    public interface IFornecedorService
    {
        List<Fornecedor> GetAll();
        void Create(Fornecedor fornecedor);
    }
}
