-- Scripts para crear la base de datos Cine en SQL Server
-- Ejecutar en SQL Server Management Studio o Azure Data Studio

-- 1) Crear la base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Cine')
BEGIN
    CREATE DATABASE Cine;
END;
GO

USE Cine;
GO

-- 2) Tabla Director
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

-- 4) Índice sobre la clave foránea para optimizar joins
CREATE INDEX IX_Movies_FKDirector
    ON dbo.Movies (FKDirector);
GO

-- 5) Insertar datos de ejemplo
IF NOT EXISTS (SELECT * FROM dbo.Director WHERE Name = 'Christopher Nolan')
BEGIN
    INSERT INTO dbo.Director (Name, Nationality, Age, Active)
    VALUES ('Christopher Nolan', 'Estadounidense', 53, 1);
END

IF NOT EXISTS (SELECT * FROM dbo.Director WHERE Name = 'Quentin Tarantino')
BEGIN
    INSERT INTO dbo.Director (Name, Nationality, Age, Active)
    VALUES ('Quentin Tarantino', 'Estadounidense', 60, 1);
END

IF NOT EXISTS (SELECT * FROM dbo.Movies WHERE Name = 'Inception')
BEGIN
    INSERT INTO dbo.Movies (Name, ReleaseYear, Gender, Duration, FKDirector)
    VALUES ('Inception', '2010-07-16', 'Ciencia Ficción', '02:28:00', 1);
END

IF NOT EXISTS (SELECT * FROM dbo.Movies WHERE Name = 'Pulp Fiction')
BEGIN
    INSERT INTO dbo.Movies (Name, ReleaseYear, Gender, Duration, FKDirector)
    VALUES ('Pulp Fiction', '1994-10-14', 'Crimen', '02:34:00', 2);
END
GO

PRINT 'Base de datos Cine creada exitosamente con datos de ejemplo.'; 