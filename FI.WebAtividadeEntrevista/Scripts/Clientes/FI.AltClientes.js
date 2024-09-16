
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #CPFInicial').val(obj.CPFInicial);
        PopularBeneficiarios(obj.Beneficiarios);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val(),
                "CPFInicial": $(this).find("#CPFInicial").val(),
                "Beneficiarios": CriarJsonBeneficiarios(),
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
})


function PopularBeneficiarios(beneficiarios) {
    if (!beneficiarios || !beneficiarios.length) return;
    for (let i = 0; i < beneficiarios.length; i++) {
        var novaLinha = `
            <tr>
                <td>${beneficiarios[i].CPF}</td>
                <td>${beneficiarios[i].Nome}</td>
                <td>
                    <button type="button" class="btn btn-warning btn-sm btn-alterar">Alterar</button>
                    <button type="button" class="btn btn-danger btn-sm btn-excluir">Excluir</button>
                </td>
            </tr>`;

        $('table tbody').append(novaLinha);
    }
}