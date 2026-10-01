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
  '/direccion-de-proyectos/pmo-project-governance/',
  '/administracion-de-procesos/',
  '/administracion-de-procesos/modelado-y-optimizacion-de-procesos/',
  '/administracion-de-procesos/automatizacion-inteligente-de-procesos/',
  '/administracion-de-procesos/inteligencia-y-gobierno-de-procesos/',
  '/administracion-de-procesos/excelencia-operativa/',
  '/administracion-de-procesos/diagnostico-y-auditoria-de-procesos/',
  '/gestion-de-calidad/',
  '/marketing-digital/',
  '/marketing-digital/growth-marketing-y-estrategia-digital/',
  '/marketing-digital/posicionamiento-organico-seo/',
  '/marketing-digital/publicidad-digital/',
  '/marketing-digital/content-marketing-social-media/',
  '/marketing-digital/estrategia-ecommerce/',
  '/marketing-digital/analytics-cro/',
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
  '/en/project-management/pmo-project-governance/',
  '/en/process-management/',
  '/en/process-management/process-modeling-and-optimization/',
  '/en/process-management/intelligent-process-automation/',
  '/en/process-management/process-intelligence-and-governance/',
  '/en/process-management/operational-excellence/',
  '/en/process-management/process-diagnosis-and-audit/',
  '/en/quality-management/',
  '/en/digital-marketing/',
  '/en/digital-marketing/growth-marketing-and-digital-strategy/',
  '/en/digital-marketing/organic-search-positioning-seo/',
  '/en/digital-marketing/digital-advertising/',
  '/en/digital-marketing/content-marketing-social-media/',
  '/en/digital-marketing/ecommerce-strategy/',
  '/en/digital-marketing/analytics-cro/',
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
