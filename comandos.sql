IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Cine')
BEGIN
    CREATE DATABASE Cine;
END;
GO

USE Cine;
GO

CREATE TABLE dbo.Director (
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Nationality NVARCHAR(100) NULL,
    Age INT NULL,
    Active BIT NOT NULL CONSTRAINT DF_Director_Active DEFAULT (1)
);
GO

-- 3) Tabla Movies
CREATE TABLE dbo.Movies (
    Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    ReleaseYear DATE NULL,
    Gender NVARCHAR(50) NULL,
    Duration TIME NULL,
    FKDirector INT NULL,
    CONSTRAINT FK_Movies_Director FOREIGN KEY (FKDirector)
        REFERENCES dbo.Director(Id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
GO

CREATE INDEX IX_Movies_FKDirector
    ON dbo.Movies (FKDirector);
GO
