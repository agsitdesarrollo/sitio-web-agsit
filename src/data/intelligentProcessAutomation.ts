import type { SupportedLang } from '../i18n/ui';
import type {
  TechnologySolutionBenefitsContent,
  TechnologySolutionHeroContent,
  TechnologySolutionJourneyContent,
} from '../components/technology-solution-detail/types';

export type IntelligentProcessAutomationContent = {
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    image: string;
    imageAlt: string;
    htmlLang: string;
    locale: string;
  };
  hero: TechnologySolutionHeroContent;
  benefits: TechnologySolutionBenefitsContent;
  journey: TechnologySolutionJourneyContent;
};

export const intelligentProcessAutomationByLang: Record<
  SupportedLang,
  IntelligentProcessAutomationContent
> = {
  es: {
    metadata: {
      title: 'Automatización Inteligente de Procesos | AGSIT',
      description:
        'Automatizamos procesos, integramos sistemas y desarrollamos APIs, webhooks, RPA, IoT y workflows para agilizar la operación de tu empresa.',
      canonicalUrl:
        'https://agsit.com.mx/soluciones-tecnologicas/automatizacion-inteligente-de-procesos/',
      image: '/assets/social/automatizacion-inteligente-procesos-es.jpg',
      imageAlt: 'Automatización inteligente para conectar procesos, sistemas y tareas empresariales.',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Automatización inteligente de procesos',
      title: 'Haz que tus procesos',
      titleAccent: 'avancen solos.',
      copy:
        'Automatizamos tareas, conectamos sistemas y activamos flujos inteligentes para acelerar tu operación con precisión y control.',
      primaryCta: 'Hablar con un especialista',
      pathwaysLabel: 'Explorar soluciones de automatización',
      pathways: [],
      visualAlt:
        'Ilustración de un proceso automatizado que conecta sistemas, datos, dispositivos y tareas digitales.',
    },
    benefits: {
      eyebrow: 'Beneficios de la automatización inteligente',
      title: 'Más velocidad, control y capacidad para crecer.',
      copy:
        'Transforma tareas manuales y sistemas aislados en una operación conectada, medible y preparada para responder mejor.',
      image: '/assets/automatizacion-inteligente/beneficios-automatizacion.webp',
      imageAlt:
        'Flujos manuales que se convierten en una operación automatizada, conectada y trazable.',
      items: [
        {
          icon: 'fit',
          title: 'Operación más ágil',
          copy: 'Reduce tiempos de espera y permite que cada tarea avance en el momento correcto.',
        },
        {
          icon: 'quality',
          title: 'Menos errores',
          copy: 'Estandariza reglas y validaciones para disminuir omisiones, retrabajos y capturas duplicadas.',
        },
        {
          icon: 'growth',
          title: 'Escala con eficiencia',
          copy: 'Procesa un mayor volumen de trabajo sin aumentar la carga manual de tu equipo.',
        },
        {
          icon: 'integration',
          title: 'Todo conectado',
          copy: 'Integra aplicaciones, datos y dispositivos para tener continuidad y visibilidad de principio a fin.',
        },
      ],
    },
    journey: {
      eyebrow: 'Automatización para cada operación',
      title: 'Conecta cada paso y elimina el trabajo repetitivo.',
      copy:
        'Diseñamos soluciones que integran personas, reglas, sistemas y dispositivos para que cada proceso avance con claridad.',
      items: [
        {
          anchor: 'automatizacion-de-procesos',
          eyebrow: '01 · Automatización de procesos',
          title: 'Convierte tareas repetitivas en procesos que avanzan solos.',
          copy:
            'Analizamos cada paso y automatizamos reglas, validaciones, alertas y acciones para reducir tiempos y mantener el control.',
          detail: 'Reglas · tareas · alertas · trazabilidad',
          image: '/assets/automatizacion-inteligente/automatizacion-procesos.webp',
        },
        {
          anchor: 'integracion-de-sistemas',
          eyebrow: '02 · Integración de sistemas',
          title: 'Haz que tus plataformas compartan información sin dobles capturas.',
          copy:
            'Conectamos aplicaciones, bases de datos y servicios para que la información circule de forma segura y consistente.',
          detail: 'Aplicaciones · datos · sincronización · seguridad',
          image: '/assets/automatizacion-inteligente/integracion-sistemas.webp',
        },
        {
          anchor: 'desarrollo-de-apis',
          eyebrow: '03 · Desarrollo de APIs',
          title: 'Construye conexiones seguras para ampliar tu ecosistema digital.',
          copy:
            'Desarrollamos APIs confiables para intercambiar datos, habilitar nuevas funciones y conectar soluciones internas o externas.',
          detail: 'Endpoints · datos · seguridad · documentación',
          image: '/assets/automatizacion-inteligente/desarrollo-apis.webp',
        },
        {
          anchor: 'webhooks',
          eyebrow: '04 · Webhooks',
          title: 'Activa respuestas en tiempo real cuando ocurre un evento.',
          copy:
            'Configuramos notificaciones automáticas entre sistemas para iniciar acciones sin consultas constantes ni intervención manual.',
          detail: 'Eventos · notificaciones · tiempo real · acciones',
          image: '/assets/automatizacion-inteligente/webhooks.webp',
        },
        {
          anchor: 'rpa',
          eyebrow: '05 · RPA',
          title: 'Transforma tus procesos operativos.',
          copy:
            'Implementamos automatizaciones que capturan datos, consultan sistemas y ejecutan tareas repetitivas tal como lo haría un usuario.',
          detail: 'Automatización · captura · validación · ejecución',
          image: '/assets/automatizacion-inteligente/rpa.webp',
        },
        {
          anchor: 'iot',
          eyebrow: '06 · IoT',
          title: 'Conecta equipos y señales con tu operación digital.',
          copy:
            'Integramos sensores y dispositivos para monitorear condiciones, recibir datos y activar respuestas automáticas desde el entorno físico.',
          detail: 'Sensores · telemetría · monitoreo · acciones',
          image: '/assets/automatizacion-inteligente/iot.webp',
        },
        {
          anchor: 'flujos-de-trabajo',
          eyebrow: '07 · Flujos de trabajo (Workflows)',
          title: 'Convierte procesos complejos en rutas claras y medibles.',
          copy:
            'Diseñamos flujos con responsables, reglas, aprobaciones y seguimiento para que cada solicitud llegue al siguiente paso sin perderse.',
          detail: 'Responsables · reglas · aprobaciones · seguimiento',
          image: '/assets/automatizacion-inteligente/workflows.webp',
        },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Intelligent Process Automation | AGSIT',
      description:
        'We automate processes, integrate systems and build APIs, webhooks, RPA, IoT and workflows to streamline your business operations.',
      canonicalUrl:
        'https://agsit.com.mx/en/technology-solutions/intelligent-process-automation/',
      image: '/assets/social/intelligent-process-automation-en.jpg',
      imageAlt: 'Intelligent automation connecting business processes, systems and tasks.',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Intelligent process automation',
      title: 'Make your processes',
      titleAccent: 'move on their own.',
      copy:
        'We automate tasks, connect systems and activate intelligent workflows to accelerate your operation with accuracy and control.',
      primaryCta: 'Talk to a specialist',
      pathwaysLabel: 'Explore automation solutions',
      pathways: [],
      visualAlt:
        'Illustration of an automated process connecting systems, data, devices and digital tasks.',
    },
    benefits: {
      eyebrow: 'Benefits of intelligent automation',
      title: 'More speed, control and capacity to grow.',
      copy:
        'Turn manual tasks and isolated systems into a connected, measurable operation ready to respond faster.',
      image: '/assets/automatizacion-inteligente/beneficios-automatizacion.webp',
      imageAlt:
        'Manual flows becoming an automated, connected and fully traceable operation.',
      items: [
        {
          icon: 'fit',
          title: 'Faster operations',
          copy: 'Reduce wait times and let each task move forward at the right moment.',
        },
        {
          icon: 'quality',
          title: 'Fewer errors',
          copy: 'Standardize rules and validations to reduce omissions, rework and duplicate entry.',
        },
        {
          icon: 'growth',
          title: 'Scale efficiently',
          copy: 'Handle more work without increasing the manual workload placed on your team.',
        },
        {
          icon: 'integration',
          title: 'Everything connected',
          copy: 'Integrate applications, data and devices for end-to-end continuity and visibility.',
        },
      ],
    },
    journey: {
      eyebrow: 'Automation for every operation',
      title: 'Connect every step and eliminate repetitive work.',
      copy:
        'We design solutions that connect people, rules, systems and devices so every process moves forward with clarity.',
      items: [
        {
          anchor: 'process-automation',
          eyebrow: '01 · Process automation',
          title: 'Turn repetitive tasks into processes that move on their own.',
          copy:
            'We analyze each step and automate rules, validations, alerts and actions to reduce lead times and maintain control.',
          detail: 'Rules · tasks · alerts · traceability',
          image: '/assets/automatizacion-inteligente/automatizacion-procesos.webp',
        },
        {
          anchor: 'systems-integration',
          eyebrow: '02 · Systems integration',
          title: 'Let your platforms share information without duplicate entry.',
          copy:
            'We connect applications, databases and services so information moves securely and consistently.',
          detail: 'Applications · data · synchronization · security',
          image: '/assets/automatizacion-inteligente/integracion-sistemas.webp',
        },
        {
          anchor: 'api-development',
          eyebrow: '03 · API development',
          title: 'Build secure connections that expand your digital ecosystem.',
          copy:
            'We develop reliable APIs to exchange data, enable new capabilities and connect internal or external solutions.',
          detail: 'Endpoints · data · security · documentation',
          image: '/assets/automatizacion-inteligente/desarrollo-apis.webp',
        },
        {
          anchor: 'webhooks',
          eyebrow: '04 · Webhooks',
          title: 'Trigger real-time responses whenever an event occurs.',
          copy:
            'We configure automatic notifications between systems to launch actions without constant polling or manual intervention.',
          detail: 'Events · notifications · real time · actions',
          image: '/assets/automatizacion-inteligente/webhooks.webp',
        },
        {
          anchor: 'rpa',
          eyebrow: '05 · RPA',
          title: 'Transform your operational processes.',
          copy:
            'We implement automations that capture data, consult systems and execute repetitive tasks just as a user would.',
          detail: 'Automation · capture · validation · execution',
          image: '/assets/automatizacion-inteligente/rpa.webp',
        },
        {
          anchor: 'iot',
          eyebrow: '06 · IoT',
          title: 'Connect equipment and signals with your digital operation.',
          copy:
            'We integrate sensors and devices to monitor conditions, receive data and trigger automated responses from the physical environment.',
          detail: 'Sensors · telemetry · monitoring · actions',
          image: '/assets/automatizacion-inteligente/iot.webp',
        },
        {
          anchor: 'workflows',
          eyebrow: '07 · Workflows',
          title: 'Turn complex processes into clear, measurable routes.',
          copy:
            'We design workflows with owners, rules, approvals and tracking so every request reaches the next step without getting lost.',
          detail: 'Owners · rules · approvals · tracking',
          image: '/assets/automatizacion-inteligente/workflows.webp',
        },
      ],
    },
  },
};

export function getIntelligentProcessAutomationContent(lang: SupportedLang) {
  return intelligentProcessAutomationByLang[lang];
}
