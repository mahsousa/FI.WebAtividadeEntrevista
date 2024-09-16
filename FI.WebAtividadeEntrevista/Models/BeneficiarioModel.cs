using FI.WebAtividadeEntrevista.Atributes;
using System.ComponentModel.DataAnnotations;

namespace FI.WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        public long Id { get; set; }
        public long IdCliente { get; set; }

        [Required]
        [MaxLength(14)]
        [Cpf(mensagemInvalido: "CPF do beneficiário inválido", verificarUnico: false)]
        public string CPF { get; set; }

        [Required]
        public string Nome { get; set; }
    }
}