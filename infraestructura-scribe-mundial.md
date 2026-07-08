# Infraestructura de Google Cloud - scribe-mundial

Fecha de inventario: 2026-07-03  
Proyecto: `scribe-mundial`  
Project number: `217777176978`  
Cuenta usada: `agsitsistemas@gmail.com`

## Alcance y fuentes

Este inventario se obtuvo con Google Cloud SDK, `firebase-tools` y `bq` desde la maquina local. No fue necesario usar Chrome.

No se consultaron ni se copiaron valores de Secret Manager, llaves privadas, claves SSH ni certificados completos. Donde Google Cloud devolvio metadatos sensibles, este reporte solo documenta el hecho operativo o el riesgo.

Comandos/fuentes principales:

- `gcloud projects describe`
- `gcloud services list --enabled`
- `gcloud asset search-all-resources`
- `gcloud compute ...`
- `gcloud run ...`
- `gcloud sql ...`
- `gcloud storage ...`
- `gcloud artifacts ...`
- `gcloud iam ...`
- `gcloud services api-keys list`
- `firebase projects:list`, `firebase hosting:sites:list`, `firebase apps:list`
- `bq ls`

## Resumen ejecutivo

La arquitectura principal es una aplicacion web con frontend estatico en Cloud Storage, servida por un HTTP(S) Load Balancer global con Cloud CDN, y backend en Cloud Run. El path `/api` se enruta hacia Cloud Run mediante un NEG serverless. El backend usa Cloud SQL PostgreSQL privado, Secret Manager, Cloud Storage y un endpoint de bot de WhatsApp hospedado en una VM de Compute Engine.

Flujo observado:

```text
Usuario
  -> HTTPS Load Balancer global 35.186.217.21
      -> Frontend estatico: backend bucket scribe-frontend-backend-bucket
         -> bucket gs://scribe-frontend-prod
      -> /api: backend service scribe-backend-service
         -> serverless NEG scribe-backend-neg
         -> Cloud Run scribe-backend
             -> Cloud SQL scribe-db-production por IP privada / Cloud SQL connector
             -> Secret Manager
             -> Cloud Storage
             -> VM scribe-vm-production:3008 para WhatsApp bot
```

Recursos centrales:

- Frontend: `gs://scribe-frontend-prod` con website config y Cloud CDN.
- Backend: Cloud Run `scribe-backend` en `us-central1`.
- Base de datos: Cloud SQL PostgreSQL 15 `scribe-db-production` en `us-central1-c`.
- Red: VPC `default`, Service Networking peering, VPC Access connector `scribe-vpc-serverless`.
- Load Balancer: IP global `35.186.217.21`.
- VM productiva/bot: `scribe-vm-production`, IP regional `35.188.0.200`, estado observado `TERMINATED`.
- VM PgBouncer: `scribe-pgbouncer`, estado observado `TERMINATED`.

## Proyecto

| Campo | Valor |
| --- | --- |
| Project ID | `scribe-mundial` |
| Project number | `217777176978` |
| Nombre | `scribe-mundial` |
| Estado | `ACTIVE` |
| Creado | `2025-12-11T22:18:27Z` |
| Labels | `firebase=enabled`, `firebase-core=disabled` |
| Billing | Habilitado |
| Cloud Armor tier | `CA_STANDARD` |
| Default network tier | `PREMIUM` |
| Default service account | `217777176978-compute@developer.gserviceaccount.com` |

## APIs habilitadas

APIs relevantes habilitadas:

- Compute Engine: `compute.googleapis.com`
- Cloud Run: `run.googleapis.com`
- Cloud SQL: `sqladmin.googleapis.com`, `sql-component.googleapis.com`
- Cloud Storage: `storage.googleapis.com`, `storage-api.googleapis.com`, `storage-component.googleapis.com`
- Cloud Build: `cloudbuild.googleapis.com`
- Artifact Registry: `artifactregistry.googleapis.com`
- Secret Manager: `secretmanager.googleapis.com`
- Firebase: `firebase.googleapis.com`, `firebasehosting.googleapis.com`, `identitytoolkit.googleapis.com`, `securetoken.googleapis.com`, `fcm.googleapis.com`, `firebaserules.googleapis.com`, `firebaseremoteconfig.googleapis.com`
- Monitoring/Logging/Trace: `monitoring.googleapis.com`, `logging.googleapis.com`, `cloudtrace.googleapis.com`
- Cloud Asset: `cloudasset.googleapis.com`
- Service Networking: `servicenetworking.googleapis.com`
- Serverless VPC Access: `vpcaccess.googleapis.com`
- IAM: `iam.googleapis.com`, `iamcredentials.googleapis.com`
- OS Config / OS Login: `osconfig.googleapis.com`, `oslogin.googleapis.com`
- BigQuery suite: `bigquery.googleapis.com`, `bigqueryconnection.googleapis.com`, `bigquerydatatransfer.googleapis.com`, etc.
- Spanner: `spanner.googleapis.com`
- Pub/Sub: `pubsub.googleapis.com`
- reCAPTCHA Enterprise: `recaptchaenterprise.googleapis.com`

APIs habilitadas pero sin recursos activos observados:

- BigQuery: sin datasets (`bq ls` vacio).
- Spanner: sin instancias.
- Pub/Sub: sin topics ni subscriptions.
- App Engine Admin API habilitada, pero no existe aplicacion App Engine.
- Cloud Functions API no esta habilitada.

## Load Balancer, dominios y CDN

### Direcciones IP

| Nombre | Tipo | Alcance | IP | Estado | Uso |
| --- | --- | --- | --- | --- | --- |
| `scribe-frontend-lb-ip` | Externa | Global | `35.186.217.21` | `IN_USE` | Forwarding rules HTTP/HTTPS |
| `scribe-production-ip` | Externa | `us-central1` | `35.188.0.200` | `IN_USE` | VM `scribe-vm-production` |
| `default-ip-range-1771980875023` | Interna | Global | `10.21.240.0/20` | `RESERVED` | VPC peering Service Networking |

### Forwarding rules

| Nombre | IP | Puerto | Esquema | Target |
| --- | --- | --- | --- | --- |
| `scribe-frontend-fe` | `35.186.217.21` | `80` | `EXTERNAL_MANAGED` | `scribe-http-redirect-proxy` |
| `scribe-https-fe` | `35.186.217.21` | `443` | `EXTERNAL` | `scribe-https-proxy` |

### URL maps

`scribe-http-redirect`:

- Redirige HTTP a HTTPS.
- Codigo: `MOVED_PERMANENTLY_DEFAULT`.

`scribe-frontend-lb`:

- Default service: backend bucket `scribe-frontend-backend-bucket`.
- Regla de path:
  - `/api`
  - `/api/*`
  - Servicio: backend service `scribe-backend-service`.

### Backend bucket frontend

| Campo | Valor |
| --- | --- |
| Nombre | `scribe-frontend-backend-bucket` |
| Bucket | `scribe-frontend-prod` |
| CDN | Habilitado |
| Cache mode | `CACHE_ALL_STATIC` |
| Client TTL | `3600s` |
| Default TTL | `3600s` |
| Max TTL | `86400s` |
| Serve while stale | `86400s` |
| Negative caching | Habilitado |
| Edge security policy | `armor-scribe-frontend-edge` |

### Backend service API

| Campo | Valor |
| --- | --- |
| Nombre | `scribe-backend-service` |
| Protocolo | HTTP |
| Puerto | 80 |
| Timeout | 30s |
| Logging | Habilitado, sample rate 1 |
| Backend | Serverless NEG `scribe-backend-neg` |
| Security policy | `armor-scribe-api` |

### Serverless NEG

| Campo | Valor |
| --- | --- |
| Nombre | `scribe-backend-neg` |
| Region | `us-central1` |
| Tipo | `SERVERLESS` |
| Cloud Run service | `scribe-backend` |

### Certificados SSL administrados

| Nombre | Dominios | Estado | Expira |
| --- | --- | --- | --- |
| `scribe-ssl-cert` | `lovieninternet.com.mx` | `ACTIVE` | 2026-09-09 |
| `scribe-ssl-cert-promoeljuegomx` | `promo.scribeeljuego.com.mx` | `ACTIVE` | 2026-09-16 |
| `scribe-ssl-cert-eljuego` | `scribeeljuego.com` | `PROVISIONING_FAILED_PERMANENTLY`, `FAILED_NOT_VISIBLE` | 2026-05-24 |
| `scribe-ssl-cert-eljuegomx` | `scribeeljuego.com.mx` | `PROVISIONING_FAILED_PERMANENTLY`, `FAILED_NOT_VISIBLE` | 2026-05-28 |

Los dos certificados fallidos siguen adjuntos al HTTPS proxy junto con los activos.

## Cloud Armor

### `armor-scribe-api`

Tipo: `CLOUD_ARMOR`

Reglas:

- Prioridad `1000`: throttle para `/api` y `/api/*`.
  - Match: `request.path == '/api' || request.path.startsWith('/api/')`
  - Umbral: 300 requests por 10 segundos por IP.
  - Exceso: `deny(429)`.
- Regla default: `allow`.

### `armor-scribe-frontend`

Tipo: `CLOUD_ARMOR`

Reglas:

- Prioridad `1000`: throttle general frontend.
  - Umbral: 1200 requests por 10 segundos por IP.
  - Exceso: `deny(429)`.
- Regla default: `allow`.

No se observo adjunta al backend bucket activo.

### `armor-scribe-frontend-edge`

Tipo: `CLOUD_ARMOR_EDGE`

Adjunta al backend bucket `scribe-frontend-backend-bucket`.

Reglas:

- Prioridad `1000`: `allow`, descripcion `EDGE baseline allow-all (temporary)`.
- Regla default: `allow`.

## Cloud Run

Servicio: `scribe-backend`  
Region: `us-central1`  
Estado: `Ready`  
Revision lista: `scribe-backend-00053-d28`  
URL directa: `https://scribe-backend-luyemjrmoa-uc.a.run.app`  
URL adicional observada: `https://scribe-backend-217777176978.us-central1.run.app`

### Configuracion

| Campo | Valor |
| --- | --- |
| Ingress | `all` |
| IAM invoker | `allUsers` |
| Traffic | 100% a ultima revision |
| Imagen | `us-central1-docker.pkg.dev/scribe-mundial/scribe-repo/scribe-backend:f5ee148f1f800730a79bcbc69883ea87b7a32f00` |
| Puerto contenedor | `3001` |
| Concurrency | 80 |
| CPU | `1000m` |
| Memoria | `1Gi` |
| Timeout | 300s |
| Min scale | 2 |
| Max scale | 120 en template |
| Startup CPU boost | Habilitado |
| Service account | `217777176978-compute@developer.gserviceaccount.com` |
| Cloud SQL attachment | `scribe-mundial:us-central1:scribe-db-production` |
| VPC connector | `scribe-vpc-serverless` |
| VPC egress | `private-ranges-only` |

### Variables de entorno observadas

Variables planas no secretas:

- `NODE_ENV=production`
- `GCS_PROJECT_ID=scribe-mundial`
- `RATE_LIMIT_GENERAL_WINDOW=15`
- `RATE_LIMIT_GENERAL_MAX=100`
- `RATE_LIMIT_AUTH_MAX=5`
- `RATE_LIMIT_TICKET_MAX=10`
- `SMTP_HOST`
- `SMTP_PORT=587`
- `FROM_EMAIL`
- `FROM_NAME`
- `WHATSAPP_BOT_URL=http://35.188.0.200:3008/v1/messages`
- `FRONTEND_URL=https://promo.scribeeljuego.com.mx`
- `RECAPTCHA_MIN_SCORE=0.5`
- `EMAIL_PROVIDER=sendgrid`

Variables referenciadas desde Secret Manager:

- `DATABASE_URL` -> `database-url`
- `JWT_SECRET` -> `jwt-secret`
- `GCS_BUCKET` -> `gcs-bucket`
- `GCS_CLIENT_EMAIL` -> `gcs-client-email`
- `GCS_PRIVATE_KEY` -> `gcs-private-key`
- `RECAPTCHA_SECRET_KEY` -> `recaptcha-secret-key`
- `SMTP_USER` -> `smtp-user`
- `SMTP_PASS` -> `smtp-pass`
- `ADMIN_EMAILS` -> `admin-emails`

Hallazgo sensible:

- `SENDGRID_API_KEY` aparece configurada como variable plana en Cloud Run, no como referencia a Secret Manager. El valor no se incluye en este reporte. Se recomienda rotarla y moverla a Secret Manager.

## Compute Engine

### Instancias

| Nombre | Zona | Tipo | SO/disco | IP interna | IP externa | Tags | Estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `scribe-vm-production` | `us-central1-c` | `e2-medium` | Ubuntu 24.04, 30 GB `pd-balanced` | `10.128.0.2` | `35.188.0.200` | `http-server`, `https-server` | `TERMINATED` |
| `scribe-pgbouncer` | `us-central1-a` | `e2-medium` | Debian 12, 10 GB `pd-balanced` | `10.128.0.3` | ephemeral NAT sin IP reservada observada | `pgbouncer` | `TERMINATED` |

Ambas VMs usan el service account default de Compute:

- `217777176978-compute@developer.gserviceaccount.com`

Ambas tienen OS Config habilitado por metadata y label:

- `goog-ops-agent-policy=v2-x86-template-1-4-0`

### Discos

| Disco | Zona | Tamano | Tipo | Auto snapshots |
| --- | --- | --- | --- | --- |
| `scribe-vm-production` | `us-central1-c` | 30 GB | `pd-balanced` | Si, policy `default-schedule-1` |
| `scribe-pgbouncer` | `us-central1-a` | 10 GB | `pd-balanced` | No observado |

### Snapshots

Policy: `default-schedule-1`

- Region: `us-central1`
- Frecuencia: diaria.
- Start time: `17:00`.
- Retencion: 14 dias.
- `onSourceDiskDelete`: `KEEP_AUTO_SNAPSHOTS`.
- `guestFlush`: false.

Snapshots recientes observados para `scribe-vm-production`:

- `2026-07-02`: `scribe-vm-productio-us-central1-c-20260702162302-8jhmh0a9`
- `2026-07-01`: `scribe-vm-productio-us-central1-c-20260701162302-ma826tmv`
- `2026-06-30`: `scribe-vm-productio-us-central1-c-20260630162302-1tzoopx4`
- `2026-06-29`: `scribe-vm-productio-us-central1-c-20260629162302-cqkazc10`
- `2026-06-28`: `scribe-vm-productio-us-central1-c-20260628162302-a06z677n`

## Red

### VPC

| Campo | Valor |
| --- | --- |
| Nombre | `default` |
| Modo subredes | Auto |
| Routing mode | Regional |
| Firewall policy enforcement | `AFTER_CLASSIC_FIREWALL` |
| Peering | `servicenetworking-googleapis-com`, `ACTIVE` |

### Subred principal

| Campo | Valor |
| --- | --- |
| Nombre | `default` |
| Region | `us-central1` |
| CIDR | `10.128.0.0/20` |
| Gateway | `10.128.0.1` |
| Private Google Access | `false` |

### Service Networking

- Rango reservado: `10.21.240.0/20`.
- Uso: VPC peering para servicios privados.
- Cloud SQL IP privada observada: `10.21.240.3`.

### Serverless VPC Access

Conector: `scribe-vpc-serverless`

| Campo | Valor |
| --- | --- |
| Region | `us-central1` |
| Red | `default` |
| CIDR | `10.8.0.0/28` |
| Machine type | `e2-micro` |
| Min instances | 2 |
| Max instances | 3 |
| Min throughput | 200 |
| Max throughput | 300 |
| Estado | `READY` |

### Firewall rules observadas

| Regla | Puertos/protocolo | Source ranges | Target tags | Observacion |
| --- | --- | --- | --- | --- |
| `allow-bot-whatsapp` | TCP 3008 | `0.0.0.0/0` | Ninguno | Abierto a Internet |
| `allow-dokploy` | TCP 3000 | `0.0.0.0/0` | Ninguno | Abierto a Internet |
| `allow-pgbouncer-internal` | TCP 6432 | `10.8.0.0/28`, `10.128.0.0/9` | `pgbouncer` | Interno/VPC connector |
| `default-allow-http` | TCP 80 | `0.0.0.0/0` | `http-server` | Abierto para VMs con tag |
| `default-allow-https` | TCP 443 | `0.0.0.0/0` | `https-server` | Abierto para VMs con tag |
| `default-allow-icmp` | ICMP | `0.0.0.0/0` | Ninguno | Abierto a Internet |
| `default-allow-internal` | TCP/UDP 0-65535, ICMP | `10.128.0.0/9` | Ninguno | Trafico interno |
| `default-allow-rdp` | TCP 3389 | `0.0.0.0/0` | Ninguno | Abierto a Internet |
| `default-allow-ssh` | TCP 22 | `0.0.0.0/0` | Ninguno | Abierto a Internet |

No se observaron routers, VPN tunnels ni interconnects.

## Cloud SQL

Instancia: `scribe-db-production`

| Campo | Valor |
| --- | --- |
| Motor | PostgreSQL 15 |
| Version instalada | `POSTGRES_15_18` |
| Region | `us-central1` |
| Zona | `us-central1-c` |
| Availability | `ZONAL` |
| Tier | `db-custom-2-8192` |
| Disco | 50 GB, `PD_SSD` |
| Auto resize | Habilitado |
| Estado | `RUNNABLE` |
| IP publica | Deshabilitada (`ipv4Enabled=false`) |
| IP privada | `10.21.240.3` |
| Red privada | `projects/scribe-mundial/global/networks/default` |
| Deletion protection | Habilitada |
| Retain backups on delete | Habilitado |
| Final backup | Habilitado, 30 dias |
| SSL mode | `ENCRYPTED_ONLY` |
| IAM DB auth flag | `cloudsql.iam_authentication=on` |

### Backups

| Campo | Valor |
| --- | --- |
| Backups automaticos | Habilitados |
| Hora | `07:00` UTC |
| Retencion | 7 backups |
| PITR | Habilitado |
| Retencion transaction logs | 7 dias |
| Ubicacion backups | `us` |

Backups recientes exitosos:

- 2026-07-01, automatico, `SUCCESSFUL`
- 2026-06-30, automatico, `SUCCESSFUL`
- 2026-06-29, automatico, `SUCCESSFUL`
- 2026-06-28, automatico, `SUCCESSFUL`
- 2026-06-27, automatico, `SUCCESSFUL`
- 2026-06-26, automatico, `SUCCESSFUL`
- 2026-06-25, automatico, `SUCCESSFUL`
- 2026-03-20, on-demand, descripcion: `Respaldo antes de migracion 19/03/2026 11:42pm`

### Bases de datos

- `postgres`
- `scribe_db`

### Usuarios

- `postgres`

## Cloud Storage

### Buckets

| Bucket | Ubicacion | Clase | UBLA | Public access prevention | Uso observado |
| --- | --- | --- | --- | --- | --- |
| `scribe-frontend-prod` | `US-CENTRAL1` | `STANDARD` | true | inherited | Frontend estatico / backend bucket |
| `scribe-tickets` | `US` | `STANDARD` | true | enforced | Almacenamiento de tickets |
| `scribe-mundial_cloudbuild` | `US` | `STANDARD` | false | inherited | Fuentes/artifacts de Cloud Build |
| `scribe-audit-20260302-25800` | `US-CENTRAL1` | `STANDARD` | false | inherited | Auditoria/uso de Cloud SQL service account |

Todos los buckets observados tienen soft delete policy de 7 dias.

### `scribe-frontend-prod`

- Website config:
  - `mainPageSuffix=index.html`
  - `notFoundPage=index.html`
- IAM:
  - `allUsers` con `roles/storage.objectViewer`.
- Este bucket es publico y se sirve mediante Load Balancer/CDN.

### `scribe-tickets`

- Public Access Prevention: `enforced`.
- UBLA: true.
- IAM observado: solo roles legacy de proyecto, sin `allUsers`.

### `scribe-audit-20260302-25800`

- El service account de Cloud SQL tiene:
  - `roles/storage.legacyBucketReader`
  - `roles/storage.objectAdmin`

## Artifact Registry

Repositorio: `scribe-repo`

| Campo | Valor |
| --- | --- |
| Ubicacion | `us-central1` |
| Formato | Docker |
| Modo | Standard repository |
| Tamano | 4.07 GB aprox. |
| Cleanup policy dry run | true |
| Vulnerability scanning | Deshabilitado |
| Razon scanning | `containerscanning.googleapis.com` no esta habilitada |

Imagen usada por Cloud Run:

- `us-central1-docker.pkg.dev/scribe-mundial/scribe-repo/scribe-backend:f5ee148f1f800730a79bcbc69883ea87b7a32f00`

Se observaron multiples imagenes historicas `scribe-backend` con tags tipo SHA de commit.

## Cloud Build y CI/CD

### Cloud Build

- Triggers: ninguno observado.
- Builds recientes: se observo un build fallido de frontend del 2026-02-12.
- Build fallido:
  - Imagen destino: `us-central1-docker.pkg.dev/scribe-mundial/scribe-repo/scribe-frontend:latest`
  - Estado: `FAILURE`
  - Error: paso Docker build fallo con exit code 1.
  - Service account usado: `217777176978-compute@developer.gserviceaccount.com`
  - Source bucket: `scribe-mundial_cloudbuild`

### GitHub Actions

Existe service account:

- `github-action-1110234709@scribe-mundial.iam.gserviceaccount.com`

Descripcion:

- `GitHub Actions (agsitdesarrollo/Scribe-Compra-Juega-y-Gana)`

Roles observados:

- `roles/cloudfunctions.developer`
- `roles/firebaseauth.admin`
- `roles/firebasehosting.admin`
- `roles/run.viewer`
- `roles/serviceusage.apiKeysViewer`
- `roles/serviceusage.serviceUsageConsumer`
- `roles/storage.objectAdmin`

Tiene 2 llaves administradas por usuario sin expiracion practica (`validBeforeTime=9999-12-31`).

## Firebase

Firebase esta habilitado en el proyecto.

| Campo | Valor |
| --- | --- |
| Firebase project | `scribe-mundial` |
| Project number | `217777176978` |
| Hosting site | `scribe-mundial` |
| Default URL | `https://scribe-mundial.web.app` |
| Firebase apps | Ninguna observada |

Cloud Functions API esta deshabilitada, por lo que no hay Cloud Functions accesibles por `gcloud functions list`.

## Secret Manager

Secretos observados por nombre:

- `VITE_API_URL`
- `admin-emails`
- `database-url`
- `gcs-bucket`
- `gcs-client-email`
- `gcs-private-key`
- `jwt-secret`
- `recaptcha-secret-key`
- `smtp-pass`
- `smtp-user`

Todos usan replicacion automatica.

No se leyeron valores de secretos.

## IAM

### Usuarios owner

- `user:agsitconsultoria@gmail.com`
- `user:agsitsistemas@gmail.com`

### Service accounts principales

| Service account | Descripcion | Observacion |
| --- | --- | --- |
| `217777176978-compute@developer.gserviceaccount.com` | Compute Engine default service account | Usado por VMs y Cloud Run |
| `github-action-1110234709@scribe-mundial.iam.gserviceaccount.com` | GitHub Actions repo `agsitdesarrollo/Scribe-Compra-Juega-y-Gana` | Tiene roles de deploy y llaves user-managed |
| `sa-storage-scribe@scribe-mundial.iam.gserviceaccount.com` | Almacenamiento de tickets | Tiene `roles/storage.objectAdmin` y una llave user-managed |
| `firebase-adminsdk-fbsvc@scribe-mundial.iam.gserviceaccount.com` | Firebase Admin SDK | Service agent Firebase |

### Permisos amplios relevantes

- `217777176978-compute@developer.gserviceaccount.com`
  - `roles/editor`
  - `roles/cloudsql.client`
  - `roles/secretmanager.secretAccessor`
- `217777176978@cloudservices.gserviceaccount.com`
  - `roles/editor`
- `217777176978@cloudbuild.gserviceaccount.com`
  - `roles/cloudbuild.builds.builder`
  - `roles/artifactregistry.writer`
  - `roles/secretmanager.secretAccessor`
- `github-action-1110234709@scribe-mundial.iam.gserviceaccount.com`
  - permisos de Firebase Hosting, Firebase Auth, Storage Object Admin, Run Viewer y Service Usage.
- `sa-storage-scribe@scribe-mundial.iam.gserviceaccount.com`
  - `roles/storage.objectAdmin`

### Llaves de service account

Llaves user-managed observadas:

- `github-action-1110234709@scribe-mundial.iam.gserviceaccount.com`: 2 llaves user-managed.
- `sa-storage-scribe@scribe-mundial.iam.gserviceaccount.com`: 1 llave user-managed.

Las llaves user-managed observadas no tienen expiracion practica (`9999-12-31`). Se recomienda migrar a Workload Identity Federation para GitHub Actions y rotar/eliminar llaves descargadas si ya no son necesarias.

## API Keys

API key observada:

| Campo | Valor |
| --- | --- |
| Display name | `Browser key (auto created by Firebase)` |
| UID | `f140693d-2718-4c19-9c74-2737acfc1519` |
| Restricciones por API | Si, varias APIs Firebase/GCP |
| Restricciones HTTP referrer | No se observaron reglas especificas |

La key tiene restricciones de API targets, pero `browserKeyRestrictions` aparece vacio. Conviene limitarla por dominios/referrers esperados.

## Monitoring, Logging y OS Config

### Uptime check

| Campo | Valor |
| --- | --- |
| Nombre | `Monitorio pagina principal` |
| Host | `promo.scribeeljuego.com.mx` |
| Path | `/` |
| Puerto | 443 |
| SSL | true |
| Validar SSL | true |
| Periodo | 60s |
| Timeout | 10s |
| Codigos aceptados | Clase 2xx |
| Log failures | true |

### Logging sinks

Sinks default:

- `_Required`
- `_Default`

No se observaron sinks custom adicionales.

### OS Config

Existe OS Policy Assignment generado para Ops Agent:

- `goog-ops-agent-v2-x86-template-1-4-0-us-central1-a`

Tambien se observo reporte para VM en `us-central1-c`.

## Servicios sin recursos activos observados

- GKE/Container API: no aparece habilitada.
- Cloud Functions: API deshabilitada.
- App Engine: API habilitada, pero no hay aplicacion.
- Pub/Sub: sin topics ni subscriptions.
- BigQuery: sin datasets.
- Spanner: sin instancias.
- VPN: sin tunnels.
- Cloud Router: sin routers.
- Interconnect: sin interconnects.
- Cloud Build triggers: ninguno observado.

## Hallazgos y riesgos

1. `SENDGRID_API_KEY` esta configurada como variable plana en Cloud Run.
   - Riesgo: exposicion por permisos de lectura de configuracion del servicio.
   - Recomendacion: rotar la clave, crear secreto en Secret Manager y referenciarlo desde Cloud Run.

2. Cloud Run `scribe-backend` es invocable por `allUsers` y tiene ingress `all`.
   - Riesgo: la URL directa de Cloud Run puede ser llamada sin pasar por el Load Balancer y sin las mismas politicas Cloud Armor del backend service.
   - Recomendacion: restringir ingress a Load Balancing si el trafico debe pasar por el LB, o implementar controles equivalentes a nivel aplicacion.

3. Firewall abierto a Internet en puertos sensibles.
   - `22`, `3389`, `3000`, `3008`, ICMP y HTTP/HTTPS estan abiertos desde `0.0.0.0/0`.
   - Recomendacion: restringir por IP, usar IAP TCP forwarding para SSH/RDP, eliminar reglas no usadas y limitar `allow-bot-whatsapp`/`allow-dokploy`.

4. `scribe-vm-production` esta `TERMINATED`, pero Cloud Run apunta a `http://35.188.0.200:3008/v1/messages`.
   - Riesgo: el flujo de WhatsApp puede estar caido si depende de esa VM.
   - Recomendacion: validar si la VM debe estar encendida, migrar el bot a Cloud Run o configurar health checks/alertas.

5. Cloud SQL es zonal (`ZONAL`), no regional HA.
   - Riesgo: indisponibilidad ante falla de zona `us-central1-c`.
   - Recomendacion: evaluar HA regional para produccion si RTO/RPO lo requieren.

6. Service account default de Compute tiene `roles/editor`.
   - Riesgo: privilegios excesivos para VMs y Cloud Run.
   - Recomendacion: crear service accounts dedicadas con permisos minimos por workload.

7. Existen llaves user-managed de service accounts sin expiracion practica.
   - Afecta GitHub Actions y `sa-storage-scribe`.
   - Recomendacion: migrar GitHub Actions a Workload Identity Federation, rotar/eliminar llaves descargadas.

8. Certificados administrados fallidos siguen adjuntos al HTTPS proxy.
   - `scribeeljuego.com` y `scribeeljuego.com.mx` estan en `FAILED_NOT_VISIBLE`.
   - Recomendacion: corregir DNS o retirar certificados/dominios no usados.

9. Backend bucket usa Cloud Armor Edge con allow-all.
   - Riesgo: la politica edge actual no limita ni bloquea trafico.
   - Recomendacion: adjuntar la politica de throttle si esa era la intencion, o definir reglas edge efectivas.

10. Artifact Registry tiene vulnerability scanning deshabilitado.
    - Razon: `containerscanning.googleapis.com` no esta habilitada.
    - Recomendacion: habilitar Container Scanning y revisar imagenes.

11. API key de Firebase sin restricciones HTTP referrer observadas.
    - Recomendacion: restringir por dominios de frontend esperados.

12. Buckets con UBLA deshabilitado.
    - `scribe-mundial_cloudbuild` y `scribe-audit-20260302-25800`.
    - Recomendacion: habilitar Uniform Bucket-Level Access si no se requieren ACLs legacy.

13. Muchas APIs habilitadas sin recursos observados.
    - Recomendacion: revisar y deshabilitar APIs no usadas para reducir superficie.

## Limitaciones

- No se inspecciono contenido de buckets ni bases de datos.
- No se leyeron valores de Secret Manager.
- No se accedio a consolas web ni a Chrome porque el SDK fue suficiente.
- Firebase Hosting se consulto con `firebase-tools`; `gcloud firebase hosting` no esta disponible en esta instalacion de gcloud.
- Algunos comandos de `gcloud` devuelven certificados/metadatos completos; este reporte los resume y omite material sensible.
