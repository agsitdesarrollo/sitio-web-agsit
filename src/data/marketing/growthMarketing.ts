import type { MarketingMedia, MarketingServiceContent } from '../../types/marketingService.types';
import type { SupportedLang } from '../../i18n/ui';
const pending = (id: string, es: string, en: string): MarketingMedia => ({
    src: `/assets/marketing/growth/${id}.webp`, alt: { es, en }, width: 800, height: 600, ratio: '4 / 3', pending: true,
});
const clouds = [
    pending('nube-izquierda', 'Nube azul que se abre hacia la izquierda', 'Blue cloud opening to the left'),
    pending('nube-derecha', 'Nube cian que se abre hacia la derecha', 'Cyan cloud opening to the right'),
];
const profileMedia = [
    pending('perfil-negocio', 'Ilustración de una persona al frente de un negocio pequeño', 'Illustration of a small business owner'),
    pending('perfil-empresa', 'Ilustración de una empresa que amplía su alcance', 'Illustration of a business expanding its reach'),
    pending('perfil-equipo', 'Ilustración de un equipo de marketing que organiza su plan', 'Illustration of a marketing team organizing its plan'),
];
const serviceMedia = [
    ['descubrimiento', 'Persona descubriendo contenido en su teléfono', 'Person discovering content on their phone'],
    ['consideracion', 'Persona evaluando opciones frente a su laptop', 'Person weighing options at their laptop'],
    ['seleccion', 'Equipo tomando una decisión frente a una pantalla', 'Team making a decision in front of a screen'],
    ['ascension', 'Persona completando una compra en línea', 'Person completing an online purchase'],
    ['lealtad', 'Cliente satisfecho usando su teléfono', 'Happy customer using their phone'],
].map(([stage, es, en]): MarketingMedia => ({ src: `/assets/estrategia-digital/etapa-${stage}.webp`, alt: { es, en }, width: 1200, height: 900, ratio: '4 / 3', pending: false }));
const content: Record<SupportedLang, MarketingServiceContent> = {
    es: {
        lang: 'es',
        metadata: { title: 'Growth Marketing y Estrategia Digital | AGSIT', description: 'Consigue más clientes con un plan claro. En AGSIT definimos a quién llegar, qué decirle y cómo convertir su interés en ventas para tu negocio.', canonicalUrl: 'https://agsit.com.mx/marketing-digital/growth-marketing-y-estrategia-digital/', image: '/assets/social/growth-marketing-y-estrategia-digital.jpg', imageAlt: 'Rutas luminosas que simbolizan crecimiento con dirección.', htmlLang: 'es-MX', locale: 'es_MX' },
        hero: { eyebrow: 'Growth Marketing + Estrategia Digital', lines: ['Crecimiento', 'con dirección'], seal: 'CON PLAN', copy: 'Te ayudamos a conseguir más clientes con un plan claro: a quién buscar, qué decirle y por dónde llegar.', cta: 'Hablemos de tu negocio', explore: 'Descubre el plan' },
        problems: { title: 'Crecer sin plan se nota', pause: 'Pausar movimiento', resume: 'Reanudar movimiento', rows: [
                [{ id: 'publico', before: 'Anuncios sin saber ', accent: 'a quién le hablas', after: '.' }, { id: 'ventas', before: 'Interesados que nunca llegan a ', accent: 'comprar', after: '.' }],
                [{ id: 'contenido', before: 'Publicaciones sin saber ', accent: 'qué funciona', after: '.' }, { id: 'canales', before: 'Canales que ', accent: 'no se hablan entre sí', after: '.' }],
            ] },
        solution: { eyebrow: 'Qué es Growth Marketing', title: 'Un plan para conectar y crecer', copy: 'Growth Marketing conecta lo que haces para atraer clientes, acompañarlos hasta la compra y darles razones para volver. Definimos contigo a quién llegar, qué decir y dónde estar. Después revisamos qué funciona y ajustamos el plan.', clouds },
        audience: { title: 'Tu negocio, tu siguiente paso', placeholder: 'Ilustración en preparación', profiles: [
                { id: 'negocio', title: 'Tienes un negocio pequeño', copy: 'Quieres conseguir más clientes y necesitas saber por dónde empezar y dónde conviene invertir.', media: profileMedia[0] },
                { id: 'empresa', title: 'Tu empresa ya vende', copy: 'Quieres llegar a más personas y dar seguimiento a cada interesado, desde el primer contacto hasta la compra.', media: profileMedia[1] },
                { id: 'equipo', title: 'Trabajas en marketing', copy: 'Necesitas un plan que conecte las campañas, el contenido y las ventas, con prioridades claras para tu equipo.', media: profileMedia[2] },
            ] },
        services: { title: 'Cinco formas de hacer crecer tu negocio', includes: 'Lo que incluye', items: [
                { id: 'estrategia', title: 'Estrategia digital', copy: 'Analizamos tu negocio y tu mercado para definir a quién llegar, qué decir y dónde invertir. Acordamos cómo medir las acciones y ajustar el plan.', includes: ['Clientes a los que quieres llegar', 'Mensajes y canales de inversión', 'Plan de acción y medición'], media: serviceMedia[0] },
                { id: 'recorrido', title: 'Recorrido del cliente', copy: 'Conectamos los pasos entre descubrir tu negocio, interesarse, comprar y volver. Así puedes reconocer dónde hace falta acompañar mejor a cada persona.', includes: ['Puntos de contacto', 'Mensajes en cada momento', 'Seguimiento antes y después de comprar'], media: serviceMedia[1] },
                { id: 'inteligencia', title: 'Inteligencia artificial', copy: 'Usamos herramientas inteligentes para entender mejor a tus clientes, adaptar los mensajes y apoyar la creación de contenido para tu negocio.', includes: ['Análisis de información de clientes', 'Mensajes según sus intereses', 'Apoyo para crear contenido'], media: serviceMedia[2] },
                { id: 'automatizacion', title: 'Automatización', copy: 'Organizamos mensajes, recordatorios y seguimientos para que se envíen a tiempo. Tu equipo puede dedicar más atención a las personas y a las ventas.', includes: ['Mensajes programados', 'Recordatorios', 'Seguimiento de personas interesadas'], media: serviceMedia[3] },
                { id: 'canales', title: 'Canales conectados', copy: 'Conectamos redes sociales, correo, sitio web y WhatsApp para dar continuidad a la conversación con tu cliente.', includes: ['Mensajes coherentes entre canales', 'Continuidad en la atención', 'Seguimiento entre puntos de contacto'], media: serviceMedia[4] },
            ] },
        navigation: { previous: 'Anterior', next: 'Siguiente', contact: 'Contacto', label: 'Recorrido del servicio' },
    },
    en: {
        lang: 'en',
        metadata: { title: 'Growth Marketing and Digital Strategy | AGSIT', description: 'Win more customers with a clear plan. At AGSIT we define who to reach, what to say and how to turn their interest into sales for your business.', canonicalUrl: 'https://agsit.com.mx/en/digital-marketing/growth-marketing-and-digital-strategy/', image: '/assets/social/growth-marketing-y-estrategia-digital.jpg', imageAlt: 'Luminous paths that represent growth with direction.', htmlLang: 'en', locale: 'en_US' },
        hero: { eyebrow: 'Growth Marketing + Digital Strategy', lines: ['Growth', 'with direction'], seal: 'WITH A PLAN', copy: 'We help you win more customers with a clear plan: who to look for, what to say and how to reach them.', cta: 'Let’s talk about your business', explore: 'Discover the plan' },
        problems: { title: 'Growing without a plan shows', pause: 'Pause movement', resume: 'Resume movement', rows: [
                [{ id: 'audience', before: 'Ads without knowing ', accent: 'who you’re talking to', after: '.' }, { id: 'sales', before: 'Interested people who never ', accent: 'make a purchase', after: '.' }],
                [{ id: 'content', before: 'Posts without knowing ', accent: 'what works', after: '.' }, { id: 'channels', before: 'Channels that ', accent: 'don’t talk to each other', after: '.' }],
            ] },
        solution: { eyebrow: 'What Growth Marketing means', title: 'A plan to connect and grow', copy: 'Growth Marketing connects what you do to attract customers, guide them to a purchase and give them reasons to return. Together, we define who to reach, what to say and where to be. Then we review what works and adjust the plan.', clouds },
        audience: { title: 'Your business, your next step', placeholder: 'Illustration in preparation', profiles: [
                { id: 'business', title: 'You run a small business', copy: 'You want more customers and need to know where to start and where to invest.', media: profileMedia[0] },
                { id: 'company', title: 'Your company already sells', copy: 'You want to reach more people and follow up with every interested person, from first contact to purchase.', media: profileMedia[1] },
                { id: 'team', title: 'You work in marketing', copy: 'You need a plan that connects campaigns, content and sales, with clear priorities for your team.', media: profileMedia[2] },
            ] },
        services: { title: 'Five ways to grow your business', includes: 'What’s included', items: [
                { id: 'strategy', title: 'Digital strategy', copy: 'We study your business and market to define who to reach, what to say and where to invest. We agree on how to measure actions and adjust the plan.', includes: ['Customers you want to reach', 'Messages and channels to invest in', 'Action plan and measurement'], media: serviceMedia[0] },
                { id: 'journey', title: 'Customer journey', copy: 'We connect the steps between discovering your business, showing interest, buying and returning. You can see where each person needs better support.', includes: ['Points of contact', 'Messages at each stage', 'Follow-up before and after a purchase'], media: serviceMedia[1] },
                { id: 'intelligence', title: 'Artificial intelligence', copy: 'We use smart tools to understand your customers better, adapt messages and support content creation for your business.', includes: ['Analysis of customer information', 'Messages matched to their interests', 'Support for creating content'], media: serviceMedia[2] },
                { id: 'automation', title: 'Automation', copy: 'We organize messages, reminders and follow-ups so they go out on time. Your team can give more attention to people and sales.', includes: ['Scheduled messages', 'Reminders', 'Follow-up with interested people'], media: serviceMedia[3] },
                { id: 'channels', title: 'Connected channels', copy: 'We connect social media, email, your website and WhatsApp to keep the conversation with your customer going.', includes: ['Consistent messages across channels', 'Continuity in customer care', 'Follow-up across points of contact'], media: serviceMedia[4] },
            ] },
        navigation: { previous: 'Previous', next: 'Next', contact: 'Contact', label: 'Service journey' },
    },
};
export const getGrowthMarketingContent = (lang: SupportedLang) => content[lang];
