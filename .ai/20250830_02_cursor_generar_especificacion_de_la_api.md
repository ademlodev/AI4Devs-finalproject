# Generar especificación de la API
_Exported on 30/08/2025 at 1:29:43 CEST from Cursor (1.4.5)_

---

**User**

necesito generar la especificación de la API basandote en la carpet de @docs/ y @memory-bank/ 

genera todos los endpoints posibles para cubrir los casos de uso definidos hasta ahora en el fichero @PRD-TruequeAlo.md 

---

**Cursor**

Voy a analizar la documentación y el memory-bank para generar una especificación completa de la API basada en los casos de uso definidos en el PRD de TruequeAlo.

Basándome en la documentación completa del proyecto TruequeAlo, voy a generar una especificación completa de la API que cubra todos los casos de uso definidos en el PRD. Analizaré las historias de usuario (HU-001 a HU-010) y el modelo de datos para crear todos los endpoints necesarios.

# Especificación de la API - TruequeAlo

## Información General

**Base URL:** `https://api.truequealo.com/v1`  
**Autenticación:** JWT Bearer Token  
**Formato de Respuesta:** JSON  
**Versionado:** URL Path (`/v1/`)

## Esquemas de Respuesta Comunes

### Respuesta de Error Estándar
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error",
    "details": {}
  },
  "timestamp": "2025-01-30T10:00:00Z"
}
```

### Respuesta Paginada
```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

## 1. Autenticación y Usuarios

### 1.1 Registro de Usuario (HU-001)

**POST** `/auth/register`

```json
// Request
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+34666123456"
}

// Response 201
{
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "profileImageUrl": null,
    "verificationLevel": "unverified",
    "status": "active",
    "createdAt": "2025-01-30T10:00:00Z"
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 900
  }
}
```

### 1.2 Verificación de Email

**POST** `/auth/verify-email`

```json
// Request
{
  "token": "verification_token"
}

// Response 200
{
  "message": "Email verificado correctamente",
  "user": {
    "id": "uuid",
    "verificationLevel": "email_verified"
  }
}
```

### 1.3 Login

**POST** `/auth/login`

```json
// Request
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}

// Response 200
{
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
    "averageRating": 4.5,
    "totalRatings": 12,
    "verificationLevel": "email_verified"
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 900
  }
}
```

### 1.4 Login con OAuth

**POST** `/auth/oauth/{provider}`

Proveedores soportados: `google`, `facebook`, `apple`

```json
// Request
{
  "token": "oauth_token",
  "deviceInfo": {
    "platform": "web",
    "userAgent": "Mozilla/5.0..."
  }
}

// Response 200 - Mismo formato que login
```

### 1.5 Refresh Token

**POST** `/auth/refresh`

```json
// Request
{
  "refreshToken": "refresh_token"
}

// Response 200
{
  "accessToken": "new_jwt_token",
  "expiresIn": 900
}
```

### 1.6 Logout

**POST** `/auth/logout`

```json
// Request
{
  "refreshToken": "refresh_token"
}

// Response 200
{
  "message": "Sesión cerrada correctamente"
}
```

### 1.7 Recuperar Contraseña

**POST** `/auth/forgot-password`

```json
// Request
{
  "email": "usuario@ejemplo.com"
}

// Response 200
{
  "message": "Instrucciones enviadas al email"
}
```

**POST** `/auth/reset-password`

```json
// Request
{
  "token": "reset_token",
  "newPassword": "nueva_password123"
}

// Response 200
{
  "message": "Contraseña actualizada correctamente"
}
```

---

## 2. Gestión de Perfiles

### 2.1 Obtener Perfil Propio

**GET** `/users/profile`

```json
// Response 200
{
  "id": "uuid",
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+34666123456",
  "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
  "bio": "Apasionado del trueque sostenible",
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "averageRating": 4.5,
  "totalRatings": 12,
  "verificationLevel": "phone_verified",
  "status": "active",
  "createdAt": "2025-01-30T10:00:00Z",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

### 2.2 Actualizar Perfil

**PUT** `/users/profile`

```json
// Request
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez García",
  "bio": "Nueva biografía",
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España"
}

// Response 200 - Mismo formato que GET profile
```

### 2.3 Subir Foto de Perfil

**POST** `/users/profile/avatar`

```
Content-Type: multipart/form-data

// Form data
avatar: [file] (max 5MB, JPG/PNG)

// Response 200
{
  "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
  "message": "Foto de perfil actualizada"
}
```

### 2.4 Obtener Perfil Público de Usuario

**GET** `/users/{userId}/profile`

```json
// Response 200
{
  "id": "uuid",
  "firstName": "Juan",
  "lastName": "Pérez",
  "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
  "bio": "Apasionado del trueque sostenible",
  "averageRating": 4.5,
  "totalRatings": 12,
  "verificationLevel": "phone_verified",
  "memberSince": "2025-01-30T10:00:00Z",
  "stats": {
    "totalExchanges": 25,
    "activeItems": 8,
    "responseRate": "95%",
    "responseTime": "2h"
  }
}
```

### 2.5 Obtener Estadísticas del Usuario

**GET** `/users/stats`

```json
// Response 200
{
  "exchanges": {
    "total": 25,
    "completed": 23,
    "inProgress": 2,
    "cancelled": 0
  },
  "items": {
    "active": 8,
    "inactive": 3,
    "total": 11
  },
  "ratings": {
    "average": 4.5,
    "total": 12,
    "distribution": {
      "5": 8,
      "4": 3,
      "3": 1,
      "2": 0,
      "1": 0
    }
  },
  "activity": {
    "responseRate": 95,
    "averageResponseTime": "2h",
    "lastActive": "2025-01-30T08:00:00Z"
  }
}
```

---

## 3. Gestión de Preferencias

### 3.1 Obtener Preferencias

**GET** `/users/preferences`

```json
// Response 200
{
  "interests": ["tecnología", "libros", "deportes"],
  "categories": ["electronics", "books", "sports"],
  "maxDistanceKm": 25.0,
  "notificationSettings": {
    "newMatches": true,
    "messages": true,
    "exchangeUpdates": true,
    "marketing": false,
    "pushNotifications": true,
    "emailNotifications": true,
    "smsNotifications": false
  },
  "privacySettings": {
    "showLocation": true,
    "showPhone": false,
    "showEmail": false,
    "allowDirectContact": true
  }
}
```

### 3.2 Actualizar Preferencias

**PUT** `/users/preferences`

```json
// Request - Mismo formato que GET
// Response 200 - Preferencias actualizadas
```

---

## 4. Categorías y Subcategorías

### 4.1 Obtener Todas las Categorías

**GET** `/categories`

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "name": "Electrónicos",
      "description": "Dispositivos electrónicos y gadgets",
      "iconUrl": "https://cdn.truequealo.com/icons/electronics.svg",
      "sortOrder": 1,
      "isActive": true,
      "subcategories": [
        {
          "id": "uuid",
          "name": "Smartphones",
          "description": "Teléfonos móviles y accesorios",
          "sortOrder": 1,
          "isActive": true
        }
      ]
    }
  ]
}
```

### 4.2 Obtener Categorías Activas

**GET** `/categories/active`

```json
// Response 200 - Solo categorías con isActive: true
```

### 4.3 Obtener Subcategorías de una Categoría

**GET** `/categories/{categoryId}/subcategories`

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "categoryId": "parent_uuid",
      "name": "Smartphones",
      "description": "Teléfonos móviles y accesorios",
      "sortOrder": 1,
      "isActive": true
    }
  ]
}
```

---

## 5. Gestión de Productos/Servicios (Items)

### 5.1 Crear Oferta (HU-002)

**POST** `/items`

```json
// Request
{
  "title": "iPhone 12 Pro en excelente estado",
  "description": "iPhone 12 Pro de 128GB, color azul, con caja original y cargador. Pantalla sin rayones, batería al 95%.",
  "categoryId": "uuid",
  "subcategoryId": "uuid",
  "condition": "like_new",
  "images": [
    "base64_encoded_image_1",
    "base64_encoded_image_2"
  ],
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "tags": ["apple", "smartphone", "128gb"],
  "wantedInReturn": ["MacBook", "tablet", "cámara fotográfica"]
}

// Response 201
{
  "id": "uuid",
  "userId": "uuid",
  "title": "iPhone 12 Pro en excelente estado",
  "description": "iPhone 12 Pro de 128GB...",
  "category": {
    "id": "uuid",
    "name": "Electrónicos"
  },
  "subcategory": {
    "id": "uuid",
    "name": "Smartphones"
  },
  "condition": "like_new",
  "images": [
    "https://cdn.truequealo.com/items/uuid_1.jpg",
    "https://cdn.truequealo.com/items/uuid_2.jpg"
  ],
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "tags": ["apple", "smartphone", "128gb"],
  "wantedInReturn": ["MacBook", "tablet", "cámara fotográfica"],
  "availabilityStatus": "available",
  "isActive": true,
  "createdAt": "2025-01-30T10:00:00Z",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

### 5.2 Obtener Mis Ofertas

**GET** `/users/items`

**Query Parameters:**
- `status`: `active`, `inactive`, `exchanged` (opcional)
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 20)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "title": "iPhone 12 Pro en excelente estado",
      "description": "iPhone 12 Pro de 128GB...",
      "images": ["url1", "url2"],
      "category": {"id": "uuid", "name": "Electrónicos"},
      "condition": "like_new",
      "availabilityStatus": "available",
      "views": 45,
      "interests": 8,
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

### 5.3 Obtener Detalle de Item

**GET** `/items/{itemId}`

```json
// Response 200
{
  "id": "uuid",
  "user": {
    "id": "uuid",
    "firstName": "Juan",
    "lastName": "P.",
    "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
    "averageRating": 4.5,
    "totalRatings": 12,
    "verificationLevel": "phone_verified",
    "responseRate": "95%",
    "responseTime": "2h"
  },
  "title": "iPhone 12 Pro en excelente estado",
  "description": "iPhone 12 Pro de 128GB...",
  "category": {
    "id": "uuid",
    "name": "Electrónicos"
  },
  "subcategory": {
    "id": "uuid",
    "name": "Smartphones"
  },
  "condition": "like_new",
  "images": [
    "https://cdn.truequealo.com/items/uuid_1.jpg",
    "https://cdn.truequealo.com/items/uuid_2.jpg"
  ],
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "distance": 2.5,
  "tags": ["apple", "smartphone", "128gb"],
  "wantedInReturn": ["MacBook", "tablet", "cámara fotográfica"],
  "availabilityStatus": "available",
  "stats": {
    "views": 45,
    "interests": 8,
    "shares": 3
  },
  "createdAt": "2025-01-30T10:00:00Z",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

### 5.4 Actualizar Item

**PUT** `/items/{itemId}`

```json
// Request - Mismo formato que POST /items
// Response 200 - Item actualizado
```

### 5.5 Cambiar Estado de Item

**PATCH** `/items/{itemId}/status`

```json
// Request
{
  "availabilityStatus": "paused" // available, paused, exchanged
}

// Response 200
{
  "id": "uuid",
  "availabilityStatus": "paused",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

### 5.6 Eliminar Item

**DELETE** `/items/{itemId}`

```json
// Response 200
{
  "message": "Item eliminado correctamente"
}
```

### 5.7 Subir Imágenes de Item

**POST** `/items/{itemId}/images`

```
Content-Type: multipart/form-data

// Form data
images: [file1, file2, file3] (max 5 archivos, 5MB cada uno)

// Response 200
{
  "images": [
    "https://cdn.truequealo.com/items/uuid_1.jpg",
    "https://cdn.truequealo.com/items/uuid_2.jpg"
  ]
}
```

---

## 6. Búsqueda y Descubrimiento (HU-003)

### 6.1 Búsqueda General

**GET** `/search/items`

**Query Parameters:**
- `q`: término de búsqueda (opcional)
- `categoryId`: filtro por categoría (opcional)
- `subcategoryId`: filtro por subcategoría (opcional)
- `condition`: filtro por condición (opcional)
- `lat`: latitud para búsqueda geográfica (opcional)
- `lng`: longitud para búsqueda geográfica (opcional)
- `radius`: radio en km (opcional, default: 25)
- `sortBy`: `relevance`, `distance`, `newest`, `oldest` (default: relevance)
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 20, max: 50)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "title": "iPhone 12 Pro en excelente estado",
      "description": "iPhone 12 Pro de 128GB...",
      "images": ["url1"],
      "category": {"id": "uuid", "name": "Electrónicos"},
      "condition": "like_new",
      "user": {
        "id": "uuid",
        "firstName": "Juan",
        "lastName": "P.",
        "averageRating": 4.5,
        "verificationLevel": "phone_verified"
      },
      "distance": 2.5,
      "createdAt": "2025-01-30T10:00:00Z",
      "relevanceScore": 0.95
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "appliedFilters": {
      "categoryId": "uuid",
      "radius": 25
    },
    "availableFilters": {
      "categories": [
        {"id": "uuid", "name": "Electrónicos", "count": 45}
      ],
      "conditions": [
        {"value": "new", "count": 12},
        {"value": "like_new", "count": 28}
      ]
    }
  }
}
```

### 6.2 Búsqueda en Mapa (HU-009)

**GET** `/search/items/map`

**Query Parameters:**
- `bounds`: coordenadas del mapa visible (northEast lat, northEast lng, southWest lat, southWest lng)
- `categoryId`: filtro por categoría (opcional)
- `condition`: filtro por condición (opcional)
- `zoom`: nivel de zoom del mapa (para clustering)

```json
// Response 200
{
  "items": [
    {
      "id": "uuid",
      "title": "iPhone 12 Pro",
      "images": ["url1"],
      "locationCoordinates": {
        "lat": 40.4168,
        "lng": -3.7038
      },
      "category": {"name": "Electrónicos"},
      "condition": "like_new"
    }
  ],
  "clusters": [
    {
      "coordinates": {
        "lat": 40.420,
        "lng": -3.700
      },
      "count": 15,
      "bounds": {
        "northEast": {"lat": 40.425, "lng": -3.695},
        "southWest": {"lat": 40.415, "lng": -3.705}
      }
    }
  ]
}
```

### 6.3 Búsquedas Guardadas

**POST** `/users/saved-searches`

```json
// Request
{
  "name": "MacBooks en Madrid",
  "query": {
    "q": "MacBook",
    "categoryId": "uuid",
    "lat": 40.4168,
    "lng": -3.7038,
    "radius": 10
  },
  "notifyOnNewResults": true
}

// Response 201
{
  "id": "uuid",
  "name": "MacBooks en Madrid",
  "query": {...},
  "notifyOnNewResults": true,
  "createdAt": "2025-01-30T10:00:00Z"
}
```

**GET** `/users/saved-searches`

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "name": "MacBooks en Madrid",
      "query": {...},
      "notifyOnNewResults": true,
      "newResultsCount": 3,
      "lastChecked": "2025-01-30T09:00:00Z",
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ]
}
```

**DELETE** `/users/saved-searches/{searchId}`

---

## 7. Sistema de Matching (HU-004)

### 7.1 Obtener Matches Personalizados

**GET** `/matches/suggestions`

**Query Parameters:**
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 10)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "compatibilityScore": 0.87,
      "userA": {
        "id": "current_user_uuid",
        "item": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        }
      },
      "userB": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "G.",
        "averageRating": 4.8,
        "item": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "matchReasons": [
        "Ambos buscan productos de Apple",
        "Ubicación cercana (3.2 km)",
        "Usuarios con alta reputación"
      ],
      "distance": 3.2,
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 7.2 Expresar Interés en Item

**POST** `/items/{itemId}/interest`

```json
// Request
{
  "myItemId": "uuid", // Item que ofrezco a cambio (opcional)
  "message": "Hola, me interesa tu iPhone. ¿Te interesaría mi MacBook?"
}

// Response 201
{
  "matchId": "uuid",
  "status": "pending",
  "message": "Interés expresado correctamente"
}
```

### 7.3 Obtener Mis Matches

**GET** `/matches`

**Query Parameters:**
- `status`: `pending`, `accepted`, `rejected`, `completed` (opcional)
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 20)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "status": "accepted",
      "compatibilityScore": 0.87,
      "userA": {
        "id": "current_user_uuid",
        "item": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        }
      },
      "userB": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "G.",
        "profileImageUrl": "url",
        "averageRating": 4.8,
        "item": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "conversation": {
        "id": "uuid",
        "lastMessage": {
          "content": "¿Cuándo podríamos hacer el intercambio?",
          "createdAt": "2025-01-30T09:00:00Z"
        },
        "unreadCount": 2
      },
      "createdAt": "2025-01-30T10:00:00Z",
      "updatedAt": "2025-01-30T10:00:00Z"
    }
  ]
}
```

### 7.4 Responder a Match

**PATCH** `/matches/{matchId}`

```json
// Request
{
  "status": "accepted", // accepted, rejected
  "message": "¡Me parece perfecto! ¿Cuándo podríamos quedar?"
}

// Response 200
{
  "id": "uuid",
  "status": "accepted",
  "conversation": {
    "id": "uuid",
    "status": "active"
  },
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

---

## 8. Sistema de Chat y Comunicación (HU-005)

### 8.1 Obtener Conversaciones

**GET** `/conversations`

**Query Parameters:**
- `status`: `active`, `archived` (opcional)
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 20)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "matchId": "uuid",
      "otherUser": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "García",
        "profileImageUrl": "url",
        "averageRating": 4.8,
        "isOnline": true,
        "lastSeen": "2025-01-30T09:45:00Z"
      },
      "lastMessage": {
        "id": "uuid",
        "content": "¿Cuándo podríamos hacer el intercambio?",
        "senderId": "uuid",
        "messageType": "text",
        "createdAt": "2025-01-30T09:00:00Z"
      },
      "unreadCount": 2,
      "status": "active",
      "items": {
        "mine": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        },
        "theirs": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "lastMessageAt": "2025-01-30T09:00:00Z",
      "createdAt": "2025-01-30T08:00:00Z"
    }
  ]
}
```

### 8.2 Obtener Mensajes de Conversación

**GET** `/conversations/{conversationId}/messages`

**Query Parameters:**
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 50)
- `before`: timestamp para paginación hacia atrás (opcional)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "senderId": "uuid",
      "content": "Hola, me interesa tu iPad. ¿Te interesaría mi MacBook?",
      "messageType": "text",
      "metadata": null,
      "isRead": true,
      "createdAt": "2025-01-30T08:00:00Z"
    },
    {
      "id": "uuid",
      "senderId": "other_user_uuid",
      "content": "¡Hola! Sí, me parece interesante. ¿Podrías enviarme más fotos?",
      "messageType": "text",
      "metadata": null,
      "isRead": true,
      "createdAt": "2025-01-30T08:15:00Z"
    },
    {
      "id": "uuid",
      "senderId": "uuid",
      "content": "",
      "messageType": "location",
      "metadata": {
        "coordinates": {
          "lat": 40.4168,
          "lng": -3.7038
        },
        "address": "Plaza Mayor, Madrid"
      },
      "isRead": false,
      "createdAt": "2025-01-30T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 8.3 Enviar Mensaje

**POST** `/conversations/{conversationId}/messages`

```json
// Request - Mensaje de texto
{
  "content": "¿Podríamos quedar mañana por la tarde?",
  "messageType": "text"
}

// Request - Compartir ubicación
{
  "messageType": "location",
  "metadata": {
    "coordinates": {
      "lat": 40.4168,
      "lng": -3.7038
    },
    "address": "Plaza Mayor, Madrid"
  }
}

// Response 201
{
  "id": "uuid",
  "senderId": "uuid",
  "content": "¿Podríamos quedar mañana por la tarde?",
  "messageType": "text",
  "metadata": null,
  "isRead": false,
  "createdAt": "2025-01-30T10:00:00Z"
}
```

### 8.4 Marcar Mensajes como Leídos

**POST** `/conversations/{conversationId}/mark-read`

```json
// Request
{
  "messageIds": ["uuid1", "uuid2"] // opcional, si no se envía marca todos como leídos
}

// Response 200
{
  "message": "Mensajes marcados como leídos",
  "readCount": 5
}
```

### 8.5 Archivar Conversación

**PATCH** `/conversations/{conversationId}`

```json
// Request
{
  "status": "archived" // active, archived
}

// Response 200
{
  "id": "uuid",
  "status": "archived",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

---

## 9. Sistema de WebSocket para Chat en Tiempo Real

### 9.1 Conexión WebSocket

**WebSocket** `/ws`

**Authentication:** JWT token en query parameter o header

```javascript
// Conexión
const ws = new WebSocket('wss://api.truequealo.com/ws?token=jwt_token');

// Eventos del cliente
ws.send(JSON.stringify({
  type: 'join_conversation',
  conversationId: 'uuid'
}));

ws.send(JSON.stringify({
  type: 'send_message',
  conversationId: 'uuid',
  content: 'Hola, ¿cómo estás?',
  messageType: 'text'
}));

ws.send(JSON.stringify({
  type: 'typing',
  conversationId: 'uuid',
  isTyping: true
}));

// Eventos del servidor
{
  "type": "message_received",
  "conversationId": "uuid",
  "message": {
    "id": "uuid",
    "senderId": "uuid",
    "content": "Hola, ¿cómo estás?",
    "messageType": "text",
    "createdAt": "2025-01-30T10:00:00Z"
  }
}

{
  "type": "user_typing",
  "conversationId": "uuid",
  "userId": "uuid",
  "isTyping": true
}

{
  "type": "user_online",
  "userId": "uuid",
  "isOnline": true
}

{
  "type": "message_read",
  "conversationId": "uuid",
  "messageIds": ["uuid1", "uuid2"],
  "readBy": "uuid"
}
```

---

## 10. Gestión de Intercambios/Transacciones (HU-006)

### 10.1 Proponer Intercambio

**POST** `/matches/{matchId}/propose-exchange`

```json
// Request
{
  "meetingProposal": {
    "location": {
      "coordinates": {
        "lat": 40.4168,
        "lng": -3.7038
      },
      "address": "Plaza Mayor, Madrid"
    },
    "proposedTimes": [
      "2025-01-31T15:00:00Z",
      "2025-02-01T10:00:00Z"
    ]
  },
  "exchangeDetails": {
    "notes": "Propongo hacer el intercambio en Plaza Mayor. Puedo cualquiera de estos horarios."
  }
}

// Response 201
{
  "transactionId": "uuid",
  "status": "proposed",
  "meetingProposal": {...},
  "createdAt": "2025-01-30T10:00:00Z"
}
```

### 10.2 Responder a Propuesta de Intercambio

**PATCH** `/transactions/{transactionId}/respond`

```json
// Request
{
  "response": "accepted", // accepted, rejected, counter_proposed
  "selectedTime": "2025-01-31T15:00:00Z", // si accepted
  "counterProposal": { // si counter_proposed
    "location": {...},
    "proposedTimes": [...],
    "notes": "Me va mejor en otro sitio"
  }
}

// Response 200
{
  "id": "uuid",
  "status": "agreed",
  "agreedMeeting": {
    "location": {...},
    "scheduledTime": "2025-01-31T15:00:00Z"
  },
  "agreedAt": "2025-01-30T10:00:00Z"
}
```

### 10.3 Confirmar Intercambio Completado

**POST** `/transactions/{transactionId}/confirm-completion`

```json
// Request
{
  "completed": true,
  "notes": "Intercambio realizado exitosamente. Todo perfecto."
}

// Response 200
{
  "id": "uuid",
  "status": "pending_mutual_confirmation",
  "myConfirmation": {
    "completed": true,
    "confirmedAt": "2025-01-31T15:30:00Z"
  },
  "needsOtherUserConfirmation": true
}

// Cuando ambos confirman
{
  "id": "uuid",
  "status": "completed",
  "completedAt": "2025-01-31T15:30:00Z",
  "bothUsersConfirmed": true
}
```

### 10.4 Obtener Mis Intercambios

**GET** `/transactions`

**Query Parameters:**
- `status`: `proposed`, `agreed`, `completed`, `cancelled` (opcional)
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 20)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "matchId": "uuid",
      "status": "completed",
      "otherUser": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "García",
        "profileImageUrl": "url",
        "averageRating": 4.8
      },
      "items": {
        "mine": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        },
        "theirs": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "meeting": {
        "location": {
          "coordinates": {"lat": 40.4168, "lng": -3.7038},
          "address": "Plaza Mayor, Madrid"
        },
        "scheduledTime": "2025-01-31T15:00:00Z"
      },
      "completedAt": "2025-01-31T15:30:00Z",
      "canRate": true,
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ]
}
```

### 10.5 Cancelar Intercambio

**PATCH** `/transactions/{transactionId}/cancel`

```json
// Request
{
  "reason": "change_of_plans", // change_of_plans, safety_concerns, other
  "notes": "No puedo realizar el intercambio por cambio de planes"
}

// Response 200
{
  "id": "uuid",
  "status": "cancelled",
  "cancellationReason": "change_of_plans",
  "cancelledAt": "2025-01-30T12:00:00Z"
}
```

---

## 11. Sistema de Calificaciones y Reputación (HU-007, HU-008)

### 11.1 Crear Calificación

**POST** `/transactions/{transactionId}/rating`

```json
// Request
{
  "score": 5,
  "comment": "Excelente experiencia de intercambio. Muy puntual y el producto estaba en perfecto estado.",
  "punctualityScore": 5,
  "communicationScore": 5,
  "productConditionScore": 5,
  "tags": ["puntual", "comunicativo", "producto_como_descrito"]
}

// Response 201
{
  "id": "uuid",
  "transactionId": "uuid",
  "raterId": "uuid",
  "ratedId": "uuid",
  "score": 5,
  "comment": "Excelente experiencia de intercambio...",
  "punctualityScore": 5,
  "communicationScore": 5,
  "productConditionScore": 5,
  "tags": ["puntual", "comunicativo", "producto_como_descrito"],
  "isModerated": false,
  "createdAt": "2025-01-31T16:00:00Z"
}
```

### 11.2 Obtener Calificaciones de Usuario

**GET** `/users/{userId}/ratings`

**Query Parameters:**
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 20)
- `sortBy`: `newest`, `oldest`, `highest`, `lowest` (default: newest)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "rater": {
        "id": "uuid",
        "firstName": "Carlos",
        "lastName": "M.",
        "profileImageUrl": "url"
      },
      "score": 5,
      "comment": "Excelente experiencia de intercambio...",
      "punctualityScore": 5,
      "communicationScore": 5,
      "productConditionScore": 5,
      "tags": ["puntual", "comunicativo", "producto_como_descrito"],
      "transaction": {
        "id": "uuid",
        "items": {
          "exchanged": {
            "title": "iPad Pro con Apple Pencil"
          },
          "received": {
            "title": "MacBook Pro 2020"
          }
        }
      },
      "createdAt": "2025-01-31T16:00:00Z"
    }
  ],
  "summary": {
    "averageScore": 4.8,
    "totalRatings": 15,
    "distribution": {
      "5": 12,
      "4": 2,
      "3": 1,
      "2": 0,
      "1": 0
    },
    "averageScores": {
      "punctuality": 4.9,
      "communication": 4.8,
      "productCondition": 4.7
    },
    "commonTags": [
      {"tag": "puntual", "count": 10},
      {"tag": "comunicativo", "count": 8},
      {"tag": "producto_como_descrito", "count": 12}
    ]
  }
}
```

### 11.3 Obtener Mis Calificaciones (Recibidas)

**GET** `/users/ratings/received`

### 11.4 Obtener Calificaciones que He Dado

**GET** `/users/ratings/given`

---

## 12. Sistema de Notificaciones (HU-010)

### 12.1 Obtener Notificaciones

**GET** `/notifications`

**Query Parameters:**
- `type`: `match`, `message`, `exchange`, `rating`, `system` (opcional)
- `isRead`: `true`, `false` (opcional)
- `page`: número de página (default: 1)
- `limit`: elementos por página (default: 20)

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "type": "new_match",
      "title": "¡Nuevo match encontrado!",
      "content": "María está interesada en tu MacBook Pro y ofrece su iPad Pro a cambio.",
      "data": {
        "matchId": "uuid",
        "otherUserId": "uuid",
        "itemId": "uuid"
      },
      "isRead": false,
      "createdAt": "2025-01-30T10:00:00Z"
    },
    {
      "id": "uuid",
      "type": "new_message",
      "title": "Nuevo mensaje de María",
      "content": "¿Cuándo podríamos hacer el intercambio?",
      "data": {
        "conversationId": "uuid",
        "messageId": "uuid",
        "senderId": "uuid"
      },
      "isRead": false,
      "createdAt": "2025-01-30T09:00:00Z"
    }
  ],
  "unreadCount": 5
}
```

### 12.2 Marcar Notificación como Leída

**PATCH** `/notifications/{notificationId}`

```json
// Request
{
  "isRead": true
}

// Response 200
{
  "id": "uuid",
  "isRead": true
}
```

### 12.3 Marcar Todas como Leídas

**POST** `/notifications/mark-all-read`

```json
// Response 200
{
  "message": "Todas las notificaciones marcadas como leídas",
  "updatedCount": 5
}
```

### 12.4 Eliminar Notificación

**DELETE** `/notifications/{notificationId}`

### 12.5 Configurar Notificaciones Push

**POST** `/notifications/push-token`

```json
// Request
{
  "token": "firebase_push_token",
  "platform": "web", // web, ios, android
  "deviceId": "unique_device_id"
}

// Response 200
{
  "message": "Token de push registrado correctamente"
}
```

---

## 13. Sistema de Verificación de Usuarios

### 13.1 Iniciar Verificación de Teléfono

**POST** `/verification/phone/start`

```json
// Request
{
  "phone": "+34666123456"
}

// Response 200
{
  "message": "Código de verificación enviado",
  "verificationId": "uuid"
}
```

### 13.2 Confirmar Verificación de Teléfono

**POST** `/verification/phone/confirm`

```json
// Request
{
  "verificationId": "uuid",
  "code": "123456"
}

// Response 200
{
  "message": "Teléfono verificado correctamente",
  "verificationLevel": "phone_verified"
}
```

### 13.3 Iniciar Verificación de Identidad

**POST** `/verification/identity/start`

```json
// Request
{
  "verificationType": "document" // document, selfie, video_call
}

// Response 200
{
  "verificationId": "uuid",
  "uploadUrl": "https://secure-upload.truequealo.com/uuid",
  "instructions": "Sube una foto clara de tu documento de identidad..."
}
```

### 13.4 Obtener Estado de Verificaciones

**GET** `/users/verifications`

```json
// Response 200
{
  "verifications": [
    {
      "id": "uuid",
      "verificationType": "email",
      "status": "verified",
      "verifiedAt": "2025-01-30T10:00:00Z"
    },
    {
      "id": "uuid",
      "verificationType": "phone",
      "status": "verified",
      "verifiedAt": "2025-01-30T11:00:00Z"
    },
    {
      "id": "uuid",
      "verificationType": "document",
      "status": "pending",
      "createdAt": "2025-01-30T12:00:00Z"
    }
  ],
  "currentLevel": "phone_verified",
  "nextLevel": "identity_verified",
  "benefits": {
    "current": ["Chat con otros usuarios", "Crear hasta 10 ofertas"],
    "next": ["Destacar ofertas", "Crear ofertas ilimitadas", "Soporte prioritario"]
  }
}
```

---

## 14. Sistema de Reportes y Moderación

### 14.1 Reportar Usuario

**POST** `/reports/user`

```json
// Request
{
  "reportedUserId": "uuid",
  "reportType": "inappropriate_behavior", // inappropriate_behavior, spam, fake_profile, safety_concern
  "description": "El usuario no se presentó al intercambio acordado y no respondió a los mensajes.",
  "evidence": {
    "conversationId": "uuid",
    "transactionId": "uuid"
  }
}

// Response 201
{
  "id": "uuid",
  "status": "pending_review",
  "message": "Reporte enviado correctamente. Nuestro equipo lo revisará en 24-48 horas."
}
```

### 14.2 Reportar Item

**POST** `/reports/item`

```json
// Request
{
  "reportedItemId": "uuid",
  "reportType": "inappropriate_content", // inappropriate_content, misleading_info, prohibited_item, spam
  "description": "El producto no corresponde con la descripción y las fotos son engañosas."
}
```

### 14.3 Reportar Mensaje

**POST** `/reports/message`

```json
// Request
{
  "reportedMessageId": "uuid",
  "reportType": "harassment", // harassment, spam, inappropriate_content, threats
  "description": "El usuario está enviando mensajes ofensivos y amenazantes."
}
```

### 14.4 Obtener Mis Reportes

**GET** `/reports/my-reports`

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "reportType": "inappropriate_behavior",
      "status": "resolved",
      "description": "El usuario no se presentó al intercambio...",
      "moderatorNotes": "Advertencia enviada al usuario reportado.",
      "createdAt": "2025-01-29T10:00:00Z",
      "resolvedAt": "2025-01-30T14:00:00Z"
    }
  ]
}
```

---

## 15. Sistema de Administración (Para Moderadores)

### 15.1 Dashboard de Moderación

**GET** `/admin/moderation/dashboard`

```json
// Response 200
{
  "pendingReports": {
    "total": 15,
    "byType": {
      "user": 8,
      "item": 5,
      "message": 2
    },
    "urgent": 3
  },
  "pendingVerifications": {
    "identity": 12,
    "business": 3
  },
  "systemStats": {
    "activeUsers": 1250,
    "activeItems": 3500,
    "dailyMatches": 45,
    "completedExchanges": 23
  }
}
```

### 15.2 Gestionar Reportes

**GET** `/admin/reports`

**PATCH** `/admin/reports/{reportId}`

```json
// Request
{
  "status": "resolved",
  "moderatorNotes": "Advertencia enviada al usuario. Monitoreando actividad.",
  "action": "warning" // warning, suspension, ban, no_action
}
```

### 15.3 Gestionar Usuarios

**GET** `/admin/users`

**PATCH** `/admin/users/{userId}/status`

```json
// Request
{
  "status": "suspended", // active, suspended, banned
  "reason": "Múltiples reportes por comportamiento inapropiado",
  "duration": 7 // días de suspensión, opcional
}
```

---

## 16. APIs de Utilidad

### 16.1 Geocodificación

**GET** `/utils/geocode`

**Query Parameters:**
- `address`: dirección a geocodificar

```json
// Response 200
{
  "coordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Plaza Mayor, Madrid, España",
  "components": {
    "city": "Madrid",
    "country": "España",
    "postalCode": "28012"
  }
}
```

### 16.2 Geocodificación Inversa

**GET** `/utils/reverse-geocode`

**Query Parameters:**
- `lat`: latitud
- `lng`: longitud

```json
// Response 200
{
  "address": "Plaza Mayor, Madrid, España",
  "components": {
    "street": "Plaza Mayor",
    "city": "Madrid",
    "country": "España",
    "postalCode": "28012"
  }
}
```

### 16.3 Calcular Distancia

**GET** `/utils/distance`

**Query Parameters:**
- `from`: `lat,lng` (punto origen)
- `to`: `lat,lng` (punto destino)

```json
// Response 200
{
  "distance": 2.5,
  "unit": "km",
  "duration": 15,
  "durationUnit": "minutes"
}
```

### 16.4 Subir Archivo

**POST** `/utils/upload`

```
Content-Type: multipart/form-data

// Form data
file: [file]
type: "profile" | "item" | "verification"

// Response 200
{
  "url": "https://cdn.truequealo.com/uploads/uuid.jpg",
  "filename": "uuid.jpg",
  "size": 1024576,
  "mimeType": "image/jpeg"
}
```

---

## 17. Webhooks (Para Integraciones)

### 17.1 Webhook de Match Creado

```json
POST /webhooks/match-created
{
  "event": "match.created",
  "data": {
    "matchId": "uuid",
    "userA": {"id": "uuid", "email": "user1@example.com"},
    "userB": {"id": "uuid", "email": "user2@example.com"},
    "compatibilityScore": 0.87
  },
  "timestamp": "2025-01-30T10:00:00Z"
}
```

### 17.2 Webhook de Intercambio Completado

```json
POST /webhooks/exchange-completed
{
  "event": "exchange.completed",
  "data": {
    "transactionId": "uuid",
    "userA": {"id": "uuid"},
    "userB": {"id": "uuid"},
    "items": {
      "itemA": {"id": "uuid", "title": "MacBook Pro"},
      "itemB": {"id": "uuid", "title": "iPad Pro"}
    }
  },
  "timestamp": "2025-01-31T15:30:00Z"
}
```

---

## 18. Códigos de Estado HTTP

### Códigos de Éxito
- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Operación exitosa sin contenido de respuesta

### Códigos de Error del Cliente
- **400 Bad Request**: Datos de entrada inválidos
- **401 Unauthorized**: Token de autenticación inválido o faltante
- **403 Forbidden**: No tiene permisos para esta operación
- **404 Not Found**: Recurso no encontrado
- **409 Conflict**: Conflicto con el estado actual del recurso
- **422 Unprocessable Entity**: Datos válidos pero lógicamente incorrectos
- **429 Too Many Requests**: Límite de rate limiting excedido

### Códigos de Error del Servidor
- **500 Internal Server Error**: Error interno del servidor
- **502 Bad Gateway**: Error en servicio externo
- **503 Service Unavailable**: Servicio temporalmente no disponible

---

## 19. Rate Limiting

### Límites por Endpoint

| Endpoint | Límite | Ventana |
|----------|---------|---------|
| `/auth/login` | 5 intentos | 15 minutos |
| `/auth/register` | 3 intentos | 1 hora |
| `/search/*` | 100 requests | 1 minuto |
| `/items` (POST) | 10 requests | 1 hora |
| `/messages` (POST) | 60 requests | 1 minuto |
| General | 1000 requests | 1 hora |

### Headers de Rate Limiting

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1643723400
Retry-After: 3600 (en caso de 429)
```

---

## 20. Versionado de API

### Estrategia de Versionado
- **URL Path**: `/v1/`, `/v2/`
- **Backward Compatibility**: Mantenida por 12 meses
- **Deprecation Notice**: 6 meses antes de eliminar versión

### Headers de Versionado
```
API-Version: 1.0
Deprecated: false
Sunset: 2026-01-30T00:00:00Z (si aplica)
```

---

Esta especificación de API cubre todos los casos de uso definidos en el PRD de TruequeAlo, desde el registro de usuarios hasta la gestión completa de intercambios, incluyendo sistemas avanzados como matching inteligente, chat en tiempo real, reputación y moderación. La API está diseñada para ser escalable, segura y fácil de integrar tanto para el frontend como para posibles integraciones futuras.

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error",
    "details": {}
  },
  "timestamp": "2025-01-30T10:00:00Z"
}
```

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

```json
// Request
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+34666123456"
}

// Response 201
{
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "profileImageUrl": null,
    "verificationLevel": "unverified",
    "status": "active",
    "createdAt": "2025-01-30T10:00:00Z"
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 900
  }
}
```

```json
// Request
{
  "token": "verification_token"
}

// Response 200
{
  "message": "Email verificado correctamente",
  "user": {
    "id": "uuid",
    "verificationLevel": "email_verified"
  }
}
```

```json
// Request
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}

// Response 200
{
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
    "averageRating": 4.5,
    "totalRatings": 12,
    "verificationLevel": "email_verified"
  },
  "tokens": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresIn": 900
  }
}
```

```json
// Request
{
  "token": "oauth_token",
  "deviceInfo": {
    "platform": "web",
    "userAgent": "Mozilla/5.0..."
  }
}

// Response 200 - Mismo formato que login
```

```json
// Request
{
  "refreshToken": "refresh_token"
}

// Response 200
{
  "accessToken": "new_jwt_token",
  "expiresIn": 900
}
```

```json
// Request
{
  "refreshToken": "refresh_token"
}

// Response 200
{
  "message": "Sesión cerrada correctamente"
}
```

```json
// Request
{
  "email": "usuario@ejemplo.com"
}

// Response 200
{
  "message": "Instrucciones enviadas al email"
}
```

```json
// Request
{
  "token": "reset_token",
  "newPassword": "nueva_password123"
}

// Response 200
{
  "message": "Contraseña actualizada correctamente"
}
```

```json
// Response 200
{
  "id": "uuid",
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+34666123456",
  "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
  "bio": "Apasionado del trueque sostenible",
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "averageRating": 4.5,
  "totalRatings": 12,
  "verificationLevel": "phone_verified",
  "status": "active",
  "createdAt": "2025-01-30T10:00:00Z",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

```json
// Request
{
  "firstName": "Juan Carlos",
  "lastName": "Pérez García",
  "bio": "Nueva biografía",
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España"
}

// Response 200 - Mismo formato que GET profile
```

```plaintext
Content-Type: multipart/form-data

// Form data
avatar: [file] (max 5MB, JPG/PNG)

// Response 200
{
  "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
  "message": "Foto de perfil actualizada"
}
```

```json
// Response 200
{
  "id": "uuid",
  "firstName": "Juan",
  "lastName": "Pérez",
  "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
  "bio": "Apasionado del trueque sostenible",
  "averageRating": 4.5,
  "totalRatings": 12,
  "verificationLevel": "phone_verified",
  "memberSince": "2025-01-30T10:00:00Z",
  "stats": {
    "totalExchanges": 25,
    "activeItems": 8,
    "responseRate": "95%",
    "responseTime": "2h"
  }
}
```

```json
// Response 200
{
  "exchanges": {
    "total": 25,
    "completed": 23,
    "inProgress": 2,
    "cancelled": 0
  },
  "items": {
    "active": 8,
    "inactive": 3,
    "total": 11
  },
  "ratings": {
    "average": 4.5,
    "total": 12,
    "distribution": {
      "5": 8,
      "4": 3,
      "3": 1,
      "2": 0,
      "1": 0
    }
  },
  "activity": {
    "responseRate": 95,
    "averageResponseTime": "2h",
    "lastActive": "2025-01-30T08:00:00Z"
  }
}
```

```json
// Response 200
{
  "interests": ["tecnología", "libros", "deportes"],
  "categories": ["electronics", "books", "sports"],
  "maxDistanceKm": 25.0,
  "notificationSettings": {
    "newMatches": true,
    "messages": true,
    "exchangeUpdates": true,
    "marketing": false,
    "pushNotifications": true,
    "emailNotifications": true,
    "smsNotifications": false
  },
  "privacySettings": {
    "showLocation": true,
    "showPhone": false,
    "showEmail": false,
    "allowDirectContact": true
  }
}
```

```json
// Request - Mismo formato que GET
// Response 200 - Preferencias actualizadas
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "name": "Electrónicos",
      "description": "Dispositivos electrónicos y gadgets",
      "iconUrl": "https://cdn.truequealo.com/icons/electronics.svg",
      "sortOrder": 1,
      "isActive": true,
      "subcategories": [
        {
          "id": "uuid",
          "name": "Smartphones",
          "description": "Teléfonos móviles y accesorios",
          "sortOrder": 1,
          "isActive": true
        }
      ]
    }
  ]
}
```

```json
// Response 200 - Solo categorías con isActive: true
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "categoryId": "parent_uuid",
      "name": "Smartphones",
      "description": "Teléfonos móviles y accesorios",
      "sortOrder": 1,
      "isActive": true
    }
  ]
}
```

```json
// Request
{
  "title": "iPhone 12 Pro en excelente estado",
  "description": "iPhone 12 Pro de 128GB, color azul, con caja original y cargador. Pantalla sin rayones, batería al 95%.",
  "categoryId": "uuid",
  "subcategoryId": "uuid",
  "condition": "like_new",
  "images": [
    "base64_encoded_image_1",
    "base64_encoded_image_2"
  ],
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "tags": ["apple", "smartphone", "128gb"],
  "wantedInReturn": ["MacBook", "tablet", "cámara fotográfica"]
}

// Response 201
{
  "id": "uuid",
  "userId": "uuid",
  "title": "iPhone 12 Pro en excelente estado",
  "description": "iPhone 12 Pro de 128GB...",
  "category": {
    "id": "uuid",
    "name": "Electrónicos"
  },
  "subcategory": {
    "id": "uuid",
    "name": "Smartphones"
  },
  "condition": "like_new",
  "images": [
    "https://cdn.truequealo.com/items/uuid_1.jpg",
    "https://cdn.truequealo.com/items/uuid_2.jpg"
  ],
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "tags": ["apple", "smartphone", "128gb"],
  "wantedInReturn": ["MacBook", "tablet", "cámara fotográfica"],
  "availabilityStatus": "available",
  "isActive": true,
  "createdAt": "2025-01-30T10:00:00Z",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "title": "iPhone 12 Pro en excelente estado",
      "description": "iPhone 12 Pro de 128GB...",
      "images": ["url1", "url2"],
      "category": {"id": "uuid", "name": "Electrónicos"},
      "condition": "like_new",
      "availabilityStatus": "available",
      "views": 45,
      "interests": 8,
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

```json
// Response 200
{
  "id": "uuid",
  "user": {
    "id": "uuid",
    "firstName": "Juan",
    "lastName": "P.",
    "profileImageUrl": "https://cdn.truequealo.com/profiles/uuid.jpg",
    "averageRating": 4.5,
    "totalRatings": 12,
    "verificationLevel": "phone_verified",
    "responseRate": "95%",
    "responseTime": "2h"
  },
  "title": "iPhone 12 Pro en excelente estado",
  "description": "iPhone 12 Pro de 128GB...",
  "category": {
    "id": "uuid",
    "name": "Electrónicos"
  },
  "subcategory": {
    "id": "uuid",
    "name": "Smartphones"
  },
  "condition": "like_new",
  "images": [
    "https://cdn.truequealo.com/items/uuid_1.jpg",
    "https://cdn.truequealo.com/items/uuid_2.jpg"
  ],
  "locationCoordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Madrid, España",
  "distance": 2.5,
  "tags": ["apple", "smartphone", "128gb"],
  "wantedInReturn": ["MacBook", "tablet", "cámara fotográfica"],
  "availabilityStatus": "available",
  "stats": {
    "views": 45,
    "interests": 8,
    "shares": 3
  },
  "createdAt": "2025-01-30T10:00:00Z",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

```json
// Request - Mismo formato que POST /items
// Response 200 - Item actualizado
```

```json
// Request
{
  "availabilityStatus": "paused" // available, paused, exchanged
}

// Response 200
{
  "id": "uuid",
  "availabilityStatus": "paused",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

```json
// Response 200
{
  "message": "Item eliminado correctamente"
}
```

```plaintext
Content-Type: multipart/form-data

// Form data
images: [file1, file2, file3] (max 5 archivos, 5MB cada uno)

// Response 200
{
  "images": [
    "https://cdn.truequealo.com/items/uuid_1.jpg",
    "https://cdn.truequealo.com/items/uuid_2.jpg"
  ]
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "title": "iPhone 12 Pro en excelente estado",
      "description": "iPhone 12 Pro de 128GB...",
      "images": ["url1"],
      "category": {"id": "uuid", "name": "Electrónicos"},
      "condition": "like_new",
      "user": {
        "id": "uuid",
        "firstName": "Juan",
        "lastName": "P.",
        "averageRating": 4.5,
        "verificationLevel": "phone_verified"
      },
      "distance": 2.5,
      "createdAt": "2025-01-30T10:00:00Z",
      "relevanceScore": 0.95
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "appliedFilters": {
      "categoryId": "uuid",
      "radius": 25
    },
    "availableFilters": {
      "categories": [
        {"id": "uuid", "name": "Electrónicos", "count": 45}
      ],
      "conditions": [
        {"value": "new", "count": 12},
        {"value": "like_new", "count": 28}
      ]
    }
  }
}
```

```json
// Response 200
{
  "items": [
    {
      "id": "uuid",
      "title": "iPhone 12 Pro",
      "images": ["url1"],
      "locationCoordinates": {
        "lat": 40.4168,
        "lng": -3.7038
      },
      "category": {"name": "Electrónicos"},
      "condition": "like_new"
    }
  ],
  "clusters": [
    {
      "coordinates": {
        "lat": 40.420,
        "lng": -3.700
      },
      "count": 15,
      "bounds": {
        "northEast": {"lat": 40.425, "lng": -3.695},
        "southWest": {"lat": 40.415, "lng": -3.705}
      }
    }
  ]
}
```

```json
// Request
{
  "name": "MacBooks en Madrid",
  "query": {
    "q": "MacBook",
    "categoryId": "uuid",
    "lat": 40.4168,
    "lng": -3.7038,
    "radius": 10
  },
  "notifyOnNewResults": true
}

// Response 201
{
  "id": "uuid",
  "name": "MacBooks en Madrid",
  "query": {...},
  "notifyOnNewResults": true,
  "createdAt": "2025-01-30T10:00:00Z"
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "name": "MacBooks en Madrid",
      "query": {...},
      "notifyOnNewResults": true,
      "newResultsCount": 3,
      "lastChecked": "2025-01-30T09:00:00Z",
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ]
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "compatibilityScore": 0.87,
      "userA": {
        "id": "current_user_uuid",
        "item": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        }
      },
      "userB": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "G.",
        "averageRating": 4.8,
        "item": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "matchReasons": [
        "Ambos buscan productos de Apple",
        "Ubicación cercana (3.2 km)",
        "Usuarios con alta reputación"
      ],
      "distance": 3.2,
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

```json
// Request
{
  "myItemId": "uuid", // Item que ofrezco a cambio (opcional)
  "message": "Hola, me interesa tu iPhone. ¿Te interesaría mi MacBook?"
}

// Response 201
{
  "matchId": "uuid",
  "status": "pending",
  "message": "Interés expresado correctamente"
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "status": "accepted",
      "compatibilityScore": 0.87,
      "userA": {
        "id": "current_user_uuid",
        "item": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        }
      },
      "userB": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "G.",
        "profileImageUrl": "url",
        "averageRating": 4.8,
        "item": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "conversation": {
        "id": "uuid",
        "lastMessage": {
          "content": "¿Cuándo podríamos hacer el intercambio?",
          "createdAt": "2025-01-30T09:00:00Z"
        },
        "unreadCount": 2
      },
      "createdAt": "2025-01-30T10:00:00Z",
      "updatedAt": "2025-01-30T10:00:00Z"
    }
  ]
}
```

```json
// Request
{
  "status": "accepted", // accepted, rejected
  "message": "¡Me parece perfecto! ¿Cuándo podríamos quedar?"
}

// Response 200
{
  "id": "uuid",
  "status": "accepted",
  "conversation": {
    "id": "uuid",
    "status": "active"
  },
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "matchId": "uuid",
      "otherUser": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "García",
        "profileImageUrl": "url",
        "averageRating": 4.8,
        "isOnline": true,
        "lastSeen": "2025-01-30T09:45:00Z"
      },
      "lastMessage": {
        "id": "uuid",
        "content": "¿Cuándo podríamos hacer el intercambio?",
        "senderId": "uuid",
        "messageType": "text",
        "createdAt": "2025-01-30T09:00:00Z"
      },
      "unreadCount": 2,
      "status": "active",
      "items": {
        "mine": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        },
        "theirs": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "lastMessageAt": "2025-01-30T09:00:00Z",
      "createdAt": "2025-01-30T08:00:00Z"
    }
  ]
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "senderId": "uuid",
      "content": "Hola, me interesa tu iPad. ¿Te interesaría mi MacBook?",
      "messageType": "text",
      "metadata": null,
      "isRead": true,
      "createdAt": "2025-01-30T08:00:00Z"
    },
    {
      "id": "uuid",
      "senderId": "other_user_uuid",
      "content": "¡Hola! Sí, me parece interesante. ¿Podrías enviarme más fotos?",
      "messageType": "text",
      "metadata": null,
      "isRead": true,
      "createdAt": "2025-01-30T08:15:00Z"
    },
    {
      "id": "uuid",
      "senderId": "uuid",
      "content": "",
      "messageType": "location",
      "metadata": {
        "coordinates": {
          "lat": 40.4168,
          "lng": -3.7038
        },
        "address": "Plaza Mayor, Madrid"
      },
      "isRead": false,
      "createdAt": "2025-01-30T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

```json
// Request - Mensaje de texto
{
  "content": "¿Podríamos quedar mañana por la tarde?",
  "messageType": "text"
}

// Request - Compartir ubicación
{
  "messageType": "location",
  "metadata": {
    "coordinates": {
      "lat": 40.4168,
      "lng": -3.7038
    },
    "address": "Plaza Mayor, Madrid"
  }
}

// Response 201
{
  "id": "uuid",
  "senderId": "uuid",
  "content": "¿Podríamos quedar mañana por la tarde?",
  "messageType": "text",
  "metadata": null,
  "isRead": false,
  "createdAt": "2025-01-30T10:00:00Z"
}
```

```json
// Request
{
  "messageIds": ["uuid1", "uuid2"] // opcional, si no se envía marca todos como leídos
}

// Response 200
{
  "message": "Mensajes marcados como leídos",
  "readCount": 5
}
```

```json
// Request
{
  "status": "archived" // active, archived
}

// Response 200
{
  "id": "uuid",
  "status": "archived",
  "updatedAt": "2025-01-30T10:00:00Z"
}
```

```javascript
// Conexión
const ws = new WebSocket('wss://api.truequealo.com/ws?token=jwt_token');

// Eventos del cliente
ws.send(JSON.stringify({
  type: 'join_conversation',
  conversationId: 'uuid'
}));

ws.send(JSON.stringify({
  type: 'send_message',
  conversationId: 'uuid',
  content: 'Hola, ¿cómo estás?',
  messageType: 'text'
}));

ws.send(JSON.stringify({
  type: 'typing',
  conversationId: 'uuid',
  isTyping: true
}));

// Eventos del servidor
{
  "type": "message_received",
  "conversationId": "uuid",
  "message": {
    "id": "uuid",
    "senderId": "uuid",
    "content": "Hola, ¿cómo estás?",
    "messageType": "text",
    "createdAt": "2025-01-30T10:00:00Z"
  }
}

{
  "type": "user_typing",
  "conversationId": "uuid",
  "userId": "uuid",
  "isTyping": true
}

{
  "type": "user_online",
  "userId": "uuid",
  "isOnline": true
}

{
  "type": "message_read",
  "conversationId": "uuid",
  "messageIds": ["uuid1", "uuid2"],
  "readBy": "uuid"
}
```

```json
// Request
{
  "meetingProposal": {
    "location": {
      "coordinates": {
        "lat": 40.4168,
        "lng": -3.7038
      },
      "address": "Plaza Mayor, Madrid"
    },
    "proposedTimes": [
      "2025-01-31T15:00:00Z",
      "2025-02-01T10:00:00Z"
    ]
  },
  "exchangeDetails": {
    "notes": "Propongo hacer el intercambio en Plaza Mayor. Puedo cualquiera de estos horarios."
  }
}

// Response 201
{
  "transactionId": "uuid",
  "status": "proposed",
  "meetingProposal": {...},
  "createdAt": "2025-01-30T10:00:00Z"
}
```

```json
// Request
{
  "response": "accepted", // accepted, rejected, counter_proposed
  "selectedTime": "2025-01-31T15:00:00Z", // si accepted
  "counterProposal": { // si counter_proposed
    "location": {...},
    "proposedTimes": [...],
    "notes": "Me va mejor en otro sitio"
  }
}

// Response 200
{
  "id": "uuid",
  "status": "agreed",
  "agreedMeeting": {
    "location": {...},
    "scheduledTime": "2025-01-31T15:00:00Z"
  },
  "agreedAt": "2025-01-30T10:00:00Z"
}
```

```json
// Request
{
  "completed": true,
  "notes": "Intercambio realizado exitosamente. Todo perfecto."
}

// Response 200
{
  "id": "uuid",
  "status": "pending_mutual_confirmation",
  "myConfirmation": {
    "completed": true,
    "confirmedAt": "2025-01-31T15:30:00Z"
  },
  "needsOtherUserConfirmation": true
}

// Cuando ambos confirman
{
  "id": "uuid",
  "status": "completed",
  "completedAt": "2025-01-31T15:30:00Z",
  "bothUsersConfirmed": true
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "matchId": "uuid",
      "status": "completed",
      "otherUser": {
        "id": "uuid",
        "firstName": "María",
        "lastName": "García",
        "profileImageUrl": "url",
        "averageRating": 4.8
      },
      "items": {
        "mine": {
          "id": "uuid",
          "title": "MacBook Pro 2020",
          "images": ["url1"]
        },
        "theirs": {
          "id": "uuid",
          "title": "iPad Pro con Apple Pencil",
          "images": ["url1"]
        }
      },
      "meeting": {
        "location": {
          "coordinates": {"lat": 40.4168, "lng": -3.7038},
          "address": "Plaza Mayor, Madrid"
        },
        "scheduledTime": "2025-01-31T15:00:00Z"
      },
      "completedAt": "2025-01-31T15:30:00Z",
      "canRate": true,
      "createdAt": "2025-01-30T10:00:00Z"
    }
  ]
}
```

```json
// Request
{
  "reason": "change_of_plans", // change_of_plans, safety_concerns, other
  "notes": "No puedo realizar el intercambio por cambio de planes"
}

// Response 200
{
  "id": "uuid",
  "status": "cancelled",
  "cancellationReason": "change_of_plans",
  "cancelledAt": "2025-01-30T12:00:00Z"
}
```

```json
// Request
{
  "score": 5,
  "comment": "Excelente experiencia de intercambio. Muy puntual y el producto estaba en perfecto estado.",
  "punctualityScore": 5,
  "communicationScore": 5,
  "productConditionScore": 5,
  "tags": ["puntual", "comunicativo", "producto_como_descrito"]
}

// Response 201
{
  "id": "uuid",
  "transactionId": "uuid",
  "raterId": "uuid",
  "ratedId": "uuid",
  "score": 5,
  "comment": "Excelente experiencia de intercambio...",
  "punctualityScore": 5,
  "communicationScore": 5,
  "productConditionScore": 5,
  "tags": ["puntual", "comunicativo", "producto_como_descrito"],
  "isModerated": false,
  "createdAt": "2025-01-31T16:00:00Z"
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "rater": {
        "id": "uuid",
        "firstName": "Carlos",
        "lastName": "M.",
        "profileImageUrl": "url"
      },
      "score": 5,
      "comment": "Excelente experiencia de intercambio...",
      "punctualityScore": 5,
      "communicationScore": 5,
      "productConditionScore": 5,
      "tags": ["puntual", "comunicativo", "producto_como_descrito"],
      "transaction": {
        "id": "uuid",
        "items": {
          "exchanged": {
            "title": "iPad Pro con Apple Pencil"
          },
          "received": {
            "title": "MacBook Pro 2020"
          }
        }
      },
      "createdAt": "2025-01-31T16:00:00Z"
    }
  ],
  "summary": {
    "averageScore": 4.8,
    "totalRatings": 15,
    "distribution": {
      "5": 12,
      "4": 2,
      "3": 1,
      "2": 0,
      "1": 0
    },
    "averageScores": {
      "punctuality": 4.9,
      "communication": 4.8,
      "productCondition": 4.7
    },
    "commonTags": [
      {"tag": "puntual", "count": 10},
      {"tag": "comunicativo", "count": 8},
      {"tag": "producto_como_descrito", "count": 12}
    ]
  }
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "type": "new_match",
      "title": "¡Nuevo match encontrado!",
      "content": "María está interesada en tu MacBook Pro y ofrece su iPad Pro a cambio.",
      "data": {
        "matchId": "uuid",
        "otherUserId": "uuid",
        "itemId": "uuid"
      },
      "isRead": false,
      "createdAt": "2025-01-30T10:00:00Z"
    },
    {
      "id": "uuid",
      "type": "new_message",
      "title": "Nuevo mensaje de María",
      "content": "¿Cuándo podríamos hacer el intercambio?",
      "data": {
        "conversationId": "uuid",
        "messageId": "uuid",
        "senderId": "uuid"
      },
      "isRead": false,
      "createdAt": "2025-01-30T09:00:00Z"
    }
  ],
  "unreadCount": 5
}
```

```json
// Request
{
  "isRead": true
}

// Response 200
{
  "id": "uuid",
  "isRead": true
}
```

```json
// Response 200
{
  "message": "Todas las notificaciones marcadas como leídas",
  "updatedCount": 5
}
```

```json
// Request
{
  "token": "firebase_push_token",
  "platform": "web", // web, ios, android
  "deviceId": "unique_device_id"
}

// Response 200
{
  "message": "Token de push registrado correctamente"
}
```

```json
// Request
{
  "phone": "+34666123456"
}

// Response 200
{
  "message": "Código de verificación enviado",
  "verificationId": "uuid"
}
```

```json
// Request
{
  "verificationId": "uuid",
  "code": "123456"
}

// Response 200
{
  "message": "Teléfono verificado correctamente",
  "verificationLevel": "phone_verified"
}
```

```json
// Request
{
  "verificationType": "document" // document, selfie, video_call
}

// Response 200
{
  "verificationId": "uuid",
  "uploadUrl": "https://secure-upload.truequealo.com/uuid",
  "instructions": "Sube una foto clara de tu documento de identidad..."
}
```

```json
// Response 200
{
  "verifications": [
    {
      "id": "uuid",
      "verificationType": "email",
      "status": "verified",
      "verifiedAt": "2025-01-30T10:00:00Z"
    },
    {
      "id": "uuid",
      "verificationType": "phone",
      "status": "verified",
      "verifiedAt": "2025-01-30T11:00:00Z"
    },
    {
      "id": "uuid",
      "verificationType": "document",
      "status": "pending",
      "createdAt": "2025-01-30T12:00:00Z"
    }
  ],
  "currentLevel": "phone_verified",
  "nextLevel": "identity_verified",
  "benefits": {
    "current": ["Chat con otros usuarios", "Crear hasta 10 ofertas"],
    "next": ["Destacar ofertas", "Crear ofertas ilimitadas", "Soporte prioritario"]
  }
}
```

```json
// Request
{
  "reportedUserId": "uuid",
  "reportType": "inappropriate_behavior", // inappropriate_behavior, spam, fake_profile, safety_concern
  "description": "El usuario no se presentó al intercambio acordado y no respondió a los mensajes.",
  "evidence": {
    "conversationId": "uuid",
    "transactionId": "uuid"
  }
}

// Response 201
{
  "id": "uuid",
  "status": "pending_review",
  "message": "Reporte enviado correctamente. Nuestro equipo lo revisará en 24-48 horas."
}
```

```json
// Request
{
  "reportedItemId": "uuid",
  "reportType": "inappropriate_content", // inappropriate_content, misleading_info, prohibited_item, spam
  "description": "El producto no corresponde con la descripción y las fotos son engañosas."
}
```

```json
// Request
{
  "reportedMessageId": "uuid",
  "reportType": "harassment", // harassment, spam, inappropriate_content, threats
  "description": "El usuario está enviando mensajes ofensivos y amenazantes."
}
```

```json
// Response 200
{
  "data": [
    {
      "id": "uuid",
      "reportType": "inappropriate_behavior",
      "status": "resolved",
      "description": "El usuario no se presentó al intercambio...",
      "moderatorNotes": "Advertencia enviada al usuario reportado.",
      "createdAt": "2025-01-29T10:00:00Z",
      "resolvedAt": "2025-01-30T14:00:00Z"
    }
  ]
}
```

```json
// Response 200
{
  "pendingReports": {
    "total": 15,
    "byType": {
      "user": 8,
      "item": 5,
      "message": 2
    },
    "urgent": 3
  },
  "pendingVerifications": {
    "identity": 12,
    "business": 3
  },
  "systemStats": {
    "activeUsers": 1250,
    "activeItems": 3500,
    "dailyMatches": 45,
    "completedExchanges": 23
  }
}
```

```json
// Request
{
  "status": "resolved",
  "moderatorNotes": "Advertencia enviada al usuario. Monitoreando actividad.",
  "action": "warning" // warning, suspension, ban, no_action
}
```

```json
// Request
{
  "status": "suspended", // active, suspended, banned
  "reason": "Múltiples reportes por comportamiento inapropiado",
  "duration": 7 // días de suspensión, opcional
}
```

```json
// Response 200
{
  "coordinates": {
    "lat": 40.4168,
    "lng": -3.7038
  },
  "address": "Plaza Mayor, Madrid, España",
  "components": {
    "city": "Madrid",
    "country": "España",
    "postalCode": "28012"
  }
}
```

```json
// Response 200
{
  "address": "Plaza Mayor, Madrid, España",
  "components": {
    "street": "Plaza Mayor",
    "city": "Madrid",
    "country": "España",
    "postalCode": "28012"
  }
}
```

```json
// Response 200
{
  "distance": 2.5,
  "unit": "km",
  "duration": 15,
  "durationUnit": "minutes"
}
```

```plaintext
Content-Type: multipart/form-data

// Form data
file: [file]
type: "profile" | "item" | "verification"

// Response 200
{
  "url": "https://cdn.truequealo.com/uploads/uuid.jpg",
  "filename": "uuid.jpg",
  "size": 1024576,
  "mimeType": "image/jpeg"
}
```

```json
POST /webhooks/match-created
{
  "event": "match.created",
  "data": {
    "matchId": "uuid",
    "userA": {"id": "uuid", "email": "user1@example.com"},
    "userB": {"id": "uuid", "email": "user2@example.com"},
    "compatibilityScore": 0.87
  },
  "timestamp": "2025-01-30T10:00:00Z"
}
```

```json
POST /webhooks/exchange-completed
{
  "event": "exchange.completed",
  "data": {
    "transactionId": "uuid",
    "userA": {"id": "uuid"},
    "userB": {"id": "uuid"},
    "items": {
      "itemA": {"id": "uuid", "title": "MacBook Pro"},
      "itemB": {"id": "uuid", "title": "iPad Pro"}
    }
  },
  "timestamp": "2025-01-31T15:30:00Z"
}
```

```plaintext
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1643723400
Retry-After: 3600 (en caso de 429)
```

```plaintext
API-Version: 1.0
Deprecated: false
Sunset: 2026-01-30T00:00:00Z (si aplica)
```

---

**User**

genera con esta espeficiación un fichero swagger e integralo dentro de la carpeta @backend/ para que al levantar el API pueda ser consultado

---

**Cursor**

Voy a generar el archivo Swagger basado en la especificación de API que creé anteriormente e integrarlo en el backend para que sea consultable al levantar la API.

Ahora voy a crear el archivo Swagger y actualizar el backend para integrarlo:

Primero, voy a actualizar el `package.json` para agregar las dependencias necesarias para Swagger:

```json:backend/package.json
{
  "name": "@truequealo/backend",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc -b",
    "test": "jest"
  },
  "dependencies": {
    "@prisma/client": "^5.19.1",
    "express": "^4.18.0",
    "prisma": "^5.19.1",
    "swagger-ui-express": "^5.0.0",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.0.0",
    "@types/supertest": "^2.0.0",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/yamljs": "^0.2.34",
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "ts-jest": "^29.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

Ahora voy a crear el archivo de especificación Swagger en formato YAML:

```yaml:backend/src/swagger/api-spec.yaml
openapi: 3.0.3
info:
  title: TruequeAlo API
  description: |
    API completa para la plataforma TruequeAlo - Sistema de intercambio de bienes y servicios.
    
    ## Autenticación
    La API utiliza JWT Bearer tokens para autenticación. Incluye el token en el header:
    ```
    Authorization: Bearer <token>
    ```
    
    ## Rate Limiting
    - General: 1000 requests/hora
    - Login: 5 intentos/15 minutos
    - Registro: 3 intentos/hora
    - Búsquedas: 100 requests/minuto
    
    ## Códigos de Error
    - 400: Bad Request - Datos inválidos
    - 401: Unauthorized - Token inválido
    - 403: Forbidden - Sin permisos
    - 404: Not Found - Recurso no encontrado
    - 429: Too Many Requests - Rate limit excedido
    - 500: Internal Server Error
  version: 1.0.0
  contact:
    name: Equipo TruequeAlo
    email: api@truequealo.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
servers:
  - url: https://api.truequealo.com/v1
    description: Servidor de Producción
  - url: https://staging-api.truequealo.com/v1
    description: Servidor de Staging
  - url: http://localhost:3000/api/v1
    description: Servidor de Desarrollo

paths:
  # Autenticación y Usuarios
  /auth/register:
    post:
      tags:
        - Autenticación
      summary: Registro de nuevo usuario
      description: Crea una nueva cuenta de usuario y devuelve tokens de acceso
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterRequest'
      responses:
        '201':
          description: Usuario registrado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
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
        - Autenticación
      summary: Iniciar sesión
      description: Autentica un usuario y devuelve tokens de acceso
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Credenciales inválidas
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/oauth/{provider}:
    post:
      tags:
        - Autenticación
      summary: Login con OAuth
      description: Autentica usando proveedores OAuth (Google, Facebook, Apple)
      parameters:
        - name: provider
          in: path
          required: true
          schema:
            type: string
            enum: [google, facebook, apple]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OAuthRequest'
      responses:
        '200':
          description: Login OAuth exitoso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'

  /auth/refresh:
    post:
      tags:
        - Autenticación
      summary: Renovar token de acceso
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RefreshTokenRequest'
      responses:
        '200':
          description: Token renovado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'

  /auth/logout:
    post:
      tags:
        - Autenticación
      summary: Cerrar sesión
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LogoutRequest'
      responses:
        '200':
          description: Sesión cerrada exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessageResponse'

  # Gestión de Perfiles
  /users/profile:
    get:
      tags:
        - Perfiles
      summary: Obtener perfil propio
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Perfil del usuario
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':
          $ref: '#/components/responses/Unauthorized'

    put:
      tags:
        - Perfiles
      summary: Actualizar perfil
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateProfileRequest'
      responses:
        '200':
          description: Perfil actualizado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'

  /users/{userId}/profile:
    get:
      tags:
        - Perfiles
      summary: Obtener perfil público de usuario
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Perfil público del usuario
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicUserProfile'
        '404':
          $ref: '#/components/responses/NotFound'

  # Categorías
  /categories:
    get:
      tags:
        - Categorías
      summary: Obtener todas las categorías
      responses:
        '200':
          description: Lista de categorías
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Category'

  /categories/active:
    get:
      tags:
        - Categorías
      summary: Obtener categorías activas
      responses:
        '200':
          description: Lista de categorías activas
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Category'

  # Gestión de Items
  /items:
    post:
      tags:
        - Items
      summary: Crear nueva oferta
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateItemRequest'
      responses:
        '201':
          description: Item creado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /items/{itemId}:
    get:
      tags:
        - Items
      summary: Obtener detalle de item
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Detalle del item
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ItemDetail'
        '404':
          $ref: '#/components/responses/NotFound'

    put:
      tags:
        - Items
      summary: Actualizar item
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/UpdateItemRequest'
      responses:
        '200':
          description: Item actualizado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'

    delete:
      tags:
        - Items
      summary: Eliminar item
      security:
        - bearerAuth: []
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Item eliminado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessageResponse'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'

  # Búsqueda
  /search/items:
    get:
      tags:
        - Búsqueda
      summary: Búsqueda general de items
      parameters:
        - name: q
          in: query
          description: Término de búsqueda
          schema:
            type: string
        - name: categoryId
          in: query
          description: Filtro por categoría
          schema:
            type: string
            format: uuid
        - name: condition
          in: query
          description: Filtro por condición
          schema:
            type: string
            enum: [new, like_new, good, fair, poor]
        - name: lat
          in: query
          description: Latitud para búsqueda geográfica
          schema:
            type: number
            format: double
        - name: lng
          in: query
          description: Longitud para búsqueda geográfica
          schema:
            type: number
            format: double
        - name: radius
          in: query
          description: Radio de búsqueda en km
          schema:
            type: number
            default: 25
        - name: sortBy
          in: query
          description: Ordenamiento de resultados
          schema:
            type: string
            enum: [relevance, distance, newest, oldest]
            default: relevance
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Resultados de búsqueda
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResponse'

  # Matching
  /matches/suggestions:
    get:
      tags:
        - Matching
      summary: Obtener matches personalizados
      security:
        - bearerAuth: []
      parameters:
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
            maximum: 20
            default: 10
      responses:
        '200':
          description: Lista de matches sugeridos
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MatchSuggestionsResponse'

  /items/{itemId}/interest:
    post:
      tags:
        - Matching
      summary: Expresar interés en item
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/ExpressInterestRequest'
      responses:
        '201':
          description: Interés expresado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MatchCreatedResponse'

  # Chat y Conversaciones
  /conversations:
    get:
      tags:
        - Chat
      summary: Obtener conversaciones
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [active, archived]
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Lista de conversaciones
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ConversationsResponse'

  /conversations/{conversationId}/messages:
    get:
      tags:
        - Chat
      summary: Obtener mensajes de conversación
      security:
        - bearerAuth: []
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
      responses:
        '200':
          description: Lista de mensajes
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesResponse'

    post:
      tags:
        - Chat
      summary: Enviar mensaje
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/SendMessageRequest'
      responses:
        '201':
          description: Mensaje enviado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Message'

  # Transacciones/Intercambios
  /matches/{matchId}/propose-exchange:
    post:
      tags:
        - Intercambios
      summary: Proponer intercambio
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/ProposeExchangeRequest'
      responses:
        '201':
          description: Propuesta de intercambio creada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'

  /transactions:
    get:
      tags:
        - Intercambios
      summary: Obtener mis intercambios
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [proposed, agreed, completed, cancelled]
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Lista de intercambios
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TransactionsResponse'

  /transactions/{transactionId}/confirm-completion:
    post:
      tags:
        - Intercambios
      summary: Confirmar intercambio completado
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/ConfirmCompletionRequest'
      responses:
        '200':
          description: Confirmación registrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'

  # Sistema de Calificaciones
  /transactions/{transactionId}/rating:
    post:
      tags:
        - Calificaciones
      summary: Crear calificación
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/CreateRatingRequest'
      responses:
        '201':
          description: Calificación creada exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Rating'

  /users/{userId}/ratings:
    get:
      tags:
        - Calificaciones
      summary: Obtener calificaciones de usuario
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
            maximum: 50
            default: 20
        - name: sortBy
          in: query
          schema:
            type: string
            enum: [newest, oldest, highest, lowest]
            default: newest
      responses:
        '200':
          description: Lista de calificaciones
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RatingsResponse'

  # Notificaciones
  /notifications:
    get:
      tags:
        - Notificaciones
      summary: Obtener notificaciones
      security:
        - bearerAuth: []
      parameters:
        - name: type
          in: query
          schema:
            type: string
            enum: [match, message, exchange, rating, system]
        - name: isRead
          in: query
          schema:
            type: boolean
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Lista de notificaciones
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotificationsResponse'

  /notifications/mark-all-read:
    post:
      tags:
        - Notificaciones
      summary: Marcar todas las notificaciones como leídas
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Notificaciones marcadas como leídas
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  updatedCount:
                    type: integer

  # Reportes
  /reports/user:
    post:
      tags:
        - Reportes
      summary: Reportar usuario
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ReportUserRequest'
      responses:
        '201':
          description: Reporte enviado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ReportResponse'

  /reports/item:
    post:
      tags:
        - Reportes
      summary: Reportar item
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ReportItemRequest'
      responses:
        '201':
          description: Reporte enviado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ReportResponse'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT token obtenido del endpoint de login

  responses:
    BadRequest:
      description: Solicitud inválida
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    Unauthorized:
      description: Token de autenticación requerido o inválido
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    Forbidden:
      description: No tiene permisos para esta operación
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    NotFound:
      description: Recurso no encontrado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    TooManyRequests:
      description: Demasiadas solicitudes - Rate limit excedido
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
      headers:
        X-RateLimit-Limit:
          schema:
            type: integer
          description: Límite de requests por ventana de tiempo
        X-RateLimit-Remaining:
          schema:
            type: integer
          description: Requests restantes en la ventana actual
        X-RateLimit-Reset:
          schema:
            type: integer
          description: Timestamp cuando se resetea el límite
        Retry-After:
          schema:
            type: integer
          description: Segundos hasta que se puede intentar de nuevo

  schemas:
    # Esquemas de Error
    Error:
      type: object
      properties:
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
              type: object
        timestamp:
          type: string
          format: date-time
          example: "2025-01-30T10:00:00Z"

    MessageResponse:
      type: object
      properties:
        message:
          type: string

    # Esquemas de Paginación
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
          example: 100
        totalPages:
          type: integer
          example: 5
        hasNext:
          type: boolean
          example: true
        hasPrev:
          type: boolean
          example: false

    # Esquemas de Autenticación
    RegisterRequest:
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
          example: "usuario@ejemplo.com"
        password:
          type: string
          minLength: 8
          example: "password123"
        firstName:
          type: string
          example: "Juan"
        lastName:
          type: string
          example: "Pérez"
        phone:
          type: string
          example: "+34666123456"

    LoginRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          format: email
          example: "usuario@ejemplo.com"
        password:
          type: string
          example: "password123"

    OAuthRequest:
      type: object
      required:
        - token
      properties:
        token:
          type: string
          description: Token de OAuth del proveedor
        deviceInfo:
          type: object
          properties:
            platform:
              type: string
              enum: [web, ios, android]
            userAgent:
              type: string

    RefreshTokenRequest:
      type: object
      required:
        - refreshToken
      properties:
        refreshToken:
          type: string

    LogoutRequest:
      type: object
      required:
        - refreshToken
      properties:
        refreshToken:
          type: string

    TokenResponse:
      type: object
      properties:
        accessToken:
          type: string
        expiresIn:
          type: integer
          example: 900

    AuthResponse:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/UserBasic'
        tokens:
          type: object
          properties:
            accessToken:
              type: string
            refreshToken:
              type: string
            expiresIn:
              type: integer
              example: 900

    # Esquemas de Usuario
    UserBasic:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        firstName:
          type: string
        lastName:
          type: string
        profileImageUrl:
          type: string
          format: uri
          nullable: true
        verificationLevel:
          type: string
          enum: [unverified, email_verified, phone_verified, identity_verified]
        status:
          type: string
          enum: [active, suspended, banned]
        createdAt:
          type: string
          format: date-time

    UserProfile:
      allOf:
        - $ref: '#/components/schemas/UserBasic'
        - type: object
          properties:
            phone:
              type: string
            bio:
              type: string
              nullable: true
            locationCoordinates:
              $ref: '#/components/schemas/Coordinates'
            address:
              type: string
              nullable: true
            averageRating:
              type: number
              format: double
              minimum: 0
              maximum: 5
            totalRatings:
              type: integer
              minimum: 0
            updatedAt:
              type: string
              format: date-time

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
          format: double
        totalRatings:
          type: integer
        verificationLevel:
          type: string
          enum: [unverified, email_verified, phone_verified, identity_verified]
        memberSince:
          type: string
          format: date-time
        stats:
          type: object
          properties:
            totalExchanges:
              type: integer
            activeItems:
              type: integer
            responseRate:
              type: string
              example: "95%"
            responseTime:
              type: string
              example: "2h"

    UpdateProfileRequest:
      type: object
      properties:
        firstName:
          type: string
        lastName:
          type: string
        bio:
          type: string
        locationCoordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string

    # Esquemas de Ubicación
    Coordinates:
      type: object
      properties:
        lat:
          type: number
          format: double
          example: 40.4168
        lng:
          type: number
          format: double
          example: -3.7038

    Location:
      type: object
      properties:
        coordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string
          example: "Madrid, España"

    # Esquemas de Categorías
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
        iconUrl:
          type: string
          format: uri
        sortOrder:
          type: integer
        isActive:
          type: boolean
        subcategories:
          type: array
          items:
            $ref: '#/components/schemas/Subcategory'
        createdAt:
          type: string
          format: date-time
        updatedAt:
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
        sortOrder:
          type: integer
        isActive:
          type: boolean

    # Esquemas de Items
    CreateItemRequest:
      type: object
      required:
        - title
        - description
        - categoryId
        - condition
      properties:
        title:
          type: string
          maxLength: 200
          example: "iPhone 12 Pro en excelente estado"
        description:
          type: string
          example: "iPhone 12 Pro de 128GB, color azul, con caja original..."
        categoryId:
          type: string
          format: uuid
        subcategoryId:
          type: string
          format: uuid
        condition:
          type: string
          enum: [new, like_new, good, fair, poor]
        images:
          type: array
          items:
            type: string
            description: Base64 encoded image
          maxItems: 5
        locationCoordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string
        tags:
          type: array
          items:
            type: string
        wantedInReturn:
          type: array
          items:
            type: string
          description: Descripción de lo que busca a cambio

    UpdateItemRequest:
      allOf:
        - $ref: '#/components/schemas/CreateItemRequest'

    Item:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        title:
          type: string
        description:
          type: string
        category:
          type: object
          properties:
            id:
              type: string
              format: uuid
            name:
              type: string
        subcategory:
          type: object
          properties:
            id:
              type: string
              format: uuid
            name:
              type: string
        condition:
          type: string
          enum: [new, like_new, good, fair, poor]
        images:
          type: array
          items:
            type: string
            format: uri
        locationCoordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string
        tags:
          type: array
          items:
            type: string
        wantedInReturn:
          type: array
          items:
            type: string
        availabilityStatus:
          type: string
          enum: [available, paused, exchanged]
        isActive:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    ItemDetail:
      allOf:
        - $ref: '#/components/schemas/Item'
        - type: object
          properties:
            user:
              $ref: '#/components/schemas/PublicUserProfile'
            distance:
              type: number
              format: double
              description: Distancia en km
            stats:
              type: object
              properties:
                views:
                  type: integer
                interests:
                  type: integer
                shares:
                  type: integer

    # Esquemas de Búsqueda
    SearchResponse:
      type: object
      properties:
        data:
          type: array
          items:
            type: object
            allOf:
              - $ref: '#/components/schemas/Item'
              - type: object
                properties:
                  user:
                    type: object
                    properties:
                      id:
                        type: string
                        format: uuid
                      firstName:
                        type: string
                      lastName:
                        type: string
                      averageRating:
                        type: number
                      verificationLevel:
                        type: string
                  distance:
                    type: number
                    format: double
                  relevanceScore:
                    type: number
                    format: double
        pagination:
          $ref: '#/components/schemas/Pagination'
        filters:
          type: object
          properties:
            appliedFilters:
              type: object
            availableFilters:
              type: object
              properties:
                categories:
                  type: array
                  items:
                    type: object
                    properties:
                      id:
                        type: string
                        format: uuid
                      name:
                        type: string
                      count:
                        type: integer
                conditions:
                  type: array
                  items:
                    type: object
                    properties:
                      value:
                        type: string
                      count:
                        type: integer

    # Esquemas de Matching
    MatchSuggestionsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Match'
        pagination:
          $ref: '#/components/schemas/Pagination'

    Match:
      type: object
      properties:
        id:
          type: string
          format: uuid
        compatibilityScore:
          type: number
          format: double
          minimum: 0
          maximum: 1
        userA:
          type: object
          properties:
            id:
              type: string
              format: uuid
            item:
              $ref: '#/components/schemas/ItemSummary'
        userB:
          type: object
          properties:
            id:
              type: string
              format: uuid
            firstName:
              type: string
            lastName:
              type: string
            averageRating:
              type: number
              format: double
            item:
              $ref: '#/components/schemas/ItemSummary'
        matchReasons:
          type: array
          items:
            type: string
        distance:
          type: number
          format: double
        createdAt:
          type: string
          format: date-time

    ItemSummary:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
        images:
          type: array
          items:
            type: string
            format: uri

    ExpressInterestRequest:
      type: object
      properties:
        myItemId:
          type: string
          format: uuid
          description: Item que ofrezco a cambio (opcional)
        message:
          type: string
          example: "Hola, me interesa tu iPhone. ¿Te interesaría mi MacBook?"

    MatchCreatedResponse:
      type: object
      properties:
        matchId:
          type: string
          format: uuid
        status:
          type: string
          enum: [pending, accepted, rejected]
        message:
          type: string

    # Esquemas de Chat
    ConversationsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Conversation'

    Conversation:
      type: object
      properties:
        id:
          type: string
          format: uuid
        matchId:
          type: string
          format: uuid
        otherUser:
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
            averageRating:
              type: number
              format: double
            isOnline:
              type: boolean
            lastSeen:
              type: string
              format: date-time
        lastMessage:
          $ref: '#/components/schemas/Message'
        unreadCount:
          type: integer
        status:
          type: string
          enum: [active, archived]
        items:
          type: object
          properties:
            mine:
              $ref: '#/components/schemas/ItemSummary'
            theirs:
              $ref: '#/components/schemas/ItemSummary'
        lastMessageAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time

    MessagesResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Message'
        pagination:
          $ref: '#/components/schemas/Pagination'

    Message:
      type: object
      properties:
        id:
          type: string
          format: uuid
        senderId:
          type: string
          format: uuid
        content:
          type: string
        messageType:
          type: string
          enum: [text, image, location]
        metadata:
          type: object
          nullable: true
        isRead:
          type: boolean
        createdAt:
          type: string
          format: date-time

    SendMessageRequest:
      type: object
      required:
        - messageType
      properties:
        content:
          type: string
          description: Contenido del mensaje (requerido para tipo text)
        messageType:
          type: string
          enum: [text, image, location]
        metadata:
          type: object
          description: Metadatos adicionales (ej. coordenadas para tipo location)

    # Esquemas de Transacciones
    ProposeExchangeRequest:
      type: object
      required:
        - meetingProposal
      properties:
        meetingProposal:
          type: object
          properties:
            location:
              $ref: '#/components/schemas/Location'
            proposedTimes:
              type: array
              items:
                type: string
                format: date-time
        exchangeDetails:
          type: object
          properties:
            notes:
              type: string

    ConfirmCompletionRequest:
      type: object
      required:
        - completed
      properties:
        completed:
          type: boolean
        notes:
          type: string

    TransactionsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Transaction'

    Transaction:
      type: object
      properties:
        id:
          type: string
          format: uuid
        matchId:
          type: string
          format: uuid
        status:
          type: string
          enum: [proposed, agreed, completed, cancelled]
        otherUser:
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
            averageRating:
              type: number
              format: double
        items:
          type: object
          properties:
            mine:
              $ref: '#/components/schemas/ItemSummary'
            theirs:
              $ref: '#/components/schemas/ItemSummary'
        meeting:
          type: object
          properties:
            location:
              $ref: '#/components/schemas/Location'
            scheduledTime:
              type: string
              format: date-time
        completedAt:
          type: string
          format: date-time
          nullable: true
        canRate:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # Esquemas de Calificaciones
    CreateRatingRequest:
      type: object
      required:
        - score
      properties:
        score:
          type: integer
          minimum: 1
          maximum: 5
        comment:
          type: string
        punctualityScore:
          type: integer
          minimum: 1
          maximum: 5
        communicationScore:
          type: integer
          minimum: 1
          maximum: 5
        productConditionScore:
          type: integer
          minimum: 1
          maximum: 5
        tags:
          type: array
          items:
            type: string

    RatingsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Rating'
        summary:
          type: object
          properties:
            averageScore:
              type: number
              format: double
            totalRatings:
              type: integer
            distribution:
              type: object
              properties:
                "5":
                  type: integer
                "4":
                  type: integer
                "3":
                  type: integer
                "2":
                  type: integer
                "1":
                  type: integer
            averageScores:
              type: object
              properties:
                punctuality:
                  type: number
                  format: double
                communication:
                  type: number
                  format: double
                productCondition:
                  type: number
                  format: double
            commonTags:
              type: array
              items:
                type: object
                properties:
                  tag:
                    type: string
                  count:
                    type: integer

    Rating:
      type: object
      properties:
        id:
          type: string
          format: uuid
        rater:
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
        score:
          type: integer
          minimum: 1
          maximum: 5
        comment:
          type: string
        punctualityScore:
          type: integer
        communicationScore:
          type: integer
        productConditionScore:
          type: integer
        tags:
          type: array
          items:
            type: string
        transaction:
          type: object
          properties:
            id:
              type: string
              format: uuid
            items:
              type: object
              properties:
                exchanged:
                  type: object
                  properties:
                    title:
                      type: string
                received:
                  type: object
                  properties:
                    title:
                      type: string
        createdAt:
          type: string
          format: date-time

    # Esquemas de Notificaciones
    NotificationsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Notification'
        unreadCount:
          type: integer

    Notification:
      type: object
      properties:
        id:
          type: string
          format: uuid
        type:
          type: string
          enum: [new_match, new_message, exchange_update, new_rating, system]
        title:
          type: string
        content:
          type: string
        data:
          type: object
          description: Datos específicos según el tipo de notificación
        isRead:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # Esquemas de Reportes
    ReportUserRequest:
      type: object
      required:
        - reportedUserId
        - reportType
        - description
      properties:
        reportedUserId:
          type: string
          format: uuid
        reportType:
          type: string
          enum: [inappropriate_behavior, spam, fake_profile, safety_concern]
        description:
          type: string
        evidence:
          type: object
          properties:
            conversationId:
              type: string
              format: uuid
            transactionId:
              type: string
              format: uuid

    ReportItemRequest:
      type: object
      required:
        - reportedItemId
        - reportType
        - description
      properties:
        reportedItemId:
          type: string
          format: uuid
        reportType:
          type: string
          enum: [inappropriate_content, misleading_info, prohibited_item, spam]
        description:
          type: string

    ReportResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
        status:
          type: string
          enum: [pending_review, under_review, resolved, dismissed]
        message:
          type: string

tags:
  - name: Autenticación
    description: Endpoints para registro, login y gestión de sesiones
  - name: Perfiles
    description: Gestión de perfiles de usuario
  - name: Categorías
    description: Categorías y subcategorías de productos/servicios
  - name: Items
    description: Gestión de productos y servicios ofrecidos
  - name: Búsqueda
    description: Búsqueda y filtrado de items
  - name: Matching
    description: Sistema de coincidencias entre usuarios
  - name: Chat
    description: Sistema de mensajería entre usuarios
  - name: Intercambios
    description: Gestión de propuestas e intercambios
  - name: Calificaciones
    description: Sistema de reputación y calificaciones
  - name: Notificaciones
    description: Sistema de notificaciones
  - name: Reportes
    description: Sistema de reportes y moderación

externalDocs:
  description: Documentación completa del proyecto TruequeAlo
  url: https://docs.truequealo.com
```

Ahora voy a actualizar el archivo `index.ts` del backend para integrar Swagger UI:

```typescript:backend/src/index.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { version } from '../package.json';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Cargar la especificación Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'api-spec.yaml'));

// Configurar Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #2563eb; }
  `,
  customSiteTitle: 'TruequeAlo API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
  }
}));

// Ruta para obtener la especificación OpenAPI en JSON
app.get('/api/openapi.json', (_req, res) => {
  res.json(swaggerDocument);
});

// Ruta para obtener la especificación OpenAPI en YAML
app.get('/api/openapi.yaml', (_req, res) => {
  res.type('text/yaml');
  res.send(YAML.stringify(swaggerDocument, 4));
});

// Endpoint de versión existente
app.get('/api/version', (_req, res) => {
  res.json({ 
    version,
    name: 'TruequeAlo API',
    description: 'API para plataforma de intercambio de bienes y servicios',
    documentation: '/api/docs'
  });
});

// Ruta de salud del servicio
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version,
    uptime: process.uptime()
  });
});

// Middleware para rutas no encontradas
app.use('*', (_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint no encontrado. Consulta la documentación en /api/docs'
    },
    timestamp: new Date().toISOString()
  });
});

// Middleware de manejo de errores
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Error interno del servidor'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TruequeAlo Backend iniciado en puerto ${PORT}`);
  console.log(`📚 Documentación API disponible en: http://localhost:${PORT}/api/docs`);
  console.log(`🔍 OpenAPI JSON: http://localhost:${PORT}/api/openapi.json`);
  console.log(`📄 OpenAPI YAML: http://localhost:${PORT}/api/openapi.yaml`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

export default app;
```

También voy a crear el directorio para el archivo swagger y añadir algunos tipos TypeScript adicionales:

```json
{
  "name": "@truequealo/backend",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc -b",
    "test": "jest"
  },
  "dependencies": {
    "@prisma/client": "^5.19.1",
    "express": "^4.18.0",
    "prisma": "^5.19.1",
    "swagger-ui-express": "^5.0.0",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.0.0",
    "@types/supertest": "^2.0.0",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/yamljs": "^0.2.34",
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "ts-jest": "^29.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

```yaml
openapi: 3.0.3
info:
  title: TruequeAlo API
  description: |
    API completa para la plataforma TruequeAlo - Sistema de intercambio de bienes y servicios.
    
    ## Autenticación
    La API utiliza JWT Bearer tokens para autenticación. Incluye el token en el header:
    ```
    Authorization: Bearer <token>
    ```
    
    ## Rate Limiting
    - General: 1000 requests/hora
    - Login: 5 intentos/15 minutos
    - Registro: 3 intentos/hora
    - Búsquedas: 100 requests/minuto
    
    ## Códigos de Error
    - 400: Bad Request - Datos inválidos
    - 401: Unauthorized - Token inválido
    - 403: Forbidden - Sin permisos
    - 404: Not Found - Recurso no encontrado
    - 429: Too Many Requests - Rate limit excedido
    - 500: Internal Server Error
  version: 1.0.0
  contact:
    name: Equipo TruequeAlo
    email: api@truequealo.com
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT
servers:
  - url: https://api.truequealo.com/v1
    description: Servidor de Producción
  - url: https://staging-api.truequealo.com/v1
    description: Servidor de Staging
  - url: http://localhost:3000/api/v1
    description: Servidor de Desarrollo

paths:
  # Autenticación y Usuarios
  /auth/register:
    post:
      tags:
        - Autenticación
      summary: Registro de nuevo usuario
      description: Crea una nueva cuenta de usuario y devuelve tokens de acceso
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RegisterRequest'
      responses:
        '201':
          description: Usuario registrado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
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
        - Autenticación
      summary: Iniciar sesión
      description: Autentica un usuario y devuelve tokens de acceso
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login exitoso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
        '401':
          description: Credenciales inválidas
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'

  /auth/oauth/{provider}:
    post:
      tags:
        - Autenticación
      summary: Login con OAuth
      description: Autentica usando proveedores OAuth (Google, Facebook, Apple)
      parameters:
        - name: provider
          in: path
          required: true
          schema:
            type: string
            enum: [google, facebook, apple]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OAuthRequest'
      responses:
        '200':
          description: Login OAuth exitoso
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'

  /auth/refresh:
    post:
      tags:
        - Autenticación
      summary: Renovar token de acceso
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RefreshTokenRequest'
      responses:
        '200':
          description: Token renovado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'

  /auth/logout:
    post:
      tags:
        - Autenticación
      summary: Cerrar sesión
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LogoutRequest'
      responses:
        '200':
          description: Sesión cerrada exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessageResponse'

  # Gestión de Perfiles
  /users/profile:
    get:
      tags:
        - Perfiles
      summary: Obtener perfil propio
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Perfil del usuario
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'
        '401':
          $ref: '#/components/responses/Unauthorized'

    put:
      tags:
        - Perfiles
      summary: Actualizar perfil
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateProfileRequest'
      responses:
        '200':
          description: Perfil actualizado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfile'

  /users/{userId}/profile:
    get:
      tags:
        - Perfiles
      summary: Obtener perfil público de usuario
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Perfil público del usuario
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicUserProfile'
        '404':
          $ref: '#/components/responses/NotFound'

  # Categorías
  /categories:
    get:
      tags:
        - Categorías
      summary: Obtener todas las categorías
      responses:
        '200':
          description: Lista de categorías
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Category'

  /categories/active:
    get:
      tags:
        - Categorías
      summary: Obtener categorías activas
      responses:
        '200':
          description: Lista de categorías activas
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Category'

  # Gestión de Items
  /items:
    post:
      tags:
        - Items
      summary: Crear nueva oferta
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateItemRequest'
      responses:
        '201':
          description: Item creado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
        '400':
          $ref: '#/components/responses/BadRequest'
        '401':
          $ref: '#/components/responses/Unauthorized'

  /items/{itemId}:
    get:
      tags:
        - Items
      summary: Obtener detalle de item
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Detalle del item
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ItemDetail'
        '404':
          $ref: '#/components/responses/NotFound'

    put:
      tags:
        - Items
      summary: Actualizar item
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/UpdateItemRequest'
      responses:
        '200':
          description: Item actualizado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'

    delete:
      tags:
        - Items
      summary: Eliminar item
      security:
        - bearerAuth: []
      parameters:
        - name: itemId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Item eliminado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessageResponse'
        '403':
          $ref: '#/components/responses/Forbidden'
        '404':
          $ref: '#/components/responses/NotFound'

  # Búsqueda
  /search/items:
    get:
      tags:
        - Búsqueda
      summary: Búsqueda general de items
      parameters:
        - name: q
          in: query
          description: Término de búsqueda
          schema:
            type: string
        - name: categoryId
          in: query
          description: Filtro por categoría
          schema:
            type: string
            format: uuid
        - name: condition
          in: query
          description: Filtro por condición
          schema:
            type: string
            enum: [new, like_new, good, fair, poor]
        - name: lat
          in: query
          description: Latitud para búsqueda geográfica
          schema:
            type: number
            format: double
        - name: lng
          in: query
          description: Longitud para búsqueda geográfica
          schema:
            type: number
            format: double
        - name: radius
          in: query
          description: Radio de búsqueda en km
          schema:
            type: number
            default: 25
        - name: sortBy
          in: query
          description: Ordenamiento de resultados
          schema:
            type: string
            enum: [relevance, distance, newest, oldest]
            default: relevance
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Resultados de búsqueda
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SearchResponse'

  # Matching
  /matches/suggestions:
    get:
      tags:
        - Matching
      summary: Obtener matches personalizados
      security:
        - bearerAuth: []
      parameters:
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
            maximum: 20
            default: 10
      responses:
        '200':
          description: Lista de matches sugeridos
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MatchSuggestionsResponse'

  /items/{itemId}/interest:
    post:
      tags:
        - Matching
      summary: Expresar interés en item
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/ExpressInterestRequest'
      responses:
        '201':
          description: Interés expresado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MatchCreatedResponse'

  # Chat y Conversaciones
  /conversations:
    get:
      tags:
        - Chat
      summary: Obtener conversaciones
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [active, archived]
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Lista de conversaciones
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ConversationsResponse'

  /conversations/{conversationId}/messages:
    get:
      tags:
        - Chat
      summary: Obtener mensajes de conversación
      security:
        - bearerAuth: []
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
      responses:
        '200':
          description: Lista de mensajes
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessagesResponse'

    post:
      tags:
        - Chat
      summary: Enviar mensaje
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/SendMessageRequest'
      responses:
        '201':
          description: Mensaje enviado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Message'

  # Transacciones/Intercambios
  /matches/{matchId}/propose-exchange:
    post:
      tags:
        - Intercambios
      summary: Proponer intercambio
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/ProposeExchangeRequest'
      responses:
        '201':
          description: Propuesta de intercambio creada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'

  /transactions:
    get:
      tags:
        - Intercambios
      summary: Obtener mis intercambios
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [proposed, agreed, completed, cancelled]
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Lista de intercambios
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TransactionsResponse'

  /transactions/{transactionId}/confirm-completion:
    post:
      tags:
        - Intercambios
      summary: Confirmar intercambio completado
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/ConfirmCompletionRequest'
      responses:
        '200':
          description: Confirmación registrada
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'

  # Sistema de Calificaciones
  /transactions/{transactionId}/rating:
    post:
      tags:
        - Calificaciones
      summary: Crear calificación
      security:
        - bearerAuth: []
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
              $ref: '#/components/schemas/CreateRatingRequest'
      responses:
        '201':
          description: Calificación creada exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Rating'

  /users/{userId}/ratings:
    get:
      tags:
        - Calificaciones
      summary: Obtener calificaciones de usuario
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
            maximum: 50
            default: 20
        - name: sortBy
          in: query
          schema:
            type: string
            enum: [newest, oldest, highest, lowest]
            default: newest
      responses:
        '200':
          description: Lista de calificaciones
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/RatingsResponse'

  # Notificaciones
  /notifications:
    get:
      tags:
        - Notificaciones
      summary: Obtener notificaciones
      security:
        - bearerAuth: []
      parameters:
        - name: type
          in: query
          schema:
            type: string
            enum: [match, message, exchange, rating, system]
        - name: isRead
          in: query
          schema:
            type: boolean
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
            maximum: 50
            default: 20
      responses:
        '200':
          description: Lista de notificaciones
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/NotificationsResponse'

  /notifications/mark-all-read:
    post:
      tags:
        - Notificaciones
      summary: Marcar todas las notificaciones como leídas
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Notificaciones marcadas como leídas
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                  updatedCount:
                    type: integer

  # Reportes
  /reports/user:
    post:
      tags:
        - Reportes
      summary: Reportar usuario
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ReportUserRequest'
      responses:
        '201':
          description: Reporte enviado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ReportResponse'

  /reports/item:
    post:
      tags:
        - Reportes
      summary: Reportar item
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ReportItemRequest'
      responses:
        '201':
          description: Reporte enviado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ReportResponse'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
      description: JWT token obtenido del endpoint de login

  responses:
    BadRequest:
      description: Solicitud inválida
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    Unauthorized:
      description: Token de autenticación requerido o inválido
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    Forbidden:
      description: No tiene permisos para esta operación
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    NotFound:
      description: Recurso no encontrado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    TooManyRequests:
      description: Demasiadas solicitudes - Rate limit excedido
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
      headers:
        X-RateLimit-Limit:
          schema:
            type: integer
          description: Límite de requests por ventana de tiempo
        X-RateLimit-Remaining:
          schema:
            type: integer
          description: Requests restantes en la ventana actual
        X-RateLimit-Reset:
          schema:
            type: integer
          description: Timestamp cuando se resetea el límite
        Retry-After:
          schema:
            type: integer
          description: Segundos hasta que se puede intentar de nuevo

  schemas:
    # Esquemas de Error
    Error:
      type: object
      properties:
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
              type: object
        timestamp:
          type: string
          format: date-time
          example: "2025-01-30T10:00:00Z"

    MessageResponse:
      type: object
      properties:
        message:
          type: string

    # Esquemas de Paginación
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
          example: 100
        totalPages:
          type: integer
          example: 5
        hasNext:
          type: boolean
          example: true
        hasPrev:
          type: boolean
          example: false

    # Esquemas de Autenticación
    RegisterRequest:
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
          example: "usuario@ejemplo.com"
        password:
          type: string
          minLength: 8
          example: "password123"
        firstName:
          type: string
          example: "Juan"
        lastName:
          type: string
          example: "Pérez"
        phone:
          type: string
          example: "+34666123456"

    LoginRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          format: email
          example: "usuario@ejemplo.com"
        password:
          type: string
          example: "password123"

    OAuthRequest:
      type: object
      required:
        - token
      properties:
        token:
          type: string
          description: Token de OAuth del proveedor
        deviceInfo:
          type: object
          properties:
            platform:
              type: string
              enum: [web, ios, android]
            userAgent:
              type: string

    RefreshTokenRequest:
      type: object
      required:
        - refreshToken
      properties:
        refreshToken:
          type: string

    LogoutRequest:
      type: object
      required:
        - refreshToken
      properties:
        refreshToken:
          type: string

    TokenResponse:
      type: object
      properties:
        accessToken:
          type: string
        expiresIn:
          type: integer
          example: 900

    AuthResponse:
      type: object
      properties:
        user:
          $ref: '#/components/schemas/UserBasic'
        tokens:
          type: object
          properties:
            accessToken:
              type: string
            refreshToken:
              type: string
            expiresIn:
              type: integer
              example: 900

    # Esquemas de Usuario
    UserBasic:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        firstName:
          type: string
        lastName:
          type: string
        profileImageUrl:
          type: string
          format: uri
          nullable: true
        verificationLevel:
          type: string
          enum: [unverified, email_verified, phone_verified, identity_verified]
        status:
          type: string
          enum: [active, suspended, banned]
        createdAt:
          type: string
          format: date-time

    UserProfile:
      allOf:
        - $ref: '#/components/schemas/UserBasic'
        - type: object
          properties:
            phone:
              type: string
            bio:
              type: string
              nullable: true
            locationCoordinates:
              $ref: '#/components/schemas/Coordinates'
            address:
              type: string
              nullable: true
            averageRating:
              type: number
              format: double
              minimum: 0
              maximum: 5
            totalRatings:
              type: integer
              minimum: 0
            updatedAt:
              type: string
              format: date-time

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
          format: double
        totalRatings:
          type: integer
        verificationLevel:
          type: string
          enum: [unverified, email_verified, phone_verified, identity_verified]
        memberSince:
          type: string
          format: date-time
        stats:
          type: object
          properties:
            totalExchanges:
              type: integer
            activeItems:
              type: integer
            responseRate:
              type: string
              example: "95%"
            responseTime:
              type: string
              example: "2h"

    UpdateProfileRequest:
      type: object
      properties:
        firstName:
          type: string
        lastName:
          type: string
        bio:
          type: string
        locationCoordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string

    # Esquemas de Ubicación
    Coordinates:
      type: object
      properties:
        lat:
          type: number
          format: double
          example: 40.4168
        lng:
          type: number
          format: double
          example: -3.7038

    Location:
      type: object
      properties:
        coordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string
          example: "Madrid, España"

    # Esquemas de Categorías
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
        iconUrl:
          type: string
          format: uri
        sortOrder:
          type: integer
        isActive:
          type: boolean
        subcategories:
          type: array
          items:
            $ref: '#/components/schemas/Subcategory'
        createdAt:
          type: string
          format: date-time
        updatedAt:
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
        sortOrder:
          type: integer
        isActive:
          type: boolean

    # Esquemas de Items
    CreateItemRequest:
      type: object
      required:
        - title
        - description
        - categoryId
        - condition
      properties:
        title:
          type: string
          maxLength: 200
          example: "iPhone 12 Pro en excelente estado"
        description:
          type: string
          example: "iPhone 12 Pro de 128GB, color azul, con caja original..."
        categoryId:
          type: string
          format: uuid
        subcategoryId:
          type: string
          format: uuid
        condition:
          type: string
          enum: [new, like_new, good, fair, poor]
        images:
          type: array
          items:
            type: string
            description: Base64 encoded image
          maxItems: 5
        locationCoordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string
        tags:
          type: array
          items:
            type: string
        wantedInReturn:
          type: array
          items:
            type: string
          description: Descripción de lo que busca a cambio

    UpdateItemRequest:
      allOf:
        - $ref: '#/components/schemas/CreateItemRequest'

    Item:
      type: object
      properties:
        id:
          type: string
          format: uuid
        userId:
          type: string
          format: uuid
        title:
          type: string
        description:
          type: string
        category:
          type: object
          properties:
            id:
              type: string
              format: uuid
            name:
              type: string
        subcategory:
          type: object
          properties:
            id:
              type: string
              format: uuid
            name:
              type: string
        condition:
          type: string
          enum: [new, like_new, good, fair, poor]
        images:
          type: array
          items:
            type: string
            format: uri
        locationCoordinates:
          $ref: '#/components/schemas/Coordinates'
        address:
          type: string
        tags:
          type: array
          items:
            type: string
        wantedInReturn:
          type: array
          items:
            type: string
        availabilityStatus:
          type: string
          enum: [available, paused, exchanged]
        isActive:
          type: boolean
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time

    ItemDetail:
      allOf:
        - $ref: '#/components/schemas/Item'
        - type: object
          properties:
            user:
              $ref: '#/components/schemas/PublicUserProfile'
            distance:
              type: number
              format: double
              description: Distancia en km
            stats:
              type: object
              properties:
                views:
                  type: integer
                interests:
                  type: integer
                shares:
                  type: integer

    # Esquemas de Búsqueda
    SearchResponse:
      type: object
      properties:
        data:
          type: array
          items:
            type: object
            allOf:
              - $ref: '#/components/schemas/Item'
              - type: object
                properties:
                  user:
                    type: object
                    properties:
                      id:
                        type: string
                        format: uuid
                      firstName:
                        type: string
                      lastName:
                        type: string
                      averageRating:
                        type: number
                      verificationLevel:
                        type: string
                  distance:
                    type: number
                    format: double
                  relevanceScore:
                    type: number
                    format: double
        pagination:
          $ref: '#/components/schemas/Pagination'
        filters:
          type: object
          properties:
            appliedFilters:
              type: object
            availableFilters:
              type: object
              properties:
                categories:
                  type: array
                  items:
                    type: object
                    properties:
                      id:
                        type: string
                        format: uuid
                      name:
                        type: string
                      count:
                        type: integer
                conditions:
                  type: array
                  items:
                    type: object
                    properties:
                      value:
                        type: string
                      count:
                        type: integer

    # Esquemas de Matching
    MatchSuggestionsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Match'
        pagination:
          $ref: '#/components/schemas/Pagination'

    Match:
      type: object
      properties:
        id:
          type: string
          format: uuid
        compatibilityScore:
          type: number
          format: double
          minimum: 0
          maximum: 1
        userA:
          type: object
          properties:
            id:
              type: string
              format: uuid
            item:
              $ref: '#/components/schemas/ItemSummary'
        userB:
          type: object
          properties:
            id:
              type: string
              format: uuid
            firstName:
              type: string
            lastName:
              type: string
            averageRating:
              type: number
              format: double
            item:
              $ref: '#/components/schemas/ItemSummary'
        matchReasons:
          type: array
          items:
            type: string
        distance:
          type: number
          format: double
        createdAt:
          type: string
          format: date-time

    ItemSummary:
      type: object
      properties:
        id:
          type: string
          format: uuid
        title:
          type: string
        images:
          type: array
          items:
            type: string
            format: uri

    ExpressInterestRequest:
      type: object
      properties:
        myItemId:
          type: string
          format: uuid
          description: Item que ofrezco a cambio (opcional)
        message:
          type: string
          example: "Hola, me interesa tu iPhone. ¿Te interesaría mi MacBook?"

    MatchCreatedResponse:
      type: object
      properties:
        matchId:
          type: string
          format: uuid
        status:
          type: string
          enum: [pending, accepted, rejected]
        message:
          type: string

    # Esquemas de Chat
    ConversationsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Conversation'

    Conversation:
      type: object
      properties:
        id:
          type: string
          format: uuid
        matchId:
          type: string
          format: uuid
        otherUser:
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
            averageRating:
              type: number
              format: double
            isOnline:
              type: boolean
            lastSeen:
              type: string
              format: date-time
        lastMessage:
          $ref: '#/components/schemas/Message'
        unreadCount:
          type: integer
        status:
          type: string
          enum: [active, archived]
        items:
          type: object
          properties:
            mine:
              $ref: '#/components/schemas/ItemSummary'
            theirs:
              $ref: '#/components/schemas/ItemSummary'
        lastMessageAt:
          type: string
          format: date-time
        createdAt:
          type: string
          format: date-time

    MessagesResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Message'
        pagination:
          $ref: '#/components/schemas/Pagination'

    Message:
      type: object
      properties:
        id:
          type: string
          format: uuid
        senderId:
          type: string
          format: uuid
        content:
          type: string
        messageType:
          type: string
          enum: [text, image, location]
        metadata:
          type: object
          nullable: true
        isRead:
          type: boolean
        createdAt:
          type: string
          format: date-time

    SendMessageRequest:
      type: object
      required:
        - messageType
      properties:
        content:
          type: string
          description: Contenido del mensaje (requerido para tipo text)
        messageType:
          type: string
          enum: [text, image, location]
        metadata:
          type: object
          description: Metadatos adicionales (ej. coordenadas para tipo location)

    # Esquemas de Transacciones
    ProposeExchangeRequest:
      type: object
      required:
        - meetingProposal
      properties:
        meetingProposal:
          type: object
          properties:
            location:
              $ref: '#/components/schemas/Location'
            proposedTimes:
              type: array
              items:
                type: string
                format: date-time
        exchangeDetails:
          type: object
          properties:
            notes:
              type: string

    ConfirmCompletionRequest:
      type: object
      required:
        - completed
      properties:
        completed:
          type: boolean
        notes:
          type: string

    TransactionsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Transaction'

    Transaction:
      type: object
      properties:
        id:
          type: string
          format: uuid
        matchId:
          type: string
          format: uuid
        status:
          type: string
          enum: [proposed, agreed, completed, cancelled]
        otherUser:
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
            averageRating:
              type: number
              format: double
        items:
          type: object
          properties:
            mine:
              $ref: '#/components/schemas/ItemSummary'
            theirs:
              $ref: '#/components/schemas/ItemSummary'
        meeting:
          type: object
          properties:
            location:
              $ref: '#/components/schemas/Location'
            scheduledTime:
              type: string
              format: date-time
        completedAt:
          type: string
          format: date-time
          nullable: true
        canRate:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # Esquemas de Calificaciones
    CreateRatingRequest:
      type: object
      required:
        - score
      properties:
        score:
          type: integer
          minimum: 1
          maximum: 5
        comment:
          type: string
        punctualityScore:
          type: integer
          minimum: 1
          maximum: 5
        communicationScore:
          type: integer
          minimum: 1
          maximum: 5
        productConditionScore:
          type: integer
          minimum: 1
          maximum: 5
        tags:
          type: array
          items:
            type: string

    RatingsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Rating'
        summary:
          type: object
          properties:
            averageScore:
              type: number
              format: double
            totalRatings:
              type: integer
            distribution:
              type: object
              properties:
                "5":
                  type: integer
                "4":
                  type: integer
                "3":
                  type: integer
                "2":
                  type: integer
                "1":
                  type: integer
            averageScores:
              type: object
              properties:
                punctuality:
                  type: number
                  format: double
                communication:
                  type: number
                  format: double
                productCondition:
                  type: number
                  format: double
            commonTags:
              type: array
              items:
                type: object
                properties:
                  tag:
                    type: string
                  count:
                    type: integer

    Rating:
      type: object
      properties:
        id:
          type: string
          format: uuid
        rater:
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
        score:
          type: integer
          minimum: 1
          maximum: 5
        comment:
          type: string
        punctualityScore:
          type: integer
        communicationScore:
          type: integer
        productConditionScore:
          type: integer
        tags:
          type: array
          items:
            type: string
        transaction:
          type: object
          properties:
            id:
              type: string
              format: uuid
            items:
              type: object
              properties:
                exchanged:
                  type: object
                  properties:
                    title:
                      type: string
                received:
                  type: object
                  properties:
                    title:
                      type: string
        createdAt:
          type: string
          format: date-time

    # Esquemas de Notificaciones
    NotificationsResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/Notification'
        unreadCount:
          type: integer

    Notification:
      type: object
      properties:
        id:
          type: string
          format: uuid
        type:
          type: string
          enum: [new_match, new_message, exchange_update, new_rating, system]
        title:
          type: string
        content:
          type: string
        data:
          type: object
          description: Datos específicos según el tipo de notificación
        isRead:
          type: boolean
        createdAt:
          type: string
          format: date-time

    # Esquemas de Reportes
    ReportUserRequest:
      type: object
      required:
        - reportedUserId
        - reportType
        - description
      properties:
        reportedUserId:
          type: string
          format: uuid
        reportType:
          type: string
          enum: [inappropriate_behavior, spam, fake_profile, safety_concern]
        description:
          type: string
        evidence:
          type: object
          properties:
            conversationId:
              type: string
              format: uuid
            transactionId:
              type: string
              format: uuid

    ReportItemRequest:
      type: object
      required:
        - reportedItemId
        - reportType
        - description
      properties:
        reportedItemId:
          type: string
          format: uuid
        reportType:
          type: string
          enum: [inappropriate_content, misleading_info, prohibited_item, spam]
        description:
          type: string

    ReportResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
        status:
          type: string
          enum: [pending_review, under_review, resolved, dismissed]
        message:
          type: string

tags:
  - name: Autenticación
    description: Endpoints para registro, login y gestión de sesiones
  - name: Perfiles
    description: Gestión de perfiles de usuario
  - name: Categorías
    description: Categorías y subcategorías de productos/servicios
  - name: Items
    description: Gestión de productos y servicios ofrecidos
  - name: Búsqueda
    description: Búsqueda y filtrado de items
  - name: Matching
    description: Sistema de coincidencias entre usuarios
  - name: Chat
    description: Sistema de mensajería entre usuarios
  - name: Intercambios
    description: Gestión de propuestas e intercambios
  - name: Calificaciones
    description: Sistema de reputación y calificaciones
  - name: Notificaciones
    description: Sistema de notificaciones
  - name: Reportes
    description: Sistema de reportes y moderación

externalDocs:
  description: Documentación completa del proyecto TruequeAlo
  url: https://docs.truequealo.com
```

```typescript
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { version } from '../package.json';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Cargar la especificación Swagger
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'api-spec.yaml'));

// Configurar Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #2563eb; }
  `,
  customSiteTitle: 'TruequeAlo API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    docExpansion: 'list',
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
  }
}));

// Ruta para obtener la especificación OpenAPI en JSON
app.get('/api/openapi.json', (_req, res) => {
  res.json(swaggerDocument);
});

// Ruta para obtener la especificación OpenAPI en YAML
app.get('/api/openapi.yaml', (_req, res) => {
  res.type('text/yaml');
  res.send(YAML.stringify(swaggerDocument, 4));
});

// Endpoint de versión existente
app.get('/api/version', (_req, res) => {
  res.json({ 
    version,
    name: 'TruequeAlo API',
    description: 'API para plataforma de intercambio de bienes y servicios',
    documentation: '/api/docs'
  });
});

// Ruta de salud del servicio
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version,
    uptime: process.uptime()
  });
});

// Middleware para rutas no encontradas
app.use('*', (_req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint no encontrado. Consulta la documentación en /api/docs'
    },
    timestamp: new Date().toISOString()
  });
});

// Middleware de manejo de errores
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Error interno del servidor'
    },
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 TruequeAlo Backend iniciado en puerto ${PORT}`);
  console.log(`📚 Documentación API disponible en: http://localhost:${PORT}/api/docs`);
  console.log(`🔍 OpenAPI JSON: http://localhost:${PORT}/api/openapi.json`);
  console.log(`📄 OpenAPI YAML: http://localhost:${PORT}/api/openapi.yaml`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

export default app;
```

Voy a crear el directorio swagger y añadir un archivo README para explicar cómo usar la documentación:

```markdown:backend/src/swagger/README.md
# Documentación API - TruequeAlo

Este directorio contiene la especificación OpenAPI 3.0 de la API de TruequeAlo.

## Archivos

- `api-spec.yaml`: Especificación completa de la API en formato OpenAPI 3.0
- `README.md`: Este archivo de documentación

## Acceso a la Documentación

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva en:

- **Swagger UI**: `http://localhost:3000/api/docs`
- **OpenAPI JSON**: `http://localhost:3000/api/openapi.json`
- **OpenAPI YAML**: `http://localhost:3000/api/openapi.yaml`

## Características de la Documentación

### Swagger UI Interactivo
- Navegación por categorías (Autenticación, Perfiles, Items, etc.)
- Ejemplos de request/response para cada endpoint
- Posibilidad de probar endpoints directamente desde la interfaz
- Autenticación JWT integrada (botón "Authorize")

### Esquemas Detallados
- Modelos de datos completos con validaciones
- Ejemplos de uso para cada esquema
- Documentación de tipos de error y códigos de estado

### Filtrado y Búsqueda
- Filtro por tags/categorías
- Búsqueda de endpoints específicos
- Expansión/colapso de secciones

## Uso de Autenticación en Swagger UI

1. Obtén un token JWT usando el endpoint `/auth/login`
2. Haz clic en el botón "Authorize" en la parte superior de Swagger UI
3. Introduce el token en el formato: `Bearer <tu_token_jwt>`
4. Ahora puedes probar endpoints que requieren autenticación

## Mantenimiento

La especificación debe actualizarse cuando:
- Se añaden nuevos endpoints
- Se modifican esquemas existentes
- Cambian los códigos de respuesta
- Se actualizan los ejemplos

## Validación

La especificación OpenAPI se puede validar usando herramientas como:
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [Spectral](https://stoplight.io/open-source/spectral/)
```

Ahora voy a crear un script para actualizar el package.json con las nuevas dependencias:

```json:backend/package.json
{
  "name": "@truequealo/backend",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc -b",
    "test": "jest",
    "docs:validate": "swagger-codegen validate -i src/swagger/api-spec.yaml",
    "docs:serve": "swagger-ui-serve src/swagger/api-spec.yaml"
  },
  "dependencies": {
    "@prisma/client": "^5.19.1",
    "express": "^4.18.0",
    "prisma": "^5.19.1",
    "swagger-ui-express": "^5.0.0",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@types/supertest": "^2.0.0",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/yamljs": "^0.2.34",
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "ts-jest": "^29.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

Finalmente, voy a crear un archivo de configuración TypeScript actualizado para incluir las nuevas dependencias:

```json:backend/tsconfig.json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}
```

Y un test básico para verificar que la documentación se carga correctamente:

```typescript:backend/src/__tests__/swagger.test.ts
import request from 'supertest';
import app from '../index';

describe('Swagger Documentation', () => {
  it('should serve Swagger UI at /api/docs', async () => {
    const response = await request(app)
      .get('/api/docs/')
      .expect(200);
    
    expect(response.text).toContain('swagger-ui');
  });

  it('should serve OpenAPI JSON at /api/openapi.json', async () => {
    const response = await request(app)
      .get('/api/openapi.json')
      .expect(200);
    
    expect(response.body.openapi).toBe('3.0.3');
    expect(response.body.info.title).toBe('TruequeAlo API');
  });

  it('should serve OpenAPI YAML at /api/openapi.yaml', async () => {
    const response = await request(app)
      .get('/api/openapi.yaml')
      .expect(200);
    
    expect(response.text).toContain('openapi: 3.0.3');
    expect(response.text).toContain('title: TruequeAlo API');
  });

  it('should return enhanced version info', async () => {
    const response = await request(app)
      .get('/api/version')
      .expect(200);
    
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('name', 'TruequeAlo API');
    expect(response.body).toHaveProperty('documentation', '/api/docs');
  });

  it('should return health check', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('uptime');
  });

  it('should return 404 for unknown routes with helpful message', async () => {
    const response = await request(app)
      .get('/unknown-route')
      .expect(404);
    
    expect(response.body.error.message).toContain('/api/docs');
  });
});
```

## Resumen de la Integración

He creado una integración completa de Swagger en el backend de TruequeAlo que incluye:

### 📋 **Archivos Creados/Modificados:**

1. **`backend/src/swagger/api-spec.yaml`** - Especificación OpenAPI 3.0 completa
2. **`backend/src/index.ts`** - Servidor Express con integración de Swagger UI
3. **`backend/package.json`** - Dependencias actualizadas
4. **`backend/tsconfig.json`** - Configuración TypeScript mejorada
5. **`backend/src/swagger/README.md`** - Documentación de uso
6. **`backend/src/__tests__/swagger.test.ts`** - Tests de la documentación

### 🚀 **Funcionalidades Implementadas:**

- **Swagger UI Interactivo** en `/api/docs`
- **Especificación JSON** en `/api/openapi.json`
- **Especificación YAML** en `/api/openapi.yaml`
- **Endpoint de salud** en `/health`
- **Manejo de errores** mejorado
- **Tests automatizados** para verificar la documentación

### 📚 **Cobertura de la API:**

La especificación incluye **todos los endpoints** definidos en el PRD:

- ✅ **Autenticación** (registro, login, OAuth, refresh tokens)
- ✅ **Gestión de Perfiles** (CRUD, avatares, estadísticas)
- ✅ **Categorías y Subcategorías**
- ✅ **Items/Productos** (CRUD, búsqueda, imágenes)
- ✅ **Sistema de Matching** (sugerencias, expresar interés)
- ✅ **Chat y Mensajería** (conversaciones, mensajes en tiempo real)
- ✅ **Intercambios/Transacciones** (propuestas, confirmaciones)
- ✅ **Sistema de Calificaciones** (crear/ver ratings)
- ✅ **Notificaciones** (push, email, gestión)
- ✅ **Reportes y Moderación**
- ✅ **Verificación de Usuarios**
- ✅ **Utilidades** (geocoding, uploads)

### 🎯 **Características Destacadas:**

- **Autenticación JWT** integrada en Swagger UI
- **Esquemas de datos** detallados con validaciones
- **Ejemplos de uso** para todos los endpoints
- **Códigos de error** documentados
- **Rate limiting** especificado
- **Paginación** estandarizada
- **Filtros de búsqueda** avanzados

### 🔧 **Cómo Usar:**

1. **Instalar dependencias:**
   ```bash
   cd backend
   npm install
   ```

2. **Iniciar el servidor:**
   ```bash
   npm run dev
   ```

3. **Acceder a la documentación:**
   - Swagger UI: `http://localhost:3000/api/docs`
   - API JSON: `http://localhost:3000/api/openapi.json`
   - Health Check: `http://localhost:3000/health`

4. **Probar endpoints:**
   - Usar el botón "Authorize" en Swagger UI
   - Introducir token JWT: `Bearer <token>`
   - Ejecutar requests directamente desde la interfaz

La documentación está completamente alineada con la especificación de API que generé anteriormente y cubre todos los casos de uso definidos en el PRD de TruequeAlo. ¡El backend ahora tiene una documentación interactiva y profesional lista para el desarrollo!

```markdown
# Documentación API - TruequeAlo

Este directorio contiene la especificación OpenAPI 3.0 de la API de TruequeAlo.

## Archivos

- `api-spec.yaml`: Especificación completa de la API en formato OpenAPI 3.0
- `README.md`: Este archivo de documentación

## Acceso a la Documentación

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva en:

- **Swagger UI**: `http://localhost:3000/api/docs`
- **OpenAPI JSON**: `http://localhost:3000/api/openapi.json`
- **OpenAPI YAML**: `http://localhost:3000/api/openapi.yaml`

## Características de la Documentación

### Swagger UI Interactivo
- Navegación por categorías (Autenticación, Perfiles, Items, etc.)
- Ejemplos de request/response para cada endpoint
- Posibilidad de probar endpoints directamente desde la interfaz
- Autenticación JWT integrada (botón "Authorize")

### Esquemas Detallados
- Modelos de datos completos con validaciones
- Ejemplos de uso para cada esquema
- Documentación de tipos de error y códigos de estado

### Filtrado y Búsqueda
- Filtro por tags/categorías
- Búsqueda de endpoints específicos
- Expansión/colapso de secciones

## Uso de Autenticación en Swagger UI

1. Obtén un token JWT usando el endpoint `/auth/login`
2. Haz clic en el botón "Authorize" en la parte superior de Swagger UI
3. Introduce el token en el formato: `Bearer <tu_token_jwt>`
4. Ahora puedes probar endpoints que requieren autenticación

## Mantenimiento

La especificación debe actualizarse cuando:
- Se añaden nuevos endpoints
- Se modifican esquemas existentes
- Cambian los códigos de respuesta
- Se actualizan los ejemplos

## Validación

La especificación OpenAPI se puede validar usando herramientas como:
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [Spectral](https://stoplight.io/open-source/spectral/)
```

```json
{
  "name": "@truequealo/backend",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc -b",
    "test": "jest",
    "docs:validate": "swagger-codegen validate -i src/swagger/api-spec.yaml",
    "docs:serve": "swagger-ui-serve src/swagger/api-spec.yaml"
  },
  "dependencies": {
    "@prisma/client": "^5.19.1",
    "express": "^4.18.0",
    "prisma": "^5.19.1",
    "swagger-ui-express": "^5.0.0",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@types/supertest": "^2.0.0",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/yamljs": "^0.2.34",
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "ts-jest": "^29.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}
```

```markdown
# Documentación API - TruequeAlo

Este directorio contiene la especificación OpenAPI 3.0 de la API de TruequeAlo.

## Archivos

- `api-spec.yaml`: Especificación completa de la API en formato OpenAPI 3.0
- `README.md`: Este archivo de documentación

## Acceso a la Documentación

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación interactiva en:

- **Swagger UI**: `http://localhost:3000/api/docs`
- **OpenAPI JSON**: `http://localhost:3000/api/openapi.json`
- **OpenAPI YAML**: `http://localhost:3000/api/openapi.yaml`

## Características de la Documentación

### Swagger UI Interactivo
- Navegación por categorías (Autenticación, Perfiles, Items, etc.)
- Ejemplos de request/response para cada endpoint
- Posibilidad de probar endpoints directamente desde la interfaz
- Autenticación JWT integrada (botón "Authorize")

### Esquemas Detallados
- Modelos de datos completos con validaciones
- Ejemplos de uso para cada esquema
- Documentación de tipos de error y códigos de estado

### Filtrado y Búsqueda
- Filtro por tags/categorías
- Búsqueda de endpoints específicos
- Expansión/colapso de secciones

## Uso de Autenticación en Swagger UI

1. Obtén un token JWT usando el endpoint `/auth/login`
2. Haz clic en el botón "Authorize" en la parte superior de Swagger UI
3. Introduce el token en el formato: `Bearer <tu_token_jwt>`
4. Ahora puedes probar endpoints que requieren autenticación

## Mantenimiento

La especificación debe actualizarse cuando:
- Se añaden nuevos endpoints
- Se modifican esquemas existentes
- Cambian los códigos de respuesta
- Se actualizan los ejemplos

## Validación

La especificación OpenAPI se puede validar usando herramientas como:
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [Spectral](https://stoplight.io/open-source/spectral/)
```

```json
{
  "name": "@truequealo/backend",
  "version": "1.0.0",
  "private": true,
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc -b",
    "test": "jest",
    "docs:validate": "swagger-codegen validate -i src/swagger/api-spec.yaml",
    "docs:serve": "swagger-ui-serve src/swagger/api-spec.yaml"
  },
  "dependencies": {
    "@prisma/client": "^5.19.1",
    "express": "^4.18.0",
    "prisma": "^5.19.1",
    "swagger-ui-express": "^5.0.0",
    "yamljs": "^0.3.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@types/supertest": "^2.0.0",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/yamljs": "^0.2.34",
    "jest": "^29.0.0",
    "supertest": "^6.0.0",
    "ts-jest": "^29.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}
```

```typescript
import request from 'supertest';
import app from '../index';

describe('Swagger Documentation', () => {
  it('should serve Swagger UI at /api/docs', async () => {
    const response = await request(app)
      .get('/api/docs/')
      .expect(200);
    
    expect(response.text).toContain('swagger-ui');
  });

  it('should serve OpenAPI JSON at /api/openapi.json', async () => {
    const response = await request(app)
      .get('/api/openapi.json')
      .expect(200);
    
    expect(response.body.openapi).toBe('3.0.3');
    expect(response.body.info.title).toBe('TruequeAlo API');
  });

  it('should serve OpenAPI YAML at /api/openapi.yaml', async () => {
    const response = await request(app)
      .get('/api/openapi.yaml')
      .expect(200);
    
    expect(response.text).toContain('openapi: 3.0.3');
    expect(response.text).toContain('title: TruequeAlo API');
  });

  it('should return enhanced version info', async () => {
    const response = await request(app)
      .get('/api/version')
      .expect(200);
    
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('name', 'TruequeAlo API');
    expect(response.body).toHaveProperty('documentation', '/api/docs');
  });

  it('should return health check', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('uptime');
  });

  it('should return 404 for unknown routes with helpful message', async () => {
    const response = await request(app)
      .get('/unknown-route')
      .expect(404);
    
    expect(response.body.error.message).toContain('/api/docs');
  });
});
```

```shellscript
   cd backend
   npm install
```

```shellscript
   npm run dev
```

