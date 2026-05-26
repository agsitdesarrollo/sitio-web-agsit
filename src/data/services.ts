export type ServiceItem = {
  title: string;
};

export type ServicePoint = {
  icon: 'layers' | 'team' | 'trend' | 'root';
  title: string;
  description: string;
};

export const services: ServiceItem[] = [
  { title: 'Planeación Estratégica' },
  { title: 'Dirección de Proyectos' },
  { title: 'Soluciones Tecnológicas' },
  { title: 'Administración de Procesos' },
  { title: 'Gestión de Calidad' },
  { title: 'Mercadotecnia Digital' },
];

export const servicePoints: ServicePoint[] = [
  {
    icon: 'layers',
    title: 'Enfoque integral y multidisciplinario',
    description:
      'Reunimos equipos especializados en cada área clave: estrategia, proyectos, tecnología, procesos, calidad y marketing trabajando de manera coordinada para su empresa.',
  },
  {
    icon: 'team',
    title: 'Equipo alineado con estándares globales',
    description:
      'Nuestro equipo opera bajo los más altos estándares con metodologías de validez internacional probadas en empresas líderes.',
  },
  {
    icon: 'trend',
    title: 'Resultados medibles desde el primer mes',
    description:
      'No entregamos informes y desaparecemos. Permanecemos activos hasta que los resultados se consolidan y su equipo tiene la autonomía para sostenerlos.',
  },
  {
    icon: 'root',
    title: 'Soluciones de raíz, no parches temporales',
    description:
      'Identificamos la causa real de cada problema. Nuestros clientes dejan de gastar en proyectos fallidos y comienzan a ver impacto directo en su rentabilidad.',
  },
];
