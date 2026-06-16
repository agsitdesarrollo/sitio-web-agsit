import type { SupportedLang } from '../i18n/ui';

export type ITGChallenge = {
  label: string;
  title: string;
  copy: string;
};

export type ITGService = {
  code: string;
  title: string;
  copy: string;
};

export type ITGBenefit = {
  value: string;
  title: string;
  copy: string;
};

export type ITGApproachStep = {
  label: string;
  title: string;
  copy: string;
};

export type ITManagementGovernanceContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    htmlLang: string;
    locale: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
    secondaryCta: string;
    trustSignals: string[];
  };
  challenges: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ITGChallenge[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ITGService[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: ITGBenefit[];
  };
  approach: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: ITGApproachStep[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
    primaryCta: string;
  };
};

export const itManagementGovernanceByLang: Record<SupportedLang, ITManagementGovernanceContent> = {
  es: {
    metadata: {
      title: 'Gestión y Gobierno TI AGSIT | Control, seguridad y continuidad tecnológica',
      description:
        'Gestión y Gobierno TI para empresas: ITIL, auditoría tecnológica, soporte técnico, ciberseguridad, protección de datos y mejora de la operación tecnológica.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/gestion-gobierno-ti/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Gestión y Gobierno TI',
      title: 'Controla, protege y optimiza tu operación tecnológica',
      copy:
        'Implementamos estrategias, procesos y controles tecnológicos que fortalecen la continuidad, seguridad y eficiencia de tu negocio.',
      primaryCta: 'Solicitar diagnóstico TI',
      secondaryCta: 'Ver servicios',
      trustSignals: ['Experiencia empresarial', 'Metodologías internacionales', 'Equipo especializado'],
    },
    challenges: {
      eyebrow: 'Retos operativos',
      title: '¿Tu tecnología está generando riesgos operativos?',
      copy:
        'Cuando la operación de TI crece sin gobierno, los incidentes, brechas y dependencias se vuelven visibles en el negocio.',
      items: [
        {
          label: 'Control',
          title: 'Falta de visibilidad tecnológica',
          copy: 'Procesos, activos y responsabilidades sin trazabilidad dificultan decidir qué priorizar y cómo sostener la operación.',
        },
        {
          label: 'Incidentes',
          title: 'Soporte reactivo',
          copy: 'Los equipos atienden urgencias sin una ruta clara para prevenir recurrencias, documentar causas y medir calidad.',
        },
        {
          label: 'Riesgo',
          title: 'Seguridad expuesta',
          copy: 'Datos, accesos e infraestructura pueden quedar desprotegidos cuando no existen controles revisables y responsables.',
        },
        {
          label: 'Orden',
          title: 'Infraestructura desorganizada',
          copy: 'Sistemas, proveedores y configuraciones dispersas aumentan dependencias, costos ocultos y tiempos de recuperación.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios incluidos',
      title: 'Gobierno tecnológico con alcance práctico',
      copy:
        'Agrupamos los servicios clave para instalar control, soporte y seguridad sin llenar a tu equipo de complejidad innecesaria.',
      items: [
        {
          code: 'ITIL',
          title: 'Implementación de ITIL',
          copy: 'Estructuramos procesos de servicio, incidentes, cambios, niveles de atención y mejora continua con buenas prácticas.',
        },
        {
          code: 'AUD',
          title: 'Auditoría Tecnológica',
          copy: 'Evaluamos sistemas, infraestructura, riesgos, controles, documentación y brechas que afectan la continuidad.',
        },
        {
          code: 'SUP',
          title: 'Administración de Soporte Técnico',
          copy: 'Ordenamos la mesa de ayuda, flujos de escalamiento, tiempos de respuesta, evidencias y seguimiento de casos.',
        },
        {
          code: 'SEC',
          title: 'Ciberseguridad y Protección de Datos',
          copy: 'Fortalecemos accesos, políticas, protección de información y controles preventivos para reducir exposición.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu organizacion',
      title: 'Resultados de negocio que nacen de una TI mejor gobernada',
      copy:
        'Traducimos capacidades técnicas en condiciones operativas más estables, seguras y fáciles de administrar.',
      items: [
        {
          value: '01',
          title: 'Continuidad operativa',
          copy: 'Menos interrupciones críticas gracias a procesos, responsables y controles definidos.',
        },
        {
          value: '02',
          title: 'Reducción de riesgos',
          copy: 'Identificación temprana de brechas tecnológicas, seguridad y dependencias que pueden afectar al negocio.',
        },
        {
          value: '03',
          title: 'Mayor control de TI',
          copy: 'Gobernanza clara sobre servicios, infraestructura, soporte, prioridades y evidencia de ejecución.',
        },
        {
          value: '04',
          title: 'Seguridad de la informacion',
          copy: 'Mejores controles para proteger datos, accesos y activos tecnológicos críticos.',
        },
        {
          value: '05',
          title: 'Calidad del servicio tecnologico',
          copy: 'Atención más consistente, documentada y medible para usuarios internos y áreas de negocio.',
        },
      ],
    },
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Un enfoque estructurado para mejorar tu gestión tecnológica',
      copy:
        'Trabajamos con diagnóstico, evaluación, diseño de mejoras, implementación y seguimiento para que el cambio sea sostenible.',
      steps: [
        { label: '01', title: 'Diagnóstico', copy: 'Levantamos el estado actual de servicios, riesgos, soporte, infraestructura y controles.' },
        { label: '02', title: 'Evaluación', copy: 'Priorizamos brechas por impacto operativo, exposición, urgencia y capacidad de ejecución.' },
        { label: '03', title: 'Diseño', copy: 'Definimos procesos, responsables, políticas, indicadores y rutas de mejora.' },
        { label: '04', title: 'Implementación', copy: 'Acompañamos la puesta en marcha de controles, flujos de soporte y prácticas de gestión.' },
        { label: '05', title: 'Seguimiento', copy: 'Revisamos adopción, ajustes, evidencias e indicadores para consolidar la operación.' },
      ],
    },
    cta: {
      eyebrow: 'Atencion consultiva especializada',
      title: 'Fortalece la gestión tecnológica de tu empresa',
      copy:
        'Cuéntanos qué parte de tu operación de TI necesita más control. Revisaremos tu contexto y propondremos un siguiente paso claro.',
      primaryCta: 'Hablar con un especialista',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT IT Management and Governance | Technology control, security and continuity',
      description:
        'IT Management and Governance for companies: ITIL, technology audit, technical support administration, cybersecurity, data protection and technology operations improvement.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/it-management-governance/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'IT Management and Governance',
      title: 'Control, protect and optimize your technology operation',
      copy:
        'We implement technology strategies, processes and controls that strengthen business continuity, security and efficiency.',
      primaryCta: 'Request IT assessment',
      secondaryCta: 'View services',
      trustSignals: ['Enterprise experience', 'International methodologies', 'Specialized team'],
    },
    challenges: {
      eyebrow: 'Operational challenges',
      title: 'Is your technology creating operational risk?',
      copy:
        'When IT operations grow without governance, incidents, gaps and dependencies become visible across the business.',
      items: [
        {
          label: 'Control',
          title: 'Limited technology visibility',
          copy: 'Processes, assets and responsibilities without traceability make it harder to decide what to prioritize and sustain.',
        },
        {
          label: 'Incidents',
          title: 'Reactive support',
          copy: 'Teams handle urgent issues without a clear path to prevent recurrence, document causes and measure quality.',
        },
        {
          label: 'Risk',
          title: 'Exposed security',
          copy: 'Data, access and infrastructure may remain unprotected when controls are not reviewable or clearly owned.',
        },
        {
          label: 'Order',
          title: 'Disorganized infrastructure',
          copy: 'Scattered systems, vendors and configurations increase dependencies, hidden costs and recovery times.',
        },
      ],
    },
    services: {
      eyebrow: 'Included services',
      title: 'Technology governance with practical scope',
      copy:
        'We group key services to install control, support and security without adding unnecessary complexity to your team.',
      items: [
        {
          code: 'ITIL',
          title: 'ITIL Implementation',
          copy: 'We structure service processes, incidents, changes, support levels and continuous improvement with best practices.',
        },
        {
          code: 'AUD',
          title: 'Technology Audit',
          copy: 'We assess systems, infrastructure, risks, controls, documentation and gaps that affect continuity.',
        },
        {
          code: 'SUP',
          title: 'Technical Support Administration',
          copy: 'We organize the help desk, escalation flows, response times, evidence and case follow-up.',
        },
        {
          code: 'SEC',
          title: 'Cybersecurity and Data Protection',
          copy: 'We strengthen access, policies, information protection and preventive controls to reduce exposure.',
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits for your organization',
      title: 'Business outcomes from better governed IT',
      copy:
        'We translate technical capabilities into operating conditions that are more stable, secure and easier to manage.',
      items: [
        {
          value: '01',
          title: 'Operational continuity',
          copy: 'Fewer critical interruptions through defined processes, owners and controls.',
        },
        {
          value: '02',
          title: 'Risk reduction',
          copy: 'Early identification of technology, security and dependency gaps that may affect the business.',
        },
        {
          value: '03',
          title: 'Greater IT control',
          copy: 'Clear governance over services, infrastructure, support, priorities and execution evidence.',
        },
        {
          value: '04',
          title: 'Information security',
          copy: 'Stronger controls to protect data, access and critical technology assets.',
        },
        {
          value: '05',
          title: 'Technology service quality',
          copy: 'More consistent, documented and measurable support for internal users and business areas.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'A structured approach to improve your technology management',
      copy:
        'We work through diagnosis, evaluation, improvement design, implementation and follow-up so the change can be sustained.',
      steps: [
        { label: '01', title: 'Diagnosis', copy: 'We map the current state of services, risks, support, infrastructure and controls.' },
        { label: '02', title: 'Evaluation', copy: 'We prioritize gaps by operational impact, exposure, urgency and execution capacity.' },
        { label: '03', title: 'Design', copy: 'We define processes, owners, policies, indicators and improvement paths.' },
        { label: '04', title: 'Implementation', copy: 'We support the launch of controls, support flows and management practices.' },
        { label: '05', title: 'Follow-up', copy: 'We review adoption, adjustments, evidence and indicators to consolidate operations.' },
      ],
    },
    cta: {
      eyebrow: 'Specialized consultative support',
      title: 'Strengthen your company technology management',
      copy:
        'Tell us which part of your IT operation needs more control. We will review your context and propose a clear next step.',
      primaryCta: 'Talk to a specialist',
    },
  },
};

export function getITManagementGovernanceContent(lang: SupportedLang) {
  return itManagementGovernanceByLang[lang];
}
