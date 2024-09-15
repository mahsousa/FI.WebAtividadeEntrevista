﻿CREATE PROCEDURE FI_SP_ConsClienteV2
    @ID BIGINT
AS
BEGIN
    IF ISNULL(@ID, 0) = 0
    BEGIN
        SELECT NOME, SOBRENOME, NACIONALIDADE, CEP, ESTADO, CIDADE, LOGRADOURO, EMAIL, TELEFONE, CPF, ID 
        FROM CLIENTES WITH (NOLOCK);

        SELECT ID, CPF, NOME, IDCLIENTE 
        FROM BENEFICIARIOS WITH (NOLOCK);
    END

    ELSE
    BEGIN
        SELECT NOME, SOBRENOME, NACIONALIDADE, CEP, ESTADO, CIDADE, LOGRADOURO, EMAIL, TELEFONE, CPF, ID 
        FROM CLIENTES WITH (NOLOCK) 
        WHERE ID = @ID;

        SELECT ID, CPF, NOME, IDCLIENTE 
        FROM BENEFICIARIOS WITH (NOLOCK) 
        WHERE IDCLIENTE = @ID;
    END
END
