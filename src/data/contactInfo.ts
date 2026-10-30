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
    '/direccion-de-proyectos/pmo-y-gobierno-de-proyectos/': 'PMO y Gobierno de Proyectos',
    '/direccion-de-proyectos/strategic-project-delivery/': 'Strategic Project Delivery',
    '/direccion-de-proyectos/agile-project-delivery/': 'Agile Project Delivery',
    '/direccion-de-proyectos/auditoria-y-recuperacion-de-proyectos/': 'Auditoría y Recuperación de Proyectos',
    '/direccion-de-proyectos/diagnostico-y-madurez-en-gestion-de-proyectos/': 'Diagnóstico y Madurez en Gestión de Proyectos',
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
    '/en/project-management/strategic-project-delivery/': 'Strategic Project Delivery',
    '/en/project-management/agile-project-delivery/': 'Agile Project Delivery',
    '/en/project-management/project-audit-and-recovery/': 'Project Audit and Recovery',
    '/en/project-management/project-management-assessment-and-maturity/': 'Project Management Assessment and Maturity',
    '/en/strategic-planning/corporate-strategic-planning/': 'Corporate Strategic Planning',
  },
};

function createWhatsappMessage(lang: SupportedLang, name?: string) {
  return lang === 'es'
    ? `Estoy en la página web ${name ? `de ${name}` : 'principal'} y estoy interesado en contactar a un consultor especializado de AGSIT para una iniciativa de proyecto que estamos desarrollando.`
    : `I'm on the ${name ? `${name} page` : 'home page'} and I'm interested in contacting a specialized AGSIT consultant for a project initiative we're developing.`;
}

export const whatsappMessagesByRoute: Record<SupportedLang, Record<string, string>> = {
  es: {
    '/': createWhatsappMessage('es'),
    '/soluciones-tecnologicas/': createWhatsappMessage('es', 'soluciones tecnológicas'),
    '/marketing-digital/': createWhatsappMessage('es', 'marketing digital'),
    '/administracion-de-procesos/': createWhatsappMessage('es', 'administración de procesos'),
    '/direccion-de-proyectos/': createWhatsappMessage('es', 'dirección de proyectos'),
    '/planeacion-estrategica/': createWhatsappMessage('es', 'planeación estratégica'),
    '/gestion-de-calidad/': createWhatsappMessage('es', 'gestión de calidad'),
    '/soluciones-tecnologicas/plataforma-empresarial-inteligente/': createWhatsappMessage('es', 'plataforma empresarial inteligente'),
    '/soluciones-tecnologicas/desarrollo-de-software/': createWhatsappMessage('es', 'desarrollo de software'),
    '/soluciones-tecnologicas/automatizacion-inteligente-de-procesos/': createWhatsappMessage('es', 'automatización inteligente de procesos'),
    '/soluciones-tecnologicas/ingenieria-de-datos-y-analitica-estrategica/': createWhatsappMessage('es', 'ingeniería de datos y analítica estratégica'),
    '/soluciones-tecnologicas/inteligencia-artificial/': createWhatsappMessage('es', 'inteligencia artificial'),
    '/soluciones-tecnologicas/consultoria-y-transformacion-tecnologica/': createWhatsappMessage('es', 'consultoría y transformación tecnológica'),
    '/soluciones-tecnologicas/infraestructura-cloud-y-servicios-ti/': createWhatsappMessage('es', 'infraestructura cloud y servicios TI'),
    '/marketing-digital/growth-marketing-y-estrategia-digital/': createWhatsappMessage('es', 'growth marketing y estrategia digital'),
    '/marketing-digital/posicionamiento-organico-seo/': createWhatsappMessage('es', 'posicionamiento orgánico SEO'),
    '/marketing-digital/publicidad-digital/': createWhatsappMessage('es', 'publicidad digital'),
    '/marketing-digital/content-marketing-social-media/': createWhatsappMessage('es', 'content marketing y social media'),
    '/marketing-digital/estrategia-ecommerce/': createWhatsappMessage('es', 'estrategia de e-commerce'),
    '/marketing-digital/analytics-cro/': createWhatsappMessage('es', 'analytics CRO'),
    '/administracion-de-procesos/modelado-y-optimizacion-de-procesos/': createWhatsappMessage('es', 'modelado y optimización de procesos'),
    '/administracion-de-procesos/automatizacion-inteligente-de-procesos/': createWhatsappMessage('es', 'automatización inteligente de procesos'),
    '/administracion-de-procesos/inteligencia-y-gobierno-de-procesos/': createWhatsappMessage('es', 'inteligencia y gobierno de procesos'),
    '/administracion-de-procesos/excelencia-operativa/': createWhatsappMessage('es', 'excelencia operativa'),
    '/administracion-de-procesos/diagnostico-y-auditoria-de-procesos/': createWhatsappMessage('es', 'diagnóstico y auditoría de procesos'),
    '/direccion-de-proyectos/pmo-y-gobierno-de-proyectos/': createWhatsappMessage('es', 'PMO y gobierno de proyectos'),
    '/direccion-de-proyectos/strategic-project-delivery/': createWhatsappMessage('es', 'strategic project delivery'),
    '/direccion-de-proyectos/agile-project-delivery/': createWhatsappMessage('es', 'agile project delivery'),
    '/direccion-de-proyectos/auditoria-y-recuperacion-de-proyectos/': createWhatsappMessage('es', 'auditoría y recuperación de proyectos'),
    '/direccion-de-proyectos/diagnostico-y-madurez-en-gestion-de-proyectos/': createWhatsappMessage('es', 'diagnóstico y madurez en gestión de proyectos'),
    '/planeacion-estrategica/planeacion-estrategica-corporativa/': createWhatsappMessage('es', 'planeación estratégica corporativa'),
  },
  en: {
    '/en/': createWhatsappMessage('en'),
    '/en/technology-solutions/': createWhatsappMessage('en', 'technology solutions'),
    '/en/digital-marketing/': createWhatsappMessage('en', 'digital marketing'),
    '/en/process-management/': createWhatsappMessage('en', 'process management'),
    '/en/project-management/': createWhatsappMessage('en', 'project management'),
    '/en/strategic-planning/': createWhatsappMessage('en', 'strategic planning'),
    '/en/quality-management/': createWhatsappMessage('en', 'quality management'),
    '/en/technology-solutions/intelligent-enterprise-platform/': createWhatsappMessage('en', 'intelligent enterprise platform'),
    '/en/technology-solutions/software-development/': createWhatsappMessage('en', 'software development'),
    '/en/technology-solutions/intelligent-process-automation/': createWhatsappMessage('en', 'intelligent process automation'),
    '/en/technology-solutions/data-engineering-and-strategic-analytics/': createWhatsappMessage('en', 'data engineering and strategic analytics'),
    '/en/technology-solutions/artificial-intelligence/': createWhatsappMessage('en', 'artificial intelligence'),
    '/en/technology-solutions/technology-consulting-and-transformation/': createWhatsappMessage('en', 'technology consulting and transformation'),
    '/en/technology-solutions/cloud-infrastructure-and-it-services/': createWhatsappMessage('en', 'cloud infrastructure and IT services'),
    '/en/digital-marketing/growth-marketing-and-digital-strategy/': createWhatsappMessage('en', 'growth marketing and digital strategy'),
    '/en/digital-marketing/organic-search-positioning-seo/': createWhatsappMessage('en', 'organic search positioning SEO'),
    '/en/digital-marketing/digital-advertising/': createWhatsappMessage('en', 'digital advertising'),
    '/en/digital-marketing/content-marketing-social-media/': createWhatsappMessage('en', 'content marketing and social media'),
    '/en/digital-marketing/ecommerce-strategy/': createWhatsappMessage('en', 'e-commerce strategy'),
    '/en/digital-marketing/analytics-cro/': createWhatsappMessage('en', 'analytics CRO'),
    '/en/process-management/process-modeling-and-optimization/': createWhatsappMessage('en', 'process modeling and optimization'),
    '/en/process-management/intelligent-process-automation/': createWhatsappMessage('en', 'intelligent process automation'),
    '/en/process-management/process-intelligence-and-governance/': createWhatsappMessage('en', 'process intelligence and governance'),
    '/en/process-management/operational-excellence/': createWhatsappMessage('en', 'operational excellence'),
    '/en/process-management/process-diagnosis-and-audit/': createWhatsappMessage('en', 'process diagnosis and audit'),
    '/en/project-management/pmo-project-governance/': createWhatsappMessage('en', 'PMO & Project Governance'),
    '/en/project-management/strategic-project-delivery/': createWhatsappMessage('en', 'strategic project delivery'),
    '/en/project-management/agile-project-delivery/': createWhatsappMessage('en', 'agile project delivery'),
    '/en/project-management/project-audit-and-recovery/': createWhatsappMessage('en', 'project audit and recovery'),
    '/en/project-management/project-management-assessment-and-maturity/': createWhatsappMessage('en', 'project management assessment and maturity'),
    '/en/strategic-planning/corporate-strategic-planning/': createWhatsappMessage('en', 'corporate strategic planning'),
  },
};

// Pendientes sin ruta: se asignarán a whatsappMessagesByRoute cuando se creen las
// páginas. Esta lista no participa en la resolución de mensajes ni de enlaces.
export const pendingWhatsappMessages = [
  { name: 'diagnóstico estratégico', es: createWhatsappMessage('es', 'diagnóstico estratégico'), en: createWhatsappMessage('en', 'strategic assessment') },
  { name: 'gobierno corporativo', es: createWhatsappMessage('es', 'gobierno corporativo'), en: createWhatsappMessage('en', 'corporate governance') },
  { name: 'crecimiento empresarial', es: createWhatsappMessage('es', 'crecimiento empresarial'), en: createWhatsappMessage('en', 'business growth') },
  { name: 'transformación empresarial', es: createWhatsappMessage('es', 'transformación empresarial'), en: createWhatsappMessage('en', 'business transformation') },
];

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
  return decoded.toLowerCase().replace(/-/g, ' ').replace(/\b(agsit|seo|cro|pmo|ti|it|crm|bpm|ai|ia)\b/g, (word) => word.toUpperCase());
}

export function getContactInfoForPath(pathname: string) {
  const path = normalizePath(pathname);
  const lang: SupportedLang = path.startsWith('/en/') ? 'en' : 'es';
  const pageName = pageNamesByRoute[lang][path] ?? getNameFromSlug(path);
  const isHome = path === '/' || path === '/en/';
  const generalMessage = createWhatsappMessage(lang, isHome ? undefined : getNameFromSlug(path));
  const message = whatsappMessagesByRoute[lang][path]?.trim() || generalMessage;

  return {
    ...contactInfo,
    lang,
    pageName,
    address: contactInfo.address[lang],
    emailHref: `mailto:${contactInfo.email.destination}`,
    message,
    whatsappHref: `https://wa.me/${contactInfo.phone.whatsapp}?text=${encodeURIComponent(message)}`,
  };
}
