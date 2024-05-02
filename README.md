# Instrucciones

Crear un archivo .env en la raíz del proyecto siguiendo de ejemplo el archivo .env.example

```
  PORT=3001
  PG_USER='admin'
  PG_PASSWORD='admin123'
  PG_HOST='localhost'
  PG_DATABASE='portfolio_db'
  PG_PORT=5432
  PGADMIN_EMAIL='admin@mail.com'
  PGADMIN_PASSWORD='root'
  PGADMIN_PORT=5050
  JWT_SECRET=3okmWJGAQMsOLtHByp4nrFIlTEDw9PZu
```

# Ejecutar API

## Instalación

Instalar dependencias del proyecto

```bash
$ npm install
```

## Ejecutar en Modo Desarrollo

Ejecutar el proyecto en modo desarrollo. (Requiere servicio de Postgres).

```bash
$ npm run dev
```

## Ejecutar en Modo Producción

Ejecutar el proyecto en modo producción. (Requiere servicio de Postgres).

```bash
$ npm run build
$ npm run start
```

# Ejecutar Docker Compose para el servicio de Postgres y PGAdmin

## Ejecutar

Crear una carpeta postgres_data en la raíz del proyecto. (Requiere servicio de Docker).

Correr en primer plano.

```bash
$ docker-compose up
```

Correr en segundo plano.

```bash
$ docker-compose up -d
```
