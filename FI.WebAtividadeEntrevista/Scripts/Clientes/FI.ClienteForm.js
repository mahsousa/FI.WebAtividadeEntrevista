
$(document).ready(function () {
    $('#CPF,#CPFBenef').on('input', function () {
        let cpf = $(this).val().replace(/\D/g, '');

        if (cpf.length <= 11) {
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        $(this).val(cpf);
    });

    $(document).on('click', '#btn-beneficiario', function () {
        var cpf = $('#CPFBenef').val();
        var nome = $('#NomeBenef').val();

        if (cpf && nome) {
            var cpfExiste = false;
            $('table tbody tr').each(function () {
                var existingCpf = $(this).find('td').eq(0).text().trim();
                if (existingCpf === cpf) {
                    cpfExiste = true;
                    return false;
                }
            });

            if (cpfExiste) {
                alert("Este CPF já foi incluído.");
            } else {
                var novaLinha = `
            <tr>
                <td>${cpf}</td>
                <td>${nome}</td>
                <td>
                    <button type="button" class="btn btn-warning btn-sm btn-alterar">Alterar</button>
                    <button type="button" class="btn btn-danger btn-sm btn-excluir">Excluir</button>
                </td>
            </tr>`;

                $('table tbody').append(novaLinha);

                $('#CPFBenef').val('');
                $('#NomeBenef').val('');
            }
        } else {
            alert("Por favor, preencha ambos os campos de CPF e Nome.");
        }
    });


    $(document).on('click', '.btn-excluir', function () {
        $(this).closest('tr').remove();
    });
    $(document).on('click', '.btn-alterar', function () {
        var linha = $(this).closest('tr');
        var cpf = linha.find('td:eq(0)').text();
        var nome = linha.find('td:eq(1)').text();

        $('#CPFBenef').val(cpf);
        $('#NomeBenef').val(nome);

        $('#btn-beneficiario').text('Salvar').attr('id', 'btn-salvar');
        $('#btn-salvar').data('linha', linha);
    });

    $(document).on('click', '#btn-salvar', function () {
        var cpf = $('#CPFBenef').val();
        var nome = $('#NomeBenef').val();
        if (cpf && nome) {
            var linha = $(this).data('linha');
            linha.find('td:eq(0)').text(cpf);
            linha.find('td:eq(1)').text(nome);

            $('#CPFBenef').val('');
            $('#NomeBenef').val('');
            $('#btn-salvar').text('Incluir').attr('id', 'btn-beneficiario');
        } else {
            alert("Por favor, preencha ambos os campos de CPF e Nome.");
        }
    });
})


function CriarJsonBeneficiarios() {
    var beneficiarios = [];

    $('#Modal').find('tbody tr').each(function () {
        var $tr = $(this);
        var cpf = $tr.find('td').eq(0).text().trim();
        var nome = $tr.find('td').eq(1).text().trim();

        if (cpf && nome) {
            beneficiarios.push({
                Id: 0,
                IdCliente: 0,
                CPF: cpf,
                Nome: nome
            });
        }
    });

    return beneficiarios;
}


function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function CriarJsonBeneficiarios() {
    var beneficiarios = [];

    $('#Modal').find('tbody tr').each(function () {
        var $tr = $(this);
        var cpf = $tr.find('td').eq(0).text().trim();
        var nome = $tr.find('td').eq(1).text().trim();

        if (cpf && nome) {
            beneficiarios.push({
                Id: 0,
                IdCliente: 0,
                CPF: cpf,
                Nome: nome
            });
        }
    });

    return beneficiarios;
}