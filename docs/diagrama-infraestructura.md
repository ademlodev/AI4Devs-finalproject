graph TD
subgraph Usuario
A[Dispositivo móvil / PC]
end

subgraph Frontend
B[Aplicación React SPA]
end

subgraph Backend
C[API REST Express.js]
end

subgraph BBDD
D[(PostgreSQL)]
end

subgraph Infraestructura
E[Servidor Web / CDN]
F[Balanceador de Carga]
G[Autenticación JWT, OAuth]
H[Servicio de Notificaciones]
I[Servicio de Geolocalización]
J[Moderación y Seguridad]
end

%% Flujo de usuario
A -- Acceso vía navegador/app --> E
E -- Sirve archivos estáticos --> B
B -- Solicitudes API (HTTPS) --> F
F -- Redirige tráfico --> C
C -- Consultas y escritura --> D

%% Servicios adicionales
C -- Autenticación y autorización --> G
C -- Notificaciones push/email --> H
C -- Geolocalización y mapas --> I
C -- Moderación y reportes --> J

%% Opcional: Integraciones externas
subgraph Externos
K[Servicios de terceros Email, SMS, Mapas]
end
H -- Envío de mensajes --> K
I -- Consulta de mapas --> K
G -- Verificación de identidad --> K

%% Seguridad
E -- HTTPS/SSL --> B
F -- Firewall/WAF --> C
