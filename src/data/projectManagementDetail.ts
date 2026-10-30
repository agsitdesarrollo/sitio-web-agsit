import type { SupportedLang } from '../i18n/ui';

export type ProjectManagementChapter = {
  id: string;
  navLabel: string;
  kind: 'problem' | 'service' | 'method' | 'outcomes';
  term: string;
  title: string;
  copy: string;
  includesLabel?: string;
  includes?: string[];
  steps?: Array<{ title: string; copy: string }>;
  outcomes?: string[];
  imageAlt?: string;
  imageStatus?: 'pending' | 'ready';
  imageSrc?: string;
};

export type ProjectManagementDetailContent = {
  id: string;
  slug: string;
  metadata: {
    title: string;
    description: string;
    canonicalUrl: string;
    image: string;
    imageAlt: string;
    htmlLang: string;
    locale: string;
  };
  hero: { title: string; copy: string; primaryCta: string; visualLabel: string };
  story: { eyebrow: string; title: string; instruction: string; chapters: ProjectManagementChapter[] };
};

const origin = 'https://agsit.com.mx';

const projectManagementDetailPages: Record<string, Record<SupportedLang, ProjectManagementDetailContent>> = {
  'agile-delivery': {
    es: {
      id: 'agile-delivery',
      slug: 'gestion-agil-de-proyectos',
      metadata: {
        title: 'Gestión Ágil de Proyectos | AGSIT',
        description: 'Adapta tus proyectos a lo que necesita tu negocio. AGSIT aplica Scrum, Kanban y prácticas ágiles para revisar entregas, ordenar tareas y ajustar prioridades.',
        canonicalUrl: `${origin}/direccion-de-proyectos/gestion-agil-de-proyectos/`,
        image: '/assets/social/gestion-agil-de-proyectos-es.jpg',
        imageAlt: 'AGSIT — Gestión Ágil de Proyectos: entregas pequeñas y ajustes a tiempo.',
        htmlLang: 'es-MX',
        locale: 'es_MX',
      },
      hero: {
        title: 'Gestión Ágil de Proyectos',
        copy: 'Cuando las necesidades cambian, conviene revisar el trabajo antes de avanzar demasiado. Ayudamos a tu equipo a organizar entregas pequeñas, recibir comentarios y ajustar prioridades con un objetivo claro.',
        primaryCta: 'Hablemos de tus proyectos',
        visualLabel: 'Adaptación y entregas frecuentes',
      },
      story: {
        eyebrow: 'Dirección de Proyectos · Adaptación y entregas frecuentes',
        title: 'Revisar a tiempo para ajustar el trabajo',
        instruction: 'Elige un tema o avanza para conocerlo.',
        chapters: [
          {
            id: 'problem', navLabel: 'Reto', kind: 'problem', term: 'El reto',
            title: 'Descubrir demasiado tarde que hacía falta algo distinto.',
            copy: 'Un proyecto puede seguir ocupado durante semanas y aun así alejarse de lo que el negocio necesita. Si el resultado se revisa solo al final, corregirlo se vuelve más difícil. Acercamos esas revisiones al trabajo cotidiano.',
          },
          {
            id: 'scrum', navLabel: 'Scrum', kind: 'service', term: 'Scrum',
            title: 'Entregas pequeñas que se revisan en periodos cortos.',
            copy: 'Scrum organiza el trabajo en ciclos breves, con responsabilidades y momentos de revisión definidos. AGSIT ayuda a ordenar lo pendiente, acordar qué abordar y revisar lo terminado. Puedes ver resultados parciales y dar comentarios antes de continuar.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: equipo revisando una entrega parcial y acordando el siguiente ciclo de trabajo con Scrum',
          },
          {
            id: 'kanban', navLabel: 'Kanban', kind: 'service', term: 'Kanban',
            title: 'Ver el trabajo y detectar dónde se acumula.',
            copy: 'Kanban hace visible qué está pendiente, en curso y terminado, y limita cuántas tareas se atienden a la vez. Organizamos el flujo con tu equipo para reconocer bloqueos y evitar sobrecargas. Tú puedes entender qué frena las entregas y qué conviene terminar primero.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: equipo observando tareas pendientes, en curso y terminadas para identificar bloqueos con Kanban',
          },
          {
            id: 'agile-frameworks', navLabel: 'Agile Frameworks', kind: 'service', term: 'Agile Frameworks',
            title: 'Una forma de trabajo que permita adaptarse.',
            copy: 'Son marcos que orientan cómo colaborar, entregar y aprender mientras avanza un proyecto. Elegimos y ajustamos las prácticas según tus necesidades y la capacidad del equipo. Obtienes una manera de responder a cambios sin perder de vista las prioridades.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: equipo y consultor eligiendo prácticas ágiles según las necesidades del proyecto y su capacidad de trabajo',
          },
          {
            id: 'method', navLabel: 'Método', kind: 'method', term: 'Cómo trabajamos',
            title: 'Probar, revisar y mejorar la forma de trabajar.',
            copy: 'Empezamos con tu trabajo actual y aprendemos de las primeras entregas para ajustar la colaboración.',
            steps: [
              { title: 'Observar', copy: 'Entendemos cómo llegan las solicitudes y dónde se atascan.' },
              { title: 'Preparar', copy: 'Elegimos prácticas y acordamos responsabilidades.' },
              { title: 'Probar', copy: 'Las aplicamos en un primer tramo de trabajo.' },
              { title: 'Aprender', copy: 'Revisamos las entregas y ajustamos con el equipo.' },
            ],
          },
          {
            id: 'outcomes', navLabel: 'Result.', kind: 'outcomes', term: 'Lo que buscamos',
            title: 'Oportunidades de corregir mientras el proyecto avanza.',
            copy: 'Buscamos facilitar que el equipo revise lo que entrega y decida qué ajustar a continuación.',
            includesLabel: 'Lo que puedes mejorar',
            outcomes: [
              'Trabajo pendiente y bloqueos visibles.',
              'Entregas que puedas revisar con frecuencia.',
              'Prioridades actualizadas con criterio.',
              'Una carga de trabajo acorde con la capacidad del equipo.',
            ],
          },
        ],
      },
    },
    en: {
      id: 'agile-delivery',
      slug: 'agile-project-delivery',
      metadata: {
        title: 'Agile Project Delivery | AGSIT',
        description: 'Adapt projects as business needs change. AGSIT uses Scrum, Kanban, and agile practices to review deliverables, organize tasks, and adjust priorities.',
        canonicalUrl: `${origin}/en/project-management/agile-project-delivery/`,
        image: '/assets/social/agile-project-delivery-en.jpg',
        imageAlt: 'AGSIT — Agile Project Delivery: small deliveries and timely adjustments.',
        htmlLang: 'en',
        locale: 'en_US',
      },
      hero: {
        title: 'Agile Project Delivery',
        copy: 'When needs change, it helps to review the work before going too far. We help your team organize small deliveries, gather feedback, and adjust priorities while keeping a clear goal.',
        primaryCta: 'Talk about your projects',
        visualLabel: 'Adaptation and frequent deliveries',
      },
      story: {
        eyebrow: 'Project Management · Adaptation and frequent deliveries',
        title: 'Review early to adjust the work',
        instruction: 'Choose a topic or move forward to explore it.',
        chapters: [
          {
            id: 'problem', navLabel: 'Need', kind: 'problem', term: 'The challenge',
            title: 'Finding out too late that something different was needed.',
            copy: 'A project can keep people busy for weeks and still move away from what the business needs. If results are only reviewed at the end, correcting them becomes harder. We bring those reviews into everyday work.',
          },
          {
            id: 'scrum', navLabel: 'Scrum', kind: 'service', term: 'Scrum',
            title: 'Small deliveries reviewed in short cycles.',
            copy: 'Scrum organizes work in short cycles, with clear responsibilities and agreed review points. AGSIT helps organize pending work, agree on what to tackle, and review what is finished. You can see partial results and give feedback before the team continues.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: a team reviewing a partial delivery and agreeing on its next work cycle with Scrum',
          },
          {
            id: 'kanban', navLabel: 'Kanban', kind: 'service', term: 'Kanban',
            title: 'See the work and spot where it builds up.',
            copy: 'Kanban shows what is pending, in progress, and finished, and limits how many tasks are handled at once. We organize the flow with your team to spot blockers and avoid overload. You can understand what slows deliveries and what should be finished first.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: a team reviewing pending, ongoing, and completed tasks to spot blockers with Kanban',
          },
          {
            id: 'agile-frameworks', navLabel: 'Agile Frameworks', kind: 'service', term: 'Agile Frameworks',
            title: 'A way of working that leaves room to adapt.',
            copy: 'Agile Frameworks guide how people collaborate, deliver, and learn as a project moves forward. We choose and adjust practices to fit your needs and your team’s capacity. You gain a way to respond to change while keeping priorities in view.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: a team and consultant choosing agile practices to suit project needs and the team’s capacity',
          },
          {
            id: 'method', navLabel: 'Method', kind: 'method', term: 'How we work',
            title: 'Try, review, and improve the way you work.',
            copy: 'We start with your current work and learn from the first deliveries to adjust how the team collaborates.',
            steps: [
              { title: 'Observe', copy: 'We understand how requests arrive and where they get stuck.' },
              { title: 'Prepare', copy: 'We choose practices and agree on responsibilities.' },
              { title: 'Try', copy: 'We apply them to an initial part of the work.' },
              { title: 'Learn', copy: 'We review deliveries and make adjustments with the team.' },
            ],
          },
          {
            id: 'outcomes', navLabel: 'Results', kind: 'outcomes', term: 'What we aim for',
            title: 'Chances to make corrections as the project moves forward.',
            copy: 'We aim to help the team review what it delivers and decide what to adjust next.',
            includesLabel: 'What you can improve',
            outcomes: [
              'Visible pending work and blockers.',
              'Deliveries you can review frequently.',
              'Priorities updated with clear reasons.',
              'A workload that fits your team’s capacity.',
            ],
          },
        ],
      },
    },
  },
  'strategic-delivery': {
    es: {
      id: 'strategic-delivery',
      slug: 'direccion-estrategica-de-proyectos',
      metadata: {
        title: 'Dirección Estratégica de Proyectos | AGSIT',
        description: 'Convierte tus objetivos en entregas concretas. AGSIT dirige proyectos, coordina equipos y organiza recursos para que sepas qué avanza y qué requiere atención.',
        canonicalUrl: `${origin}/direccion-de-proyectos/direccion-estrategica-de-proyectos/`,
        image: '/assets/social/direccion-estrategica-de-proyectos-es.jpg',
        imageAlt: 'AGSIT — Dirección Estratégica de Proyectos: del objetivo a las entregas.',
        htmlLang: 'es-MX',
        locale: 'es_MX',
      },
      hero: {
        title: 'Dirección Estratégica de Proyectos',
        copy: 'Convertimos tus objetivos de negocio en trabajo organizado. AGSIT dirige proyectos, coordina esfuerzos relacionados y administra prioridades para que las decisiones se traduzcan en entregas concretas.',
        primaryCta: 'Hablemos de tus proyectos',
        visualLabel: 'De la estrategia a las entregas',
      },
      story: {
        eyebrow: 'Dirección de Proyectos · De la estrategia a la ejecución',
        title: 'Del objetivo al trabajo de cada equipo',
        instruction: 'Elige un tema o avanza para conocerlo.',
        chapters: [
          {
            id: 'problem', navLabel: 'Reto', kind: 'problem', term: 'El reto',
            title: 'Tener un plan no basta para llevarlo a término.',
            copy: 'El trabajo diario desplaza las iniciativas importantes, las fechas cambian y varias áreas necesitan a las mismas personas. Hace falta alguien que coordine la ejecución, atienda los obstáculos y mantenga el objetivo presente.',
          },
          {
            id: 'project-management', navLabel: 'Proy.', kind: 'service', term: 'Project Management',
            title: 'Dirección del trabajo de principio a fin.',
            copy: 'Es organizar y conducir un proyecto para entregar lo acordado. Definimos qué debe hacerse, con qué recursos y en qué fechas; después damos seguimiento y atendemos desviaciones. Tú puedes conocer el avance y las decisiones pendientes sin reconstruir la historia en cada reunión.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: responsable y equipo revisando entregas, fechas y recursos de un proyecto',
          },
          {
            id: 'program-management', navLabel: 'Prog.', kind: 'service', term: 'Program Management',
            title: 'Coordinación de proyectos con una meta compartida.',
            copy: 'Cuando un resultado depende de varios proyectos, sus planes deben encajar. AGSIT coordina entregas, equipos y tareas que dependen unas de otras. Tu empresa gana una ejecución conjunta, con atención a los problemas que un proyecto puede provocar en otro.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: líderes coordinando entregas y dependencias entre proyectos con una meta compartida',
          },
          {
            id: 'portfolio-management', navLabel: 'Port.', kind: 'service', term: 'Portfolio Management',
            title: 'Administración del conjunto de iniciativas.',
            copy: 'Consiste en organizar los proyectos que compiten por tiempo, personas y presupuesto. Revisamos sus objetivos, necesidades y avance para proponer prioridades y ajustes. Puedes distribuir tus recursos con una visión del conjunto, en lugar de responder solo a la urgencia del día.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: dirección distribuyendo recursos entre iniciativas según sus objetivos y avance',
          },
          {
            id: 'method', navLabel: 'Método', kind: 'method', term: 'Cómo trabajamos',
            title: 'Del objetivo a las entregas.',
            copy: 'Organizamos lo que hay que conseguir y acompañamos el trabajo hasta revisar lo entregado.',
            steps: [
              { title: 'Precisar', copy: 'Acordamos qué necesita conseguir el negocio y cómo reconocer una entrega aceptable.' },
              { title: 'Planear', copy: 'Organizamos actividades, recursos y compromisos.' },
              { title: 'Dirigir', copy: 'Coordinamos al equipo y resolvemos las decisiones de ejecución.' },
              { title: 'Cerrar', copy: 'Revisamos lo entregado y documentamos pendientes y aprendizajes.' },
            ],
          },
          {
            id: 'outcomes', navLabel: 'Result.', kind: 'outcomes', term: 'Lo que buscamos',
            title: 'Saber qué se está entregando y qué requiere atención.',
            copy: 'El trabajo busca dejarte una visión útil de la ejecución y sus próximos pasos.',
            includesLabel: 'Tu empresa cuenta con',
            outcomes: [
              'Entregas definidas y responsables asignados.',
              'Fechas y recursos revisados durante la ejecución.',
              'Dependencias atendidas entre equipos.',
              'Decisiones tomadas con la foto completa de tus proyectos.',
            ],
          },
        ],
      },
    },
    en: {
      id: 'strategic-delivery',
      slug: 'strategic-project-delivery',
      metadata: {
        title: 'Strategic Project Delivery | AGSIT',
        description: 'Turn business goals into deliverables. AGSIT leads projects, coordinates teams, and manages resources so you know what is moving and what needs attention.',
        canonicalUrl: `${origin}/en/project-management/strategic-project-delivery/`,
        image: '/assets/social/strategic-project-delivery-en.jpg',
        imageAlt: 'AGSIT — Strategic Project Delivery: from goals to deliverables.',
        htmlLang: 'en',
        locale: 'en_US',
      },
      hero: {
        title: 'Strategic Project Delivery',
        copy: 'We turn your business goals into organized work. AGSIT leads projects, coordinates related efforts, and manages priorities so decisions lead to concrete deliverables.',
        primaryCta: 'Talk about your projects',
        visualLabel: 'From strategy to delivery',
      },
      story: {
        eyebrow: 'Project Management · From strategy to execution',
        title: 'From business goals to each team’s work',
        instruction: 'Choose a topic or move forward to explore it.',
        chapters: [
          {
            id: 'problem', navLabel: 'Need', kind: 'problem', term: 'The challenge',
            title: 'Having a plan is only the beginning.',
            copy: 'Daily work pushes important initiatives aside, dates change, and several teams need the same people. Someone needs to coordinate delivery, address obstacles, and keep the goal in view.',
          },
          {
            id: 'project-management', navLabel: 'Proj.', kind: 'service', term: 'Project Management',
            title: 'Leading the work from start to finish.',
            copy: 'Project Management means organizing and leading a project to deliver what was agreed. We define the work, resources, and dates, then track progress and address changes to the plan. You can see progress and pending decisions without piecing the story together at every meeting.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: a project lead and team reviewing deliverables, dates, and resources',
          },
          {
            id: 'program-management', navLabel: 'Prog.', kind: 'service', term: 'Program Management',
            title: 'Coordinating projects that share a goal.',
            copy: 'A program brings together projects working toward a shared goal. When a result depends on several projects, their plans need to fit together. AGSIT coordinates deliverables, teams, and tasks that depend on each other, addressing problems in one project that could affect another.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: project leads coordinating deliverables and dependencies toward a shared goal',
          },
          {
            id: 'portfolio-management', navLabel: 'Port.', kind: 'service', term: 'Portfolio Management',
            title: 'Managing your initiatives as a whole.',
            copy: 'A portfolio brings together projects that compete for time, people, and budget. We review their goals, needs, and progress to recommend priorities and adjustments. You can allocate resources with the whole picture in view, instead of only responding to the day’s most urgent request.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: leaders allocating resources across initiatives based on goals and progress',
          },
          {
            id: 'method', navLabel: 'Method', kind: 'method', term: 'How we work',
            title: 'From goals to deliverables.',
            copy: 'We organize what needs to be achieved and support the work through to reviewing what was delivered.',
            steps: [
              { title: 'Clarify', copy: 'We agree on what the business needs and what an acceptable deliverable looks like.' },
              { title: 'Plan', copy: 'We organize activities, resources, and commitments.' },
              { title: 'Lead', copy: 'We coordinate the team and make the decisions needed to move the work forward.' },
              { title: 'Close', copy: 'We review deliverables and document open items and lessons learned.' },
            ],
          },
          {
            id: 'outcomes', navLabel: 'Results', kind: 'outcomes', term: 'What we aim for',
            title: 'Know what is being delivered and what needs attention.',
            copy: 'The work aims to give you a useful view of delivery and the next steps.',
            includesLabel: 'Your business gains',
            outcomes: [
              'Defined deliverables with clear owners.',
              'Dates and resources reviewed as work progresses.',
              'Dependencies addressed across teams.',
              'Decisions made with the full picture of your projects.',
            ],
          },
        ],
      },
    },
  },
  'pmo-governance': {
    es: {
      id: 'pmo-governance',
      slug: 'pmo-y-gobierno-de-proyectos',
      metadata: {
        title: 'PMO y Gobierno de Proyectos | AGSIT',
        description: 'Organiza tus proyectos con una PMO, prioridades compartidas y responsables claros. AGSIT te ayuda a decidir y dar seguimiento con reportes fáciles de entender.',
        canonicalUrl: `${origin}/direccion-de-proyectos/pmo-y-gobierno-de-proyectos/`,
        image: '/assets/social/pmo-y-gobierno-de-proyectos-es.jpg',
        imageAlt: 'AGSIT — PMO y Gobierno de Proyectos: prioridades y decisiones claras.',
        htmlLang: 'es-MX',
        locale: 'es_MX',
      },
      hero: {
        title: 'PMO y Gobierno de Proyectos',
        copy: 'Cuando varias áreas impulsan proyectos, necesitas saber qué va primero y quién decide. En AGSIT organizamos responsabilidades, prioridades y revisiones para que puedas dirigir el conjunto con información útil.',
        primaryCta: 'Hablemos de tus proyectos',
        visualLabel: 'Gobierno de proyectos',
      },
      story: {
        eyebrow: 'Dirección de Proyectos · Organización y decisiones',
        title: 'Una dirección común para tus proyectos',
        instruction: 'Elige un tema o avanza para conocerlo.',
        chapters: [
          {
            id: 'problem', navLabel: 'Reto', kind: 'problem', term: 'El reto',
            title: 'Cada área avanza, pero falta una dirección común.',
            copy: 'Las prioridades compiten, las decisiones se retrasan y los reportes cuentan historias distintas. Sin acuerdos compartidos, resulta difícil saber dónde intervenir. Te ayudamos a establecer cómo se decide y cómo se revisa el avance.',
          },
          {
            id: 'pmo', navLabel: 'PMO', kind: 'service', term: 'PMO',
            title: 'Una oficina que conecta a quienes dirigen los proyectos.',
            copy: 'Una PMO es la función que reúne y organiza la gestión de proyectos. AGSIT define sus responsabilidades, formas de trabajo e información de seguimiento. Así, tu empresa cuenta con un punto de coordinación y los equipos saben qué reportar y a quién acudir.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: equipo coordinando el seguimiento de proyectos desde una PMO',
          },
          {
            id: 'project-governance', navLabel: 'Proy.', kind: 'service', term: 'Project Governance',
            title: 'Quién decide y cómo se atienden los cambios.',
            copy: 'Es el conjunto de acuerdos para dirigir un proyecto. Establecemos quién autoriza, qué se revisa y cuándo debe intervenir la dirección. Tú ganas claridad para resolver bloqueos y valorar cambios antes de comprometer fechas o presupuesto.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: responsables revisando una decisión y sus efectos sobre un proyecto',
          },
          {
            id: 'portfolio-governance', navLabel: 'Port.', kind: 'service', term: 'Portfolio Governance',
            title: 'Criterios para elegir qué proyectos impulsar.',
            copy: 'Un portafolio reúne las iniciativas entre las que tu empresa debe distribuir sus recursos. Acordamos criterios para compararlas, autorizarlas y revisar sus prioridades. Esto te ayuda a decidir qué iniciar, mantener o posponer según los objetivos del negocio.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: dirección comparando iniciativas y recursos para acordar prioridades',
          },
          {
            id: 'program-governance', navLabel: 'Prog.', kind: 'service', term: 'Program Governance',
            title: 'Acuerdos para proyectos que dependen entre sí.',
            copy: 'Un programa agrupa proyectos que buscan un mismo objetivo. Definimos cómo se toman las decisiones que afectan al conjunto y quién responde por ellas. Así puedes atender conflictos entre proyectos sin perder de vista el propósito compartido.',
            imageStatus: 'pending',
            imageAlt: 'Espacio reservado: líderes coordinando decisiones entre proyectos con un objetivo compartido',
          },
          {
            id: 'method', navLabel: 'Método', kind: 'method', term: 'Cómo trabajamos',
            title: 'Acuerdos que se puedan aplicar.',
            copy: 'De las decisiones actuales a una forma de trabajo que tu equipo pueda sostener.',
            steps: [
              { title: 'Entender', copy: 'Revisamos cómo se toman hoy las decisiones y dónde se detienen.' },
              { title: 'Definir', copy: 'Acordamos responsabilidades, criterios de prioridad y revisiones.' },
              { title: 'Aplicar', copy: 'Ponemos el modelo en práctica con tu equipo.' },
              { title: 'Ajustar', copy: 'Corregimos lo que resulte confuso o difícil de sostener.' },
            ],
          },
          {
            id: 'outcomes', navLabel: 'Result.', kind: 'outcomes', term: 'Lo que buscamos',
            title: 'Una dirección que todos puedan seguir.',
            copy: 'Buscamos que tu empresa cuente con acuerdos útiles para dirigir sus proyectos.',
            includesLabel: 'Tu organización gana',
            outcomes: [
              'Criterios compartidos para priorizar iniciativas.',
              'Responsables identificados para cada decisión.',
              'Reportes de avance que todos entienden igual.',
              'Una forma acordada de resolver bloqueos.',
            ],
          },
        ],
      },
    },
    en: {
      id: 'pmo-governance',
      slug: 'pmo-project-governance',
      metadata: {
        title: 'PMO & Project Governance | AGSIT',
        description: 'Give your projects clear priorities and decision owners. AGSIT builds PMO and governance practices so teams can coordinate work and report progress clearly.',
        canonicalUrl: `${origin}/en/project-management/pmo-project-governance/`,
        image: '/assets/social/pmo-project-governance-en.jpg',
        imageAlt: 'AGSIT — PMO & Project Governance: clear priorities and decisions.',
        htmlLang: 'en',
        locale: 'en_US',
      },
      hero: {
        title: 'PMO & Project Governance',
        copy: 'When several teams run projects, you need to know what comes first and who decides. At AGSIT, we organize responsibilities, priorities, and reviews so you can oversee your projects with useful information.',
        primaryCta: 'Talk about your projects',
        visualLabel: 'Project governance',
      },
      story: {
        eyebrow: 'Project Management · Organization and decisions',
        title: 'A shared direction for your projects',
        instruction: 'Choose a topic or move forward to explore it.',
        chapters: [
          {
            id: 'problem', navLabel: 'Need', kind: 'problem', term: 'The challenge',
            title: 'Each team moves forward, but a shared direction is missing.',
            copy: 'Priorities compete, decisions take too long, and reports tell different stories. Without shared agreements, it is hard to know where to step in. We help you establish how decisions are made and how progress is reviewed.',
          },
          {
            id: 'pmo', navLabel: 'PMO', kind: 'service', term: 'PMO',
            title: 'An office that connects the people leading your projects.',
            copy: 'A PMO, or project management office, brings project management together. AGSIT defines its responsibilities, ways of working, and progress information. Your company gains a point of coordination, and teams know what to report and who to turn to.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: a team coordinating project reviews through a PMO',
          },
          {
            id: 'project-governance', navLabel: 'Proj.', kind: 'service', term: 'Project Governance',
            title: 'Who decides and how changes are handled.',
            copy: 'Project Governance sets the agreements for leading a project. We establish who approves decisions, what needs reviewing, and when leaders should step in. You gain clarity to resolve blockers and assess changes before committing time or money.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: project owners reviewing a decision and its effects on a project',
          },
          {
            id: 'portfolio-governance', navLabel: 'Port.', kind: 'service', term: 'Portfolio Governance',
            title: 'Criteria for choosing which projects to support.',
            copy: 'A portfolio brings together the initiatives that need a share of your resources. We agree on criteria to compare them, approve them, and review their priorities. This helps you decide what to start, continue, or postpone based on your business goals.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: leaders comparing initiatives and resources to agree on priorities',
          },
          {
            id: 'program-governance', navLabel: 'Prog.', kind: 'service', term: 'Program Governance',
            title: 'Agreements for projects that depend on each other.',
            copy: 'A program groups projects that share a goal. We define how decisions affecting the whole are made and who is responsible for them. You can address conflicts between projects while keeping their shared purpose in view.',
            imageStatus: 'pending',
            imageAlt: 'Reserved space: leaders coordinating decisions across projects with a shared goal',
          },
          {
            id: 'method', navLabel: 'Method', kind: 'method', term: 'How we work',
            title: 'Agreements your team can put into practice.',
            copy: 'From the way decisions are made today to a way of working your team can sustain.',
            steps: [
              { title: 'Understand', copy: 'We review how decisions are made today and where they stall.' },
              { title: 'Define', copy: 'We agree on responsibilities, priority criteria, and reviews.' },
              { title: 'Apply', copy: 'We put the model into practice with your team.' },
              { title: 'Adjust', copy: 'We fix what is confusing or difficult to sustain.' },
            ],
          },
          {
            id: 'outcomes', navLabel: 'Results', kind: 'outcomes', term: 'What we aim for',
            title: 'A direction everyone can follow.',
            copy: 'We aim to give your company useful agreements for leading its projects.',
            includesLabel: 'Your organization gains',
            outcomes: [
              'Shared criteria for prioritizing initiatives.',
              'A clear person responsible for each decision.',
              'Progress reports everyone understands the same way.',
              'An agreed way to resolve blockers.',
            ],
          },
        ],
      },
    },
  },
};

const familyPath: Record<SupportedLang, string> = {
  es: '/direccion-de-proyectos/',
  en: '/en/project-management/',
};

export function getProjectManagementDetailContent(lang: SupportedLang, id = 'pmo-governance') {
  const page = projectManagementDetailPages[id]?.[lang];
  if (!page) throw new Error(`Unknown project management page: ${id} (${lang})`);
  return page;
}

export function getProjectManagementDetailPages(lang: SupportedLang) {
  return Object.values(projectManagementDetailPages).map((page) => page[lang]);
}

export function getProjectManagementDetailPath(lang: SupportedLang, slug: string) {
  return `${familyPath[lang]}${slug}/`;
}

export function getProjectManagementDetailAlternatePath(lang: SupportedLang, slug: string) {
  const currentPage = getProjectManagementDetailPages(lang).find((page) => page.slug === slug);
  if (!currentPage) throw new Error(`Unknown project management slug: ${slug} (${lang})`);
  const otherLang: SupportedLang = lang === 'es' ? 'en' : 'es';
  const alternatePage = getProjectManagementDetailContent(otherLang, currentPage.id);
  return getProjectManagementDetailPath(otherLang, alternatePage.slug);
}
