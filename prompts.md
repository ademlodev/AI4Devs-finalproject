> Detalla en esta sección los prompts principales utilizados durante la creación del proyecto, que justifiquen el uso de asistentes de código en todas las fases del ciclo de vida del desarrollo. Esperamos un máximo de 3 por sección, principalmente los de creación inicial o los de corrección o adición de funcionalidades que consideres más relevantes.
> Puedes añadir adicionalmente la conversación completa como link o archivo adjunto si así lo consideras

> Detalla en esta sección los prompts principales utilizados durante la creación del proyecto, que justifiquen el uso de asistentes de código en todas las fases del ciclo de vida del desarrollo. Esperamos un máximo de 3 por sección, principalmente los de creación inicial o los de corrección o adición de funcionalidades que consideres más relevantes.
> Puedes añadir adicionalmente la conversación completa como link o archivo adjunto si así lo consideras

## Índice

1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 1. Descripción general del producto

**Prompt 1:**

Vale actua con el rol de un Product Manager para definir claramente las necesidades del producto. Vamos a ir paso a paso. No continues con el siguinete paso hasta que no te lo indique. Confírmame que entendiste la forma en que vamos a trabajar

**Prompt 2:**

Bien, un sistema de trueque tiene que diferenciarse de otros por los siguientes puntos:

- Categorizar productos
- Sistema de match, se buscaran en los intereses de la persona para presentarle productos de otros usuarios.
- Sistema de negociación y chat
- Reputación y comentarios para saber si la persona es confiable.

**Prompt 3:**

Piensa bien la respuesta, analiza bien esos puntos e identifica que otras claves de exito tener en cuenta para diseñar un sistema que destaque entre los competidores

**Prompt 4:**

Vamos a crear un primer documento md del diseño del sistema de trueque. PAra eso, dame el fichero con un indice al inicio:

Descripción breve del sistema (Truequealo), caracteristicas esenciales y claves adicionales quitando las duplicadas y las de sistema de credito, gamificación, comunidad y contenido y por último flexibilidad y quita los tipos de trueque.

> Este último prompt me dió el fichero creado como "system-design.md"

---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

**Prompt 1:**

Actua como experto solution architect para basarte en las funcionalidades a desarrollar y con ello generar un diagrama de infraestructura que defina nuestra aplicación web que tendrá frontend (React), backend API (express.js) y bbdd (postgreeSQL) Define el diagrama con mermaid

**Prompt 2:**

basandote en el diagrama mermaid @diagrama_infraestructura.md y en las catagorias esenciales definidas en @system-design.md, es necesario generar un diagrama c4 para cada caracteristica

Vamos a empzar por la primera "Categorías de productos y servicios" y define bien los 4 niveles

**Prompt 3:**

basandote en el mismo diagrama @diagrama_infraestructura.md y en las categorias esenciales definidas en @system-design.md, necesito generar los siguientes diagramas c4 para las siguientes categorias:

- Sistema de coincidencias
- Negociación y chat integrado
- Reputación y comentarios

### **2.2. Descripción de componentes principales:**

**Prompt 1:**
Se realiza la petición en el chat 20250809 dentro de la carpeta .ai

teniendo en cuenta el @Diagrama infraestructura.png, describe los componentes principales de la arquitectura definida

**Prompt 2:**

**Prompt 3:**

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

**Prompt 1:**
Posteriormente y una vez generado el memory bank le indico el siguiente prompt donde me genera los monorepos react con la estructura definida en el fichero "progress.md"

teniendo en cuenta @/memory-bank

# Rol

Eres un ingeniero de software especialista fullstack developer con React, Monorepo, Nodejs, Expressjs y Typescript

# Especificaciones funcionales

- Actualmente este es el directorio principal.
- Te basaras en DDD y arquitectura hexagonal para separar lógica de negocio y lógica de dominio.
- Necesito crear un proyecto que contenga un monorepo (workspaces) padre (todos con typescript) y este contenga tres subrepositorios con core, frontend, backend.

- Core: va a contener todas las clases de dominio que puedan ser usadas desde el backend y el frontend.

- Frontend: Va a ser un proyecto en React con ViteJs y una pantalla home. El proyecto contendra una estructura de arquitectura hexagonal y referenciara a librerias del proyecto padre.

-Backend: Sera un proyecto API Rest realizado con Expressjs, Typescript y bbdd PostgreSQL. El proyecto contendra una estructura de arquitectura hexagonal y referenciara a librerias del proyecto padre

- Será necesario que el proyecto frontend arranque y muestre la pantalla home de bienvenida.
- Será necesario que el proyecto backend arranque con los siguientes endpoints base:

- Versión de la api: lo cogera de la versión del package.json del subproyecto backend.

# Especificaciones técnicas:

- Te basaras en buenas practicas de desarrollo de aplicaciones web con testing
- Usaras pilares como SOLID y DDD para el desarrollo.
- Usaras como gestor de paquetes yarn.
- Basaras tu estructura de carpetas en:
- AI4Devs-finalproject-JGA
  |- core
  |- application
  |- domain
  |- frontend
  |- backend
- Incluye un fichero Readme en cada workspace y en el proyecto padre para indicar que hace cada proyecto y lo necesario para arrancarlo.
  Indicame antes de empezar que has entendido todo y pregunta cualquier duda que te surja.

A la hora de empezar a crear, comenzaras por el proyecto padre que contendrá las librerias que serán usadas por los subproyectos.

**Prompt 2:**

**Prompt 3:**

### **2.4. Infraestructura y despliegue**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.5. Seguridad**

**Prompt 1:**

generado con memory bank, identifica la seguridad de la api con JWT

**Prompt 2:**

**Prompt 3:**

### **2.6. Tests**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 3. Modelo de Datos

**Prompt 1:**

Generación del modelo de datos e implementado en la carpeta prisma de monorepo backend. Chat con los prompts en el fichero 20250830_cursor_generate_datamodel.md
**Prompt 2:**

**Prompt 3:**

---

### 4. Especificación de la API

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 5. Historias de Usuario

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 6. Tickets de Trabajo

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 7. Pull Requests

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**
