CREATE PROC FI_SP_AltClienteV2
    @NOME          VARCHAR (50) ,
    @SOBRENOME     VARCHAR (255),
    @NACIONALIDADE VARCHAR (50) ,
    @CEP           VARCHAR (9)  ,
    @ESTADO        VARCHAR (2)  ,
    @CIDADE        VARCHAR (50) ,
    @LOGRADOURO    VARCHAR (500),
    @EMAIL         VARCHAR (2079),
    @TELEFONE      VARCHAR (15),
	@CPF		   VARCHAR(11),
    @BENEFICIARIOS NVARCHAR(MAX),
	@Id            BIGINT
AS
BEGIN
	UPDATE CLIENTES 
	SET 
		NOME = @NOME, 
		SOBRENOME = @SOBRENOME, 
		NACIONALIDADE = @NACIONALIDADE, 
		CEP = @CEP, 
		ESTADO = @ESTADO, 
		CIDADE = @CIDADE, 
		LOGRADOURO = @LOGRADOURO, 
		EMAIL = @EMAIL, 
		TELEFONE = @TELEFONE,
		CPF = @CPF
	WHERE Id = @Id;

    DELETE FROM BENEFICIARIOS WHERE IDCLIENTE = @Id;

    IF ISNULL(@BENEFICIARIOS, '') != ''
        BEGIN
        ;WITH BeneficiariosCTE AS (
            SELECT
                value AS Beneficiario
            FROM STRING_SPLIT(@BENEFICIARIOS, ';')
        )
        INSERT INTO BENEFICIARIOS (IDCLIENTE, CPF, NOME)
        SELECT
            @Id,
            PARSENAME(Beneficiario, 2), -- CPF
            PARSENAME(Beneficiario, 1)  -- NOME
        FROM BeneficiariosCTE;
    END
END