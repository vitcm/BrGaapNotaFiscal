using NotaFiscalAPIBRGaap.Domain.Entities;

namespace NotaFiscalAPIBRGaap.Services
{
    public interface IClienteService
    {
        List<Cliente> GetAll();
        void Create(Cliente cliente);
    }
}
