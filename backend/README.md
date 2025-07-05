# API de Cine - ASP.NET Core Web API

Esta es una API RESTful completa para gestionar directores y películas de cine, construida con ASP.NET Core 8.0 y Entity Framework Core con SQL Server.
os Previos

- .NET 8.0 SDK
- SQL Server (local o remoto)
- Visual Studio 2022 o VS Code

## 🗄️ Configuración de la Base de Datos

### 1. Crear la Base de Datos

Ejecuta el script `Scripts/CreateDatabase.sql` en tu servidor SQL Server:

```sql
-- Scripts para crear la base de datos Cine en SQL Server
-- Ejecutar en SQL Server Management Studio o Azure Data Studio

-- 1) Crear la base de datos
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'Cine')
BEGIN
    CREATE DATABASE Cine;
END
GO

USE Cine;
GO

-- 2) Tabla Director
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Director')
BEGIN
    CREATE TABLE Director (
        Id INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(200) NOT NULL,
        Nationality NVARCHAR(100) NULL,
        Age INT NULL,
        Active BIT NOT NULL DEFAULT 1,
        CONSTRAINT PK_Director PRIMARY KEY (Id)
    );
END
GO

-- 3) Tabla Movies
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Movies')
BEGIN
    CREATE TABLE Movies (
        Id INT IDENTITY(1,1) NOT NULL,
        Name NVARCHAR(100) NOT NULL,
        ReleaseYear DATE NULL,
        Gender NVARCHAR(50) NULL,
        Duration TIME NULL,
        FKDirector INT NULL,
        CONSTRAINT PK_Movies PRIMARY KEY (Id),
        CONSTRAINT FK_Movies_Director FOREIGN KEY (FKDirector)
            REFERENCES Director(Id)
            ON UPDATE CASCADE
            ON DELETE SET NULL
    );
END
GO

-- 4) Crear índice para mejorar el rendimiento
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_director')
BEGIN
    CREATE INDEX idx_director ON Movies(FKDirector);
END
GO

-- 5) Insertar datos de ejemplo
IF NOT EXISTS (SELECT * FROM Director WHERE Name = 'Christopher Nolan')
BEGIN
    INSERT INTO Director (Name, Nationality, Age, Active)
    VALUES ('Christopher Nolan', 'Estadounidense', 53, 1);
END

IF NOT EXISTS (SELECT * FROM Director WHERE Name = 'Quentin Tarantino')
BEGIN
    INSERT INTO Director (Name, Nationality, Age, Active)
    VALUES ('Quentin Tarantino', 'Estadounidense', 60, 1);
END

IF NOT EXISTS (SELECT * FROM Movies WHERE Name = 'Inception')
BEGIN
    INSERT INTO Movies (Name, ReleaseYear, Gender, Duration, FKDirector)
    VALUES ('Inception', '2010-07-16', 'Ciencia Ficción', '02:28:00', 1);
END

IF NOT EXISTS (SELECT * FROM Movies WHERE Name = 'Pulp Fiction')
BEGIN
    INSERT INTO Movies (Name, ReleaseYear, Gender, Duration, FKDirector)
    VALUES ('Pulp Fiction', '1994-10-14', 'Crimen', '02:34:00', 2);
END
GO

PRINT 'Base de datos Cine creada exitosamente con datos de ejemplo.';
```

### 2. Configurar la Cadena de Conexión

La cadena de conexión ya está configurada en `appsettings.json` para tu servidor SQL Server:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=45.170.251.89,10000;Database=Cine;User Id=sa;Password=50ftv0601x-2L;TrustServerCertificate=true;"
  }
}
```

## 🛠️ Instalación y Ejecución

### 1. Restaurar Dependencias

```bash
dotnet restore
```

### 2. Ejecutar la Aplicación

```bash
dotnet run
```

### 3. Acceder a la Documentación

Abre tu navegador y ve a: `https://localhost:7090/swagger`

## 📚 Endpoints de la API

### Directores (`/api/director`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/director` | Obtener todos los directores activos |
| GET | `/api/director/{id}` | Obtener director por ID |
| POST | `/api/director` | Crear nuevo director |
| PUT | `/api/director/{id}` | Actualizar director existente |
| DELETE | `/api/director/{id}` | Eliminar director (soft delete) |

### Películas (`/api/movie`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/movie` | Obtener todas las películas |
| GET | `/api/movie/{id}` | Obtener película por ID |
| GET | `/api/movie/director/{directorId}` | Obtener películas por director |
| POST | `/api/movie` | Crear nueva película |
| PUT | `/api/movie/{id}` | Actualizar película existente |
| DELETE | `/api/movie/{id}` | Eliminar película |

## 📝 Ejemplos de Uso

### Crear un Director

```bash
curl -X POST "https://localhost:7090/api/director" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Christopher Nolan",
    "nationality": "Estadounidense",
    "age": 53,
    "active": true
  }'
```

### Crear una Película

```bash
curl -X POST "https://localhost:7090/api/movie" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Inception",
    "releaseYear": "2010-07-16",
    "gender": "Ciencia Ficción",
    "duration": "02:28:00",
    "fkDirector": 1
  }'
```

### Obtener Películas de un Director

```bash
curl -X GET "https://localhost:7090/api/movie/director/1"
```

## 🏗️ Estructura del Proyecto

```
backend/
├── Controllers/          # Controladores de la API
│   ├── DirectorController.cs
│   └── MovieController.cs
├── Data/                # Contexto de Entity Framework
│   └── CineContext.cs
├── DTOs/                # Data Transfer Objects
│   ├── DirectorDTO.cs
│   └── MovieDTO.cs
├── Models/              # Modelos de entidades
│   ├── Director.cs
│   └── Movie.cs
├── Services/            # Lógica de negocio
│   ├── IDirectorService.cs
│   ├── DirectorService.cs
│   ├── IMovieService.cs
│   └── MovieService.cs
├── Scripts/             # Scripts SQL
│   └── CreateDatabase.sql
├── Program.cs           # Configuración de la aplicación
└── appsettings.json    # Configuración
```

## 🔧 Configuración Adicional

### Logging

El logging está configurado en `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```