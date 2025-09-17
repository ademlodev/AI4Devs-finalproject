## Índice

0. [Ficha del proyecto](#0-ficha-del-proyecto)
1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 0. Ficha del proyecto

### **0.1. Tu nombre completo:**

Francisco Javier García

### **0.2. Nombre del proyecto:**

Truequealo

### **0.3. Descripción breve del proyecto:**

Truequealo es una plataforma digital diseñada para facilitar el intercambio directo de bienes y servicios entre personas, sin necesidad de usar dinero. Utiliza un sistema inteligente de coincidencias, perfiles confiables y comunicación integrada para revivir el trueque como forma sostenible, justa y colaborativa de economía local y circular.

Lean canvas:

Lean-canvas.drawio

### **0.4. URL del proyecto:**

> Puede ser pública o privada, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/).

### 0.5. URL o archivo comprimido del repositorio

> Puedes tenerlo alojado en público o en privado, en cuyo caso deberás compartir los accesos de manera segura. Puedes enviarlos a [alvaro@lidr.co](mailto:alvaro@lidr.co) usando algún servicio como [onetimesecret](https://onetimesecret.com/). También puedes compartir por correo un archivo zip con el contenido

---

## 1. Descripción general del producto

> Describe en detalle los siguientes aspectos del producto:

Fichero system-design.md
Fichero system-design.md o projectbrief.md

### **1.1. Objetivo:**

> Propósito del producto. Qué valor aporta, qué soluciona, y para quién.
> Facilitar el trueque de bienes y servicios entre usuarios, promoviendo la economía circular y la confianza entre personas a través de tecnología, reputación y geolocalización.

### **1.2. Características y funcionalidades principales:**

> Enumera y describe las características y funcionalidades específicas que tiene el producto para satisfacer las necesidades identificadas.

- Clasificación de productos y servicios por categorías y subcategorías.
- Algoritmo de coincidencias (match) que conecta necesidades y ofertas.
- Recomendaciones personalizadas según intereses, historial y ubicación.
- Chat integrado para negociación directa entre usuarios.
- Sistema de reputación y comentarios para construir confianza.
- Verificación de identidad y niveles de fiabilidad.
- Interfaz mobile-first, intuitiva y accesible.
- Geolocalización y mapa interactivo para promover intercambios locales.
- Moderación y mecanismos de seguridad para proteger a los usuarios.

### **1.3. Diseño y experiencia de usuario:**

> Proporciona imágenes y/o videotutorial mostrando la experiencia del usuario desde que aterriza en la aplicación, pasando por todas las funcionalidades principales.

### **1.4. Instrucciones de instalación:**

> Documenta de manera precisa las instrucciones para instalar y poner en marcha el proyecto en local (librerías, backend, frontend, servidor, base de datos, migraciones y semillas de datos, etc.)

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

> Usa el formato que consideres más adecuado para representar los componentes principales de la aplicación y las tecnologías utilizadas. Explica si sigue algún patrón predefinido, justifica por qué se ha elegido esta arquitectura, y destaca los beneficios principales que aportan al proyecto y justifican su uso, así como sacrificios o déficits que implica.

Los componentes estan representados en docs/Diagrama infraestructura.png Se usa esta arquitectura para ser una app web eficiente. Posteriormente posibilidad de migrara a microservicios.

### **2.2. Descripción de componentes principales:**

> Describe los componentes más importantes, incluyendo la tecnología utilizada

Prompt: teniendo en cuenta el @Diagrama infraestructura.png, describe los componentes principales de la arquitectura definida

Se definen en el fichero [componentes_principales.md]

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

> Representa la estructura del proyecto y explica brevemente el propósito de las carpetas principales, así como si obedece a algún patrón o arquitectura específica.

Al generar el memory bank y crear la estructura del proyecto me genero esta estructura de carpetas como le habia indicado.

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

### **2.4. Infraestructura y despliegue**

> Detalla la infraestructura del proyecto, incluyendo un diagrama en el formato que creas conveniente, y explica el proceso de despliegue que se sigue

La infraestructura del proyecto esta realizada en el fichero Diagrama infraestructura.png También se encuentra en el fichero diagrama_infraestructura.md

### **2.5. Seguridad**

> Enumera y describe las prácticas de seguridad principales que se han implementado en el proyecto, añadiendo ejemplos si procede

### **2.6. Tests**

> Describe brevemente algunos de los tests realizados

---

## 3. Modelo de Datos

### **3.1. Diagrama del modelo de datos:**

> Recomendamos usar mermaid para el modelo de datos, y utilizar todos los parámetros que permite la sintaxis para dar el máximo detalle, por ejemplo las claves primarias y foráneas.

### **3.2. Descripción de entidades principales:**

> Recuerda incluir el máximo detalle de cada entidad, como el nombre y tipo de cada atributo, descripción breve si procede, claves primarias y foráneas, relaciones y tipo de relación, restricciones (unique, not null…), etc.

---

## 4. Especificación de la API

> Si tu backend se comunica a través de API, describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad

---

## 5. Historias de Usuario

> Documenta 3 de las historias de usuario principales utilizadas durante el desarrollo, teniendo en cuenta las buenas prácticas de producto al respecto.

**Historia de Usuario 1**

**Historia de Usuario 2**

**Historia de Usuario 3**

---

## 6. Tickets de Trabajo

> Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto.

**Ticket 1**

**Ticket 2**

**Ticket 3**

---

## 7. Pull Requests

> Documenta 3 de las Pull Requests realizadas durante la ejecución del proyecto

**Pull Request 1**

**Pull Request 2**

**Pull Request 3**
