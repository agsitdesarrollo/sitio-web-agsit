# Cuadrícula de servicios para un futuro blog

La composición y los textos extensos originales de Growth se conservan en una familia independiente. No importa componentes, estilos, controladores ni tipos de `marketing-story`.

## Vista previa solo en desarrollo

Ejecutar `pnpm dev --host 127.0.0.1 --port 4333` desde este proyecto, usando otro puerto libre si está ocupado. No detener servidores existentes.

- Español: <http://127.0.0.1:4333/vista-previa/servicios-blog/es/>
- Inglés: <http://127.0.0.1:4333/vista-previa/servicios-blog/en/>

La ruta `src/pages/vista-previa/servicios-blog/[lang].astro` declara `prerender = true`. `getStaticPaths()` devuelve las dos variantes únicamente cuando `import.meta.env.DEV` es verdadero y un arreglo vacío en producción. No usa carpetas con guion bajo porque Astro las excluye del enrutamiento.

Las páginas incluyen `robots: noindex, nofollow` y no aparecen en la lista explícita de `src/pages/sitemap.xml.ts`. La exclusión de producción depende del arreglo vacío, no de la etiqueta robots.

Astro 6.4.8 interpreta el segmento final `/es/` como un prefijo del idioma predeterminado y puede devolver el documento renderizado con HTTP 404. La ruta de desarrollo establece `X-Astro-Reroute: no`, que su middleware reconoce para conservar la respuesta original. Este ajuste es local a la vista previa y debe verificarse al actualizar Astro; no cambia el enrutamiento público ni la configuración global de idiomas.

Después de `pnpm build`, comprobar que `dist/client/vista-previa/servicios-blog/` no existe, que no hay HTML de esta vista en la salida y que ambas URLs responden 404 al servir el build. Los recursos compartidos de la cuadrícula pueden estar presentes mientras la página pública de Growth todavía la use.

## Archivos y uso posterior

- Componente: `src/components/blog/service-explorer/ServiceExplorer.astro`.
- Estilos independientes con prefijo `bse-`: `src/components/blog/service-explorer/service-explorer.css`, importados por el componente.
- Datos ES/EN: `src/data/blog/growthServiceExplorer.ts`, función `getGrowthServiceExplorer(lang)`.
- Tipos: `src/types/blogServiceExplorer.types.ts`.
- Documento de demostración: `ServiceExplorerPreview.astro`, junto al componente.

Para un artículo futuro, importar el componente y los datos desde esos archivos, cargar las fuentes locales Inter y Cormorant Garamond en el documento y renderizar:

```astro
<ServiceExplorer
  content={getGrowthServiceExplorer('es')}
  id="servicios-del-articulo"
  ctaHref="/marketing-digital/growth-marketing-y-estrategia-digital/#contacto"
/>
```

`id` debe ser único en el documento; por defecto es `blog-services`. `ctaHref` es obligatorio para definir el destino del enlace. La variante inglesa debe usar su URL traducida.

El componente se lee completo sin JavaScript, sin alturas fijadas y sin animaciones. Las imágenes existentes en `/assets/estrategia-digital/` se cargan de forma diferida. En escritorio conserva la composición de seis columnas, en tablet dos y en teléfono una.

Los parámetros opcionales `useDrawer` y `reveal` se reservan para integraciones que ya proporcionen, respectivamente, el manejador compartido `data-contact-trigger` y un controlador para `data-reveal`. Ambos están desactivados por defecto; no hay dependencia de esos controladores dentro de la familia del blog.

## Integración temporal durante el rediseño

El commit de extracción conserva la cuadrícula en Growth mediante una importación desde blog para verificar que el refactor mantiene la composición y el botón existentes. Su retirada del montaje público corresponde al siguiente commit, que sustituye el recorrido y elimina las secciones descartadas. El blog no depende de Growth; esta importación temporal tiene la dirección inversa.

No copiar aquí el video ni el póster de `public/_demo-local/`. Esos recursos siguen fuera de git y no forman parte de esta familia.
