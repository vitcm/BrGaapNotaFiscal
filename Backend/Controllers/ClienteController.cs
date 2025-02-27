using Microsoft.AspNetCore.Mvc;
using NotaFiscalAPIBRGaap.Domain.Entities;
using NotaFiscalAPIBRGaap.Services;

namespace NotaFiscalAPIBRGaap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClienteController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_clienteService.GetAll());
        }

        [HttpPost]
        public IActionResult Create([FromBody] Cliente cliente)
        {
            _clienteService.Create(cliente);
            return CreatedAtAction(nameof(GetAll), cliente);
        }
    }
}
