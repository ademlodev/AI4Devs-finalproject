# Backend

API REST desarrollada con Express, TypeScript y PostgreSQL. Utiliza arquitectura hexagonal y consume lógica de dominio desde el paquete core.

## Arranque

```bash
cd backend
yarn install
yarn dev
```

## Testing

```bash
yarn test
```

## Estructura recomendada

- `src/`: Código fuente principal
- `src/adapters/`: Adaptadores de infraestructura (API, persistencia, etc.)
- `src/application/`: Casos de uso y lógica de aplicación
- `src/domain/`: Modelos y lógica de dominio (importados desde core)
