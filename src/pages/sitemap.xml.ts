import type { APIRoute } from 'astro';

export const prerender = true;

const origin = 'https://agsit.com.mx';

const routes = [
  '/',
  '/en/',
  '/soluciones-tecnologicas/',
  '/soluciones-tecnologicas/plataforma-empresarial-inteligente/',
  '/soluciones-tecnologicas/inteligencia-artificial/',
  '/soluciones-tecnologicas/infraestructura-cloud-y-servicios-ti/',
  '/soluciones-tecnologicas/consultoria-y-transformacion-tecnologica/',
  '/soluciones-tecnologicas/desarrollo-de-software/',
  '/soluciones-tecnologicas/ingenieria-de-datos-y-analitica-estrategica/',
  '/soluciones-tecnologicas/automatizacion-inteligente-de-procesos/',
  '/planeacion-estrategica/',
  '/direccion-de-proyectos/',
  '/administracion-de-procesos/',
  '/gestion-de-calidad/',
  '/marketing-digital/',
  '/marketing-digital/estrategia-digital/',
  '/en/technology-solutions/',
  '/en/technology-solutions/intelligent-enterprise-platform/',
  '/en/technology-solutions/artificial-intelligence/',
  '/en/technology-solutions/cloud-infrastructure-and-it-services/',
  '/en/technology-solutions/technology-consulting-and-transformation/',
  '/en/technology-solutions/software-development/',
  '/en/technology-solutions/data-engineering-and-strategic-analytics/',
  '/en/technology-solutions/intelligent-process-automation/',
  '/en/strategic-planning/',
  '/en/project-management/',
  '/en/process-management/',
  '/en/quality-management/',
  '/en/digital-marketing/',
  '/en/digital-marketing/digital-strategy/',
];

export const GET: APIRoute = () => {
  const urls = routes.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
