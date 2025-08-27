# progress.md

## ¿Qué funciona?

- Documentación inicial del sistema y objetivos principales.
- Definición de características esenciales y arquitectura general.
- Configuración del monorepo con Yarn workspaces y TypeScript.
- Testing configurado: Vitest para frontend, Jest para backend y core.
- Frontend muestra pantalla de bienvenida.
- Backend expone endpoint de versión.

## ¿Qué falta por construir?

- Modelado de datos y especificación de la API.
- Prototipos de interfaz y experiencia de usuario.
- Implementación del sistema de coincidencias y chat.
- Procesos de verificación, reputación y moderación.
- Configuración de la base de datos PostgreSQL para el backend.

## Estado actual

- En fase de documentación y definición de requisitos.
- Monorepo configurado y listo para desarrollo.
- Testing implementado en todos los workspaces.

## Problemas conocidos

- Falta de detalles técnicos sobre la implementación de algoritmos y módulos específicos.
- Pendiente definir tecnologías concretas para cada componente.
- Dependencias aún no instaladas (requiere ejecutar yarn install).

## ✅ Puntos completados:

### 1. **README en cada workspace y en el root (en español)**

- ✅ README principal actualizado con estructura del monorepo
- ✅ README en `core/` explicando su propósito
- ✅ README en `frontend/` con instrucciones de arranque
- ✅ README en `backend/` con instrucciones de arranque

### 2. **Configurar testing: Vitest para frontend, Jest para backend y core**

- ✅ **Frontend**: Vitest configurado con Testing Library y jsdom
- ✅ **Backend**: Jest configurado con ts-jest y supertest
- ✅ **Core**: Jest configurado con ts-jest
- ✅ Tests de ejemplo creados en cada workspace

### 3. **Tarea de configuración de PostgreSQL anotada**

- ✅ Ya estaba añadida en `progress.md` (punto anterior)

### 4. **Asegurar que el frontend muestra pantalla de bienvenida y backend expone endpoint de versión**

- ✅ **Frontend**: Pantalla de bienvenida con Tailwind CSS implementada
- ✅ **Backend**: Endpoint `/api/version` que lee la versión del package.json
- ✅ HTML base creado para la aplicación React

## 📁 Estructura final del monorepo:

```
AI4Devs-finalproject-JGA/
├── package.json (configuración de workspaces)
├── tsconfig.base.json (configuración TypeScript compartida)
├── readme.md (documentación principal)
├── core/
│   ├── package.json (Jest)
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── README.md
│   ├── application/
│   ├── domain/
│   └── __tests__/
├── frontend/
│   ├── package.json (Vite, React, Tailwind, Vitest)
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── vitest.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── README.md
│   └── src/
│       ├── main.tsx
│       ├── index.css
│       ├── setupTests.ts
│       └── pages/
│           ├── Home.tsx
│           └── Home.test.tsx
└── backend/
    ├── package.json (Express, Jest)
    ├── tsconfig.json
    ├── jest.config.js
    ├── README.md
    └── src/
        ├── index.ts
        └── __tests__/
            └── index.test.ts
```

## 🚀 Próximo paso:

Ejecutar `yarn install` en el directorio raíz para instalar todas las dependencias y verificar que todo funciona correctamente.

¿Quieres que proceda con la instalación de dependencias y verificación del funcionamiento?
