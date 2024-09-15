namespace FI.AtividadeEntrevista.DML
{
    public class Beneficiario
    {
        /// <summary>
        /// ID do Beneficiário.
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// Nome do Beneficiário.
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// CPF do Beneficiário.
        /// </summary>
        public string CPF { get; set; }

        /// <summary>
        /// ID Cliente relacionado ao Beneficiário.
        /// </summary>
        public long IdCliente { get; set; }
    }
}
