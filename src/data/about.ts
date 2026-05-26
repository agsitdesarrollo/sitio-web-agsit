export type WordToken = {
  text: string;
  emphasis?: 'underline' | 'glow' | 'scale' | 'highlight';
};

export type AboutService = {
  number: string;
  code: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
};

export type ClientLogo = {
  label: string;
  src: string;
};

export const aboutServices: AboutService[] = [
  {
    number: '01',
    code: 'ITS',
    label: 'Information Technologies Solutions',
      title: 'Soluciones Tecnológicas',
      description:
      'Arquitectura, software, infraestructura, inteligencia artificial y ciberseguridad para acelerar la transformación digital.',
    tags: ['ITIL', 'Cloud', 'Desarrollo de software', 'IA & Big Data'],
    image: '/assets/servicios.webm',
    alt: 'Visual de soluciones tecnológicas',
  },
  {
    number: '02',
    code: 'BPM',
    label: 'Business Process Management',
    title: 'Administración de Procesos',
    description:
      'Análisis, documentación y optimización de procesos para mejorar eficiencia, control operativo y rentabilidad.',
    tags: ['AS-IS / TO-BE', 'BPMS Automation', 'KPIs operativos', 'Auditoría'],
    image: '/assets/servicios.webm',
    alt: 'Visual de administración de procesos',
  },
  {
    number: '03',
    code: 'DM',
    label: 'Digital Marketing',
    title: 'Mercadotecnia Digital',
    description: 'Estrategias digitales integrales para generar demanda, posicionamiento, conversión y resultados medibles.',
    tags: ['SEO & SEM', 'Social Media', 'E-commerce', 'Analytics'],
    image: '/assets/servicios.webm',
    alt: 'Visual de mercadotecnia digital',
  },
  {
    number: '04',
    code: 'PM',
    label: 'Project Management',
    title: 'Dirección de Proyectos',
    description:
      'Gestión profesional de proyectos, PMOs y metodologías ágiles o waterfall para cumplir tiempos y presupuesto.',
    tags: ['PMO', 'Scrum & Agile', 'OPM3', 'PMP'],
    image: '/assets/servicios.webm',
    alt: 'Visual de dirección de proyectos',
  },
  {
    number: '05',
    code: 'QM',
    label: 'Quality Management',
    title: 'Gestión de Calidad',
    description:
      'Sistemas de calidad, mejora continua, auditorías y modelos de madurez para elevar estándares operativos.',
    tags: ['ISO 9001', 'CMMI', 'Mejora continua', 'Auditorías'],
    image: '/assets/servicios.webm',
    alt: 'Visual de gestión de calidad',
  },
  {
    number: '06',
    code: 'SPM',
    label: 'Strategic Planning & Management',
    title: 'Planeación Estratégica',
    description:
      'Definición de objetivos, diagnóstico empresarial, gobierno corporativo y tableros para orientar el crecimiento.',
    tags: ['Plan estratégico', 'Gobierno corporativo', 'KPIs & Dashboards', 'Franquicia'],
    image: '/assets/servicios.webm',
    alt: 'Visual de planeación estratégica',
  },
];

export const clientLogos: ClientLogo[] = [
  { label: '01', src: 'https://agsit.com.mx/wp-content/uploads/2023/01/imageedit_6_4472145671.png' },
  { label: '02', src: 'https://agsit.com.mx/wp-content/uploads/2023/01/imageedit_3_3365397207.png' },
  { label: '03', src: 'https://agsit.com.mx/wp-content/uploads/2023/01/imageedit_13_6856746062.png' },
  { label: '04', src: 'https://agsit.com.mx/wp-content/uploads/2023/03/Elektra.png' },
  { label: '05', src: 'https://agsit.com.mx/wp-content/uploads/2023/05/imageedit_2_7727411694-1024x527.webp' },
  { label: '06', src: 'https://agsit.com.mx/wp-content/uploads/2023/11/CarolinaHerreraLogo.png' },
  { label: '07', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Alebrije-1.jpg' },
  { label: '08', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Alsea-1.jpg' },
  { label: '09', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Gobierno_CDMX-1.jpg' },
  { label: '10', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/AutomationSolutionsFactory-1.jpg' },
  {
    label: '11',
    src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Seguridad-en-arrendamiento-y-adquisiciones-1.jpg',
  },
  { label: '12', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/SUMA_empresarial-1.jpg' },
  { label: '13', src: 'https://agsit.com.mx/wp-content/uploads/2020/04/Tubepol-1.jpg' },
  { label: '14', src: 'https://agsit.com.mx/wp-content/uploads/2021/11/VC-Logo.webp' },
  { label: '15', src: 'https://agsit.com.mx/wp-content/uploads/2021/11/AGSIT-Aldrete-Asociados-1.webp' },
];
