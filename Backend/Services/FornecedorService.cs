using NotaFiscalAPIBRGaap.Domain.Entities;
using NotaFiscalAPIBRGaap.Repositories;

namespace NotaFiscalAPIBRGaap.Services
{
    public class FornecedorService : IFornecedorService
    {
        private readonly IFornecedorRepository _fornecedorRepository;

        public FornecedorService(IFornecedorRepository fornecedorRepository)
        {
            _fornecedorRepository = fornecedorRepository;
        }

        public List<Fornecedor> GetAll()
        {
            return _fornecedorRepository.GetAll();
        }

        public void Create(Fornecedor fornecedor)
        {
            _fornecedorRepository.Add(fornecedor);
        }
    }
}
