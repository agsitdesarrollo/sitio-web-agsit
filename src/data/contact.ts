import type { SupportedLang } from '../i18n/ui';

export type ContactFormCopy = {
  name: string;
  namePlaceholder: string;
  lastName: string;
  lastNamePlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  companyPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
};

export type ContactCopy = {
  final: {
    title: string;
    copy: string;
  };
  direct: {
    label: string;
    title: string;
    copy: string;
  };
  drawer: {
    closeLabel: string;
    eyebrow: string;
    title: string;
    copy: string;
  };
  form: ContactFormCopy;
};

export const contactCopyByLang: Record<SupportedLang, ContactCopy> = {
  es: {
    final: {
      title: 'Hablemos de tu siguiente avance.',
      copy:
        'Agenda una asesoría sin costo para revisar tus prioridades, detectar oportunidades y definir el siguiente paso con claridad.',
    },
    direct: {
      label: 'Información de contacto',
      title: 'Contacto directo',
      copy: 'También puedes comunicarte con nuestro equipo por estos canales.',
    },
    drawer: {
      closeLabel: 'Cerrar formulario',
      eyebrow: 'Agenda una asesoría sin costo',
      title: 'Cuéntanos qué necesita tu empresa.',
      copy: 'Un especialista de AGSIT revisará tu solicitud para orientar el siguiente paso.',
    },
    form: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      lastName: 'Apellido',
      lastNamePlaceholder: 'Tu apellido',
      phone: 'Teléfono',
      phonePlaceholder: '+52',
      email: 'Email',
      emailPlaceholder: 'correo@empresa.com',
      company: 'Nombre de la compañía',
      companyPlaceholder: 'Empresa',
      message: 'Comentario',
      messagePlaceholder: 'Describe brevemente el proyecto o necesidad',
      submit: 'Solicitar asesoría',
    },
  },
  en: {
    final: {
      title: "Let's discuss your next move.",
      copy:
        'Schedule a free consultation to review your priorities, identify opportunities and define the next step with clarity.',
    },
    direct: {
      label: 'Contact information',
      title: 'Direct contact',
      copy: 'You can also contact our team through these channels.',
    },
    drawer: {
      closeLabel: 'Close form',
      eyebrow: 'Schedule a free consultation',
      title: 'Tell us what your company needs.',
      copy: 'An AGSIT specialist will review your request and guide the next step.',
    },
    form: {
      name: 'First name',
      namePlaceholder: 'Your first name',
      lastName: 'Last name',
      lastNamePlaceholder: 'Your last name',
      phone: 'Phone',
      phonePlaceholder: '+1',
      email: 'Email',
      emailPlaceholder: 'email@company.com',
      company: 'Company name',
      companyPlaceholder: 'Company',
      message: 'Message',
      messagePlaceholder: 'Briefly describe the project or need',
      submit: 'Request consultation',
    },
  },
};

export function getContactCopy(lang: SupportedLang) {
  return contactCopyByLang[lang];
}
