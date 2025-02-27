using NotaFiscalAPIBRGaap.Domain.Entities;

namespace NotaFiscalAPIBRGaap.Repositories
{
    public interface IFornecedorRepository
    {
        List<Fornecedor> GetAll();
        void Add(Fornecedor fornecedor);
    }
}
