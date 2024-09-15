using FI.AtividadeEntrevista.BLL;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using WebAtividadeEntrevista.Models;

namespace FI.WebAtividadeEntrevista.Atributes
{
    public class CpfAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var cpf = value as string;

            if (string.IsNullOrEmpty(cpf))
            {
                return ValidationResult.Success; 
            }

            if (!CpfValido(cpf))
            {
                return new ValidationResult("CPF inválido.");
            }

            var model = validationContext.ObjectInstance as ClienteModel;
            cpf = new string(cpf.Where(char.IsDigit).ToArray());

            if (cpf != model.CPFInicial && !CpfUnico(cpf))
            {
                return new ValidationResult("CPF já está registrado.");
            }

            return ValidationResult.Success;

        }

        private bool CpfValido(string cpf)
        {
            cpf = new string(cpf.Where(char.IsDigit).ToArray());

            if (cpf.Length != 11)
                return false;

            if (cpf.Distinct().Count() == 1)
                return false;

            var soma = 0;
            for (var i = 0; i < 9; i++)
            {
                soma += (cpf[i] - '0') * (10 - i);
            }

            var resto = soma % 11;
            var digitoVerificador1 = (resto < 2) ? 0 : 11 - resto;

            soma = 0;
            for (var i = 0; i < 10; i++)
            {
                soma += (cpf[i] - '0') * (11 - i);
            }

            resto = soma % 11;
            var digitoVerificador2 = (resto < 2) ? 0 : 11 - resto;

            return cpf[9] - '0' == digitoVerificador1 && cpf[10] - '0' == digitoVerificador2;
        }

        private bool CpfUnico(string cpf)
        {
            BoCliente boCliente = new BoCliente();
            return !boCliente.VerificarExistencia(cpf);
        }
    }
}