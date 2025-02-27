using Microsoft.AspNetCore.Mvc;
using NotaFiscalAPIBRGaap.Domain.Entities;
using NotaFiscalAPIBRGaap.Services;

namespace NotaFiscalAPIBRGaap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FornecedorController : ControllerBase
    {
        private readonly IFornecedorService _fornecedorService;

        public FornecedorController(IFornecedorService fornecedorService)
        {
            _fornecedorService = fornecedorService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_fornecedorService.GetAll());
        }

        [HttpPost]
        public IActionResult Create([FromBody] Fornecedor fornecedor)
        {
            _fornecedorService.Create(fornecedor);
            return CreatedAtAction(nameof(GetAll), fornecedor);
        }
    }
}
