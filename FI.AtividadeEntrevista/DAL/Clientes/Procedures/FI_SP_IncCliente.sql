﻿CREATE PROCEDURE FI_SP_IncClienteV3
    @NOME          VARCHAR (50),
    @SOBRENOME     VARCHAR (255),
    @NACIONALIDADE VARCHAR (50),
    @CEP           VARCHAR (9),
    @ESTADO        VARCHAR (2),
    @CIDADE        VARCHAR (50),
    @LOGRADOURO    VARCHAR (500),
    @EMAIL         VARCHAR (2079),
    @TELEFONE      VARCHAR (15),
    @CPF           VARCHAR (11),
    @BENEFICIARIOS NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO CLIENTES (NOME, SOBRENOME, NACIONALIDADE, CEP, ESTADO, CIDADE, LOGRADOURO, EMAIL, TELEFONE, CPF) 
    VALUES (@NOME, @SOBRENOME, @NACIONALIDADE, @CEP, @ESTADO, @CIDADE, @LOGRADOURO, @EMAIL, @TELEFONE, @CPF);

    DECLARE @CLIENTE_ID INT = SCOPE_IDENTITY();

    IF ISNULL(@BENEFICIARIOS, '') != ''
    BEGIN
        ;WITH BeneficiariosCTE AS (
            SELECT
                value AS Beneficiario
            FROM STRING_SPLIT(@BENEFICIARIOS, ';')
        )
        INSERT INTO BENEFICIARIOS (IDCLIENTE, CPF, NOME)
        SELECT
            @CLIENTE_ID,
            PARSENAME(Beneficiario, 2), -- CPF
            PARSENAME(Beneficiario, 1)  -- NOME
        FROM BeneficiariosCTE;
    END

    SELECT @CLIENTE_ID
END
