# Configuración de Prisma - Truequealo

## Descripción

Este directorio contiene la configuración de Prisma ORM para la base de datos PostgreSQL de Truequealo.

## Archivos

- `schema.prisma`: Esquema completo del modelo de datos
- `README.md`: Este archivo de documentación

## Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del directorio `backend` con la siguiente configuración:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/truequealo_dev?schema=public"

# Application
NODE_ENV="development"
PORT=3000

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# CORS
CORS_ORIGIN="http://localhost:5173"
```

### 2. Instalación de PostgreSQL

Asegúrate de tener PostgreSQL instalado y ejecutándose:

```bash
# macOS con Homebrew
brew install postgresql
brew services start postgresql

# Crear base de datos
createdb truequealo_dev
```

### 3. Comandos de Prisma

```bash
# Generar cliente de Prisma
npx prisma generate

# Crear y aplicar migraciones
npx prisma migrate dev --name init

# Resetear base de datos (desarrollo)
npx prisma migrate reset

# Visualizar base de datos
npx prisma studio
```

## Modelo de Datos

El esquema incluye las siguientes entidades principales:

### Usuarios y Autenticación

- **User**: Información de usuarios con sistema de reputación
- **UserPreference**: Configuraciones personalizadas
- **UserVerification**: Sistema de verificación de identidad

### Productos y Categorización

- **Category**: Categorías principales
- **Subcategory**: Subcategorías para organización detallada
- **Item**: Productos y servicios ofrecidos

### Sistema de Matching

- **Match**: Coincidencias entre usuarios y productos
- **Conversation**: Conversaciones para negociación
- **Message**: Mensajes dentro de conversaciones

### Transacciones y Reputación

- **Transaction**: Registro de intercambios
- **Rating**: Sistema de calificaciones

### Moderación y Notificaciones

- **Report**: Sistema de reportes
- **Notification**: Notificaciones del sistema

## Características Técnicas

### Tipos de Datos Especializados

- **UUID**: Identificadores únicos para todas las entidades
- **JSON**: Campos flexibles para metadatos y configuraciones
- **Enums**: Estados predefinidos para mejor integridad
- **Timestamps**: Auditoría completa de creación y actualización

### Geolocalización

- Campos `locationCoordinates` en formato JSON para usuarios e items
- Soporte para filtrado por proximidad geográfica

### Relaciones

- Relaciones uno-a-muchos y muchos-a-muchos bien definidas
- Cascadas apropiadas para integridad referencial
- Índices únicos para prevenir duplicados

## Migraciones

Las migraciones se generan automáticamente cuando modificas el esquema:

```bash
# Crear nueva migración
npx prisma migrate dev --name nombre_de_la_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy
```

## Seeders (Datos de Prueba)

Para crear datos de prueba, ejecuta:

```bash
# Crear archivo seed.ts en prisma/
npm run seed
```

## Troubleshooting

### Error de conexión a la base de datos

1. Verifica que PostgreSQL esté ejecutándose
2. Confirma que las credenciales en DATABASE_URL sean correctas
3. Asegúrate de que la base de datos existe

### Error al generar cliente

1. Ejecuta `npx prisma generate`
2. Reinicia tu editor/IDE
3. Verifica que no haya errores de sintaxis en schema.prisma

### Problemas con migraciones

1. Revisa el estado con `npx prisma migrate status`
2. Si es desarrollo, puedes usar `npx prisma migrate reset`
3. En producción, aplica migraciones pendientes con `npx prisma migrate deploy`
