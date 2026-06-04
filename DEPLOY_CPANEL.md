# Despliegue en cPanel: reemplazar WordPress por Astro

Esta guia aplica a este proyecto `astro-web-agsit`. El sitio compila como estatico, por lo que en cPanel no se necesita ejecutar Astro, Node.js ni `pnpm` en produccion si se sube el contenido ya generado de `dist/`.

## Resumen de la estrategia

- Compilar el proyecto localmente con `pnpm build`.
- Respaldar el sitio WordPress actual antes de tocar `public_html`.
- Vaciar o renombrar los archivos de WordPress del document root del dominio.
- Subir a cPanel el contenido interno de `dist/`, no la carpeta `dist` completa.
- Verificar rutas, assets, HTTPS, SEO y redirecciones desde URLs antiguas de WordPress.

## Datos especificos de este proyecto

- Framework: Astro 6.
- Tipo de salida: estatica.
- Gestor de paquetes: `pnpm@11.1.1`.
- Node requerido para compilar: `>=22.12.0`.
- Carpeta de salida: `dist/`.
- Dominio configurado en metadata: `https://agsit.com.mx/`.
- Rutas generadas actualmente:
  - `/`
  - `/es/`
  - `/en/`
  - `/soluciones-tecnologicas/`
  - `/administracion-de-procesos/`
  - `/direccion-de-proyectos/`
  - `/gestion-de-calidad/`
  - `/administracion-crm/`
  - `/en/technology-solutions/`
  - `/en/process-management/`
  - `/en/project-management/`
  - `/en/quality-management/`
  - `/en/crm-administration/`

## 1. Preparar el build local

Desde la raiz del proyecto:

```sh
pnpm install
pnpm build
```

El resultado debe quedar en:

```text
dist/
```

En la verificacion hecha para este repo, `pnpm build` termino correctamente y Astro genero el sitio estatico en `dist/`.

Para revisar el build antes de subirlo:

```sh
pnpm preview
```

Luego abre la URL local que indique Astro y revisa al menos:

- Home en espanol.
- Home en ingles: `/en/`.
- Paginas de servicios.
- Videos, imagenes, fuentes y animaciones.
- Menu movil y botones de contacto.

## 2. Crear un ZIP para subir a cPanel

El ZIP debe contener los archivos que estan dentro de `dist/`, no una carpeta `dist` anidada.

En PowerShell, desde la raiz del proyecto:

```powershell
Compress-Archive -Path .\dist\* -DestinationPath .\agsit-astro-dist.zip -Force
```

Al extraerlo en cPanel, `index.html` debe quedar directamente en el document root, por ejemplo:

```text
public_html/index.html
public_html/_astro/
public_html/assets/
public_html/en/
```

No debe quedar asi:

```text
public_html/dist/index.html
```

## 3. Encontrar el document root correcto en cPanel

En cPanel:

1. Entra a **Domains**.
2. Busca el dominio que se va a reemplazar, por ejemplo `agsit.com.mx`.
3. Abre el enlace de **Document Root**.
4. cPanel abrira File Manager en la carpeta correcta.

En muchos hostings sera `public_html`, pero no lo asumas si el dominio es adicional, subdominio o tiene una raiz personalizada.

## 4. Respaldar WordPress antes de reemplazarlo

Antes de borrar o mover WordPress, haz respaldo de archivos y base de datos.

### Archivos

En cPanel File Manager:

1. Abre la carpeta del document root.
2. Comprime la carpeta actual del sitio o todo su contenido.
3. Descarga el archivo `.zip` o `.tar.gz`.

Tambien puedes renombrar la carpeta o los archivos actuales temporalmente, por ejemplo:

```text
public_html_wp_backup_2026-06-01
```

Si el dominio principal usa directamente `public_html`, normalmente conviene descargar un backup y luego mover los archivos de WordPress a una carpeta fuera del document root, por ejemplo:

```text
/home/USUARIO/backups/wp-before-astro/
```

### Base de datos

WordPress usa MySQL/MariaDB. Aunque Astro no necesita esa base de datos para servir este sitio estatico, conserva el respaldo por seguridad.

En cPanel:

1. Abre **Backup** o **Backup Wizard**.
2. Descarga la base de datos usada por WordPress.
3. Guarda tambien `wp-config.php`, porque ahi esta el nombre exacto de la base de datos.

## 5. Limpiar la instalacion de WordPress

En el document root del dominio, WordPress suele tener archivos y carpetas como:

```text
wp-admin/
wp-content/
wp-includes/
index.php
wp-config.php
.htaccess
xmlrpc.php
```

Para reemplazar WordPress por Astro:

1. Confirma que el backup ya existe y se puede descargar.
2. Elimina o mueve fuera del document root los archivos de WordPress.
3. Revisa archivos ocultos, especialmente `.htaccess`.
4. No dejes `index.php` de WordPress junto al nuevo `index.html`.

Nota: si queda un `.htaccess` viejo con reglas de WordPress, puede romper rutas o redirecciones. Guardalo en el backup y deja solo las reglas que realmente necesites para Astro.

## 6. Subir el sitio Astro a cPanel

En File Manager:

1. Entra al document root correcto.
2. Usa **Upload** para subir `agsit-astro-dist.zip`.
3. Selecciona el ZIP y usa **Extract**.
4. Verifica que `index.html` quedo en la raiz del document root.
5. Elimina el ZIP del servidor cuando ya no sea necesario.

Tambien puedes subir por FTP/SFTP el contenido completo de `dist/` al document root.

## 7. Crear o revisar `.htaccess`

Astro genero HTML estatico por carpeta, por ejemplo:

```text
soluciones-tecnologicas/index.html
en/technology-solutions/index.html
```

Apache normalmente sirve esas rutas sin reglas especiales. Aun asi, puedes usar un `.htaccess` minimo para HTTPS y redirecciones limpias.

Ejemplo base:

```apache
DirectoryIndex index.html

RewriteEngine On

# Forzar HTTPS si el hosting no lo hace desde cPanel.
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Redirigir /es a / si se quiere evitar duplicado de idioma por defecto.
RewriteRule ^es/?$ / [R=301,L]

# Pagina 404 estatica, solo si se crea dist/404.html.
# ErrorDocument 404 /404.html
```

Importante: no copies reglas antiguas de WordPress como `index.php` si ya no se va a usar WordPress.

## 8. Redirecciones desde WordPress

Antes de publicar, haz un inventario de URLs antiguas:

- Sitemap anterior de WordPress, por ejemplo `/sitemap.xml`.
- URLs indexadas en Google Search Console.
- Menus o enlaces compartidos.
- Entradas, paginas o servicios que tenian slugs distintos.

Si una URL antigua cambio, crea una redireccion 301 en `.htaccess`.

Ejemplo:

```apache
Redirect 301 /old-wordpress-page/ /soluciones-tecnologicas/
Redirect 301 /servicios/administracion-de-procesos/ /administracion-de-procesos/
```

Si no se mapean las URLs antiguas, Google y los usuarios pueden encontrar errores 404 aunque el nuevo Astro este funcionando.

## 9. DNS, SSL y cache

Si el dominio ya apunta al mismo hosting cPanel, normalmente no hay que cambiar DNS. Solo se reemplazan los archivos del document root.

Revisa en cPanel:

- **SSL/TLS Status** o **AutoSSL**: certificado activo para dominio y `www`.
- Redireccion `http -> https`.
- Redireccion entre `www` y no `www`, segun la version canonica que se quiera usar.
- Cache del hosting, LiteSpeed, Cloudflare u otro CDN si existe.

La metadata actual usa como canonica:

```text
https://agsit.com.mx/
```

Si se decide usar `www`, tambien hay que ajustar la metadata del proyecto.

## 10. Verificacion posterior al despliegue

Despues de subir:

1. Abre `https://agsit.com.mx/`.
2. Revisa las rutas principales en espanol e ingles.
3. Comprueba que no carga WordPress ni aparece una pagina de instalacion.
4. Revisa DevTools > Network para confirmar que no hay 404 en:
   - `/_astro/...`
   - `/assets/...`
   - `/fonts/...`
   - videos `.mp4` y `.webm`
5. Prueba en movil.
6. Ejecuta un rastreo basico con Screaming Frog, Ahrefs, Semrush, Sitebulb o similar si se quiere cuidar SEO.
7. En Google Search Console, solicita reindexacion de las URLs principales y revisa errores 404.

## 11. Actualizaciones futuras

Cada vez que se cambie el sitio:

```sh
pnpm build
Compress-Archive -Path .\dist\* -DestinationPath .\agsit-astro-dist.zip -Force
```

Luego sube y extrae el ZIP en el document root, reemplazando los archivos anteriores.

Para evitar archivos obsoletos, lo mas limpio es borrar el contenido anterior del sitio Astro antes de extraer el nuevo build, conservando solamente archivos manuales necesarios como `.htaccess` si aplica.

## 12. Opcion avanzada: compilar dentro de cPanel

No es la opcion recomendada para este proyecto si el hosting solo sirve archivos estaticos. Pero se puede considerar si cPanel tiene Terminal, Git y una version compatible de Node.js.

Requisitos:

- Node.js `>=22.12.0`.
- `pnpm` compatible.
- Acceso SSH o Terminal.
- Permiso para ejecutar builds.

Flujo:

```sh
corepack enable
pnpm install
pnpm build
```

Despues se publica el contenido de `dist/` en el document root. Si cPanel solo ofrece Node 18 o Node 20, compila localmente y sube `dist/`.

## Fuentes consultadas

- Astro Docs: Deploy your Astro Site, build local y salida `dist/`: https://docs.astro.build/en/guides/deploy/
- cPanel Docs: File Manager, document root, subir y extraer archivos: https://docs.cpanel.net/cpanel/files/file-manager/
- cPanel Support: encontrar el document root de un dominio: https://support.cpanel.net/hc/en-us/articles/1500004206502-How-to-find-the-document-root-of-a-domain
- cPanel Support: generar respaldo de archivos y base de datos del sitio: https://support.cpanel.net/hc/en-us/articles/1500007913442-How-to-generate-a-site-backup-inside-of-cPanel
- cPanel Docs: Node.js Application, solo relevante si se quisiera ejecutar/compilar en servidor: https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node.js-application/
