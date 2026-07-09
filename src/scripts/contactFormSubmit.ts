type ContactFormResponse = {
  ok?: boolean;
  leadId?: number;
  message?: string;
};

type ContactFormPayload = {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  pageUrl: string;
  pageTitle: string;
  website: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
  };
};

type ContactFieldName = 'name' | 'lastName' | 'phone' | 'email' | 'company' | 'message';

type ValidationMessageSet = Record<
  ContactFieldName,
  {
    required: string;
    invalid?: string;
    min?: string;
    max?: string;
  }
>;

type FieldValidationResult = {
  field: HTMLInputElement | HTMLTextAreaElement;
  message: string;
};

const personNameRegex = /^[\p{L}]+(?:[ '\.-][\p{L}]+)*$/u;
const phoneCharactersRegex = /^\+?[0-9][0-9\s().-]{7,19}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationMessagesByLang: Record<'es' | 'en', ValidationMessageSet> = {
  es: {
    name: {
      required: 'El nombre es obligatorio.',
      min: 'El nombre debe tener al menos 2 caracteres.',
      max: 'El nombre no puede superar 60 caracteres.',
      invalid: 'El nombre solo puede contener letras y separadores validos.',
    },
    lastName: {
      required: 'El apellido es obligatorio.',
      min: 'El apellido debe tener al menos 2 caracteres.',
      max: 'El apellido no puede superar 80 caracteres.',
      invalid: 'El apellido solo puede contener letras y separadores validos.',
    },
    phone: {
      required: 'El telefono es obligatorio.',
      invalid: 'Usa un telefono valido, por ejemplo +525512345678.',
    },
    email: {
      required: 'El email es obligatorio.',
      max: 'El email no puede superar 120 caracteres.',
      invalid: 'Agrega un email valido.',
    },
    company: {
      required: 'La compania es obligatoria.',
      min: 'La compania debe tener al menos 2 caracteres.',
      max: 'La compania no puede superar 120 caracteres.',
    },
    message: {
      required: 'El comentario es obligatorio.',
      min: 'El comentario debe tener al menos 10 caracteres.',
      max: 'El comentario no puede superar 1000 caracteres.',
    },
  },
  en: {
    name: {
      required: 'First name is required.',
      min: 'First name must be at least 2 characters.',
      max: 'First name cannot exceed 60 characters.',
      invalid: 'First name can only include letters and valid separators.',
    },
    lastName: {
      required: 'Last name is required.',
      min: 'Last name must be at least 2 characters.',
      max: 'Last name cannot exceed 80 characters.',
      invalid: 'Last name can only include letters and valid separators.',
    },
    phone: {
      required: 'Phone is required.',
      invalid: 'Use a valid phone number, for example +12025550123.',
    },
    email: {
      required: 'Email is required.',
      max: 'Email cannot exceed 120 characters.',
      invalid: 'Add a valid email address.',
    },
    company: {
      required: 'Company is required.',
      min: 'Company must be at least 2 characters.',
      max: 'Company cannot exceed 120 characters.',
    },
    message: {
      required: 'Message is required.',
      min: 'Message must be at least 10 characters.',
      max: 'Message cannot exceed 1000 characters.',
    },
  },
};

const getFieldValue = (formData: FormData, name: string) => String(formData.get(name) || '').trim();

const getUtmValue = (searchParams: URLSearchParams, name: string) => searchParams.get(name) || '';

const getValidationMessages = () => {
  const lang = document.documentElement.lang.toLowerCase();

  return lang.startsWith('en') ? validationMessagesByLang.en : validationMessagesByLang.es;
};

const setStatus = (form: HTMLFormElement, message: string, type: 'success' | 'error' | 'idle') => {
  const status = form.querySelector<HTMLElement>('[data-contact-status]');

  if (!status) {
    return;
  }

  status.textContent = message;
  status.dataset.status = type;
};

const getContactField = (form: HTMLFormElement, name: ContactFieldName) => {
  const field = form.elements.namedItem(name);

  return field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement ? field : null;
};

const setFieldError = (field: HTMLInputElement | HTMLTextAreaElement, message: string) => {
  field.setCustomValidity(message);
  field.toggleAttribute('aria-invalid', Boolean(message));
};

const validatePersonName = (
  field: HTMLInputElement | HTMLTextAreaElement,
  messages: ValidationMessageSet[ContactFieldName],
  minLength: number,
  maxLength: number,
) => {
  const value = field.value.trim();

  if (!value) {
    return messages.required;
  }

  if (value.length < minLength) {
    return messages.min || messages.required;
  }

  if (value.length > maxLength) {
    return messages.max || messages.required;
  }

  if (!personNameRegex.test(value)) {
    return messages.invalid || messages.required;
  }

  return '';
};

const validatePhone = (field: HTMLInputElement | HTMLTextAreaElement, messages: ValidationMessageSet['phone']) => {
  const value = field.value.trim();

  if (!value) {
    return messages.required;
  }

  if (!phoneCharactersRegex.test(value)) {
    return messages.invalid || messages.required;
  }

  const digitCount = value.replace(/\D/g, '').length;

  if (digitCount < 10 || digitCount > 15) {
    return messages.invalid || messages.required;
  }

  return '';
};

const validateEmail = (field: HTMLInputElement | HTMLTextAreaElement, messages: ValidationMessageSet['email']) => {
  const value = field.value.trim();

  if (!value) {
    return messages.required;
  }

  if (value.length > 120) {
    return messages.max || messages.required;
  }

  if (!emailRegex.test(value)) {
    return messages.invalid || messages.required;
  }

  return '';
};

const validateText = (
  field: HTMLInputElement | HTMLTextAreaElement,
  messages: ValidationMessageSet[ContactFieldName],
  minLength: number,
  maxLength: number,
) => {
  const value = field.value.trim();

  if (!value) {
    return messages.required;
  }

  if (value.length < minLength) {
    return messages.min || messages.required;
  }

  if (value.length > maxLength) {
    return messages.max || messages.required;
  }

  return '';
};

const validateContactField = (form: HTMLFormElement, name: ContactFieldName) => {
  const field = getContactField(form, name);
  const messages = getValidationMessages();

  if (!field) {
    return null;
  }

  const validators: Record<ContactFieldName, () => string> = {
    name: () => validatePersonName(field, messages.name, 2, 60),
    lastName: () => validatePersonName(field, messages.lastName, 2, 80),
    phone: () => validatePhone(field, messages.phone),
    email: () => validateEmail(field, messages.email),
    company: () => validateText(field, messages.company, 2, 120),
    message: () => validateText(field, messages.message, 10, 1000),
  };

  const message = validators[name]();
  setFieldError(field, message);

  return message ? { field, message } : null;
};

const validateContactForm = (form: HTMLFormElement) => {
  const fields: ContactFieldName[] = ['name', 'lastName', 'phone', 'email', 'company', 'message'];
  const errors = fields
    .map((fieldName) => validateContactField(form, fieldName))
    .filter((error): error is FieldValidationResult => Boolean(error));

  if (errors.length > 0) {
    setStatus(form, errors[0].message, 'error');
    errors[0].field.focus();
    errors[0].field.reportValidity();

    return false;
  }

  return true;
};

const buildPayload = (form: HTMLFormElement): ContactFormPayload => {
  const formData = new FormData(form);
  const searchParams = new URLSearchParams(window.location.search);

  return {
    name: getFieldValue(formData, 'name'),
    lastName: getFieldValue(formData, 'lastName'),
    phone: getFieldValue(formData, 'phone'),
    email: getFieldValue(formData, 'email'),
    company: getFieldValue(formData, 'company'),
    message: getFieldValue(formData, 'message'),
    pageUrl: window.location.href,
    pageTitle: document.title,
    website: getFieldValue(formData, 'website'),
    utm: {
      source: getUtmValue(searchParams, 'utm_source'),
      medium: getUtmValue(searchParams, 'utm_medium'),
      campaign: getUtmValue(searchParams, 'utm_campaign'),
      content: getUtmValue(searchParams, 'utm_content'),
      term: getUtmValue(searchParams, 'utm_term'),
    },
  };
};

export function initContactFormSubmissions(
  forms = Array.from(document.querySelectorAll<HTMLFormElement>('[data-contact-form]')),
) {
  forms.forEach((form) => {
    if (form.dataset.contactFormReady === 'true') {
      return;
    }

    form.dataset.contactFormReady = 'true';

    (['name', 'lastName', 'phone', 'email', 'company', 'message'] as ContactFieldName[]).forEach((fieldName) => {
      const field = getContactField(form, fieldName);

      field?.addEventListener('blur', () => {
        const error = validateContactField(form, fieldName);
        setStatus(form, error?.message || '', error ? 'error' : 'idle');
      });

      field?.addEventListener('input', () => {
        if (!field.hasAttribute('aria-invalid')) {
          return;
        }

        const error = validateContactField(form, fieldName);
        setStatus(form, error?.message || '', error ? 'error' : 'idle');
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!validateContactForm(form) || !form.reportValidity()) {
        return;
      }

      const submit = form.querySelector<HTMLButtonElement>('[data-contact-submit]');
      const originalSubmitText = submit?.textContent || '';

      submit?.setAttribute('disabled', 'true');
      if (submit) {
        submit.textContent = form.dataset.sendingText || originalSubmitText;
      }
      setStatus(form, '', 'idle');

      try {
        const response = await fetch(form.action || '/api/contact', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(buildPayload(form)),
        });
        const data = (await response.json()) as ContactFormResponse;

        if (!response.ok || !data.ok) {
          throw new Error(data.message || form.dataset.errorText || 'No se pudo enviar el formulario.');
        }

        form.reset();
        setStatus(form, form.dataset.successText || 'Solicitud enviada.', 'success');
        window.dispatchEvent(new CustomEvent('agsit:contact-submitted', { detail: { leadId: data.leadId } }));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : form.dataset.errorText || 'No se pudo enviar el formulario.';
        setStatus(form, message, 'error');
      } finally {
        submit?.removeAttribute('disabled');
        if (submit) {
          submit.textContent = originalSubmitText;
        }
      }
    });
  });
}
