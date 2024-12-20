namespace InsurancePartnersApi.Data
{
    using System.Data;
    using Dapper;
    using Microsoft.Data.SqlClient;

    public class DatabaseContext
    {
        private readonly SqlConnection _connection;
        

        public DatabaseContext(SqlConnection connection)
        {
            _connection = connection;               
            InitializeDatabase();
        }

        public SqlConnection GetConnection { get => _connection; }
        public void InitializeDatabase()
        {
            string createTablesScript = @"

                    -- Create Partners Table if it does not exist
                        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Partner')
                        BEGIN
                            CREATE TABLE Partner
                            (
                                Id INT IDENTITY(1,1) PRIMARY KEY,
                                FirstName NVARCHAR(255) NOT NULL,
                                LastName NVARCHAR(255) NOT NULL,
                                Address NVARCHAR(255) NOT NULL,
                                PartnerNumber BIGINT NOT NULL,
                                CroatianPIN NVARCHAR(20) NULL,
                                PartnerTypeId INT NOT NULL,
                                CreatedAtUtc DATETIME NOT NULL,
                                CreatedByUser NVARCHAR(255) NOT NULL,
                                IsForeign BIT NOT NULL,
                                ExternalCode NVARCHAR(20) NOT NULL,
                                Gender CHAR(1) NOT NULL,                         
                            );
                        END

                    -- Create Policy Table if it does not exist
                    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Policy')
                    BEGIN
                        CREATE TABLE Policy
                        (
                            Id INT IDENTITY(1,1) PRIMARY KEY,
                            PolicyNumber NVARCHAR(50) NOT NULL,
                            PolicyAmount DECIMAL(18, 2) NOT NULL,
                            PartnerId INT NOT NULL,
                            CONSTRAINT FK_Policy_Partner FOREIGN KEY (PartnerId) REFERENCES Partner(Id)
                                            ON DELETE CASCADE
                                            ON UPDATE CASCADE
                        );
                    END";

            _connection.Open();
            _connection.Execute(createTablesScript);            
        }
    }
}
