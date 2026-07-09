import { z } from 'astro/zod';
import type { BitrixLeadResult, ContactLeadInput } from '../types/contactLead';

type BitrixLeadFields = Record<string, string | Array<Record<string, string>>>;

type BitrixLeadResponse = {
  result?: number;
  error?: string;
  error_description?: string;
};

const trim = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const optionalField = (value: string) => (value ? value : undefined);

const personNameRegex = /^[\p{L}]+(?:[ '\.-][\p{L}]+)*$/u;
const phoneCharactersRegex = /^\+?[0-9][0-9\s().-]{7,19}$/;

const requiredText = (minLength: number, maxLength: number, minMessage: string, maxMessage: string) =>
  z.string().min(minLength, minMessage).max(maxLength, maxMessage);

const requiredPersonName = z
  .string()
  .min(2, 'El apellido debe tener al menos 2 caracteres.')
  .max(80, 'El apellido no puede superar 80 caracteres.')
  .regex(personNameRegex, 'El apellido solo puede contener letras y separadores validos.');

const contactLeadSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(60, 'El nombre no puede superar 60 caracteres.')
    .regex(personNameRegex, 'El nombre solo puede contener letras y separadores validos.'),
  lastName: requiredPersonName,
  phone: z
    .string()
    .min(8, 'El telefono es obligatorio.')
    .max(20, 'El telefono no puede superar 20 caracteres.')
    .refine((value) => phoneCharactersRegex.test(value), 'El telefono tiene un formato invalido.')
    .refine((value) => {
      const digitCount = value.replace(/\D/g, '').length;

      return digitCount >= 10 && digitCount <= 15;
    }, 'El telefono debe tener entre 10 y 15 digitos.'),
  email: z.email('Agrega un email valido.').max(120, 'El email no puede superar 120 caracteres.'),
  company: requiredText(2, 120, 'La compania es obligatoria.', 'La compania no puede superar 120 caracteres.'),
  message: requiredText(10, 1000, 'El comentario debe tener al menos 10 caracteres.', 'El comentario no puede superar 1000 caracteres.'),
  pageUrl: z.union([z.literal(''), z.url('La URL de origen es invalida.')]).default(''),
  pageTitle: z.string().max(200, 'El titulo de pagina no puede superar 200 caracteres.').default(''),
  website: z.string().max(200).default(''),
  utm: z
    .object({
      source: z.string().max(120, 'utm_source no puede superar 120 caracteres.').default(''),
      medium: z.string().max(120, 'utm_medium no puede superar 120 caracteres.').default(''),
      campaign: z.string().max(120, 'utm_campaign no puede superar 120 caracteres.').default(''),
      content: z.string().max(120, 'utm_content no puede superar 120 caracteres.').default(''),
      term: z.string().max(120, 'utm_term no puede superar 120 caracteres.').default(''),
    })
    .default({}),
});

const removeEmptyFields = (fields: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined && value !== '')) as BitrixLeadFields;

const buildBitrixMethodUrl = (webhookUrl: string) => {
  const trimmedWebhook = webhookUrl.trim().replace(/\/+$/, '');

  if (/\/crm\.lead\.add(?:\.json)?$/i.test(trimmedWebhook)) {
    return trimmedWebhook;
  }

  return `${trimmedWebhook}/crm.lead.add.json`;
};

export function normalizeContactLeadInput(input: Partial<ContactLeadInput>): ContactLeadInput {
  return {
    name: trim(input.name),
    lastName: trim(input.lastName),
    phone: trim(input.phone),
    email: trim(input.email),
    company: trim(input.company),
    message: trim(input.message),
    pageUrl: trim(input.pageUrl),
    pageTitle: trim(input.pageTitle),
    website: trim(input.website),
    utm: {
      source: trim(input.utm?.source),
      medium: trim(input.utm?.medium),
      campaign: trim(input.utm?.campaign),
      content: trim(input.utm?.content),
      term: trim(input.utm?.term),
    },
  };
}

export function validateContactLead(input: ContactLeadInput) {
  if (input.website) {
    return;
  }

  const result = contactLeadSchema.safeParse(input);

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || 'Revisa los campos del formulario.');
  }
}

function buildLeadFields(input: ContactLeadInput) {
  const fullName = [input.name, input.lastName].filter(Boolean).join(' ');
  const titleSubject = input.company || fullName || input.email || input.phone || 'Nuevo contacto';
  const comments = [
    input.message,
    input.pageTitle ? `Pagina: ${input.pageTitle}` : '',
    input.pageUrl ? `URL: ${input.pageUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  return removeEmptyFields({
    TITLE: `Sitio web AGSIT - ${titleSubject}`,
    NAME: optionalField(input.name),
    LAST_NAME: optionalField(input.lastName || ''),
    COMPANY_TITLE: optionalField(input.company || ''),
    STATUS_ID: 'NEW',
    OPENED: 'Y',
    SOURCE_ID: 'WEB',
    SOURCE_DESCRIPTION: 'Formulario de contacto del sitio web AGSIT',
    COMMENTS: optionalField(comments),
    PHONE: input.phone ? [{ VALUE: input.phone, VALUE_TYPE: 'WORK' }] : undefined,
    EMAIL: input.email ? [{ VALUE: input.email, VALUE_TYPE: 'WORK' }] : undefined,
    UTM_SOURCE: optionalField(input.utm?.source || ''),
    UTM_MEDIUM: optionalField(input.utm?.medium || ''),
    UTM_CAMPAIGN: optionalField(input.utm?.campaign || ''),
    UTM_CONTENT: optionalField(input.utm?.content || ''),
    UTM_TERM: optionalField(input.utm?.term || ''),
  });
}

export async function createBitrixLead(input: ContactLeadInput, webhookUrl: string): Promise<BitrixLeadResult> {
  validateContactLead(input);

  if (input.website) {
    return { leadId: 0 };
  }

  if (!webhookUrl) {
    throw new Error('Falta configurar BITRIX_WEBHOOK_URL.');
  }

  const response = await fetch(buildBitrixMethodUrl(webhookUrl), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: buildLeadFields(input),
      params: {
        REGISTER_SONET_EVENT: 'Y',
      },
    }),
  });

  let data: BitrixLeadResponse;

  try {
    data = (await response.json()) as BitrixLeadResponse;
  } catch {
    throw new Error('Bitrix regreso una respuesta invalida.');
  }

  if (!response.ok || data.error) {
    throw new Error(data.error_description || data.error || 'No se pudo crear el prospecto en Bitrix.');
  }

  if (typeof data.result !== 'number') {
    throw new Error('Bitrix no regreso el ID del prospecto creado.');
  }

  return { leadId: data.result };
}
