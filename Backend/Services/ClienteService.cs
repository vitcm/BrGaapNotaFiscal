using NotaFiscalAPIBRGaap.Domain.Entities;
using NotaFiscalAPIBRGaap.Repositories;

namespace NotaFiscalAPIBRGaap.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;

        public ClienteService(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        public List<Cliente> GetAll()
        {
            return _clienteRepository.GetAll();
        }

        public void Create(Cliente cliente)
        {
            _clienteRepository.Add(cliente);
        }
    }
}
