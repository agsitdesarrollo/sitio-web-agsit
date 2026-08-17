import type { APIRoute } from 'astro';
import {
  BitrixConfigurationError,
  BitrixUpstreamError,
  ContactLeadValidationError,
  createBitrixLead,
  normalizeContactLeadInput,
} from '../../services/bitrixLeadService';
import type { ContactLeadInput } from '../../types/contactLead';

export const prerender = false;

const MAX_CONTACT_BODY_BYTES = 32 * 1024;

const getWebhookUrl = () => {
  const runtimeEnv = typeof process !== 'undefined' ? process.env : {};

  return (
    runtimeEnv.BITRIX_WEBHOOK_URL ||
    runtimeEnv.BITRIX ||
    import.meta.env.BITRIX_WEBHOOK_URL ||
    import.meta.env.BITRIX ||
    ''
  );
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

const formValuesToLeadInput = (getValue: (name: string) => string | FormDataEntryValue | null): Partial<ContactLeadInput> => ({
  name: String(getValue('name') || ''),
  lastName: String(getValue('lastName') || ''),
  phone: String(getValue('phone') || ''),
  email: String(getValue('email') || ''),
  company: String(getValue('company') || ''),
  message: String(getValue('message') || ''),
  pageUrl: String(getValue('pageUrl') || ''),
  pageTitle: String(getValue('pageTitle') || ''),
  website: String(getValue('website') || ''),
  utm: {
    source: String(getValue('utm[source]') || ''),
    medium: String(getValue('utm[medium]') || ''),
    campaign: String(getValue('utm[campaign]') || ''),
    content: String(getValue('utm[content]') || ''),
    term: String(getValue('utm[term]') || ''),
  },
});

function assertBodySize(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || '0');

  if (Number.isFinite(contentLength) && contentLength > MAX_CONTACT_BODY_BYTES) {
    throw new ContactLeadValidationError('El formulario excede el tama\u00f1o permitido.');
  }
}

async function readLimitedBody(request: Request) {
  const reader = request.body?.getReader();

  if (!reader) {
    return '';
  }

  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      total += value.byteLength;
      if (total > MAX_CONTACT_BODY_BYTES) {
        await reader.cancel();
        throw new ContactLeadValidationError('El formulario excede el tama\u00f1o permitido.');
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

async function readLeadInput(request: Request) {
  assertBodySize(request);
  const contentType = request.headers.get('content-type') || '';
  const body = await readLimitedBody(request);

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(body) as Partial<ContactLeadInput>;
    } catch {
      throw new ContactLeadValidationError('El formulario contiene datos inv\u00e1lidos.');
    }
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    const values = new URLSearchParams(body);
    return formValuesToLeadInput((name) => values.get(name));
  }

  throw new ContactLeadValidationError('El formato del formulario no es v\u00e1lido.');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const input = normalizeContactLeadInput(await readLeadInput(request));
    const result = await createBitrixLead(input, getWebhookUrl());

    return json({
      ok: true,
      leadId: result.leadId,
    });
  } catch (error) {
    if (error instanceof ContactLeadValidationError) {
      return json({ ok: false, message: error.message }, 400);
    }

    if (error instanceof BitrixConfigurationError) {
      console.error('Contact endpoint configuration error', { category: error.kind });
      return json({ ok: false, message: 'No fue posible procesar la solicitud.' }, 500);
    }

    if (error instanceof BitrixUpstreamError) {
      console.error('Contact endpoint upstream error', { category: error.kind, upstreamStatus: error.status });
      return json({ ok: false, message: 'No fue posible procesar la solicitud.' }, 502);
    }

    console.error('Contact endpoint unexpected error', { category: 'unexpected' });
    return json({ ok: false, message: 'No fue posible procesar la solicitud.' }, 500);
  }
};
