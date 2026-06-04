import type { SupportedLang } from '../i18n/ui';

export type QualityArea = {
  code: string;
  title: string;
  copy: string;
};

export type QualitySystemItem = {
  label: string;
  title: string;
  copy: string;
};

export type QualityStep = {
  label: string;
  title: string;
  copy: string;
};

export type QualityManagementContent = {
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
    signals: string[];
  };
  areas: {
    eyebrow: string;
    title: string;
    copy: string;
    items: QualityArea[];
  };
  system: {
    eyebrow: string;
    title: string;
    copy: string;
    items: QualitySystemItem[];
  };
  certification: {
    title: string;
    copy: string;
    steps: QualityStep[];
  };
  outcomes: {
    title: string;
    items: string[];
  };
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const qualityManagementByLang: Record<SupportedLang, QualityManagementContent> = {
  es: {
    metadata: {
      title: 'Gestión de Calidad AGSIT | SGC, ISO y mejora continua',
      description:
        'Gestión de calidad empresarial con SGC, certificaciones ISO, auditorías, aseguramiento, cultura de mejora continua y plan de continuidad de negocio.',
      canonicalUrl: 'https://agsit.com.mx/gestion-de-calidad/',
      htmlLang: 'es-MX',
      locale: 'es_MX',
    },
    hero: {
      eyebrow: 'Quality Management 360°',
      title: 'Calidad que ordena, protege y hace crecer.',
      copy:
        'Diseñamos sistemas de gestión de calidad que conectan estrategia, procesos, personas, evidencia y mejora continua para operar con más confianza y control.',
      primaryCta: 'Solicitar diagnóstico',
      secondaryCta: 'Ver sistema',
      signals: ['SGC', 'ISO', 'Auditoría', 'DRP'],
    },
    areas: {
      eyebrow: 'Servicios de calidad',
      title: 'Convertimos la calidad en una práctica operativa.',
      copy:
        'La calidad no debe quedarse en documentos. Debe orientar responsabilidades, controles, indicadores y decisiones diarias en toda la organización.',
      items: [
        {
          code: '01',
          title: 'Estructura organizacional para la calidad',
          copy: 'Definimos roles, responsabilidades, políticas, objetivos, comunicación interna e indicadores de desempeño.',
        },
        {
          code: '02',
          title: 'Implementación de Sistemas de Gestión de Calidad',
          copy: 'Acompañamos diagnóstico, alcance, documentación, capacitación, implementación, evaluación y mejora.',
        },
        {
          code: '03',
          title: 'Certificaciones ISO y acompañamiento',
          copy: 'Preparamos el sistema, simulamos auditorías, atendemos no conformidades y acompañamos la certificación.',
        },
        {
          code: '04',
          title: 'Auditorías y aseguramiento de calidad',
          copy: 'Revisamos cumplimiento, riesgos, procesos, hallazgos, acciones correctivas y trazabilidad.',
        },
        {
          code: '05',
          title: 'Cultura de mejora continua',
          copy: 'Instalamos hábitos de excelencia con PDCA, uso de datos, formación continua y aprendizaje operativo.',
        },
        {
          code: '06',
          title: 'Plan de continuidad de negocio',
          copy: 'Diseñamos BIA, escenarios, roles, comunicación, estrategias de recuperación y pruebas periódicas.',
        },
      ],
    },
    system: {
      eyebrow: 'Sistema de Gestión de Calidad',
      title: 'Un SGC útil se sostiene con evidencia, no con intención.',
      copy:
        'Integramos requisitos, procesos, controles, riesgos, auditorías y mejora continua para que la organización pueda demostrar cumplimiento y mejorar resultados.',
      items: [
        {
          label: 'Liderazgo',
          title: 'Compromiso directivo',
          copy: 'Políticas, objetivos, alcance y responsabilidades con respaldo de la alta dirección.',
        },
        {
          label: 'Proceso',
          title: 'Control operativo',
          copy: 'Procesos documentados, estándares claros, indicadores y evidencia trazable.',
        },
        {
          label: 'Riesgo',
          title: 'Prevención',
          copy: 'Gestión de riesgos, no conformidades, acciones correctivas y controles preventivos.',
        },
        {
          label: 'Mejora',
          title: 'Evolución continua',
          copy: 'Auditorías, revisión de desempeño, aprendizaje y mejora basada en datos.',
        },
      ],
    },
    certification: {
      title: 'Del diagnóstico a una cultura certificable.',
      copy:
        'Nuestro acompañamiento reduce improvisación y prepara a la empresa para sostener cumplimiento, auditorías y estándares internacionales.',
      steps: [
        { label: '01', title: 'Diagnosticar', copy: 'Revisión del sistema actual, brechas, riesgos y procesos críticos.' },
        { label: '02', title: 'Diseñar', copy: 'Definición de alcance, política, objetivos, documentación y plan de acción.' },
        { label: '03', title: 'Implementar', copy: 'Capacitación, operación de procesos, indicadores, controles y evidencias.' },
        { label: '04', title: 'Auditar', copy: 'Auditoría interna, gestión de no conformidades y preparación para evaluación externa.' },
        { label: '05', title: 'Mejorar', copy: 'Seguimiento post-certificación, revisión directiva y mejora continua.' },
      ],
    },
    outcomes: {
      title: 'Beneficios que deben sentirse en la operación.',
      items: [
        'Reputación sólida y confianza frente al mercado.',
        'Clientes más satisfechos, leales y dispuestos a recomendar.',
        'Apertura a nuevos mercados y oportunidades comerciales.',
        'Mayor compromiso del equipo con reglas claras.',
        'Procesos más eficientes y menos desperdicio operativo.',
        'Prevención de errores críticos mediante causa raíz.',
      ],
    },
    cta: {
      eyebrow: 'Diagnóstico de calidad',
      title: 'Cuéntanos qué estándar necesitas alcanzar.',
      copy:
        'Comparte el estado actual de tu sistema, certificación objetivo o problema de calidad. Revisaremos tu caso para definir el siguiente paso.',
    },
  },
  en: {
    metadata: {
      title: 'AGSIT Quality Management | QMS, ISO and continuous improvement',
      description:
        'Business quality management with QMS, ISO certifications, audits, assurance, continuous improvement culture and business continuity planning.',
      canonicalUrl: 'https://agsit.com.mx/en/quality-management/',
      htmlLang: 'en',
      locale: 'en_US',
    },
    hero: {
      eyebrow: 'Quality Management 360°',
      title: 'Quality that organizes, protects and enables growth.',
      copy:
        'We design quality management systems that connect strategy, processes, people, evidence and continuous improvement to operate with more confidence and control.',
      primaryCta: 'Request diagnosis',
      secondaryCta: 'View system',
      signals: ['QMS', 'ISO', 'Audit', 'DRP'],
    },
    areas: {
      eyebrow: 'Quality services',
      title: 'We turn quality into an operating practice.',
      copy:
        'Quality should not live only in documents. It should guide responsibilities, controls, indicators and daily decisions across the organization.',
      items: [
        {
          code: '01',
          title: 'Organizational structure for quality',
          copy: 'We define roles, responsibilities, policies, objectives, internal communication and performance indicators.',
        },
        {
          code: '02',
          title: 'Quality Management System implementation',
          copy: 'We support diagnosis, scope, documentation, training, implementation, evaluation and improvement.',
        },
        {
          code: '03',
          title: 'ISO certifications and support',
          copy: 'We prepare the system, simulate audits, manage nonconformities and support certification.',
        },
        {
          code: '04',
          title: 'Quality audits and assurance',
          copy: 'We review compliance, risks, processes, findings, corrective actions and traceability.',
        },
        {
          code: '05',
          title: 'Continuous improvement culture',
          copy: 'We install excellence habits with PDCA, data use, ongoing training and operational learning.',
        },
        {
          code: '06',
          title: 'Business continuity plan',
          copy: 'We design BIA, scenarios, roles, communication, recovery strategies and periodic testing.',
        },
      ],
    },
    system: {
      eyebrow: 'Quality Management System',
      title: 'A useful QMS is sustained by evidence, not intention.',
      copy:
        'We integrate requirements, processes, controls, risks, audits and continuous improvement so the organization can demonstrate compliance and improve results.',
      items: [
        {
          label: 'Leadership',
          title: 'Executive commitment',
          copy: 'Policies, objectives, scope and responsibilities backed by senior leadership.',
        },
        {
          label: 'Process',
          title: 'Operational control',
          copy: 'Documented processes, clear standards, indicators and traceable evidence.',
        },
        {
          label: 'Risk',
          title: 'Prevention',
          copy: 'Risk management, nonconformities, corrective actions and preventive controls.',
        },
        {
          label: 'Improvement',
          title: 'Continuous evolution',
          copy: 'Audits, performance review, learning and data-based improvement.',
        },
      ],
    },
    certification: {
      title: 'From diagnosis to a certifiable culture.',
      copy:
        'Our support reduces improvisation and prepares the company to sustain compliance, audits and international standards.',
      steps: [
        { label: '01', title: 'Diagnose', copy: 'Review the current system, gaps, risks and critical processes.' },
        { label: '02', title: 'Design', copy: 'Define scope, policy, objectives, documentation and action plan.' },
        { label: '03', title: 'Implement', copy: 'Training, process operation, indicators, controls and evidence.' },
        { label: '04', title: 'Audit', copy: 'Internal audit, nonconformity management and preparation for external evaluation.' },
        { label: '05', title: 'Improve', copy: 'Post-certification follow-up, management review and continuous improvement.' },
      ],
    },
    outcomes: {
      title: 'Benefits that should be felt in operations.',
      items: [
        'Solid reputation and market trust.',
        'More satisfied, loyal and referral-ready clients.',
        'Access to new markets and commercial opportunities.',
        'Higher team commitment with clear rules.',
        'More efficient processes and less operational waste.',
        'Prevention of critical errors through root cause analysis.',
      ],
    },
    cta: {
      eyebrow: 'Quality diagnosis',
      title: 'Tell us which standard you need to reach.',
      copy:
        'Share the current state of your system, target certification or quality problem. We will review your case and define the next step.',
    },
  },
};

export function getQualityManagementContent(lang: SupportedLang) {
  return qualityManagementByLang[lang];
}
