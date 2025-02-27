using NotaFiscalAPIBRGaap.Domain.Entities;

namespace NotaFiscalAPIBRGaap.Repositories
{
    public interface IClienteRepository
    {
        List<Cliente> GetAll();
        void Add(Cliente cliente);
    }
}
