# AGSIT Astro Landing

Landing page Astro para AGSIT, migrada desde la version React/Vite. La prioridad del proyecto es mantener la experiencia visual y las animaciones de scroll 1:1, reduciendo la hidratacion al minimo y usando una ruta server-side para el formulario de contacto.

## Stack

- Astro 6 con adapter condicional: Netlify en Netlify y Node standalone fuera de Netlify.
- React solo para islas interactivas.
- Tailwind CSS 4 importado desde `src/styles/global.css`.
- GSAP + ScrollTrigger para las animaciones de scroll.
- `@gsap/react` para inicializacion y cleanup del controlador GSAP.
- Matter.js para el canvas fisico de logos.
- pnpm como gestor de paquetes.

## Estructura

```text
/
|-- public/
|   `-- assets/              # Videos y archivos servidos sin procesar por Astro
|-- src/
|   |-- animations/          # Helpers GSAP especializados
|   |-- assets/
|   |   `-- images/          # Imagenes locales usadas con astro:assets / <Image />
|   |-- components/
|   |   |-- about/           # Seccion horizontal y canvas Matter.js
|   |   |-- contact/         # Formulario y tarjeta de contacto reutilizables
|   |   |-- final-contact/   # Bloque final de contacto
|   |   |-- footer/          # Footer estatico
|   |   |-- hero/            # Hero, video de fondo y titulo animado
|   |   |-- interactivity/   # Isla React para menu movil y drawer de contacto
|   |   |-- navigation/      # Header estatico
|   |   |-- scroll/          # Isla React que registra GSAP/ScrollTrigger
|   |   |-- seo/             # Metadata SEO del layout
|   |   |-- services/        # Seccion de servicios
|   |   `-- video-story/     # Transicion a video corporativo
|   |-- data/                # Copy, servicios, logos y metadata centralizados
|   |-- layouts/             # Layout HTML principal
|   |-- pages/               # Rutas Astro
|   |-- styles/              # Entrada global de Tailwind y CSS modular
|   `-- types/               # Declaraciones locales
`-- package.json
```

## Arquitectura de hidratacion y contacto

La pagina principal vive en `src/pages/[...lang]/index.astro` y renderiza HTML prerenderizado para SEO. Las piezas interactivas principales son:

- `PageShellScripts`: controla menu movil, eventos `data-contact-trigger` y drawer de contacto.
- `contactFormSubmit`: envia los formularios a `/api/contact`.
- `ScrollExperienceController`: registra GSAP, ScrollTrigger y las timelines sobre clases `js-*`.

El endpoint `src/pages/api/contact.ts` lee `BITRIX_WEBHOOK_URL` desde variables de entorno y llama `crm.lead.add` en Bitrix. Como fallback temporal tambien acepta `BITRIX`.

## Despliegue

El proyecto selecciona adapter segun el entorno:

- En Netlify, `NETLIFY=true` activa `@astrojs/netlify` automaticamente.
- En cPanel con Node, Google Cloud Run, Compute Engine u otro runtime Node, usa `@astrojs/node` por defecto.
- Para forzar Netlify fuera de Netlify, usa `ASTRO_ADAPTER=netlify`.
- Para el formulario, configura `BITRIX_WEBHOOK_URL=https://<DOMINIO>/rest/1/<TOKEN>` en variables de entorno del proveedor. No uses prefijo `PUBLIC_`.

Si el sitio se sube como HTML estatico puro a `public_html`, las paginas cargan, pero `/api/contact` no existe y el formulario no puede crear prospectos.

Las clases `js-*` son parte del contrato de animacion. No renombrarlas sin actualizar `src/components/scroll/ScrollExperienceController.tsx`.

## Eventos DOM

- `agsit:open-contact`: abre el drawer de contacto.
- `agsit:close-contact`: cierra el drawer de contacto.
- `agsit-clients-drop`: evento interno usado por GSAP para impulsar el canvas Matter.js.

Los botones que deben abrir contacto usan `data-contact-trigger`.

## Comandos

```sh
pnpm install
pnpm dev
pnpm build
pnpm start # solo para el build Node standalone
pnpm preview
```

## Notas de mantenimiento

- Las imagenes estaticas optimizables viven en `src/assets/images` y se importan con `astro:assets`.
- Los videos y archivos que deben conservar su URL directa viven en `public/assets`; las rutas se consumen como `/assets/nombre.ext`.
- Los logos de clientes siguen apuntando a URLs remotas de `agsit.com.mx`.
- El formulario crea prospectos en Bitrix mediante `/api/contact`; no expongas el webhook como variable `PUBLIC_*`.
- La metadata SEO base esta en `src/data/siteMetadata.ts`.
- Tailwind esta disponible, pero los estilos complejos de animacion se mantienen en CSS modular para proteger el comportamiento 1:1.

## ProducciÃ³n: Firebase Hosting + Cloud Run

La producciÃ³n separa contenido estÃ¡tico y ejecuciÃ³n de servidor:

```text
Visitante -> Firebase Hosting (HTML, CSS, JS, imÃ¡genes y video desde CDN)
          -> /api/contact -> Cloud Run us-central1 -> Bitrix24
                                      -> Secret Manager (BITRIX_WEBHOOK_URL)
```

`firebase.json` publica `dist/client` y reescribe exclusivamente `/api/contact` al servicio `agsit-web` de Cloud Run. El contenedor sigue incluyendo la aplicaciÃ³n Astro completa porque Cloud Run necesita atender la ruta API, pero Firebase Hosting absorbe las solicitudes de contenido estÃ¡tico.

### Archivos de infraestructura

- `Dockerfile`: imagen Node 22 para Cloud Run, escuchando en el puerto `8080`.
- `cloudbuild.yaml`: valida el build, genera/publica la imagen, despliega Cloud Run con `min=0`, `max=3`, 512 MiB y publica Firebase Hosting.
- `infra/bootstrap-gcp.ps1`: crea los recursos e IAM iniciales de mÃ­nimo privilegio.
- `infra/artifact-cleanup-policy.json`: elimina imÃ¡genes de Artifact Registry con mÃ¡s de 30 dÃ­as.
- `public/robots.txt` y `src/pages/sitemap.xml.ts`: base de rastreo e Ã­ndice de las rutas actuales.

### PreparaciÃ³n Ãºnica

Necesitas un proyecto de Google Cloud con facturaciÃ³n activa. Cloud Run requiere que el proyecto Firebase use el plan Blaze, que es pago por consumo; no implica una cuota mensual fija.

1. Agrega Firebase al proyecto existente, sin crear otro proyecto:

   ```powershell
   firebase login
   firebase projects:addfirebase TU_PROJECT_ID
   ```

2. Inicializa los recursos de Google Cloud e IAM. El script no lee ni recibe el webhook.

   ```powershell
   .\infra\bootstrap-gcp.ps1 -ProjectId TU_PROJECT_ID
   ```

3. Carga el secreto por entrada estÃ¡ndar para no escribirlo en el repositorio, scripts ni configuraciÃ³n del trigger:

   ```powershell
   gcloud secrets versions add BITRIX_WEBHOOK_URL --project TU_PROJECT_ID --data-file=-
   ```

   Pega el valor, presiona `Enter` y termina la entrada con `Ctrl+Z` seguido de `Enter` en Windows. Cloud Run recibe la versiÃ³n `1` del secreto como `BITRIX_WEBHOOK_URL`; para rotarlo, crea una nueva versiÃ³n, actualiza explícitamente `cloudbuild.yaml` con ese número y despliega de nuevo.

4. En Cloud Build > Triggers, conecta el repositorio GitHub y crea un trigger de **Push to branch** con `^main$`, usando `cloudbuild.yaml`. Conserva la cuenta de servicio predeterminada de Cloud Build que prepara el script.

5. En Firebase Hosting, conecta `agsit.com.mx` y `www.agsit.com.mx`. Conserva el DNS en el proveedor actual y agrega únicamente los registros de verificación y destino que Firebase indique; no modifiques MX, SPF, DKIM ni DMARC.

6. En Billing > Budgets & alerts, crea un presupuesto mensual inicial (por ejemplo USD 10) con alertas al 50 %, 90 % y 100 %. Revisa especialmente la transferencia de videos de Hosting.

### Corte y rollback

Antes de cambiar DNS, prueba el formulario en la URL de Hosting, revisa las respuestas 200/4xx/5xx de `/api/contact`, canonical, hreflang, `robots.txt` y `sitemap.xml`. El único recurso que aún dependía de WordPress (`AGSIT BPM 360.mp4`) ya apunta a `public/assets/videos-servicios/BPM.mp4`; los logos de clientes también son locales.

La redirección conocida `/es -> /` ya está configurada como 301. Las demás redirecciones WordPress deben agregarse a `firebase.json` cuando se disponga del inventario de URLs histórico: no se deben inventar equivalencias porque puede afectar SEO. Mantén el WordPress anterior disponible hasta validar dominio, assets, SEO y formulario en producción; para revertir, restaura únicamente los registros web de `@` y `www` en el proveedor DNS.
