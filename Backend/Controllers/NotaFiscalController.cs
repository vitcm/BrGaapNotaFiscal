using Microsoft.AspNetCore.Mvc;
using NotaFiscalAPIBRGaap.Domain.Entities;
using NotaFiscalAPIBRGaap.Services;

namespace NotaFiscalAPIBRGaap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotaFiscalController : ControllerBase
    {
        private readonly INotaFiscalService _notaFiscalService;

        public NotaFiscalController(INotaFiscalService notaFiscalService)
        {
            _notaFiscalService = notaFiscalService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_notaFiscalService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var nota = _notaFiscalService.GetById(id);
            if (nota == null) return NotFound();
            return Ok(nota);
        }

        [HttpPost]
        public IActionResult Create([FromBody] NotaFiscal notaFiscal)
        {
            _notaFiscalService.Create(notaFiscal);
            return CreatedAtAction(nameof(GetById), new { id = notaFiscal.Id }, notaFiscal);
        }
    }
}
