import type { APIRoute } from 'astro';
import { createBitrixLead, normalizeContactLeadInput } from '../../services/bitrixLeadService';
import type { ContactLeadInput } from '../../types/contactLead';

export const prerender = false;

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
    },
  });

const formDataToLeadInput = (formData: FormData): Partial<ContactLeadInput> => ({
  name: String(formData.get('name') || ''),
  lastName: String(formData.get('lastName') || ''),
  phone: String(formData.get('phone') || ''),
  email: String(formData.get('email') || ''),
  company: String(formData.get('company') || ''),
  message: String(formData.get('message') || ''),
  pageUrl: String(formData.get('pageUrl') || ''),
  pageTitle: String(formData.get('pageTitle') || ''),
  website: String(formData.get('website') || ''),
  utm: {
    source: String(formData.get('utm[source]') || ''),
    medium: String(formData.get('utm[medium]') || ''),
    campaign: String(formData.get('utm[campaign]') || ''),
    content: String(formData.get('utm[content]') || ''),
    term: String(formData.get('utm[term]') || ''),
  },
});

async function readLeadInput(request: Request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return (await request.json()) as Partial<ContactLeadInput>;
  }

  return formDataToLeadInput(await request.formData());
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
    const message = error instanceof Error ? error.message : 'No se pudo enviar el formulario.';

    return json(
      {
        ok: false,
        message,
      },
      message.includes('Falta configurar') ? 500 : 400,
    );
  }
};
