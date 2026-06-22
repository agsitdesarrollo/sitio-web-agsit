import type { SupportedLang } from '../i18n/ui';

export type OpsChallengeItem = {
  label: string;
  title: string;
  copy: string;
};

export type OpsServiceItem = {
  code: string;
  title: string;
  copy: string;
  activities: string[];
};

export type OpsBenefitItem = {
  value: string;
  title: string;
  copy: string;
};

export type OpsApproachStep = {
  label: string;
  title: string;
  copy: string;
};

export type InfrastructureCloudContent = {
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
  };
  challenges: {
    eyebrow: string;
    title: string;
    copy: string;
    items: OpsChallengeItem[];
  };
  services: {
    eyebrow: string;
    title: string;
    copy: string;
    activitiesLabel: string;
    items: OpsServiceItem[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    copy: string;
    items: OpsBenefitItem[];
  };
  approach: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: OpsApproachStep[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const infrastructureCloudByLang: Record<SupportedLang, InfrastructureCloudContent> = {
  es: {
    metadata: {
      title: 'Infraestructura y Nube | AGSIT — Bases tecnológicas estables para operar y crecer',
      description:
        'Servidores, ERPs, hardware, nube y migración de sistemas para empresas. Infraestructura tecnológica confiable con continuidad operativa garantizada.',
      canonicalUrl: 'https://agsit.com.mx/soluciones-tecnologicas/infraestructura-y-nube/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Infraestructura y Nube',
      title: 'Infraestructura preparada para crecer contigo',
      copy:
        'Diseñamos e implementamos bases tecnológicas estables para que tu empresa opere, integre sistemas y crezca con continuidad, ya sea en entornos locales, nube o híbridos.',
      primaryCta: 'Solicitar diagnóstico',
    },
    challenges: {
      eyebrow: 'Retos que resolvemos',
      title: '¿Tu infraestructura soporta el crecimiento de tu negocio?',
      copy:
        'Una base tecnológica frágil limita la capacidad de crecer, integrar y operar con continuidad. Evaluamos el estado real antes de proponer cualquier solución.',
      items: [
        {
          label: 'Obsolescencia',
          title: 'Infraestructura que ya no responde',
          copy: 'Servidores envejecidos, hardware sin soporte y sistemas sin actualizar generan inestabilidad, lentitud y riesgos de continuidad que afectan la operación diaria.',
        },
        {
          label: 'Crecimiento limitado',
          title: 'Capacidad que no escala',
          copy: 'Cuando la infraestructura no está diseñada para crecer, cada expansión del negocio se convierte en un proyecto de emergencia costoso y riesgoso.',
        },
        {
          label: 'Baja disponibilidad',
          title: 'Interrupciones que afectan al negocio',
          copy: 'Sin planes de continuidad, respaldo ni redundancia, una falla técnica puede detener operaciones críticas por horas o días con alto impacto económico.',
        },
        {
          label: 'Migración pendiente',
          title: 'Sistemas que necesitan modernizarse',
          copy: 'La deuda tecnológica acumulada en sistemas legacy y migraciones postergadas genera incompatibilidades, costos ocultos y bloqueos para adoptar nuevas tecnologías.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios incluidos',
      title: 'Soluciones de infraestructura y nube',
      copy:
        'Desde servidores hasta migración a la nube: cubrimos todos los frentes para que tu plataforma tecnológica opere con estabilidad, seguridad y escalabilidad.',
      activitiesLabel: 'Actividades clave',
      items: [
        {
          code: 'OPS-01',
          title: 'Servidores y Administración',
          copy: 'Implementamos y administramos infraestructura de servidores físicos y virtuales, garantizando disponibilidad, rendimiento y continuidad operativa.',
          activities: [
            'Implementación y configuración de servidores',
            'Monitoreo de disponibilidad y rendimiento',
            'Gestión de respaldos y recuperación ante fallos',
            'Atención y resolución de incidentes en producción',
          ],
        },
        {
          code: 'OPS-02',
          title: 'ERPs y Sistemas Corporativos',
          copy: 'Implementamos y configuramos sistemas ERP y plataformas corporativas alineadas a tus procesos, asegurando integración con el ecosistema tecnológico existente.',
          activities: [
            'Análisis de requerimientos y configuración del ERP',
            'Personalización alineada a los procesos de la empresa',
            'Integración con sistemas y plataformas existentes',
            'Capacitación y soporte post-arranque',
          ],
        },
        {
          code: 'OPS-03',
          title: 'Mantenimiento de Hardware',
          copy: 'Gestionamos el ciclo de vida del hardware: diagnóstico, mantenimiento preventivo, reparación y sustitución planificada para evitar fallas no programadas.',
          activities: [
            'Diagnóstico del estado actual del hardware',
            'Mantenimiento preventivo programado',
            'Reparación y sustitución planificada de equipos',
            'Documentación del ciclo de vida del activo',
          ],
        },
        {
          code: 'OPS-04',
          title: 'Infraestructura en la Nube',
          copy: 'Diseñamos e implementamos soluciones en la nube o híbridas que reducen costos de infraestructura, mejoran la escalabilidad y aseguran continuidad del servicio.',
          activities: [
            'Diseño de arquitectura cloud o híbrida',
            'Migración controlada de cargas de trabajo',
            'Configuración de seguridad y escalabilidad',
            'Monitoreo y optimización de costos en la nube',
          ],
        },
        {
          code: 'OPS-05',
          title: 'Migración de Sistemas',
          copy: 'Planificamos y ejecutamos migraciones tecnológicas con minimización de riesgos, continuidad operativa y validación completa antes de cada corte.',
          activities: [
            'Evaluación de riesgos y compatibilidad',
            'Plan de migración por fases con continuidad operativa',
            'Ejecución con validación en cada etapa',
            'Cierre documentado y soporte post-migración',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Beneficios para tu organización',
      title: 'Infraestructura que impulsa resultados operativos',
      copy:
        'Una base tecnológica bien diseñada no solo reduce fallas: habilita el crecimiento, protege la información y asegura que la operación nunca se detenga.',
      items: [
        {
          value: '01',
          title: 'Continuidad operativa',
          copy: 'Infraestructura con redundancia, respaldo y planes de recuperación para que una falla técnica no detenga tu negocio.',
        },
        {
          value: '02',
          title: 'Escalabilidad bajo demanda',
          copy: 'Recursos tecnológicos que crecen contigo, sin sobrecostos ni proyectos de emergencia cuando el negocio se expande.',
        },
        {
          value: '03',
          title: 'Mayor disponibilidad',
          copy: 'Sistemas monitoreados y mantenidos para operar con altos niveles de uptime y respuesta ante incidentes en tiempo real.',
        },
        {
          value: '04',
          title: 'Reducción de costos',
          copy: 'Optimización de recursos de hardware, licencias y nube para eliminar gastos innecesarios sin comprometer el rendimiento.',
        },
        {
          value: '05',
          title: 'Seguridad de la plataforma',
          copy: 'Controles de acceso, respaldo de datos y políticas de seguridad integrados desde el diseño de la infraestructura.',
        },
      ],
    },
    approach: {
      eyebrow: 'Nuestro enfoque',
      title: 'Implementación alineada a tus necesidades operativas',
      copy:
        'Evaluamos, diseñamos, implementamos y administramos la infraestructura para que cada cambio sea controlado, documentado y sostenible.',
      steps: [
        {
          label: '01',
          title: 'Evaluación',
          copy: 'Auditamos el estado actual de servidores, hardware, red, nube y sistemas para identificar riesgos, brechas y oportunidades de mejora.',
        },
        {
          label: '02',
          title: 'Diseño',
          copy: 'Definimos la arquitectura tecnológica óptima considerando capacidad, disponibilidad, seguridad, costo y plan de crecimiento.',
        },
        {
          label: '03',
          title: 'Implementación',
          copy: 'Ejecutamos la solución por fases con minimización de interrupciones, documentación técnica y validación en cada etapa.',
        },
        {
          label: '04',
          title: 'Administración',
          copy: 'Monitoreamos, mantenemos y optimizamos la infraestructura de forma continua para asegurar rendimiento y continuidad operativa.',
        },
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico inicial',
      title: 'Optimiza tu plataforma tecnológica',
      copy:
        'Cuéntanos cómo opera tu infraestructura actual y qué limitaciones enfrentas. Evaluaremos tu caso y propondremos el camino correcto.',
    },
  },
  en: {
    metadata: {
      title: 'Infrastructure & Cloud | AGSIT — Stable technology foundations for operation and growth',
      description:
        'Servers, ERPs, hardware, cloud and system migration for businesses. Reliable technology infrastructure with guaranteed operational continuity.',
      canonicalUrl: 'https://agsit.com.mx/en/technology-solutions/infrastructure-and-cloud/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Infrastructure & Cloud',
      title: 'Infrastructure ready to grow with you',
      copy:
        'We design and implement stable technology foundations so your company can operate, integrate systems and grow with continuity, in on-premise, cloud or hybrid environments.',
      primaryCta: 'Request a diagnosis',
    },
    challenges: {
      eyebrow: 'Challenges we solve',
      title: 'Can your infrastructure support your business growth?',
      copy:
        'A fragile technology foundation limits your ability to grow, integrate and operate with continuity. We assess the real state before proposing any solution.',
      items: [
        {
          label: 'Obsolescence',
          title: 'Infrastructure that no longer responds',
          copy: 'Aging servers, unsupported hardware and outdated systems create instability, slowdowns and continuity risks that affect daily operations.',
        },
        {
          label: 'Limited growth',
          title: 'Capacity that doesn\'t scale',
          copy: 'When infrastructure isn\'t designed to grow, every business expansion becomes a costly, risky emergency project.',
        },
        {
          label: 'Low availability',
          title: 'Interruptions that affect the business',
          copy: 'Without continuity plans, backup or redundancy, a technical failure can stop critical operations for hours or days with high economic impact.',
        },
        {
          label: 'Pending migration',
          title: 'Systems that need modernizing',
          copy: 'Accumulated technical debt in legacy systems and postponed migrations generates incompatibilities, hidden costs and barriers to adopting new technologies.',
        },
      ],
    },
    services: {
      eyebrow: 'Included services',
      title: 'Infrastructure and cloud solutions',
      copy:
        'From servers to cloud migration: we cover all fronts so your technology platform operates with stability, security and scalability.',
      activitiesLabel: 'Key activities',
      items: [
        {
          code: 'OPS-01',
          title: 'Servers & Administration',
          copy: 'We implement and manage physical and virtual server infrastructure, ensuring availability, performance and operational continuity.',
          activities: [
            'Server implementation and configuration',
            'Availability and performance monitoring',
            'Backup management and failure recovery',
            'Production incident response and resolution',
          ],
        },
        {
          code: 'OPS-02',
          title: 'ERPs & Corporate Systems',
          copy: 'We implement and configure ERP systems and corporate platforms aligned to your processes, ensuring integration with the existing technology ecosystem.',
          activities: [
            'Requirements analysis and ERP configuration',
            'Customization aligned to company processes',
            'Integration with existing systems and platforms',
            'Training and post-launch support',
          ],
        },
        {
          code: 'OPS-03',
          title: 'Hardware Maintenance',
          copy: 'We manage the hardware lifecycle: diagnosis, preventive maintenance, repair and planned replacement to avoid unscheduled failures.',
          activities: [
            'Current hardware state diagnosis',
            'Scheduled preventive maintenance',
            'Planned equipment repair and replacement',
            'Asset lifecycle documentation',
          ],
        },
        {
          code: 'OPS-04',
          title: 'Cloud Infrastructure',
          copy: 'We design and implement cloud or hybrid solutions that reduce infrastructure costs, improve scalability and ensure service continuity.',
          activities: [
            'Cloud or hybrid architecture design',
            'Controlled workload migration',
            'Security and scalability configuration',
            'Cloud cost monitoring and optimization',
          ],
        },
        {
          code: 'OPS-05',
          title: 'System Migration',
          copy: 'We plan and execute technology migrations with risk minimization, operational continuity and full validation before each cutover.',
          activities: [
            'Risk and compatibility assessment',
            'Phased migration plan with operational continuity',
            'Execution with validation at each stage',
            'Documented closure and post-migration support',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits for your organization',
      title: 'Infrastructure that drives operational results',
      copy:
        'A well-designed technology foundation doesn\'t just reduce failures: it enables growth, protects information and ensures the operation never stops.',
      items: [
        {
          value: '01',
          title: 'Operational continuity',
          copy: 'Infrastructure with redundancy, backup and recovery plans so a technical failure doesn\'t stop your business.',
        },
        {
          value: '02',
          title: 'On-demand scalability',
          copy: 'Technology resources that grow with you, without extra costs or emergency projects when the business expands.',
        },
        {
          value: '03',
          title: 'Higher availability',
          copy: 'Monitored and maintained systems to operate with high uptime levels and real-time incident response.',
        },
        {
          value: '04',
          title: 'Cost reduction',
          copy: 'Optimization of hardware, licensing and cloud resources to eliminate unnecessary spending without compromising performance.',
        },
        {
          value: '05',
          title: 'Platform security',
          copy: 'Access controls, data backup and security policies integrated from the infrastructure design.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'Implementation aligned to your operational needs',
      copy:
        'We evaluate, design, implement and manage infrastructure so every change is controlled, documented and sustainable.',
      steps: [
        {
          label: '01',
          title: 'Evaluation',
          copy: 'We audit the current state of servers, hardware, network, cloud and systems to identify risks, gaps and improvement opportunities.',
        },
        {
          label: '02',
          title: 'Design',
          copy: 'We define the optimal technology architecture considering capacity, availability, security, cost and growth plan.',
        },
        {
          label: '03',
          title: 'Implementation',
          copy: 'We execute the solution in phases with minimal disruption, technical documentation and validation at each stage.',
        },
        {
          label: '04',
          title: 'Administration',
          copy: 'We continuously monitor, maintain and optimize infrastructure to ensure performance and operational continuity.',
        },
      ],
    },
    cta: {
      eyebrow: 'Initial diagnosis',
      title: 'Optimize your technology platform',
      copy:
        'Tell us how your current infrastructure operates and what limitations you face. We will evaluate your case and propose the right path forward.',
    },
  },
};

export function getInfrastructureCloudContent(lang: SupportedLang) {
  return infrastructureCloudByLang[lang];
}
