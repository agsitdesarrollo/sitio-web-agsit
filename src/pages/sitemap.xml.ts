import type { APIRoute } from 'astro';

export const prerender = true;

const origin = 'https://agsit.com.mx';

const routes = [
  '/',
  '/en/',
  '/soluciones-tecnologicas/',
  '/soluciones-tecnologicas/plataforma-empresarial-inteligente/',
  '/soluciones-tecnologicas/innovacion-tecnologica/',
  '/soluciones-tecnologicas/infraestructura-y-nube/',
  '/soluciones-tecnologicas/gestion-gobierno-ti/',
  '/soluciones-tecnologicas/desarrollo-de-software/',
  '/soluciones-tecnologicas/datos-e-inteligencia-empresarial/',
  '/soluciones-tecnologicas/automatizacion-y-optimizacion/',
  '/planeacion-estrategica/',
  '/direccion-de-proyectos/',
  '/administracion-de-procesos/',
  '/gestion-de-calidad/',
  '/marketing-digital/',
  '/marketing-digital/estrategia-digital/',
  '/en/technology-solutions/',
  '/en/technology-solutions/intelligent-enterprise-platform/',
  '/en/technology-solutions/technological-innovation/',
  '/en/technology-solutions/infrastructure-and-cloud/',
  '/en/technology-solutions/it-management-governance/',
  '/en/technology-solutions/software-development/',
  '/en/technology-solutions/data-and-business-intelligence/',
  '/en/technology-solutions/automation-and-optimization/',
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
