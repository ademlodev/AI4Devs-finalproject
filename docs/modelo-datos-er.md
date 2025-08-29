# Modelo de Datos - Truequealo

## Diagrama Entidad-Relación

Este diagrama representa el modelo de datos completo para la plataforma Truequealo, incluyendo todas las entidades principales y sus relaciones.

```mermaid
erDiagram
    User {
        uuid id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        string phone
        string profile_image_url
        text bio
        json location_coordinates
        string address
        float average_rating
        int total_ratings
        enum verification_level
        enum status
        timestamp created_at
        timestamp updated_at
    }

    Category {
        uuid id PK
        string name
        string description
        string icon_url
        int sort_order
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    Subcategory {
        uuid id PK
        uuid category_id FK
        string name
        string description
        int sort_order
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    Item {
        uuid id PK
        uuid user_id FK
        uuid category_id FK
        uuid subcategory_id FK
        string title
        text description
        json images
        enum condition
        enum availability_status
        json location_coordinates
        string address
        json tags
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    Match {
        uuid id PK
        uuid user_a_id FK
        uuid user_b_id FK
        uuid item_a_id FK
        uuid item_b_id FK
        float compatibility_score
        enum status
        json algorithm_data
        timestamp created_at
        timestamp updated_at
    }

    Conversation {
        uuid id PK
        uuid match_id FK
        uuid user_a_id FK
        uuid user_b_id FK
        enum status
        timestamp last_message_at
        timestamp created_at
        timestamp updated_at
    }

    Message {
        uuid id PK
        uuid conversation_id FK
        uuid sender_id FK
        text content
        enum message_type
        json metadata
        boolean is_read
        timestamp created_at
    }

    Transaction {
        uuid id PK
        uuid match_id FK
        uuid conversation_id FK
        uuid user_a_id FK
        uuid user_b_id FK
        uuid item_a_id FK
        uuid item_b_id FK
        enum status
        json exchange_details
        timestamp agreed_at
        timestamp completed_at
        timestamp created_at
        timestamp updated_at
    }

    Rating {
        uuid id PK
        uuid transaction_id FK
        uuid rater_id FK
        uuid rated_id FK
        int score
        text comment
        json tags
        boolean is_moderated
        timestamp created_at
        timestamp updated_at
    }

    UserPreference {
        uuid id PK
        uuid user_id FK
        json interests
        json categories
        float max_distance_km
        json notification_settings
        json privacy_settings
        timestamp created_at
        timestamp updated_at
    }

    Report {
        uuid id PK
        uuid reporter_id FK
        uuid reported_user_id FK
        uuid reported_item_id FK
        uuid reported_message_id FK
        enum report_type
        text description
        enum status
        uuid moderator_id FK
        text moderator_notes
        timestamp resolved_at
        timestamp created_at
        timestamp updated_at
    }

    Notification {
        uuid id PK
        uuid user_id FK
        enum type
        string title
        text content
        json data
        boolean is_read
        timestamp created_at
    }

    UserVerification {
        uuid id PK
        uuid user_id FK
        enum verification_type
        string verification_data
        enum status
        uuid verified_by FK
        timestamp verified_at
        timestamp expires_at
        timestamp created_at
        timestamp updated_at
    }

    %% Relationships
    User ||--o{ Item : "owns"
    User ||--o{ UserPreference : "has"
    User ||--o{ UserVerification : "has"
    User ||--o{ Notification : "receives"
    User ||--o{ Report : "reports"
    User ||--o{ Report : "is_reported"
    User ||--o{ Rating : "gives"
    User ||--o{ Rating : "receives"
    User ||--o{ Message : "sends"
    User ||--o{ Match : "participates_in_a"
    User ||--o{ Match : "participates_in_b"
    User ||--o{ Conversation : "participates_in_a"
    User ||--o{ Conversation : "participates_in_b"
    User ||--o{ Transaction : "participates_in_a"
    User ||--o{ Transaction : "participates_in_b"

    Category ||--o{ Subcategory : "contains"
    Category ||--o{ Item : "categorizes"
    Subcategory ||--o{ Item : "subcategorizes"

    Item ||--o{ Match : "item_a"
    Item ||--o{ Match : "item_b"
    Item ||--o{ Transaction : "item_a"
    Item ||--o{ Transaction : "item_b"
    Item ||--o{ Report : "is_reported"

    Match ||--|| Conversation : "creates"
    Match ||--o| Transaction : "results_in"

    Conversation ||--o{ Message : "contains"

    Transaction ||--o{ Rating : "is_rated"

    Message ||--o{ Report : "is_reported"
```

## Descripción de Entidades

### User
Entidad principal que representa a los usuarios de la plataforma. Incluye información personal, ubicación, sistema de reputación y niveles de verificación.

### Category y Subcategory
Sistema jerárquico de clasificación para productos y servicios. Permite organización clara y búsqueda eficiente.

### Item
Representa productos y servicios ofrecidos por los usuarios. Incluye información detallada, imágenes, ubicación y estado de disponibilidad.

### Match
Sistema inteligente de coincidencias que conecta usuarios con necesidades complementarias. Incluye puntuación de compatibilidad y datos del algoritmo.

### Conversation y Message
Sistema de chat integrado que permite la negociación directa entre usuarios. Soporte para diferentes tipos de mensajes y metadatos.

### Transaction
Registro de intercambios completados entre usuarios. Incluye detalles del intercambio y timestamps de las diferentes fases.

### Rating
Sistema de reputación que permite a los usuarios calificarse mutuamente después de completar transacciones.

### UserPreference
Configuración personalizada de cada usuario, incluyendo intereses, categorías preferidas, distancia máxima y configuraciones de privacidad.

### Report
Sistema de moderación que permite reportar contenido inapropiado o comportamiento indebido.

### Notification
Sistema de notificaciones para mantener a los usuarios informados sobre actividad relevante.

### UserVerification
Sistema de verificación de identidad con diferentes niveles de confianza y tipos de verificación.

## Características Técnicas

- **UUIDs**: Uso de identificadores únicos universales para todas las entidades principales
- **JSON Fields**: Campos flexibles para metadatos, configuraciones y datos complejos
- **Enums**: Tipos enumerados para estados y categorías predefinidas
- **Timestamps**: Auditoría completa con fechas de creación y actualización
- **Geolocalización**: Soporte para coordenadas geográficas en usuarios e items
- **Relaciones**: Definición clara de relaciones uno-a-muchos y muchos-a-muchos
