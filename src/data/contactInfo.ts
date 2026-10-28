// Para definir un mensaje final, agrega la ruta completa (con slash final) y su texto
// en whatsappMessagesByRoute.es o .en. Las rutas sin texto usan el mensaje general.
import type { SupportedLang } from '../i18n/ui';

export const contactInfo = {
  phone: {
    display: '+52 55 8897 3951',
    international: '+525588973951',
    whatsapp: '525588973951',
  },
  email: {
    display: 'contacto@agsit.com.mx',
    destination: 'clientes@agsit.com.mx',
  },
  address: {
    es: '229 Av. Patriotismo P8, San Pedro de los Pinos, Benito Juárez, 03800, CDMX, México.',
    en: '229 Av. Patriotismo P8, San Pedro de los Pinos, Benito Juárez, 03800, Mexico City, Mexico.',
  },
  wazeUrl: 'https://www.waze.com/es/live-map/directions?navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location&to=ll.19.39599069%2C-99.18057919',
} as const;

export const pageNamesByRoute: Record<SupportedLang, Record<string, string>> = {
  es: {
    '/': 'Inicio',
    '/soluciones-tecnologicas/': 'Soluciones Tecnológicas',
    '/marketing-digital/': 'Marketing Digital',
    '/administracion-de-procesos/': 'Administración de Procesos',
    '/direccion-de-proyectos/': 'Dirección de Proyectos',
    '/planeacion-estrategica/': 'Planeación Estratégica',
    '/gestion-de-calidad/': 'Gestión de Calidad',
    '/soluciones-tecnologicas/plataforma-empresarial-inteligente/': 'Plataforma Empresarial Inteligente',
    '/soluciones-tecnologicas/inteligencia-artificial/': 'Soluciones de Inteligencia Artificial',
    '/soluciones-tecnologicas/infraestructura-cloud-y-servicios-ti/': 'Infraestructura Cloud y Servicios TI',
    '/soluciones-tecnologicas/consultoria-y-transformacion-tecnologica/': 'Consultoría y Transformación Tecnológica',
    '/soluciones-tecnologicas/desarrollo-de-software/': 'Desarrollo de Software a la Medida',
    '/soluciones-tecnologicas/ingenieria-de-datos-y-analitica-estrategica/': 'Ingeniería de Datos y Analítica Estratégica',
    '/soluciones-tecnologicas/automatizacion-inteligente-de-procesos/': 'Automatización Inteligente de Procesos',
    '/marketing-digital/growth-marketing-y-estrategia-digital/': 'Growth Marketing y Estrategia Digital',
    '/marketing-digital/posicionamiento-organico-seo/': 'Posicionamiento Orgánico (SEO)',
    '/marketing-digital/publicidad-digital/': 'Publicidad Digital (Google Ads y Social Ads)',
    '/marketing-digital/content-marketing-social-media/': 'Content Marketing y Social Media',
    '/marketing-digital/estrategia-ecommerce/': 'Diseño y Estrategia de E-commerce',
    '/marketing-digital/analytics-cro/': 'Analytics y CRO',
    '/administracion-de-procesos/modelado-y-optimizacion-de-procesos/': 'Modelado y Optimización de Procesos',
    '/administracion-de-procesos/automatizacion-inteligente-de-procesos/': 'Automatización Inteligente de Procesos',
    '/administracion-de-procesos/inteligencia-y-gobierno-de-procesos/': 'Inteligencia y Gobierno de Procesos',
    '/administracion-de-procesos/excelencia-operativa/': 'Excelencia Operativa',
    '/administracion-de-procesos/diagnostico-y-auditoria-de-procesos/': 'Diagnóstico y Auditoría de Procesos',
    '/direccion-de-proyectos/pmo-project-governance/': 'PMO y Gobierno de Proyectos',
    '/planeacion-estrategica/planeacion-estrategica-corporativa/': 'Planeación Estratégica Corporativa',
  },
  en: {
    '/en/': 'Home',
    '/en/technology-solutions/': 'Technology Solutions',
    '/en/digital-marketing/': 'Digital Marketing',
    '/en/process-management/': 'Process Management',
    '/en/project-management/': 'Project Management',
    '/en/strategic-planning/': 'Strategic Planning',
    '/en/quality-management/': 'Quality Management',
    '/en/technology-solutions/intelligent-enterprise-platform/': 'Intelligent Enterprise Platform',
    '/en/technology-solutions/artificial-intelligence/': 'Artificial Intelligence Solutions',
    '/en/technology-solutions/cloud-infrastructure-and-it-services/': 'Cloud Infrastructure and IT Services',
    '/en/technology-solutions/technology-consulting-and-transformation/': 'Technology Consulting and Transformation',
    '/en/technology-solutions/software-development/': 'Custom Software Development',
    '/en/technology-solutions/data-engineering-and-strategic-analytics/': 'Data Engineering and Strategic Analytics',
    '/en/technology-solutions/intelligent-process-automation/': 'Intelligent Process Automation',
    '/en/digital-marketing/growth-marketing-and-digital-strategy/': 'Growth Marketing and Digital Strategy',
    '/en/digital-marketing/organic-search-positioning-seo/': 'Organic Search Positioning (SEO)',
    '/en/digital-marketing/digital-advertising/': 'Digital Advertising (Google Ads and Social Ads)',
    '/en/digital-marketing/content-marketing-social-media/': 'Content Marketing and Social Media',
    '/en/digital-marketing/ecommerce-strategy/': 'E-commerce Design and Strategy',
    '/en/digital-marketing/analytics-cro/': 'Analytics and CRO',
    '/en/process-management/process-modeling-and-optimization/': 'Process Modeling and Optimization',
    '/en/process-management/intelligent-process-automation/': 'Intelligent Process Automation',
    '/en/process-management/process-intelligence-and-governance/': 'Process Intelligence and Governance',
    '/en/process-management/operational-excellence/': 'Operational Excellence',
    '/en/process-management/process-diagnosis-and-audit/': 'Process Diagnosis and Audit',
    '/en/project-management/pmo-project-governance/': 'PMO & Project Governance',
    '/en/strategic-planning/corporate-strategic-planning/': 'Corporate Strategic Planning',
  },
};

export const whatsappMessagesByRoute: Record<SupportedLang, Record<string, string>> = {
  es: {},
  en: {},
};

function normalizePath(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0];
  return `/${path.split('/').filter(Boolean).join('/')}/`.replace(/^\/\/$/, '/');
}

function getNameFromSlug(path: string) {
  const slug = path.split('/').filter(Boolean).at(-1) ?? '';
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Una secuencia de escape inválida no debe impedir mostrar el contacto.
  }
  const name = decoded.replace(/-/g, ' ').replace(/\b(seo|cro|pmo|ti|it|crm|bpm|ai|ia)\b/gi, (word) => word.toUpperCase());
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function getContactInfoForPath(pathname: string) {
  const path = normalizePath(pathname);
  const lang: SupportedLang = path.startsWith('/en/') ? 'en' : 'es';
  const pageName = pageNamesByRoute[lang][path] ?? getNameFromSlug(path);
  const isHome = path === '/' || path === '/en/';
  const generalMessage = lang === 'es'
    ? isHome
      ? 'Hola, estoy viendo la página principal del sitio de AGSIT y me gustaría recibir más información.'
      : `Hola, estoy viendo la página de ${pageName} en el sitio de AGSIT y me gustaría recibir más información.`
    : isHome
      ? "Hi, I'm viewing the homepage on the AGSIT website and would like more information."
      : `Hi, I'm viewing the ${pageName} page on the AGSIT website and would like more information.`;
  const message = whatsappMessagesByRoute[lang][path]?.trim() || generalMessage;

  return {
    ...contactInfo,
    lang,
    pageName,
    address: contactInfo.address[lang],
    emailHref: `mailto:${contactInfo.email.destination}`,
    phoneHref: `tel:${contactInfo.phone.international}`,
    message,
    whatsappHref: `https://wa.me/${contactInfo.phone.whatsapp}?text=${encodeURIComponent(message)}`,
  };
}
