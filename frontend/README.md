# Frontend

Aplicación web desarrollada en React, Vite, TypeScript y Tailwind CSS. Utiliza arquitectura hexagonal y consume lógica de dominio desde el paquete core.

## Arranque

```bash
cd frontend
yarn install
yarn dev
```

## Testing

```bash
yarn test
```

## Estructura recomendada

- `src/`: Código fuente principal
- `src/adapters/`: Adaptadores de infraestructura (API, UI, etc.)
- `src/application/`: Casos de uso y lógica de aplicación
- `src/domain/`: Modelos y lógica de dominio (importados desde core)
