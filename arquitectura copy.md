# 📋 Documentación de Infraestructura — Proyecto `scribe-mundial`

> **Dominio:** https://scribeeljuego.com  
> **Project ID:** scribe-mundial  
> **Project Number:** 217777176978  
> **Región principal:** us-central1  
> **Fecha de documentación:** 30 de junio de 2026  
> **Estado:** En producción (cierre programado ~1 semana)

---

## 1. Diagrama de Arquitectura (descripción textual)

Usuario → DNS (scribeeljuego.com)
→ Cloud Load Balancer (IP: 35.186.217.21)
├── Ruta / → Cloud Storage bucket (scribe-frontend-prod) [React SPA]
└── Ruta /api/\* → Cloud Run (scribe-backend) [API REST Node.js]
└── VPC Connector (scribe-vpc-serverless)
└── Compute Engine VM (scribe-pgbouncer)
└── Cloud SQL (scribe-db-production) [PostgreSQL 15]
Cloud Storage bucket (scribe-tickets) → Almacenamiento de imágenes de tickets

---

## 2. Inventario Completo de Servicios

### 2.1 Cloud Load Balancing

| Parámetro               | Valor                                         |
| ----------------------- | --------------------------------------------- |
| **Nombre**              | `scribe-frontend-lb`                          |
| **Tipo**                | Balanceador de aplicaciones clásico (externo) |
| **IP pública estática** | `35.186.217.21`                               |
| **Puerto**              | 443 (HTTPS)                                   |
| **Nivel de red**        | Premium                                       |
| **Protocolo**           | HTTP y HTTPS                                  |
| **Política SSL**        | Predeterminada de GCP                         |

**Certificados SSL asociados:**

- `scribe-ssl-cert` ✅ Activo
- `scribe-ssl-cert-eljuego` ⚠️ Vencido/inactivo
- `scribe-ssl-cert-eljuegomx` ⚠️ Vencido/inactivo
- 1 certificado adicional

**Reglas de host y ruta (URL map):**

| Hosts         | Rutas            | Backend                          |
| ------------- | ---------------- | -------------------------------- |
| `*` (default) | Todas (default)  | `scribe-frontend-backend-bucket` |
| `*`           | `/api`, `/api/*` | `scribe-backend-service`         |

**Servicios de backend:**

- `scribe-backend-service`: apunta al NEG sin servidores `scribe-backend-neg` (Cloud Run, us-central1). Política Cloud Armor: `armor-scribe-api`.
- `scribe-frontend-backend-bucket`: apunta al bucket `scribe-frontend-prod`. Cloud CDN habilitado. Política de seguridad Edge: `armor-scribe-frontend-edge`.

**Balanceador secundario (redirect HTTP→HTTPS):**

- Nombre: `scribe-http-redirect`
- Tipo: Aplicación (externo), solo HTTP
- Función: redirige todo tráfico HTTP al HTTPS del balanceador principal

---

### 2.2 Cloud Storage — Buckets

| Nombre                        | Ubicación   | Tipo         | Propósito                                | Fecha de creación |
| ----------------------------- | ----------- | ------------ | ---------------------------------------- | ----------------- |
| `scribe-frontend-prod`        | us-central1 | Region       | Serve del frontend React (SPA)           | 12 feb 2026       |
| `scribe-tickets`              | US          | Multi-region | Almacenamiento de imágenes de tickets    | 15 dic 2025       |
| `scribe-mundial_cloudbuild`   | US          | Multi-region | Artifacts de Cloud Build (CI/CD backend) | 12 feb 2026       |
| `scribe-audit-20260302-25800` | us-central1 | Region       | Auditoría / logs                         | 2 mar 2026        |

**Nota:** El bucket `scribe-frontend-prod` es el origen del Load Balancer para servir el frontend. El CI/CD del frontend se realiza vía **GitHub Actions** que hace deploy al bucket y ejecuta un invalidación de caché en el LB.

---

### 2.3 Cloud Run — Backend API REST

| Parámetro                    | Valor                                                      |
| ---------------------------- | ---------------------------------------------------------- |
| **Nombre del servicio**      | `scribe-backend`                                           |
| **Región**                   | `us-central1`                                              |
| **URL interna**              | `https://scribe-backend-217777176978.us-central1.run.app`  |
| **URL alternativa**          | `https://scribe-backend-luyemjrmoa-uc.a.run.app`           |
| **Revisión activa**          | `scribe-backend-00053-d28` (100% del tráfico)              |
| **Tipo de implementación**   | Container (imagen Docker)                                  |
| **Registro de imagen**       | `us-central1-docker.pkg.dev/scribe-mundial/scrib…`         |
| **Puerto del contenedor**    | `3001`                                                     |
| **CPU**                      | 1 vCPU (límite por contenedor)                             |
| **Memoria**                  | 1 GiB                                                      |
| **Simultaneidad**            | 80 solicitudes por instancia                               |
| **Timeout de solicitud**     | 300 segundos                                               |
| **Facturación**              | Basada en solicitudes                                      |
| **CPU boost al inicio**      | Habilitado                                                 |
| **Escalado mínimo**          | 2 instancias                                               |
| **Escalado máximo**          | 120 instancias                                             |
| **Ingress**                  | All (acceso público desde Internet)                        |
| **Autenticación**            | IAM, pero con permiso `allUsers` (acceso público efectivo) |
| **Entorno de ejecución**     | Predeterminada (Gen 2)                                     |
| **Creado**                   | 11 feb 2026                                                |
| **Generación de revisiones** | 55 (al momento del inventario)                             |

**Conexión a Cloud SQL (vía Cloud SQL Auth Proxy integrado):**

- Instancia: `scribe-mundial:us-central1:scribe-db-production`

**Conexión VPC:**

- Conector: `projects/scribe-mundial/locations/us-central1/connectors/scribe-vpc-serverless`
- Modo de egreso: Solo rangos privados (private-ranges-only)

**Variables de entorno del contenedor (24 variables):**

| Variable                    | Valor                                                      |
| --------------------------- | ---------------------------------------------------------- |
| `NODE_ENV`                  | `production`                                               |
| `GCS_PROJECT_ID`            | `scribe-mundial`                                           |
| `RATE_LIMIT_GENERAL_WINDOW` | `15`                                                       |
| `RATE_LIMIT_GENERAL_MAX`    | `100`                                                      |
| `RATE_LIMIT_AUTH_MAX`       | `5`                                                        |
| `RATE_LIMIT_TICKET_MAX`     | `10`                                                       |
| `SMTP_HOST`                 | `p3plzcpnl507133.prod.phx3.secureserver…` (GoDaddy/cPanel) |
| `SMTP_PORT`                 | `587`                                                      |
| `FROM_EMAIL`                | `noreply@scribeeljuego.com`                                |
| `FROM_NAME`                 | `Scribe - El juego`                                        |
| `WHATSAPP_BOT_URL`          | `http://35.188.0.200:3008/v1/messages`                     |
| `FRONTEND_URL`              | `https://promo.scribeeljuego.com.mx`                       |
| `RECAPTCHA_MIN_SCORE`       | `0.5`                                                      |
| `EMAIL_PROVIDER`            | `sendgrid`                                                 |
| `SENDGRID_API_KEY`          | (valor directo en variable — **no en Secret Manager**)     |
| `DATABASE_URL`              | Secreto: `database-url:latest`                             |
| `JWT_SECRET`                | Secreto: `jwt-secret:latest`                               |
| `GCS_BUCKET`                | Secreto: `gcs-bucket:latest`                               |
| `GCS_CLIENT_EMAIL`          | Secreto: `gcs-client-email:latest`                         |
| `GCS_PRIVATE_KEY`           | Secreto: `gcs-private-key:latest`                          |
| `RECAPTCHA_SECRET_KEY`      | Secreto: `recaptcha-secret-key:latest`                     |
| `SMTP_USER`                 | Secreto: `smtp-user:latest`                                |
| + variables adicionales     | —                                                          |

**CI/CD del Backend:**

- Servicio: **Cloud Build**
- Trigger: `scribe-backend-ci-cd` (región us-central1)
- Evento disparador: Push a una rama en GitHub
- Repositorio GitHub: `agsitdesarrollo/Scribe-Compra-Juega-y-Gana-Backend`
- Configuración: Detectada automáticamente (cloudbuild.yaml en el repo)
- Flujo: push → Cloud Build construye imagen Docker → sube a Artifact Registry → despliega nueva revisión en Cloud Run

---

### 2.4 Compute Engine — Máquinas Virtuales

#### VM 1: `scribe-pgbouncer` (PGBouncer — Pool de conexiones)

| Parámetro                         | Valor                                                                                                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Nombre**                        | `scribe-pgbouncer`                                                                                                                                                                                           |
| **ID de instancia**               | 272233997539937265                                                                                                                                                                                           |
| **Zona**                          | `us-central1-a`                                                                                                                                                                                              |
| **Tipo de máquina**               | `e2-medium` (2 vCPU, 4 GB RAM)                                                                                                                                                                               |
| **Plataforma CPU**                | AMD Rome                                                                                                                                                                                                     |
| **Arquitectura**                  | x86-64                                                                                                                                                                                                       |
| **SO / Imagen**                   | Debian 12 Bookworm (`debian-12-bookworm-v20260210`)                                                                                                                                                          |
| **IP interna**                    | `10.128.0.3`                                                                                                                                                                                                 |
| **IP externa**                    | `34.134.216.47`                                                                                                                                                                                              |
| **Etiqueta de red**               | `pgbouncer`                                                                                                                                                                                                  |
| **Firewall HTTP**                 | Inactivo                                                                                                                                                                                                     |
| **Firewall HTTPS**                | Inactivo                                                                                                                                                                                                     |
| **Protección contra eliminación** | Inhabilitado                                                                                                                                                                                                 |
| **Creada**                        | 24 feb 2026                                                                                                                                                                                                  |
| **Estado**                        | Activa ✅                                                                                                                                                                                                    |
| **Propósito**                     | Ejecuta PGBouncer para gestionar el pool de conexiones hacia Cloud SQL. El backend (Cloud Run) se conecta a esta VM en lugar de conectarse directamente a Cloud SQL, reduciendo la sobrecarga de conexiones. |

#### VM 2: `scribe-vm-production` (VM de producción — Bot WhatsApp)

| Parámetro                         | Valor                                                                                                                                                |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nombre**                        | `scribe-vm-production`                                                                                                                               |
| **ID de instancia**               | 6062120112574720376                                                                                                                                  |
| **Zona**                          | `us-central1-c`                                                                                                                                      |
| **Tipo de máquina**               | `e2-medium` (2 vCPU, 4 GB RAM)                                                                                                                       |
| **Plataforma CPU**                | Intel Broadwell                                                                                                                                      |
| **Arquitectura**                  | x86-64                                                                                                                                               |
| **SO / Imagen**                   | Ubuntu 24.04 LTS Noble (`ubuntu-2404-noble-amd64-v20251217`)                                                                                         |
| **IP interna**                    | `10.128.0.2`                                                                                                                                         |
| **IP externa**                    | `35.188.0.200`                                                                                                                                       |
| **Protección contra eliminación** | Inhabilitado                                                                                                                                         |
| **Creada**                        | 16 ene 2026                                                                                                                                          |
| **Estado**                        | Activa ✅                                                                                                                                            |
| **Propósito**                     | Aloja el bot de WhatsApp (servicio en puerto 3008). Referenciado en la variable `WHATSAPP_BOT_URL=http://35.188.0.200:3008/v1/messages` del backend. |

---

### 2.5 Cloud SQL — Base de Datos

| Parámetro                                | Valor                                             |
| ---------------------------------------- | ------------------------------------------------- |
| **Nombre de la instancia**               | `scribe-db-production`                            |
| **Connection name**                      | `scribe-mundial:us-central1:scribe-db-production` |
| **Versión de PostgreSQL**                | PostgreSQL 15.17                                  |
| **Edición**                              | Enterprise                                        |
| **Zona**                                 | `us-central1-c`                                   |
| **Disponibilidad**                       | Zona única (sin Alta Disponibilidad)              |
| **vCPU**                                 | 2                                                 |
| **Memoria RAM**                          | 8 GB                                              |
| **Almacenamiento**                       | 50 GB SSD                                         |
| **Aumento automático de almacenamiento** | ✅ Habilitado                                     |
| **IP privada**                           | `10.21.240.3`                                     |
| **IP pública**                           | No configurada                                    |
| **Conectividad**                         | Solo IP privada (VPC `default`)                   |
| **Acceso PSA (Private Service Access)**  | Habilitado                                        |
| **Red VPC**                              | `default`                                         |
| **Autenticación IAM**                    | Habilitada (`cloudsql.iam_authentication = on`)   |
| **Prevención de eliminación**            | ✅ Habilitada                                     |
| **Creada**                               | (instancia activa)                                |

**Bases de datos en la instancia:**

| Nombre      | Charset | Collation  |
| ----------- | ------- | ---------- |
| `postgres`  | UTF8    | en_US.UTF8 |
| `scribe_db` | UTF8    | en_US.UTF8 |

**Configuración de Backups:**

| Parámetro                            | Valor                         |
| ------------------------------------ | ----------------------------- |
| **Nivel de backup**                  | Estándar                      |
| **Copias automatizadas**             | ✅ Habilitadas                |
| **Ventana de backup**                | 1:00 a.m. – 5:00 a.m. (GMT-6) |
| **Retención de backups automáticos** | 7 días                        |
| **Point-in-time recovery (PITR)**    | ✅ Habilitada                 |
| **Retención de logs (PITR)**         | 7 días                        |
| **Ubicación de backups**             | Multi-región: US              |
| **Retención post-eliminación**       | ✅ Habilitada                 |

---

### 2.6 VPC Connector (Serverless VPC Access)

| Parámetro              | Valor                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| **Nombre**             | `scribe-vpc-serverless`                                                                                 |
| **Red VPC**            | `default`                                                                                               |
| **Subred**             | 10.8.0.0/28                                                                                             |
| **Región**             | `us-central1`                                                                                           |
| **Tipo de instancia**  | `e2-micro`                                                                                              |
| **Instancias mínimas** | 2                                                                                                       |
| **Estado**             | Activo ✅                                                                                               |
| **Propósito**          | Permite que Cloud Run (serverless) acceda a recursos en la VPC privada: la VM de PGBouncer y Cloud SQL. |

---

### 2.7 Secret Manager — Secretos

Todos los secretos están replicados automáticamente con encriptación administrada por Google.

| Secreto                | Propósito                                           |
| ---------------------- | --------------------------------------------------- |
| `database-url`         | URL de conexión a PostgreSQL (vía PGBouncer)        |
| `jwt-secret`           | Clave para firmar tokens JWT                        |
| `gcs-bucket`           | Nombre del bucket de GCS para archivos              |
| `gcs-client-email`     | Email de cuenta de servicio para GCS                |
| `gcs-private-key`      | Clave privada para autenticación en GCS             |
| `recaptcha-secret-key` | Clave secreta de Google reCAPTCHA                   |
| `smtp-user`            | Usuario SMTP para envío de emails                   |
| `smtp-pass`            | Contraseña SMTP                                     |
| `admin-emails`         | Emails de administradores del sistema               |
| `VITE_API_URL`         | URL de la API usada en el build del frontend (Vite) |

---

### 2.8 Cloud Build — CI/CD Backend

| Parámetro                    | Valor                                                         |
| ---------------------------- | ------------------------------------------------------------- |
| **Trigger**                  | `scribe-backend-ci-cd`                                        |
| **Región**                   | `us-central1`                                                 |
| **Repositorio**              | `agsitdesarrollo/Scribe-Compra-Juega-y-Gana-Backend` (GitHub) |
| **Evento**                   | Push a rama (branch push)                                     |
| **Archivo de configuración** | Detectado automáticamente (`cloudbuild.yaml`)                 |
| **Bucket de artifacts**      | `scribe-mundial_cloudbuild`                                   |

**Flujo CI/CD completo del Backend:**

1. Developer hace push a la rama configurada en GitHub
2. Cloud Build detecta el push vía webhook y lanza el pipeline
3. Cloud Build construye la imagen Docker del backend
4. Sube la imagen a **Artifact Registry** (`us-central1-docker.pkg.dev/scribe-mundial/...`)
5. Despliega la nueva imagen como revisión en **Cloud Run** (`scribe-backend`)
6. Cloud Run realiza el despliegue sin downtime (tráfico gradual a nueva revisión)

**CI/CD del Frontend (GitHub Actions):**

- El frontend React (Vite) tiene su propio pipeline en GitHub Actions
- Al hacer push, Actions buildea el proyecto con `vite build`
- Sube los archivos estáticos al bucket `scribe-frontend-prod`
- Realiza invalidación de caché en el Cloud Load Balancer / Cloud CDN

---

### 2.9 Cloud Armor — Seguridad WAF

| Política                     | Aplicada a                         |
| ---------------------------- | ---------------------------------- |
| `armor-scribe-api`           | Backend service (Cloud Run / API)  |
| `armor-scribe-frontend-edge` | Edge (bucket del frontend via CDN) |

---

## 3. Verificación del Diagrama vs. Realidad

| Elemento                            | Diagrama       | Realidad (GCP)                     | ¿Correcto?        |
| ----------------------------------- | -------------- | ---------------------------------- | ----------------- |
| IP Load Balancer                    | 35.186.217.21  | 35.186.217.21                      | ✅                |
| Frontend en Cloud Storage           | ✅             | ✅ Bucket `scribe-frontend-prod`   | ✅                |
| CI/CD Frontend GitHub Actions       | ✅             | ✅ Confirmado                      | ✅                |
| Backend en Cloud Run                | ✅             | ✅ `scribe-backend`                | ✅                |
| CI/CD Backend en Cloud Build        | ✅             | ✅ Trigger `scribe-backend-ci-cd`  | ✅                |
| VM con PGBouncer                    | ✅             | ✅ `scribe-pgbouncer` (Debian 12)  | ✅                |
| Cloud SQL PostgreSQL                | ✅             | ✅ `scribe-db-production` PG 15.17 | ✅                |
| Cloud SQL: 1 CPU / 3.75 GB RAM      | 1 CPU, 3.75 GB | **2 vCPU, 8 GB RAM, 50 GB SSD**    | ❌ Desactualizado |
| Cloud Run scaling: mín 0, máx 20    | mín 0, máx 20  | **mín 2, máx 120**                 | ❌ Desactualizado |
| Segunda VM (`scribe-vm-production`) | No aparece     | ✅ Existe (bot WhatsApp)           | ⚠️ Faltante       |
| Cloud Armor                         | No aparece     | ✅ 2 políticas activas             | ⚠️ Faltante       |
| VPC Connector Serverless            | No aparece     | ✅ `scribe-vpc-serverless`         | ⚠️ Faltante       |
| Secret Manager                      | No aparece     | ✅ 10 secretos                     | ⚠️ Faltante       |

---

## 4. Cómo Exportar la Base de Datos (Entrega al Cliente)

### Opción A — Desde la Consola de GCP (Sin necesidad de cliente PostgreSQL)

1. Ir a **Cloud SQL → scribe-db-production → Exportar** (botón en la barra superior)
2. Seleccionar:
   - **Formato:** SQL (recomendado) o CSV
   - **Base de datos:** `scribe_db`
   - **Bucket de destino:** `scribe-audit-20260302-25800` (ya existe) o cualquier bucket del proyecto
3. Hacer clic en **Exportar**
4. Una vez finalizado, ir a Cloud Storage → descargar el archivo `.sql`

### Opción B — Con `gcloud` desde Cloud Shell (Recomendado para mayor control)

Abre Cloud Shell en la consola (tecla `G` luego `S`) y ejecuta:

```bash
# Exportar la base de datos completa a un bucket
gcloud sql export sql scribe-db-production \
  gs://scribe-audit-20260302-25800/backup-final-$(date +%Y%m%d).sql \
  --database=scribe_db \
  --project=scribe-mundial

# Verificar que se creó el archivo
gsutil ls gs://scribe-audit-20260302-25800/

# Descargar el archivo al equipo local
gsutil cp gs://scribe-audit-20260302-25800/backup-final-*.sql ./
```

### Opción C — Con `pg_dump` (Si tienes acceso directo o desde la VM)

Desde la VM `scribe-pgbouncer` (que tiene acceso a la base de datos):

```bash
# Conectarse a la VM vía SSH
gcloud compute ssh scribe-pgbouncer --zone=us-central1-a --project=scribe-mundial

# Dentro de la VM, exportar con pg_dump
pg_dump -h 10.21.240.3 -U [usuario] -d scribe_db -F c -f /tmp/scribe_db_backup.sql

# Copiar desde la VM al Cloud Storage
gsutil cp /tmp/scribe_db_backup.sql gs://scribe-audit-20260302-25800/
```

> **Recomendación:** Usar la **Opción A o B** para el dump final que entregarás al cliente. El formato `.sql` de Cloud SQL Export es compatible con PostgreSQL estándar y puede importarse en cualquier instancia PostgreSQL con `psql` o `pg_restore`.

---

## 5. Guía de Desmantelamiento del Proyecto (Orden recomendado)

> ⚠️ **IMPORTANTE:** Seguir el orden para evitar errores de dependencias y costos adicionales. El desmantelamiento es **irreversible**. Verificar que tengas el backup de la base de datos ANTES de comenzar.

### Checklist previo (HACER ANTES DE EMPEZAR)

- [ ] Exportar y descargar la base de datos completa (`scribe_db`) — ver Sección 4
- [ ] Guardar las variables de entorno del Cloud Run (Secretos, env vars)
- [ ] Notificar a los usuarios finales que el servicio estará fuera de servicio
- [ ] Deshabilitar el CI/CD (para que no se despliegue algo nuevo accidentalmente)

---

### PASO 1 — Deshabilitar CI/CD (primero)

**Cloud Build:**

- Ir a Cloud Build → Activadores → `scribe-backend-ci-cd` → Deshabilitar o eliminar

**GitHub Actions (Frontend):**

- En el repositorio del frontend, eliminar o deshabilitar el workflow de CI/CD (archivo `.github/workflows/`)

---

### PASO 2 — Apagar el Cloud Load Balancer (quitar acceso público)

1. Ir a **Servicios de red → Balanceo de cargas**
2. Seleccionar `scribe-frontend-lb` → **Borrar**
3. Seleccionar `scribe-http-redirect` → **Borrar**

> Esto hace que el dominio `scribeeljuego.com` deje de responder. A partir de aquí el servicio está fuera de línea para los usuarios.

---

### PASO 3 — Eliminar el DNS y los Certificados SSL

1. Si el DNS está gestionado en GCP (Cloud DNS): ir a **Cloud DNS** → borrar los registros A que apuntan a `35.186.217.21`
2. Si el DNS está en un registrador externo: eliminar los registros A desde allí
3. Liberar la IP estática:
   - **Red de VPC → Direcciones IP → Liberar** la IP `35.186.217.21`
4. Eliminar certificados SSL:
   - **Servicios de red → Políticas de SSL** → eliminar `scribe-ssl-cert`, `scribe-ssl-cert-eljuego`, `scribe-ssl-cert-eljuegomx`

---

### PASO 4 — Eliminar Cloud Run

1. Ir a **Cloud Run → Servicios**
2. Seleccionar `scribe-backend` → **Borrar**

---

### PASO 5 — Eliminar Cloud Build y Artifact Registry

1. **Cloud Build → Activadores** → eliminar `scribe-backend-ci-cd`
2. **Artifact Registry** → eliminar el repositorio de imágenes Docker del proyecto
   - Navegar a: `Artifact Registry → Repositorios → scribe-mundial`

---

### PASO 6 — Detener y eliminar las VMs de Compute Engine

1. Ir a **Compute Engine → Instancias de VM**
2. Seleccionar `scribe-pgbouncer` → **Detener** (esperar) → **Borrar**
3. Seleccionar `scribe-vm-production` → **Detener** (esperar) → **Borrar**

> Al borrar las VMs, también se eliminan sus discos de arranque si no están marcados como "Keep on delete".

---

### PASO 7 — Eliminar el VPC Connector

1. Ir a **Red de VPC → Acceso a VPC sin servidores**
2. Seleccionar `scribe-vpc-serverless` → **Borrar**

---

### PASO 8 — Eliminar Cloud SQL (ÚLTIMO RECURSO — asegúrate de tener el backup)

1. Ir a **Cloud SQL → Instancias → scribe-db-production**
2. **Deshabilitar la protección contra eliminación** (Cloud SQL → Editar → desactivar la opción)
3. Hacer clic en **Borrar** e ingresar el nombre de la instancia para confirmar

---

### PASO 9 — Eliminar los Buckets de Cloud Storage

1. Ir a **Cloud Storage → Buckets**
2. Vaciar y eliminar en este orden:
   - `scribe-mundial_cloudbuild`
   - `scribe-audit-20260302-25800` (asegúrate de haber descargado el backup antes)
   - `scribe-tickets` (confirmar con el cliente si los archivos son necesarios)
   - `scribe-frontend-prod`

---

### PASO 10 — Eliminar los Secretos de Secret Manager

1. Ir a **Seguridad → Secret Manager**
2. Eliminar todos los secretos: `database-url`, `jwt-secret`, `gcs-bucket`, `gcs-client-email`, `gcs-private-key`, `recaptcha-secret-key`, `smtp-user`, `smtp-pass`, `admin-emails`, `VITE_API_URL`

---

### PASO 11 — Eliminar Cloud Armor

1. Ir a **Seguridad → Cloud Armor**
2. Eliminar políticas: `armor-scribe-api`, `armor-scribe-frontend-edge`

---

### PASO 12 — Limpiar IAM y Cuentas de Servicio

1. Ir a **IAM y administración → Cuentas de servicio**
2. Eliminar las cuentas de servicio específicas del proyecto (si las hay, además de la default de Compute)
3. Revocar cualquier acceso de usuarios externos que se haya otorgado

---

### PASO 13 — Deshabilitar APIs innecesarias (opcional)

Si no se va a eliminar el proyecto completo, deshabilitar las APIs para evitar facturación accidental:

- Cloud Run API
- Cloud Build API
- Cloud SQL API
- Compute Engine API
- Secret Manager API

---

### PASO 14 — Eliminar el Proyecto (opción nuclear)

Si se va a eliminar completamente y no se reutilizará el Project ID:

1. Ir a **IAM y administración → Configuración**
2. Hacer clic en **Borrar proyecto**
3. Ingresar el Project ID `scribe-mundial` para confirmar

> Al eliminar el proyecto se eliminan **todos** los recursos automáticamente. Sin embargo, el proyecto queda en un período de "gracia" de 30 días antes de la eliminación definitiva (se puede restaurar en ese período).

---

### PASO 15 — Deshabilitar la Facturación (siempre al final)

1. Ir a **Facturación** desde la consola de GCP
2. Seleccionar la cuenta de facturación vinculada al proyecto
3. Desvincular el proyecto de la cuenta de facturación
4. Si ya se eliminó el proyecto, esto sucede automáticamente

> ⚠️ **No deshabilites la facturación antes de terminar de eliminar los recursos**, ya que algunos procesos de eliminación o exportación de datos requieren que la facturación esté activa.

---

## 6. Resumen de Costos por Servicio (referencia para proyectos futuros)

| Servicio             | Recurso                              | Costo aprox. mensual     |
| -------------------- | ------------------------------------ | ------------------------ |
| Cloud SQL Enterprise | 2 vCPU, 8 GB, 50 GB SSD              | Mayor costo del proyecto |
| Compute Engine (x2)  | 2× e2-medium                         | Costo fijo mensual       |
| Cloud Run            | Pay-per-use + 2 instancias mínimas   | Variable                 |
| Cloud Load Balancer  | Por regla de reenvío + procesamiento | Fijo + variable          |
| Cloud Storage        | 4 buckets + operaciones              | Bajo                     |
| VPC Connector        | 2× e2-micro                          | Fijo                     |
| Secret Manager       | Por secreto + accesos                | Muy bajo                 |
| Cloud Build          | Por minutos de build                 | Variable                 |
| Cloud Armor          | Por política + solicitudes           | Variable                 |

---

## 7. Notas para Replicar esta Arquitectura

Si en un proyecto futuro se desea replicar esta infraestructura, los componentes clave y el orden de creación son:

1. **Crear el proyecto GCP** y habilitar las APIs necesarias
2. **Configurar VPC** (se puede usar la red `default` o crear una dedicada)
3. **Crear Cloud SQL** (PostgreSQL) con IP privada y PSA habilitado
4. **Crear las VMs de Compute Engine:**
   - Una para PGBouncer (instalar y configurar `pgbouncer` apuntando a la IP privada de Cloud SQL)
   - Una para servicios adicionales (bot de WhatsApp, etc.)
5. **Crear el VPC Connector** para que Cloud Run pueda acceder a la VPC
6. **Crear los buckets de Cloud Storage** (frontend + tickets + cloudbuild)
7. **Configurar Secret Manager** con todos los secretos necesarios
8. **Configurar Artifact Registry** para almacenar imágenes Docker
9. **Configurar Cloud Build** + conectar repositorio GitHub (webhook)
10. **Crear el servicio Cloud Run** con las variables de entorno, secretos, VPC connector y conexión a Cloud SQL
11. **Crear el Cloud Load Balancer** con:
    - IP estática
    - Certificados SSL (gestionados por Google recomendado)
    - URL map con reglas: `/api/*` → NEG de Cloud Run, `/` → bucket frontend
12. **Configurar Cloud Armor** (WAF) para ambas políticas
13. **Configurar DNS** para apuntar el dominio a la IP del Load Balancer
14. **Configurar GitHub Actions** para el CI/CD del frontend

---

_Documentación generada el 30 de junio de 2026 mediante revisión directa de los recursos en la consola de GCP del proyecto `scribe-mundial`._
