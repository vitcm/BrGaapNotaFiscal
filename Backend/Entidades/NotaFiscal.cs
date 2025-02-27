namespace NotaFiscalAPIBRGaap.Domain.Entities
{
    public class NotaFiscal
    {
        public int Id { get; set; }
        public int NumeroNota { get; set; }
        public decimal Valor { get; set; }
        public int ClienteId { get; set; }
        public int FornecedorId { get; set; }
    }
}