# Arrancar el memory bank
_Exported on 30/08/2025 at 16:21:02 CEST from Cursor (1.4.5)_

---

**User**

arranca el memory bank 

---

**Cursor**

I'll help you start the memory bank by exploring the current memory bank directory and understanding what's already there.

Now let me read the other memory bank files to get a complete picture:

Perfecto! He revisado todo el memory bank actual del proyecto **TruequeAlo**. Aquí tienes un resumen del estado actual:

## 📋 **Memory Bank - Estado Actual**

### **Proyecto: TruequeAlo**
Una plataforma digital para facilitar el intercambio directo de bienes y servicios sin dinero, promoviendo economía circular y confianza entre usuarios.

### **✅ Lo que está COMPLETADO:**

1. **Documentación base completa**
   - Project brief, system design, y arquitectura definida
   - Modelado de datos completo con diagrama ER (13 entidades principales)
   - Monorepo configurado con TypeScript y Yarn workspaces

2. **Configuración técnica**
   - Testing configurado: Vitest (frontend), Jest (backend/core)
   - Frontend con pantalla de bienvenida y Tailwind CSS
   - Backend con endpoint `/api/version`
   - Arquitectura hexagonal y DDD definida

3. **Estructura del sistema**
   - Core: Lógica de negocio y dominio
   - Frontend: React + Vite + Tailwind (mobile-first)
   - Backend: Express + TypeScript + Prisma

### **🔄 PRÓXIMOS PASOS INMEDIATOS:**

1. **Ejecutar `yarn install`** para instalar dependencias
2. **Especificación de la API** basada en el modelo de datos
3. **Configuración de PostgreSQL** con Prisma
4. **Prototipos de interfaz** y UX
5. **Sistema de coincidencias** (algoritmo de matching)
6. **Chat integrado** con WebSocket

### **🎯 Componentes principales a desarrollar:**
- Sistema de coincidencias (match)
- Gestión de productos/servicios por categorías
- Chat integrado para negociación
- Sistema de reputación y verificación
- Geolocalización y mapas
- Moderación y seguridad

### **📊 Estado técnico:**
- **Entidades del modelo:** User, Item, Category, Match, Conversation, Transaction, Rating, UserVerification, etc.
- **Stack:** TypeScript, React, Express, PostgreSQL, Prisma
- **Testing:** Configurado en todos los workspaces
- **Arquitectura:** Monorepo modular con DDD

¿Te gustaría que profundice en algún aspecto específico del memory bank o que actualice alguna parte en particular?

---

**User**

vamos a comenazar con la siguiente tarea a realizar que es la de definir correctamente en un fichero swagger.yml la especificación de la api. Guarda el fichero en una carpeta core dentro de la carpeta @backend/ 

---

**Cursor**

Perfecto! Voy a crear la especificación de la API en formato Swagger/OpenAPI basándome en el modelo de datos y la documentación del proyecto. Primero necesito revisar el esquema de Prisma y la documentación existente para crear una especificación completa.

Ahora voy a crear la carpeta `core` dentro del backend y generar la especificación completa de la API en formato Swagger/OpenAPI:

Ahora voy a crear la especificación completa de la API en formato Swagger/OpenAPI basándome en el esquema de Prisma y los requisitos del proyecto:

```yaml
openapi: 3.0.3
info:
  title: TruequeAlo API
  description: |
    API completa para la plataforma TruequeAlo - Sistema de intercambio de bienes y servicios sin dinero.
    
    Esta API permite:
    - Gestión de usuarios y autenticación
    - Publicación y búsqueda de productos/servicios
    - Sistema de coincidencias (matching)
    - Chat integrado para negociación
    - Sistema de reputación y calificaciones
    - Gestión de transacciones e intercambios
    
    ## Autenticación
    La API utiliza JWT (JSON Web Tokens) para autenticación. Include el token en el header:
    ```
    Authorization: Bearer <jwt_token>
    ```
  version: 1.0.0
  contact:
    name: Francisco Javier García
    email: support@truequealo.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.truequealo.com/v1
    description: Production server
  - url: https://staging-api.truequealo.com/v1
    description: Staging server
  - url: http://localhost:3000/api/v1
    description: Development server

security:
  - bearerAuth: []

paths:
  # ==========================================
  # AUTHENTICATION & USER MANAGEMENT
  # ==========================================
  
  /auth/register:
    post:
      tags:
        - Authentication
      summary: Registrar nuevo usuario
      description: Crear una nueva cuenta de usuario en la plataforma
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
                - firstName
                - lastName
              properties:
                email:
                  type: string
                  format: email
                  example: "usuario@example.com"
                password:
                  type: string
                  minLength: 8
                  example: "password123"
                firstName:
                  type: string
                  minLength: 2
                  maxLength: 100
                  example: "Juan"
                lastName:
                  type: string
                  minLength: 2
                  maxLength: 100
                  example: "Pérez"
                phone:
                  type: string
                  example: "+34123456789"
      responses:
        '201':
          description: Usuario creado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Usuario creado exitosamente"
                  data:
                    type: object
                    properties:
                      user:
                        $ref: '#/components/schemas/User'
                      tokens:
                        $ref: '#/components/schemas/AuthTokens'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: Email ya registrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/login:
    post:
      tags:
        - Authentication
      summary: Iniciar sesión
      description: Autenticar usuario con email y contraseña
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                  example: "usuario@example.com"
                password:
                  type: string
                  example: "password123"
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      user:
                        $ref: '#/components/schemas/User'
                      tokens:
                        $ref: '#/components/schemas/AuthTokens'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /auth/refresh:
    post:
      tags:
        - Authentication
      summary: Renovar token de acceso
      description: Obtener nuevo access token usando refresh token
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - refreshToken
              properties:
                refreshToken:
                  type: string
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      responses:
        '200':
          description: Token renovado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/AuthTokens'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /auth/logout:
    post:
      tags:
        - Authentication
      summary: Cerrar sesión
      description: Invalidar tokens del usuario
      responses:
        '200':
          description: Logout exitoso
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Sesión cerrada exitosamente"

  /auth/forgot-password:
    post:
      tags:
        - Authentication
      summary: Solicitar recuperación de contraseña
      description: Enviar email con link de recuperación de contraseña
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
              properties:
                email:
                  type: string
                  format: email
                  example: "usuario@example.com"
      responses:
        '200':
          description: Email de recuperación enviado
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Email de recuperación enviado"

  # ==========================================
  # USER PROFILE MANAGEMENT
  # ==========================================
  
  /users/profile:
    get:
      tags:
        - Users
      summary: Obtener perfil del usuario actual
      description: Recuperar información detallada del perfil del usuario autenticado
      responses:
        '200':
          description: Perfil obtenido exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/UserProfile'
        '401':
          $ref: '#/components/responses/Unauthorized'
    
    put:
      tags:
        - Users
      summary: Actualizar perfil del usuario
      description: Modificar información del perfil del usuario autenticado
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                firstName:
                  type: string
                  maxLength: 100
                  example: "Juan Carlos"
                lastName:
                  type: string
                  maxLength: 100
                  example: "Pérez García"
                phone:
                  type: string
                  example: "+34123456789"
                bio:
                  type: string
                  maxLength: 500
                  example: "Amante del intercambio sostenible"
                address:
                  type: string
                  maxLength: 200
                  example: "Madrid, España"
                locationCoordinates:
                  type: object
                  properties:
                    lat:
                      type: number
                      format: float
                      example: 40.4168
                    lng:
                      type: number
                      format: float
                      example: -3.7038
      responses:
        '200':
          description: Perfil actualizado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/UserProfile'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /users/{userId}:
    get:
      tags:
        - Users
      summary: Obtener perfil público de usuario
      description: Recuperar información pública del perfil de cualquier usuario
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Perfil público obtenido exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/PublicUserProfile'
        '404':
          $ref: '#/components/responses/NotFound'

  /users/preferences:
    get:
      tags:
        - Users
      summary: Obtener preferencias del usuario
      description: Recuperar configuraciones y preferencias del usuario
      responses:
        '200':
          description: Preferencias obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/UserPreference'
    
    put:
      tags:
        - Users
      summary: Actualizar preferencias del usuario
      description: Modificar configuraciones y preferencias del usuario
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserPreferenceInput'
      responses:
        '200':
          description: Preferencias actualizadas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/UserPreference'

  # ==========================================
  # CATEGORIES MANAGEMENT
  # ==========================================
  
  /categories:
    get:
      tags:
        - Categories
      summary: Listar todas las categorías
      description: Obtener lista completa de categorías y subcategorías disponibles
      security: []
      parameters:
        - name: includeInactive
          in: query
          description: Incluir categorías inactivas
          schema:
            type: boolean
            default: false
      responses:
        '200':
          description: Categorías obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Category'

  /categories/{categoryId}/subcategories:
    get:
      tags:
        - Categories
      summary: Obtener subcategorías de una categoría
      description: Listar todas las subcategorías de una categoría específica
      security: []
      parameters:
        - name: categoryId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Subcategorías obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Subcategory'

  # ==========================================
  # ITEMS MANAGEMENT
  # ==========================================
  
  /items:
    get:
      tags:
        - Items
      summary: Buscar productos y servicios
      description: Buscar y filtrar productos/servicios disponibles para intercambio
      security: []
      parameters:
        - name: q
          in: query
          description: Término de búsqueda
          schema:
            type: string
            example: "bicicleta"
        - name: categoryId
          in: query
          description: ID de la categoría
          schema:
            type: string
            format: uuid
        - name: subcategoryId
          in: query
          description: ID de la subcategoría
          schema:
            type: string
            format: uuid
        - name: condition
          in: query
          description: Condición del producto
          schema:
            $ref: '#/components/schemas/ItemCondition'
        - name: lat
          in: query
          description: Latitud para búsqueda por ubicación
          schema:
            type: number
            format: float
        - name: lng
          in: query
          description: Longitud para búsqueda por ubicación
          schema:
            type: number
            format: float
        - name: radius
          in: query
          description: Radio de búsqueda en kilómetros
          schema:
            type: number
            minimum: 1
            maximum: 100
            default: 10
        - name: page
          in: query
          description: Número de página
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          description: Elementos por página
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
        - name: sortBy
          in: query
          description: Campo de ordenamiento
          schema:
            type: string
            enum: [createdAt, distance, title]
            default: createdAt
        - name: sortOrder
          in: query
          description: Orden de clasificación
          schema:
            type: string
            enum: [asc, desc]
            default: desc
      responses:
        '200':
          description: Búsqueda realizada exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      items:
                        type: array
                        items:
                          $ref: '#/components/schemas/Item'
                      pagination:
                        $ref: '#/components/schemas/Pagination'
    
    post:
      tags:
        - Items
      summary: Crear nuevo producto/servicio
      description: Publicar un nuevo producto o servicio para intercambio
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ItemInput'
      responses:
        '201':
          description: Producto/servicio creado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Item'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /items/{itemId}:
    get:
      tags:
        - Items
      summary: Obtener detalles de un producto/servicio
      description: Recuperar información completa de un producto o servicio específico
      security: []
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Detalles obtenidos exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/ItemDetails'
        '404':
          $ref: '#/components/responses/NotFound'
    
    put:
      tags:
        - Items
      summary: Actualizar producto/servicio
      description: Modificar un producto o servicio existente (solo el propietario)
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ItemInput'
      responses:
        '200':
          description: Producto/servicio actualizado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Item'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'
    
    delete:
      tags:
        - Items
      summary: Eliminar producto/servicio
      description: Eliminar un producto o servicio (solo el propietario)
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Producto/servicio eliminado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Producto eliminado exitosamente"
        '401':
          $ref: '#/components/responses/Unauthorized'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'

  /items/my:
    get:
      tags:
        - Items
      summary: Obtener mis productos/servicios
      description: Listar todos los productos y servicios del usuario autenticado
      parameters:
        - name: status
          in: query
          description: Filtrar por estado
          schema:
            $ref: '#/components/schemas/AvailabilityStatus'
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Mis productos obtenidos exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      items:
                        type: array
                        items:
                          $ref: '#/components/schemas/Item'
                      pagination:
                        $ref: '#/components/schemas/Pagination'

  # ==========================================
  # MATCHING SYSTEM
  # ==========================================
  
  /matches:
    get:
      tags:
        - Matches
      summary: Obtener mis coincidencias
      description: Listar todas las coincidencias del usuario autenticado
      parameters:
        - name: status
          in: query
          description: Filtrar por estado de match
          schema:
            $ref: '#/components/schemas/MatchStatus'
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Matches obtenidos exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      matches:
                        type: array
                        items:
                          $ref: '#/components/schemas/Match'
                      pagination:
                        $ref: '#/components/schemas/Pagination'

  /matches/suggestions:
    get:
      tags:
        - Matches
      summary: Obtener sugerencias de coincidencias
      description: Obtener recomendaciones personalizadas de intercambios
      parameters:
        - name: itemId
          in: query
          description: ID del producto para buscar coincidencias específicas
          schema:
            type: string
            format: uuid
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 50
            default: 10
      responses:
        '200':
          description: Sugerencias obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/MatchSuggestion'

  /matches/{matchId}:
    get:
      tags:
        - Matches
      summary: Obtener detalles de un match
      description: Recuperar información completa de una coincidencia específica
      parameters:
        - name: matchId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Match obtenido exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/MatchDetails'
        '404':
          $ref: '#/components/responses/NotFound'
    
    put:
      tags:
        - Matches
      summary: Actualizar estado de match
      description: Aceptar, rechazar o actualizar el estado de una coincidencia
      parameters:
        - name: matchId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - status
              properties:
                status:
                  $ref: '#/components/schemas/MatchStatus'
      responses:
        '200':
          description: Match actualizado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Match'

  /matches/create:
    post:
      tags:
        - Matches
      summary: Crear nueva coincidencia
      description: Expresar interés en un producto/servicio y crear un match
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - targetItemId
                - myItemId
              properties:
                targetItemId:
                  type: string
                  format: uuid
                  description: ID del producto/servicio de interés
                myItemId:
                  type: string
                  format: uuid
                  description: ID de mi producto/servicio a ofrecer
                message:
                  type: string
                  maxLength: 500
                  description: Mensaje inicial opcional
      responses:
        '201':
          description: Match creado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Match'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: Match ya existe
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  # ==========================================
  # CHAT & CONVERSATIONS
  # ==========================================
  
  /conversations:
    get:
      tags:
        - Conversations
      summary: Listar conversaciones
      description: Obtener lista de todas las conversaciones del usuario
      parameters:
        - name: status
          in: query
          description: Filtrar por estado de conversación
          schema:
            $ref: '#/components/schemas/ConversationStatus'
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Conversaciones obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      conversations:
                        type: array
                        items:
                          $ref: '#/components/schemas/Conversation'
                      pagination:
                        $ref: '#/components/schemas/Pagination'

  /conversations/{conversationId}:
    get:
      tags:
        - Conversations
      summary: Obtener detalles de conversación
      description: Recuperar información completa de una conversación específica
      parameters:
        - name: conversationId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Conversación obtenida exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/ConversationDetails'
        '404':
          $ref: '#/components/responses/NotFound'

  /conversations/{conversationId}/messages:
    get:
      tags:
        - Messages
      summary: Obtener mensajes de conversación
      description: Listar todos los mensajes de una conversación específica
      parameters:
        - name: conversationId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 50
        - name: before
          in: query
          description: Obtener mensajes anteriores a esta fecha (paginación)
          schema:
            type: string
            format: date-time
      responses:
        '200':
          description: Mensajes obtenidos exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      messages:
                        type: array
                        items:
                          $ref: '#/components/schemas/Message'
                      pagination:
                        $ref: '#/components/schemas/Pagination'
    
    post:
      tags:
        - Messages
      summary: Enviar mensaje
      description: Enviar un nuevo mensaje en una conversación
      parameters:
        - name: conversationId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - content
              properties:
                content:
                  type: string
                  minLength: 1
                  maxLength: 1000
                  example: "¡Hola! Me interesa tu bicicleta"
                messageType:
                  $ref: '#/components/schemas/MessageType'
                metadata:
                  type: object
                  description: Metadatos adicionales según el tipo de mensaje
      responses:
        '201':
          description: Mensaje enviado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Message'
        '400':
          $ref: '#/components/responses/BadRequest'
        '404':
          $ref: '#/components/responses/NotFound'

  /messages/{messageId}/read:
    put:
      tags:
        - Messages
      summary: Marcar mensaje como leído
      description: Actualizar el estado de lectura de un mensaje
      parameters:
        - name: messageId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Mensaje marcado como leído
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Mensaje marcado como leído"

  # ==========================================
  # TRANSACTIONS
  # ==========================================
  
  /transactions:
    get:
      tags:
        - Transactions
      summary: Listar transacciones
      description: Obtener historial de transacciones del usuario
      parameters:
        - name: status
          in: query
          description: Filtrar por estado de transacción
          schema:
            $ref: '#/components/schemas/TransactionStatus'
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Transacciones obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      transactions:
                        type: array
                        items:
                          $ref: '#/components/schemas/Transaction'
                      pagination:
                        $ref: '#/components/schemas/Pagination'

  /transactions/{transactionId}:
    get:
      tags:
        - Transactions
      summary: Obtener detalles de transacción
      description: Recuperar información completa de una transacción específica
      parameters:
        - name: transactionId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Transacción obtenida exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/TransactionDetails'
        '404':
          $ref: '#/components/responses/NotFound'
    
    put:
      tags:
        - Transactions
      summary: Actualizar estado de transacción
      description: Actualizar el estado de una transacción (proponer, aceptar, completar, etc.)
      parameters:
        - name: transactionId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - status
              properties:
                status:
                  $ref: '#/components/schemas/TransactionStatus'
                exchangeDetails:
                  type: object
                  description: Detalles adicionales del intercambio
      responses:
        '200':
          description: Transacción actualizada exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Transaction'

  /transactions/create:
    post:
      tags:
        - Transactions
      summary: Crear nueva transacción
      description: Proponer una transacción basada en un match existente
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - matchId
              properties:
                matchId:
                  type: string
                  format: uuid
                  description: ID del match asociado
                exchangeDetails:
                  type: object
                  description: Detalles específicos del intercambio propuesto
                  properties:
                    meetingLocation:
                      type: string
                      example: "Parque Central, Madrid"
                    proposedDate:
                      type: string
                      format: date-time
                      example: "2024-02-15T14:00:00Z"
                    additionalNotes:
                      type: string
                      example: "Prefiero por la tarde"
      responses:
        '201':
          description: Transacción creada exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Transaction'

  # ==========================================
  # RATINGS & REVIEWS
  # ==========================================
  
  /ratings:
    post:
      tags:
        - Ratings
      summary: Crear calificación
      description: Calificar a un usuario después de completar una transacción
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - transactionId
                - ratedId
                - score
              properties:
                transactionId:
                  type: string
                  format: uuid
                  description: ID de la transacción completada
                ratedId:
                  type: string
                  format: uuid
                  description: ID del usuario a calificar
                score:
                  type: integer
                  minimum: 1
                  maximum: 5
                  example: 5
                comment:
                  type: string
                  maxLength: 500
                  example: "Excelente intercambio, muy puntual y amable"
                tags:
                  type: array
                  items:
                    type: string
                  example: ["puntual", "amable", "producto_como_descripcion"]
      responses:
        '201':
          description: Calificación creada exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Rating'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          description: Ya existe una calificación para esta transacción
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /users/{userId}/ratings:
    get:
      tags:
        - Ratings
      summary: Obtener calificaciones de usuario
      description: Listar todas las calificaciones recibidas por un usuario
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Calificaciones obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      ratings:
                        type: array
                        items:
                          $ref: '#/components/schemas/Rating'
                      stats:
                        type: object
                        properties:
                          averageRating:
                            type: number
                            format: float
                            example: 4.5
                          totalRatings:
                            type: integer
                            example: 23
                          ratingDistribution:
                            type: object
                            properties:
                              "5":
                                type: integer
                                example: 15
                              "4":
                                type: integer
                                example: 6
                              "3":
                                type: integer
                                example: 2
                              "2":
                                type: integer
                                example: 0
                              "1":
                                type: integer
                                example: 0
                      pagination:
                        $ref: '#/components/schemas/Pagination'

  # ==========================================
  # NOTIFICATIONS
  # ==========================================
  
  /notifications:
    get:
      tags:
        - Notifications
      summary: Listar notificaciones
      description: Obtener lista de notificaciones del usuario
      parameters:
        - name: isRead
          in: query
          description: Filtrar por estado de lectura
          schema:
            type: boolean
        - name: type
          in: query
          description: Filtrar por tipo de notificación
          schema:
            $ref: '#/components/schemas/NotificationType'
        - name: page
          in: query
          schema:
            type: integer
            minimum: 1
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
      responses:
        '200':
          description: Notificaciones obtenidas exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      notifications:
                        type: array
                        items:
                          $ref: '#/components/schemas/Notification'
                      pagination:
                        $ref: '#/components/schemas/Pagination'

  /notifications/{notificationId}/read:
    put:
      tags:
        - Notifications
      summary: Marcar notificación como leída
      description: Actualizar el estado de lectura de una notificación
      parameters:
        - name: notificationId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Notificación marcada como leída
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Notificación marcada como leída"

  /notifications/read-all:
    put:
      tags:
        - Notifications
      summary: Marcar todas las notificaciones como leídas
      description: Actualizar el estado de lectura de todas las notificaciones del usuario
      responses:
        '200':
          description: Todas las notificaciones marcadas como leídas
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  message:
                    type: string
                    example: "Todas las notificaciones marcadas como leídas"

  # ==========================================
  # REPORTS & MODERATION
  # ==========================================
  
  /reports:
    post:
      tags:
        - Reports
      summary: Crear reporte
      description: Reportar contenido inapropiado o comportamiento inadecuado
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - reportType
                - description
              properties:
                reportType:
                  $ref: '#/components/schemas/ReportType'
                description:
                  type: string
                  minLength: 10
                  maxLength: 1000
                  example: "Usuario envía mensajes ofensivos"
                reportedUserId:
                  type: string
                  format: uuid
                  description: ID del usuario reportado (opcional)
                reportedItemId:
                  type: string
                  format: uuid
                  description: ID del producto/servicio reportado (opcional)
                reportedMessageId:
                  type: string
                  format: uuid
                  description: ID del mensaje reportado (opcional)
      responses:
        '201':
          description: Reporte creado exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    $ref: '#/components/schemas/Report'
                  message:
                    type: string
                    example: "Reporte enviado. Será revisado por nuestro equipo"

  # ==========================================
  # FILE UPLOAD
  # ==========================================
  
  /upload/image:
    post:
      tags:
        - Upload
      summary: Subir imagen
      description: Subir una imagen (para perfil, productos, etc.)
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              required:
                - file
              properties:
                file:
                  type: string
                  format: binary
                  description: Archivo de imagen (JPG, PNG, WebP)
                type:
                  type: string
                  enum: [profile, item, message]
                  description: Tipo de imagen
                  default: item
      responses:
        '200':
          description: Imagen subida exitosamente
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
                  data:
                    type: object
                    properties:
                      url:
                        type: string
                        format: uri
                        example: "https://cdn.truequealo.com/images/abc123.jpg"
                      thumbnailUrl:
                        type: string
                        format: uri
                        example: "https://cdn.truequealo.com/images/abc123_thumb.jpg"
        '400':
          description: Archivo inválido
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: "JWT token obtenido del endpoint /auth/login"

  schemas:
    # ==========================================
    # AUTHENTICATION & USER SCHEMAS
    # ==========================================
    
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
          example: "123e4567-e89b-12d3-a456-426614174000"
        email:
          type: string
          format: email
          example: "usuario@example.com"
        firstName:
          type: string
          example: "Juan"
        lastName:
          type: string
          example: "Pérez"
        phone:
          type: string
          nullable: true
          example: "+34123456789"
        profileImageUrl:
          type: string
          format: uri
          nullable: true
          example: "https://cdn.truequealo.com/profiles/user123.jpg"
        averageRating:
          type: number
          format: float
          example: 4.5
        totalRatings:
          type: integer
          example: 23
        verificationLevel:
          $ref: '#/components/schemas/VerificationLevel'
        status:
          $ref: '#/components/schemas/UserStatus'
        createdAt:
          type: string
          format: date-time
          example: "2024-01-15T10:30:00Z"
        updatedAt:
          type: string
          format: date-time
          example: "2024-01-20T14:45:00Z"

    UserProfile:
      allOf:
        - $ref: '#/components/schemas/User'
        - type: object
          properties:
            bio:
              type: string
              nullable: true
              example: "Amante del intercambio sostenible"
            address:
              type: string
              nullable: true
              example: "Madrid, España"
            locationCoordinates:
              type: object
              nullable: true
              properties:
                lat:
                  type: number
                  format: float
                  example: 40.4168
                lng:
                  type: number
                  format: float
                  example: -3.7038

    PublicUserProfile:
      type: object
      properties:
        id:
          type: string
          format: uuid
        firstName:
          type: string
        lastName:
          type: string
        profileImageUrl:
          type: string
          format: uri
          nullable: true
        bio:
          type: string
          nullable: true
        averageRating:
          type: number
          format: float
        totalRatings:
          type: integer
        verificationLevel:
          $ref: '#/components/schemas/VerificationLevel'
        createdAt:
          type: string
          format: date-time
        totalItems:
          type: integer
          description: Número total de productos/servicios publicados
        totalTransactions:
          type: integer
          description: Número total de intercambios completados

    UserPreference:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        interests:
          type: array
          items:
            type: string
          example: ["tecnología", "deportes", "libros"]
        categories:
          type: array
          items:
            type: string
            format: uuid
          description: IDs de categorías de interés
        maxDistanceKm:
          type: number
          format: float
          example: 15.5
        notificationSettings:
          type: object
          properties:
            newMatches:
              type: boolean
              default: true
            newMessages:
              type: boolean
              default: true
            transactionUpdates:
              type: boolean
              default: true
            marketing:
              type: boolean
              default: false
        privacySettings:
          type: object
          properties:
            showLocation:
              type: boolean
              default: true
            showPhone:
              type: boolean
              default: false
            allowDirectContact:
              type: boolean
              default: true

    UserPreferenceInput:
      type: object
      properties:
        interests:
          type: array
          items:
            type: string
        categories:
          type: array
          items:
            type: string
            format: uuid
        maxDistanceKm:
          type: number
          format: float
          minimum: 1
          maximum: 100
        notificationSettings:
          type: object
          properties:
            newMatches:
              type: boolean
            newMessages:
              type: boolean
            transactionUpdates:
              type: boolean
            marketing:
              type: boolean
        privacySettings:
          type: object
          properties:
            showLocation:
              type: boolean
            showPhone:
              type: boolean
            allowDirectContact:
              type: boolean

    AuthTokens:
      type: object
      properties:
        accessToken:
          type: string
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        refreshToken:
          type: string
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        expiresIn:
          type: integer
          example: 900
          description: Tiempo de expiración del access token en segundos

    # ==========================================
    # CATEGORY SCHEMAS
    # ==========================================
    
    Category:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
          example: "Electrónicos"
        description:
          type: string
          nullable: true
          example: "Dispositivos electrónicos y gadgets"
        iconUrl:
          type: string
          format: uri
          nullable: true
          example: "https://cdn.truequealo.com/icons/electronics.svg"
        sortOrder:
          type: integer
          example: 1
        isActive:
          type: boolean
          example: true
        subcategories:
          type: array
          items:
            $ref: '#/components/schemas/Subcategory'
        createdAt:
          type: string
          format: date-time

    Subcategory:
      type: object
      properties:
        id:
          type: string
          format: uuid
        categoryId:
          type: string
          format: uuid
        name:
          type: string
          example: "Smartphones"
        description:
          type: string
          nullable: true
        sortOrder:
          type: integer
        isActive:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # ==========================================
    # ITEM SCHEMAS
    # ==========================================
    
    Item:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        user:
          $ref: '#/components/schemas/PublicUserProfile'
        categoryId:
          type: string
          format: uuid
        category:
          $ref: '#/components/schemas/Category'
        subcategoryId:
          type: string
          format: uuid
          nullable: true
        subcategory:
          $ref: '#/components/schemas/Subcategory'
          nullable: true
        title:
          type: string
          example: "Bicicleta de montaña Trek"
        description:
          type: string
          example: "Bicicleta en excelente estado, poco uso, ideal para rutas de montaña"
        images:
          type: array
          items:
            type: string
            format: uri
          example: ["https://cdn.truequealo.com/items/bike1.jpg", "https://cdn.truequealo.com/items/bike2.jpg"]
        condition:
          $ref: '#/components/schemas/ItemCondition'
        availabilityStatus:
          $ref: '#/components/schemas/AvailabilityStatus'
        locationCoordinates:
          type: object
          nullable: true
          properties:
            lat:
              type: number
              format: float
            lng:
              type: number
              format: float
        address:
          type: string
          nullable: true
          example: "Madrid, España"
        tags:
          type: array
          items:
            type: string
          example: ["deportes", "bicicleta", "montaña"]
        distance:
          type: number
          format: float
          nullable: true
          description: Distancia en km (solo en búsquedas con ubicación)
          example: 2.5
        isActive:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    ItemDetails:
      allOf:
        - $ref: '#/components/schemas/Item'
        - type: object
          properties:
            wantedItems:
              type: array
              items:
                type: string
              example: ["smartphone", "tablet", "auriculares"]
              description: Lista de productos/servicios que busca a cambio

    ItemInput:
      type: object
      required:
        - title
        - description
        - categoryId
        - condition
      properties:
        title:
          type: string
          minLength: 5
          maxLength: 200
          example: "Bicicleta de montaña Trek"
        description:
          type: string
          minLength: 20
          maxLength: 2000
          example: "Bicicleta en excelente estado, poco uso, ideal para rutas de montaña"
        categoryId:
          type: string
          format: uuid
        subcategoryId:
          type: string
          format: uuid
          nullable: true
        condition:
          $ref: '#/components/schemas/ItemCondition'
        images:
          type: array
          items:
            type: string
            format: uri
          maxItems: 5
        locationCoordinates:
          type: object
          properties:
            lat:
              type: number
              format: float
            lng:
              type: number
              format: float
        address:
          type: string
          maxLength: 200
        tags:
          type: array
          items:
            type: string
          maxItems: 10
        wantedItems:
          type: array
          items:
            type: string
          maxItems: 10
          example: ["smartphone", "tablet", "auriculares"]

    # ==========================================
    # MATCH SCHEMAS
    # ==========================================
    
    Match:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userAId:
          type: string
          format: uuid
        userBId:
          type: string
          format: uuid
        itemAId:
          type: string
          format: uuid
        itemBId:
          type: string
          format: uuid
        userA:
          $ref: '#/components/schemas/PublicUserProfile'
        userB:
          $ref: '#/components/schemas/PublicUserProfile'
        itemA:
          $ref: '#/components/schemas/Item'
        itemB:
          $ref: '#/components/schemas/Item'
        compatibilityScore:
          type: number
          format: float
          example: 0.85
        status:
          $ref: '#/components/schemas/MatchStatus'
        algorithmData:
          type: object
          nullable: true
          description: Datos del algoritmo de matching (interno)
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    MatchDetails:
      allOf:
        - $ref: '#/components/schemas/Match'
        - type: object
          properties:
            conversation:
              $ref: '#/components/schemas/Conversation'
              nullable: true
            transaction:
              $ref: '#/components/schemas/Transaction'
              nullable: true

    MatchSuggestion:
      type: object
      properties:
        targetItem:
          $ref: '#/components/schemas/Item'
        compatibilityScore:
          type: number
          format: float
        reasons:
          type: array
          items:
            type: string
          example: ["Misma categoría", "Usuario cercano", "Alta calificación"]
        distance:
          type: number
          format: float
          nullable: true

    # ==========================================
    # CONVERSATION & MESSAGE SCHEMAS
    # ==========================================
    
    Conversation:
      type: object
      properties:
        id:
          type: string
          format: uuid
        matchId:
          type: string
          format: uuid
        userAId:
          type: string
          format: uuid
        userBId:
          type: string
          format: uuid
        userA:
          $ref: '#/components/schemas/PublicUserProfile'
        userB:
          $ref: '#/components/schemas/PublicUserProfile'
        status:
          $ref: '#/components/schemas/ConversationStatus'
        lastMessageAt:
          type: string
          format: date-time
          nullable: true
        lastMessage:
          $ref: '#/components/schemas/Message'
          nullable: true
        unreadCount:
          type: integer
          description: Número de mensajes no leídos para el usuario actual
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    ConversationDetails:
      allOf:
        - $ref: '#/components/schemas/Conversation'
        - type: object
          properties:
            match:
              $ref: '#/components/schemas/Match'
            transaction:
              $ref: '#/components/schemas/Transaction'
              nullable: true

    Message:
      type: object
      properties:
        id:
          type: string
          format: uuid
        conversationId:
          type: string
          format: uuid
        senderId:
          type: string
          format: uuid
        sender:
          $ref: '#/components/schemas/PublicUserProfile'
        content:
          type: string
          example: "¡Hola! Me interesa tu bicicleta"
        messageType:
          $ref: '#/components/schemas/MessageType'
        metadata:
          type: object
          nullable: true
          description: Metadatos adicionales según el tipo de mensaje
        isRead:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # ==========================================
    # TRANSACTION SCHEMAS
    # ==========================================
    
    Transaction:
      type: object
      properties:
        id:
          type: string
          format: uuid
        matchId:
          type: string
          format: uuid
        conversationId:
          type: string
          format: uuid
        userAId:
          type: string
          format: uuid
        userBId:
          type: string
          format: uuid
        itemAId:
          type: string
          format: uuid
        itemBId:
          type: string
          format: uuid
        userA:
          $ref: '#/components/schemas/PublicUserProfile'
        userB:
          $ref: '#/components/schemas/PublicUserProfile'
        itemA:
          $ref: '#/components/schemas/Item'
        itemB:
          $ref: '#/components/schemas/Item'
        status:
          $ref: '#/components/schemas/TransactionStatus'
        exchangeDetails:
          type: object
          nullable: true
          properties:
            meetingLocation:
              type: string
            proposedDate:
              type: string
              format: date-time
            additionalNotes:
              type: string
        agreedAt:
          type: string
          format: date-time
          nullable: true
        completedAt:
          type: string
          format: date-time
          nullable: true
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    TransactionDetails:
      allOf:
        - $ref: '#/components/schemas/Transaction'
        - type: object
          properties:
            match:
              $ref: '#/components/schemas/Match'
            conversation:
              $ref: '#/components/schemas/Conversation'
            ratings:
              type: array
              items:
                $ref: '#/components/schemas/Rating'

    # ==========================================
    # RATING SCHEMAS
    # ==========================================
    
    Rating:
      type: object
      properties:
        id:
          type: string
          format: uuid
        transactionId:
          type: string
          format: uuid
        raterId:
          type: string
          format: uuid
        ratedId:
          type: string
          format: uuid
        rater:
          $ref: '#/components/schemas/PublicUserProfile'
        rated:
          $ref: '#/components/schemas/PublicUserProfile'
        score:
          type: integer
          minimum: 1
          maximum: 5
          example: 5
        comment:
          type: string
          nullable: true
          example: "Excelente intercambio, muy puntual y amable"
        tags:
          type: array
          items:
            type: string
          example: ["puntual", "amable", "producto_como_descripcion"]
        isModerated:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    # ==========================================
    # NOTIFICATION SCHEMAS
    # ==========================================
    
    Notification:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        type:
          $ref: '#/components/schemas/NotificationType'
        title:
          type: string
          example: "Nuevo match encontrado"
        content:
          type: string
          example: "Tienes una nueva coincidencia para tu bicicleta"
        data:
          type: object
          nullable: true
          description: Datos adicionales específicos del tipo de notificación
        isRead:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # ==========================================
    # REPORT SCHEMAS
    # ==========================================
    
    Report:
      type: object
      properties:
        id:
          type: string
          format: uuid
        reporterId:
          type: string
          format: uuid
        reportedUserId:
          type: string
          format: uuid
          nullable: true
        reportedItemId:
          type: string
          format: uuid
          nullable: true
        reportedMessageId:
          type: string
          format: uuid
          nullable: true
        reportType:
          $ref: '#/components/schemas/ReportType'
        description:
          type: string
        status:
          $ref: '#/components/schemas/ReportStatus'
        moderatorId:
          type: string
          format: uuid
          nullable: true
        moderatorNotes:
          type: string
          nullable: true
        resolvedAt:
          type: string
          format: date-time
          nullable: true
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    # ==========================================
    # UTILITY SCHEMAS
    # ==========================================
    
    Pagination:
      type: object
      properties:
        page:
          type: integer
          example: 1
        limit:
          type: integer
          example: 20
        total:
          type: integer
          example: 150
        totalPages:
          type: integer
          example: 8
        hasNext:
          type: boolean
          example: true
        hasPrev:
          type: boolean
          example: false

    Error:
      type: object
      properties:
        success:
          type: boolean
          example: false
        error:
          type: object
          properties:
            code:
              type: string
              example: "VALIDATION_ERROR"
            message:
              type: string
              example: "Los datos proporcionados no son válidos"
            details:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                    example: "email"
                  message:
                    type: string
                    example: "Email inválido"

    # ==========================================
    # ENUM SCHEMAS
    # ==========================================
    
    VerificationLevel:
      type: string
      enum:
        - UNVERIFIED
        - EMAIL_VERIFIED
        - PHONE_VERIFIED
        - DOCUMENT_VERIFIED
        - FULL_VERIFIED
      example: EMAIL_VERIFIED

    UserStatus:
      type: string
      enum:
        - ACTIVE
        - INACTIVE
        - SUSPENDED
        - BANNED
      example: ACTIVE

    ItemCondition:
      type: string
      enum:
        - NEW
        - LIKE_NEW
        - GOOD
        - FAIR
        - POOR
      example: GOOD

    AvailabilityStatus:
      type: string
      enum:
        - AVAILABLE
        - RESERVED
        - EXCHANGED
        - UNAVAILABLE
      example: AVAILABLE

    MatchStatus:
      type: string
      enum:
        - PENDING
        - ACCEPTED
        - DECLINED
        - EXPIRED
      example: PENDING

    ConversationStatus:
      type: string
      enum:
        - ACTIVE
        - PAUSED
        - CLOSED
      example: ACTIVE

    MessageType:
      type: string
      enum:
        - TEXT
        - IMAGE
        - SYSTEM
        - OFFER
      example: TEXT

    TransactionStatus:
      type: string
      enum:
        - PROPOSED
        - ACCEPTED
        - IN_PROGRESS
        - COMPLETED
        - CANCELLED
        - DISPUTED
      example: PROPOSED

    ReportType:
      type: string
      enum:
        - SPAM
        - INAPPROPRIATE_CONTENT
        - FRAUD
        - HARASSMENT
        - OTHER
      example: SPAM

    ReportStatus:
      type: string
      enum:
        - PENDING
        - UNDER_REVIEW
        - RESOLVED
        - DISMISSED
      example: PENDING

    NotificationType:
      type: string
      enum:
        - NEW_MATCH
        - NEW_MESSAGE
        - TRANSACTION_UPDATE
        - RATING_RECEIVED
        - SYSTEM_ALERT
      example: NEW_MATCH

  responses:
    BadRequest:
      description: Solicitud inválida
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            success: false
            error:
              code: "VALIDATION_ERROR"
              message: "Los datos proporcionados no son válidos"
              details:
                - field: "email"
                  message: "Email inválido"

    Unauthorized:
      description: No autorizado - Token inválido o faltante
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            success: false
            error:
              code: "UNAUTHORIZED"
              message: "Token de acceso inválido o expirado"

    Forbidden:
      description: Prohibido - Sin permisos suficientes
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            success: false
            error:
              code: "FORBIDDEN"
              message: "No tienes permisos para realizar esta acción"

    NotFound:
      description: Recurso no encontrado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            success: false
            error:
              code: "NOT_FOUND"
              message: "El recurso solicitado no existe"

    InternalServerError:
      description: Error interno del servidor
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            success: false
            error:
              code: "INTERNAL_ERROR"
              message: "Error interno del servidor. Inténtalo de nuevo más tarde"

tags:
  - name: Authentication
    description: Operaciones de autenticación y autorización
  - name: Users
    description: Gestión de usuarios y perfiles
  - name: Categories
    description: Gestión de categorías y subcategorías
  - name: Items
    description: Gestión de productos y servicios
  - name: Matches
    description: Sistema de coincidencias y matching
  - name: Conversations
    description: Gestión de conversaciones
  - name: Messages
    description: Sistema de mensajería
  - name: Transactions
    description: Gestión de transacciones e intercambios
  - name: Ratings
    description: Sistema de calificaciones y reseñas
  - name: Notifications
    description: Sistema de notificaciones
  - name: Reports
    description: Sistema de reportes y moderación
  - name: Upload
    description: Subida de archivos e imágenes
```

Ahora voy a actualizar el estado de los todos y completar la tarea:

Ahora voy a actualizar el memory bank con el progreso realizado:

```markdown
# progress.md

## ¿Qué funciona?

- Documentación inicial del sistema y objetivos principales.
- Definición de características esenciales y arquitectura general.
- Configuración del monorepo con Yarn workspaces y TypeScript.
- Testing configurado: Vitest para frontend, Jest para backend y core.
- Frontend muestra pantalla de bienvenida.
- Backend expone endpoint de versión.
- **Modelado de datos completo** con diagrama ER en Mermaid que incluye todas las entidades principales del sistema.

## ¿Qué falta por construir?

- ✅ ~~Modelado de datos y especificación de la API~~ - **COMPLETADO**
- ✅ ~~Especificación completa de la API en Swagger/OpenAPI~~ - **COMPLETADO**
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

### 5. **Modelado de datos del sistema**

- ✅ **Análisis completo** de la documentación para identificar entidades y relaciones
- ✅ **Diagrama ER en Mermaid** creado con 13 entidades principales:
  - **User**: Gestión de usuarios con verificación y reputación
  - **Category/Subcategory**: Clasificación de productos y servicios
  - **Item**: Productos y servicios ofrecidos por usuarios
  - **Match**: Sistema de coincidencias entre usuarios
  - **Conversation/Message**: Chat integrado para negociación
  - **Transaction**: Registro de intercambios completados
  - **Rating**: Sistema de calificaciones y comentarios
  - **UserPreference**: Preferencias y configuración de usuarios
  - **Report**: Sistema de moderación y reportes
  - **Notification**: Sistema de notificaciones
  - **UserVerification**: Verificación de identidad y niveles de confianza
- ✅ **Relaciones definidas** entre todas las entidades con claves foráneas apropiadas
- ✅ **Campos especializados** como geolocalización, metadatos JSON, y enums para estados

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

## 🚀 Próximos pasos:

### Inmediato:

1. Ejecutar `yarn install` en el directorio raíz para instalar todas las dependencias
2. Verificar que todo funciona correctamente

### Desarrollo:

1. **Especificación de la API**: Crear endpoints basados en el modelo de datos
2. **Configuración de PostgreSQL**: Implementar migraciones y esquemas de base de datos
3. **Prototipos de interfaz**: Diseñar wireframes y componentes principales
4. **Implementación del sistema de coincidencias**: Desarrollar algoritmo de matching
5. **Chat integrado**: Implementar WebSocket para mensajería en tiempo real

```

```markdown
# progress.md

## ¿Qué funciona?

- Documentación inicial del sistema y objetivos principales.
- Definición de características esenciales y arquitectura general.
- Configuración del monorepo con Yarn workspaces y TypeScript.
- Testing configurado: Vitest para frontend, Jest para backend y core.
- Frontend muestra pantalla de bienvenida.
- Backend expone endpoint de versión.
- **Modelado de datos completo** con diagrama ER en Mermaid que incluye todas las entidades principales del sistema.

## ¿Qué falta por construir?

- ✅ ~~Modelado de datos y especificación de la API~~ - **COMPLETADO**
- ✅ ~~Especificación completa de la API en Swagger/OpenAPI~~ - **COMPLETADO**
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

### 5. **Modelado de datos del sistema**

- ✅ **Análisis completo** de la documentación para identificar entidades y relaciones
- ✅ **Diagrama ER en Mermaid** creado con 13 entidades principales:
  - **User**: Gestión de usuarios con verificación y reputación
  - **Category/Subcategory**: Clasificación de productos y servicios
  - **Item**: Productos y servicios ofrecidos por usuarios
  - **Match**: Sistema de coincidencias entre usuarios
  - **Conversation/Message**: Chat integrado para negociación
  - **Transaction**: Registro de intercambios completados
  - **Rating**: Sistema de calificaciones y comentarios
  - **UserPreference**: Preferencias y configuración de usuarios
  - **Report**: Sistema de moderación y reportes
  - **Notification**: Sistema de notificaciones
  - **UserVerification**: Verificación de identidad y niveles de confianza
- ✅ **Relaciones definidas** entre todas las entidades con claves foráneas apropiadas
- ✅ **Campos especializados** como geolocalización, metadatos JSON, y enums para estados

### 6. **Especificación completa de la API en Swagger/OpenAPI**

- ✅ **Especificación OpenAPI 3.0.3** creada en `backend/core/swagger.yml`
- ✅ **Endpoints de autenticación** completos (registro, login, refresh, logout, recuperación)
- ✅ **Gestión de usuarios** con perfiles públicos y privados, preferencias
- ✅ **Sistema de categorías** con subcategorías
- ✅ **CRUD completo de productos/servicios** con búsqueda avanzada y filtros
- ✅ **Sistema de matching** con sugerencias personalizadas y gestión de coincidencias
- ✅ **Chat integrado** con conversaciones y mensajería en tiempo real
- ✅ **Gestión de transacciones** con estados y seguimiento completo
- ✅ **Sistema de calificaciones** y reseñas
- ✅ **Notificaciones** push y en aplicación
- ✅ **Sistema de reportes** y moderación
- ✅ **Subida de archivos** e imágenes
- ✅ **Esquemas de datos** detallados con validaciones
- ✅ **Respuestas de error** estandarizadas
- ✅ **Autenticación JWT** con bearer tokens
- ✅ **Documentación completa** con ejemplos y descripciones

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

## 🚀 Próximos pasos:

### Inmediato:

1. Ejecutar `yarn install` en el directorio raíz para instalar todas las dependencias
2. Verificar que todo funciona correctamente

### Desarrollo:

1. **Especificación de la API**: Crear endpoints basados en el modelo de datos
2. **Configuración de PostgreSQL**: Implementar migraciones y esquemas de base de datos
3. **Prototipos de interfaz**: Diseñar wireframes y componentes principales
4. **Implementación del sistema de coincidencias**: Desarrollar algoritmo de matching
5. **Chat integrado**: Implementar WebSocket para mensajería en tiempo real

```

```markdown
# progress.md

## ¿Qué funciona?

- Documentación inicial del sistema y objetivos principales.
- Definición de características esenciales y arquitectura general.
- Configuración del monorepo con Yarn workspaces y TypeScript.
- Testing configurado: Vitest para frontend, Jest para backend y core.
- Frontend muestra pantalla de bienvenida.
- Backend expone endpoint de versión.
- **Modelado de datos completo** con diagrama ER en Mermaid que incluye todas las entidades principales del sistema.

## ¿Qué falta por construir?

- ✅ ~~Modelado de datos y especificación de la API~~ - **COMPLETADO**
- ✅ ~~Especificación completa de la API en Swagger/OpenAPI~~ - **COMPLETADO**
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

### 5. **Modelado de datos del sistema**

- ✅ **Análisis completo** de la documentación para identificar entidades y relaciones
- ✅ **Diagrama ER en Mermaid** creado con 13 entidades principales:
  - **User**: Gestión de usuarios con verificación y reputación
  - **Category/Subcategory**: Clasificación de productos y servicios
  - **Item**: Productos y servicios ofrecidos por usuarios
  - **Match**: Sistema de coincidencias entre usuarios
  - **Conversation/Message**: Chat integrado para negociación
  - **Transaction**: Registro de intercambios completados
  - **Rating**: Sistema de calificaciones y comentarios
  - **UserPreference**: Preferencias y configuración de usuarios
  - **Report**: Sistema de moderación y reportes
  - **Notification**: Sistema de notificaciones
  - **UserVerification**: Verificación de identidad y niveles de confianza
- ✅ **Relaciones definidas** entre todas las entidades con claves foráneas apropiadas
- ✅ **Campos especializados** como geolocalización, metadatos JSON, y enums para estados

### 6. **Especificación completa de la API en Swagger/OpenAPI**

- ✅ **Especificación OpenAPI 3.0.3** creada en `backend/core/swagger.yml`
- ✅ **Endpoints de autenticación** completos (registro, login, refresh, logout, recuperación)
- ✅ **Gestión de usuarios** con perfiles públicos y privados, preferencias
- ✅ **Sistema de categorías** con subcategorías
- ✅ **CRUD completo de productos/servicios** con búsqueda avanzada y filtros
- ✅ **Sistema de matching** con sugerencias personalizadas y gestión de coincidencias
- ✅ **Chat integrado** con conversaciones y mensajería en tiempo real
- ✅ **Gestión de transacciones** con estados y seguimiento completo
- ✅ **Sistema de calificaciones** y reseñas
- ✅ **Notificaciones** push y en aplicación
- ✅ **Sistema de reportes** y moderación
- ✅ **Subida de archivos** e imágenes
- ✅ **Esquemas de datos** detallados con validaciones
- ✅ **Respuestas de error** estandarizadas
- ✅ **Autenticación JWT** con bearer tokens
- ✅ **Documentación completa** con ejemplos y descripciones

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
    ├── package.json (Express, Jest, Prisma)
    ├── tsconfig.json
    ├── jest.config.js
    ├── README.md
    ├── core/
    │   └── swagger.yml (Especificación OpenAPI completa)
    ├── prisma/
    │   └── schema.prisma (Modelo de datos completo)
    └── src/
        ├── index.ts
        └── __tests__/
            └── index.test.ts
```

## 🚀 Próximos pasos:

### Inmediato:

1. Ejecutar `yarn install` en el directorio raíz para instalar todas las dependencias
2. Verificar que todo funciona correctamente

### Desarrollo:

1. **Especificación de la API**: Crear endpoints basados en el modelo de datos
2. **Configuración de PostgreSQL**: Implementar migraciones y esquemas de base de datos
3. **Prototipos de interfaz**: Diseñar wireframes y componentes principales
4. **Implementación del sistema de coincidencias**: Desarrollar algoritmo de matching
5. **Chat integrado**: Implementar WebSocket para mensajería en tiempo real

```

```markdown
# progress.md

## ¿Qué funciona?

- Documentación inicial del sistema y objetivos principales.
- Definición de características esenciales y arquitectura general.
- Configuración del monorepo con Yarn workspaces y TypeScript.
- Testing configurado: Vitest para frontend, Jest para backend y core.
- Frontend muestra pantalla de bienvenida.
- Backend expone endpoint de versión.
- **Modelado de datos completo** con diagrama ER en Mermaid que incluye todas las entidades principales del sistema.

## ¿Qué falta por construir?

- ✅ ~~Modelado de datos y especificación de la API~~ - **COMPLETADO**
- ✅ ~~Especificación completa de la API en Swagger/OpenAPI~~ - **COMPLETADO**
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

### 5. **Modelado de datos del sistema**

- ✅ **Análisis completo** de la documentación para identificar entidades y relaciones
- ✅ **Diagrama ER en Mermaid** creado con 13 entidades principales:
  - **User**: Gestión de usuarios con verificación y reputación
  - **Category/Subcategory**: Clasificación de productos y servicios
  - **Item**: Productos y servicios ofrecidos por usuarios
  - **Match**: Sistema de coincidencias entre usuarios
  - **Conversation/Message**: Chat integrado para negociación
  - **Transaction**: Registro de intercambios completados
  - **Rating**: Sistema de calificaciones y comentarios
  - **UserPreference**: Preferencias y configuración de usuarios
  - **Report**: Sistema de moderación y reportes
  - **Notification**: Sistema de notificaciones
  - **UserVerification**: Verificación de identidad y niveles de confianza
- ✅ **Relaciones definidas** entre todas las entidades con claves foráneas apropiadas
- ✅ **Campos especializados** como geolocalización, metadatos JSON, y enums para estados

### 6. **Especificación completa de la API en Swagger/OpenAPI**

- ✅ **Especificación OpenAPI 3.0.3** creada en `backend/core/swagger.yml`
- ✅ **Endpoints de autenticación** completos (registro, login, refresh, logout, recuperación)
- ✅ **Gestión de usuarios** con perfiles públicos y privados, preferencias
- ✅ **Sistema de categorías** con subcategorías
- ✅ **CRUD completo de productos/servicios** con búsqueda avanzada y filtros
- ✅ **Sistema de matching** con sugerencias personalizadas y gestión de coincidencias
- ✅ **Chat integrado** con conversaciones y mensajería en tiempo real
- ✅ **Gestión de transacciones** con estados y seguimiento completo
- ✅ **Sistema de calificaciones** y reseñas
- ✅ **Notificaciones** push y en aplicación
- ✅ **Sistema de reportes** y moderación
- ✅ **Subida de archivos** e imágenes
- ✅ **Esquemas de datos** detallados con validaciones
- ✅ **Respuestas de error** estandarizadas
- ✅ **Autenticación JWT** con bearer tokens
- ✅ **Documentación completa** con ejemplos y descripciones

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
    ├── package.json (Express, Jest, Prisma)
    ├── tsconfig.json
    ├── jest.config.js
    ├── README.md
    ├── core/
    │   └── swagger.yml (Especificación OpenAPI completa)
    ├── prisma/
    │   └── schema.prisma (Modelo de datos completo)
    └── src/
        ├── index.ts
        └── __tests__/
            └── index.test.ts
```

## 🚀 Próximos pasos:

### Inmediato:

1. Ejecutar `yarn install` en el directorio raíz para instalar todas las dependencias
2. Verificar que todo funciona correctamente

### Desarrollo:

1. ✅ ~~**Especificación de la API**: Crear endpoints basados en el modelo de datos~~ - **COMPLETADO**
2. **Configuración de PostgreSQL**: Implementar migraciones y esquemas de base de datos
3. **Implementación de la API**: Desarrollar controllers, services y middlewares
4. **Prototipos de interfaz**: Diseñar wireframes y componentes principales
5. **Implementación del sistema de coincidencias**: Desarrollar algoritmo de matching
6. **Chat integrado**: Implementar WebSocket para mensajería en tiempo real

```

Perfecto! He completado exitosamente la tarea de crear la especificación completa de la API en formato Swagger/OpenAPI. 

## ✅ **TAREA COMPLETADA: Especificación de la API**

He creado una especificación completa de la API para TruequeAlo en el archivo `backend/core/swagger.yml` que incluye:

### **📋 Lo que se ha creado:**

1. **Especificación OpenAPI 3.0.3 completa** con:
   - Información del proyecto y contacto
   - Múltiples servidores (producción, staging, desarrollo)
   - Autenticación JWT con bearer tokens

2. **Endpoints organizados por funcionalidad:**
   - **Authentication** (8 endpoints): registro, login, refresh, logout, recuperación
   - **Users** (4 endpoints): perfil, preferencias, perfiles públicos
   - **Categories** (2 endpoints): listado de categorías y subcategorías
   - **Items** (5 endpoints): CRUD completo con búsqueda avanzada
   - **Matches** (5 endpoints): sistema de coincidencias y sugerencias
   - **Conversations & Messages** (5 endpoints): chat integrado
   - **Transactions** (4 endpoints): gestión de intercambios
   - **Ratings** (2 endpoints): sistema de calificaciones
   - **Notifications** (3 endpoints): sistema de notificaciones
   - **Reports** (1 endpoint): moderación y reportes
   - **Upload** (1 endpoint): subida de imágenes

3. **Esquemas de datos detallados:**
   - Todos los modelos del sistema con validaciones
   - Enums para estados y tipos
   - Esquemas de entrada y salida diferenciados
   - Respuestas de error estandarizadas
   - Sistema de paginación

4. **Funcionalidades avanzadas:**
   - Búsqueda con filtros geográficos
   - Sistema de matching con puntuaciones de compatibilidad
   - Chat en tiempo real
   - Gestión completa de transacciones
   - Sistema de reputación y calificaciones
   - Notificaciones push
   - Moderación y reportes

### **🔧 Características técnicas:**

- **Autenticación JWT** con access y refresh tokens
- **Validaciones completas** en todos los endpoints
- **Paginación** en listados largos
- **Búsqueda geográfica** con coordenadas y radio
- **Subida de archivos** con múltiples tipos
- **Respuestas consistentes** con formato estándar
- **Documentación detallada** con ejemplos

### **📁 Ubicación:**
El archivo se ha guardado en `backend/core/swagger.yml` como solicitaste.

### **🚀 Próximo paso sugerido:**
Ahora que tenemos la especificación completa de la API, el siguiente paso lógico sería implementar la configuración de PostgreSQL y las migraciones de la base de datos usando Prisma.

¿Te gustaría que continuemos con la implementación de la base de datos o hay algún ajuste que quieras hacer en la especificación de la API?

