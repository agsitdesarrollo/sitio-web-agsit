# Planeación Estratégica: textos propuestos de las terciarias

Estado: propuesta para aprobación de textos y rutas. Fecha: 10 de noviembre de 2026.

## Revisión de la implementación actual

Referencias: `src/components/strategic-planning-detail/`, `src/types/strategicPlanningDetail.types.ts`, `src/data/strategicPlanningDetail.ts`, las dos páginas de Corporativa y `src/data/serviceTemplatePages.ts`.

- `StrategicPlanningDetailPage`, `StrategicPlanningHero` y `StrategicPlanningMedia` reciben el contenido por propiedades. Se pueden reutilizar tal cual, junto con su CSS y su controlador de scroll. No se necesitan componentes nuevos ni cambios de diseño.
- El tipo `StrategicPlanningDetailContent` ya cubre las cuatro páginas: SEO, portada, narrativa, recorrido de tarjetas y sección de trabajo. Las tarjetas y los pasos son arreglos; el contador y el controlador usan la cantidad de tarjetas. Esta propuesta conserva cinco tarjetas y cuatro pasos por página, como Corporativa.
- El ajuste necesario está en los datos y tipos: ampliar `StrategicPlanningServiceId`, `strategicPlanningServiceRoutes` y `strategicPlanningDetailCatalog` con los cuatro servicios y ambos idiomas.
- La función auxiliar `media()` fija hoy la carpeta `corporativa/`. Para los nuevos servicios basta permitir una carpeta por servicio o proporcionar objetos de imagen con su propia ruta. Se conserva `pending: true`, las cinco imágenes 4:3 y la imagen de trabajo 4:5.
- El identificador interno `corporate-planning-title` está fijo en el contenedor. No impide reutilizarlo: cada documento muestra una sola página y el vínculo accesible coincide. Volverlo genérico sería opcional, sin efecto visual; no es necesario para crear las páginas.
- El documento `docs/assets-pendientes-planeacion.md` describe una revisión anterior. El código actual de `StrategicPlanningMedia.astro` ya asigna `js-sp-method-img` al espacio reservado cuando recibe `parallax`. Las notas anteriores no deben tomarse como prueba de un error actual; el comportamiento se verificará al implementar.
- La sección final recibe `getContactCopy(lang)`. Se conserva su contenido existente, así como el formulario y los datos de contacto. Los textos comunes se reproducen abajo para dejar explícito el cierre de cada página.

## Base de contenido en la secundaria

La secundaria obtiene sus textos de `strategicPlanningTemplateByLang` en `src/data/serviceTemplatePages.ts`. Hoy solo la tarjeta STRAT agrega el enlace a Corporativa desde las páginas de la secundaria.

| Servicio / código / etiqueta | Qué dice hoy en español | Qué dice hoy en inglés |
| --- | --- | --- |
| Diagnóstico Estratégico / ASSESS / Assessment | Analizamos la situación actual de tu empresa para identificar oportunidades y definir prioridades que orienten las siguientes decisiones. | We analyze your company’s current situation to identify opportunities and define priorities that guide the next decisions. |
| Gobierno Corporativo / GOV / Governance | Fortalecemos la estructura de dirección de tu empresa para facilitar decisiones claras, responsabilidades definidas y seguimiento a los objetivos. | We strengthen your company’s leadership structure to enable clear decisions, defined responsibilities and follow-up on objectives. |
| Crecimiento Empresarial / GROWTH / Growth | Diseñamos estrategias de crecimiento para ampliar las oportunidades de tu empresa, desarrollar nuevos mercados y fortalecer su modelo de negocio. | We design growth strategies to expand your company’s opportunities, develop new markets and strengthen its business model. |
| Transformación Empresarial / TRANS / Transformation | Acompañamos la transformación de tu empresa integrando estrategia, innovación y cambio para prepararla ante nuevas oportunidades. | We support your company’s transformation by integrating strategy, innovation and change to prepare it for new opportunities. |

El resto de la secundaria aporta contexto: situación interna y externa, capacidades, riesgos, oportunidades, responsabilidades, revisión de resultados, mercados y nuevas líneas de negocio. Los textos siguientes desarrollan esos temas con lenguaje cotidiano. Los cinco puntos de cada recorrido explican el servicio; no se presentan como una metodología registrada ni como resultados garantizados.

## Rutas propuestas

Todas conservan la jerarquía de Corporativa y la barra final. El nombre público inglés de Diagnóstico será **Strategic Assessment**, una expresión natural para la revisión del negocio y coherente con la etiqueta Assessment del catálogo. La secundaria usa hoy **Strategic Diagnosis**; al enlazar esa tarjeta se propone unificar su título a **Strategic Assessment**, conservando su descripción.

| Servicio | Español | Inglés |
| --- | --- | --- |
| Diagnóstico Estratégico | `/planeacion-estrategica/diagnostico-estrategico/` | `/en/strategic-planning/strategic-assessment/` |
| Gobierno Corporativo | `/planeacion-estrategica/gobierno-corporativo/` | `/en/strategic-planning/corporate-governance/` |
| Crecimiento Empresarial | `/planeacion-estrategica/crecimiento-empresarial/` | `/en/strategic-planning/business-growth/` |
| Transformación Empresarial | `/planeacion-estrategica/transformacion-empresarial/` | `/en/strategic-planning/business-transformation/` |

## Convenciones de contenido

Cada idioma sigue exactamente el orden de Corporativa: portada con un H1 en dos líneas; narrativa sin encabezado visible; «Lo que incluye» con introducción y cinco tarjetas; «Cómo trabajamos contigo» con introducción y cuatro pasos; contacto final compartido. Los rótulos editoriales de este documento no agregan secciones a las páginas.

Los textos de narrativa se usarán completos en su etiqueta accesible. Las palabras indicadas en negritas se corresponden con los segmentos de énfasis tipográfico del componente; las negritas no son texto adicional. Los demás textos accesibles y las etiquetas de imágenes se detallan al final.

## 1. Diagnóstico Estratégico — Español

### SEO

- Título: Diagnóstico Estratégico | AGSIT
- Descripción: Conoce qué frena a tu empresa y dónde puede avanzar. En AGSIT revisamos tu negocio contigo para definir prioridades y tomar decisiones con más claridad.

### Portada

- Antetítulo: Diagnóstico Estratégico
- H1, primera línea: Entiende tu negocio
- H1, segunda línea: para decidir mejor
- Texto: Identificamos contigo qué funciona, qué frena a tu empresa y qué oportunidades conviene atender primero.

### Narrativa

Cuando los problemas del día a día ocupan toda tu atención, cuesta ver qué necesita cambiar. Una **mirada completa** de tu empresa ayuda a distinguir las **causas** y decidir dónde **actuar primero**.

### Lo que incluye

- Título: Cinco puntos para entender dónde estás.
- Texto: Revisamos tu empresa y su entorno para que tengas una base clara al decidir qué atender y qué aprovechar.

#### 01. Situación actual

- Subtítulo: Una visión del negocio completo
- Texto: Revisamos cómo trabaja tu empresa y qué resultados obtiene. Así puedes ver dónde hay avances y dónde se repiten los problemas.

#### 02. Fortalezas

- Subtítulo: Lo que te ayuda a competir
- Texto: Identificamos qué hace bien tu empresa y con qué recursos cuenta. Reconocerlo te ayuda a cuidar lo que funciona y aprovecharlo mejor.

#### 03. Obstáculos

- Subtítulo: Lo que frena tus resultados
- Texto: Revisamos dónde se atora el trabajo y qué le falta al equipo para avanzar. Distinguimos las causas de los problemas que ves todos los días.

#### 04. Entorno

- Subtítulo: Lo que cambia fuera de tu empresa
- Texto: Analizamos cambios en clientes, competencia y mercado. Identificamos oportunidades y riesgos que conviene considerar antes de decidir.

#### 05. Prioridades

- Subtítulo: Dónde actuar primero
- Texto: Ordenamos los hallazgos según lo que necesita tu negocio. Acordamos qué atender primero y qué decisiones requieren más información.

### Cómo trabajamos contigo

- Título: Claridad para tu siguiente decisión.
- Texto: Escuchamos tu perspectiva y revisamos la información de tu empresa para acordar dónde concentrar los esfuerzos.

1. **Escuchar tus inquietudes.** Partimos de lo que te preocupa y de las decisiones que necesitas tomar.
2. **Revisar el negocio.** Contrastamos tu visión con la información disponible y la experiencia del equipo.
3. **Entender las causas.** Conectamos los hallazgos para explicar qué ayuda y qué frena a tu empresa.
4. **Acordar prioridades.** Definimos contigo qué atender primero y qué conviene revisar con más detalle.

### Contacto final compartido

- Título: Hablemos de tu siguiente avance.
- Texto: Agenda una asesoría sin costo para revisar tus prioridades, detectar oportunidades y definir el siguiente paso con claridad.
- Formulario y contacto directo: contenido común existente, sin cambios; véase «Textos comunes».

## 1. Strategic Assessment — English

### SEO

- Title: Strategic Assessment | AGSIT
- Description: Understand what is holding your business back and where it can move forward. AGSIT helps you set priorities and make more informed decisions.

### Hero

- Eyebrow: Strategic Assessment
- H1, first line: Know your business
- H1, second line: make better decisions
- Copy: We help you see what works, what holds your business back and which opportunities deserve your attention first.

### Narrative

When daily problems demand all your attention, it is hard to see what needs to change. A **full view** of your business helps you understand the **causes** and decide where to **act first**.

### What is included

- Title: Five areas to understand where you stand.
- Copy: We review your business and its market so you have a clear basis for deciding what to address and where to find opportunities.

#### 01. Current position

- Subtitle: A view of the whole business
- Copy: We review how your business works and the results it achieves. You can see where you are making progress and where problems keep returning.

#### 02. Strengths

- Subtitle: What helps you compete
- Copy: We identify what your business does well and the resources it can draw on. This helps you protect what works and make better use of it.

#### 03. Obstacles

- Subtitle: What holds you back
- Copy: We look at where work gets stuck and what your team needs to move forward. We separate the underlying causes from the problems you see every day.

#### 04. Business environment

- Subtitle: What is changing around you
- Copy: We examine changes in customers, competitors and the market. We identify opportunities and risks to consider before making a decision.

#### 05. Priorities

- Subtitle: Where to act first
- Copy: We organise the findings around your business needs. Together we decide what to address first and which decisions need more information.

### How we work with you

- Title: Clarity for your next decision.
- Copy: We listen to your perspective and review your business information to agree on where to focus your efforts.

1. **Hear your concerns.** We start with what matters to you and the decisions you need to make.
2. **Review the business.** We consider your perspective alongside the available information and your team’s experience.
3. **Understand the causes.** We connect the findings to explain what helps your business and what holds it back.
4. **Agree on priorities.** Together we decide what to address first and what needs a closer look.

### Shared final contact

- Title: Let's discuss your next move.
- Copy: Schedule a free consultation to review your priorities, identify opportunities and define the next step with clarity.
- Form and direct contact: existing shared content, unchanged; see “Textos comunes”.

## 2. Gobierno Corporativo — Español

### SEO

- Título: Gobierno Corporativo | AGSIT
- Descripción: Define quién decide, quién responde y cómo revisar los avances de tu empresa. En AGSIT te ayudamos a dirigir con responsabilidades y acuerdos claros.

### Portada

- Antetítulo: Gobierno Corporativo
- H1, primera línea: Decisiones claras
- H1, segunda línea: para dirigir mejor
- Texto: Definimos contigo quién toma cada decisión, quién responde por los acuerdos y cómo revisar el avance de tu empresa.

### Narrativa

Cuando las decisiones dependen siempre de la misma persona, el trabajo se detiene. Las **responsabilidades claras** y los **acuerdos compartidos** ayudan a tu equipo a actuar y a la dirección a mantener el **control**.

### Lo que incluye

- Título: Cinco bases para una dirección clara.
- Texto: Ordenamos las decisiones, las responsabilidades y la revisión de resultados para que dirigir no dependa de resolver todo personalmente.

#### 01. Dirección

- Subtítulo: Quién decide sobre cada tema
- Texto: Aclaramos qué decisiones corresponden a los dueños, a la dirección y a cada responsable. Así los asuntos llegan a quien puede resolverlos.

#### 02. Responsabilidades

- Subtítulo: Cada acuerdo tiene un responsable
- Texto: Definimos quién responde por cada compromiso y qué puede decidir. El equipo sabe qué se espera de su trabajo y cuándo pedir apoyo.

#### 03. Acuerdos

- Subtítulo: Reglas claras para trabajar juntos
- Texto: Acordamos cómo presentar propuestas, tomar decisiones y dejar constancia de lo decidido. Esto ayuda a evitar confusiones y asuntos sin resolver.

#### 04. Resultados

- Subtítulo: Información útil para dirigir
- Texto: Definimos qué resultados necesita revisar la dirección. Reunimos la información relevante para ver avances y detectar problemas a tiempo.

#### 05. Seguimiento

- Subtítulo: Decisiones que llegan a la acción
- Texto: Organizamos la revisión de compromisos y resultados. Así puedes saber qué se cumplió, qué requiere apoyo y qué necesita una nueva decisión.

### Cómo trabajamos contigo

- Título: Orden para dirigir y dar seguimiento.
- Texto: Partimos de cómo se toman hoy las decisiones y acordamos una forma de trabajar que tu equipo pueda sostener.

1. **Entender cómo decides.** Revisamos quién participa, dónde se atoran los asuntos y qué información falta.
2. **Aclarar responsabilidades.** Acordamos quién decide, quién participa y quién responde por cada compromiso.
3. **Definir los acuerdos.** Establecemos cómo documentar decisiones y compartir la información necesaria.
4. **Organizar la revisión.** Definimos cómo revisar resultados, atender pendientes y ajustar las decisiones.

### Contacto final compartido

- Título: Hablemos de tu siguiente avance.
- Texto: Agenda una asesoría sin costo para revisar tus prioridades, detectar oportunidades y definir el siguiente paso con claridad.
- Formulario y contacto directo: contenido común existente, sin cambios; véase «Textos comunes».

## 2. Corporate Governance — English

### SEO

- Title: Corporate Governance | AGSIT
- Description: Clarify who makes decisions, who is accountable and how progress is reviewed. AGSIT helps you lead with clear responsibilities and agreements.

### Hero

- Eyebrow: Corporate Governance
- H1, first line: Clear decisions
- H1, second line: stronger leadership
- Copy: We help you define who makes each decision, who is responsible for carrying it out and how to review your company’s progress.

### Narrative

When every decision depends on one person, work slows down. **Clear responsibilities** and **shared agreements** help your team act while giving leadership the **oversight** it needs.

### What is included

- Title: Five foundations for clearer leadership.
- Copy: We organise decisions, responsibilities and reviews so you can lead without having to handle every issue yourself.

#### 01. Leadership roles

- Subtitle: Who decides on each issue
- Copy: We clarify which decisions belong to owners, senior leaders and individual managers. Issues reach the person who can resolve them.

#### 02. Responsibilities

- Subtitle: Someone accountable for each commitment
- Copy: We define who is responsible for each commitment and what they can decide. Your team knows what is expected and when to ask for support.

#### 03. Agreements

- Subtitle: Clear rules for working together
- Copy: We agree on how to bring forward proposals, make decisions and record what was agreed. This helps prevent confusion and unresolved issues.

#### 04. Results

- Subtitle: Information that supports decisions
- Copy: We define which results leadership needs to review. We bring together relevant information to see progress and spot problems early.

#### 05. Follow-through

- Subtitle: Turning decisions into action
- Copy: We organise reviews of commitments and results. You can see what has been completed, where support is needed and what calls for a new decision.

### How we work with you

- Title: A clearer way to lead and follow through.
- Copy: We start with how decisions are made today and agree on a way of working your team can maintain.

1. **Understand how you decide.** We review who takes part, where issues get stuck and what information is missing.
2. **Clarify responsibilities.** We agree on who decides, who contributes and who is accountable for each commitment.
3. **Set out the agreements.** We define how to record decisions and share the information people need.
4. **Organise reviews.** We agree on how to review results, address outstanding issues and adjust decisions.

### Shared final contact

- Title: Let's discuss your next move.
- Copy: Schedule a free consultation to review your priorities, identify opportunities and define the next step with clarity.
- Form and direct contact: existing shared content, unchanged; see “Textos comunes”.

## 3. Crecimiento Empresarial — Español

### SEO

- Título: Crecimiento Empresarial | AGSIT
- Descripción: Evalúa nuevos mercados y oportunidades para hacer crecer tu empresa. En AGSIT te ayudamos a elegir dónde invertir tus esfuerzos y qué necesitas para avanzar.

### Portada

- Antetítulo: Crecimiento Empresarial
- H1, primera línea: Elige dónde crecer
- H1, segunda línea: con más claridad
- Texto: Evaluamos contigo las oportunidades de tu empresa para decidir dónde crecer y qué necesitas para hacerlo sin perder el control del negocio.

### Narrativa

Tener más oportunidades no siempre hace más fácil decidir. Elegir **dónde crecer** exige conocer a tus clientes, cuidar la **rentabilidad** y saber qué puede sostener tu empresa antes de **dar el siguiente paso**.

### Lo que incluye

- Título: Cinco decisiones para orientar tu crecimiento.
- Texto: Revisamos las oportunidades, los recursos y la forma en que tu empresa genera ingresos para elegir dónde concentrar el esfuerzo.

#### 01. Oportunidades

- Subtítulo: Dónde vale la pena crecer
- Texto: Revisamos opciones para ampliar tu negocio a partir de lo que ya sabes hacer. Distinguimos las oportunidades que encajan con tus objetivos y recursos.

#### 02. Mercados

- Subtítulo: A qué clientes puedes llegar
- Texto: Analizamos qué clientes podrías atender y qué necesitan. Evaluamos nuevos mercados y formas de llegar a ellos con una oferta relevante.

#### 03. Rentabilidad

- Subtítulo: Crecer con sentido para el negocio
- Texto: Revisamos cómo cada opción puede generar ingresos y qué costos implica. Así puedes valorar el crecimiento más allá de vender más.

#### 04. Capacidad

- Subtítulo: Lo que necesitas para responder
- Texto: Revisamos si tu equipo, tus recursos y tu operación pueden sostener el crecimiento. Identificamos qué necesitas fortalecer antes de ampliar el negocio.

#### 05. Plan de crecimiento

- Subtítulo: Una opción clara para avanzar
- Texto: Elegimos contigo las oportunidades prioritarias y ordenamos las acciones. Definimos responsables y qué resultados revisar para decidir si seguir o ajustar.

### Cómo trabajamos contigo

- Título: Convertimos oportunidades en decisiones.
- Texto: Te ayudamos a comparar opciones y elegir un camino que tenga sentido para tu empresa.

1. **Entender tu meta.** Aclaramos qué quieres lograr al crecer y qué necesitas cuidar del negocio actual.
2. **Comparar oportunidades.** Revisamos clientes, ingresos, costos y recursos necesarios para cada opción.
3. **Elegir dónde enfocarte.** Priorizamos contigo las opciones que mejor encajan con tu empresa.
4. **Preparar el avance.** Acordamos acciones, responsables y resultados que permitan revisar el crecimiento.

### Contacto final compartido

- Título: Hablemos de tu siguiente avance.
- Texto: Agenda una asesoría sin costo para revisar tus prioridades, detectar oportunidades y definir el siguiente paso con claridad.
- Formulario y contacto directo: contenido común existente, sin cambios; véase «Textos comunes».

## 3. Business Growth — English

### SEO

- Title: Business Growth | AGSIT
- Description: Explore new markets and opportunities to grow your business. AGSIT helps you decide where to focus your resources and what you need to move forward.

### Hero

- Eyebrow: Business Growth
- H1, first line: Choose where to grow
- H1, second line: with greater clarity
- Copy: We assess opportunities with you so you can decide where to grow and what you need to do it while staying in control of your business.

### Narrative

More opportunities do not always make decisions easier. Choosing **where to grow** means understanding your customers, protecting **profitability** and knowing what your business can support before you **take the next step**.

### What is included

- Title: Five decisions to guide your growth.
- Copy: We review opportunities, resources and how your business earns revenue to help you choose where to focus your efforts.

#### 01. Opportunities

- Subtitle: Where growth makes sense
- Copy: We explore ways to expand your business by building on what you already do well. We identify opportunities that fit your goals and resources.

#### 02. Markets

- Subtitle: Which customers you could reach
- Copy: We look at the customers you could serve and what they need. We assess new markets and ways to reach them with an offer that matters to them.

#### 03. Profitability

- Subtitle: Growth that makes business sense
- Copy: We review how each option could generate revenue and the costs involved. You can assess growth beyond an increase in sales.

#### 04. Capacity

- Subtitle: What you need to deliver
- Copy: We review whether your team, resources and operations can support growth. We identify what needs strengthening before you expand.

#### 05. Growth plan

- Subtitle: A clear path forward
- Copy: Together we choose the priority opportunities and set out the actions. We agree on responsibilities and the results to review before continuing or adjusting course.

### How we work with you

- Title: Turn opportunities into decisions.
- Copy: We help you compare options and choose a path that makes sense for your business.

1. **Understand your goal.** We clarify what you want from growth and what you need to protect in your current business.
2. **Compare opportunities.** We review the customers, revenue, costs and resources involved in each option.
3. **Choose your focus.** Together we prioritise the options that best fit your business.
4. **Prepare to move forward.** We agree on actions, responsibilities and results to review as the business grows.

### Shared final contact

- Title: Let's discuss your next move.
- Copy: Schedule a free consultation to review your priorities, identify opportunities and define the next step with clarity.
- Form and direct contact: existing shared content, unchanged; see “Textos comunes”.

## 4. Transformación Empresarial — Español

### SEO

- Título: Transformación Empresarial | AGSIT
- Descripción: Adapta tu empresa a nuevas necesidades del negocio. En AGSIT te ayudamos a definir qué cambiar, preparar a tu equipo y revisar los avances.

### Portada

- Antetítulo: Transformación Empresarial
- H1, primera línea: Cambia con sentido
- H1, segunda línea: para seguir avanzando
- Texto: Te ayudamos a decidir qué necesita cambiar en tu empresa y a preparar a tu equipo para llevarlo a la práctica sin perder de vista el negocio.

### Narrativa

Lo que antes funcionaba puede dejar de responder a tus clientes y a tu negocio. Tener claro **qué cambiar**, involucrar a tu **equipo** y revisar el avance ayuda a que las nuevas ideas se conviertan en **mejoras reales**.

### Lo que incluye

- Título: Cinco bases para llevar el cambio a la práctica.
- Texto: Conectamos lo que tu empresa necesita lograr con los cambios en el trabajo diario y con las personas que los harán posibles.

#### 01. Necesidad de cambio

- Subtítulo: Qué ya no está funcionando
- Texto: Revisamos qué necesita cambiar para responder a tus clientes y a tus objetivos. Aclaramos qué problema debe resolver la transformación.

#### 02. Rumbo del cambio

- Subtítulo: Qué quieres lograr
- Texto: Definimos cómo necesitas que funcione tu empresa y qué vale la pena conservar. El equipo entiende para qué cambia y qué resultado se busca.

#### 03. Nuevas formas de trabajar

- Subtítulo: Ideas que resuelven necesidades
- Texto: Evaluamos cambios en cómo trabajas, atiendes a tus clientes y ofreces tus productos o servicios. Elegimos las ideas por su utilidad para el negocio.

#### 04. Equipo preparado

- Subtítulo: Personas que entienden el cambio
- Texto: Aclaramos qué cambia para cada equipo y qué apoyo necesita. Definimos responsabilidades y cómo comunicar los cambios para facilitar su adopción.

#### 05. Avance del cambio

- Subtítulo: Mejoras que puedes revisar
- Texto: Ordenamos las acciones y definimos qué resultados observar. Revisamos contigo qué funciona y qué necesita ajustarse para sostener el cambio.

### Cómo trabajamos contigo

- Título: Del cambio necesario al trabajo diario.
- Texto: Te acompañamos a definir el cambio, preparar a quienes participan y revisar cómo avanza en la práctica.

1. **Entender la necesidad.** Revisamos qué dejó de funcionar y qué necesita lograr ahora tu empresa.
2. **Acordar qué cambiar.** Definimos las prioridades y qué resultados deben orientar las decisiones.
3. **Preparar al equipo.** Aclaramos responsabilidades, comunicación y apoyos para llevar los cambios al trabajo diario.
4. **Revisar y ajustar.** Damos seguimiento a los avances y acordamos ajustes según lo que ocurre en la práctica.

### Contacto final compartido

- Título: Hablemos de tu siguiente avance.
- Texto: Agenda una asesoría sin costo para revisar tus prioridades, detectar oportunidades y definir el siguiente paso con claridad.
- Formulario y contacto directo: contenido común existente, sin cambios; véase «Textos comunes».

## 4. Business Transformation — English

### SEO

- Title: Business Transformation | AGSIT
- Description: Adapt your company to changing business needs. AGSIT helps you decide what to change, prepare your team and review progress as changes take hold.

### Hero

- Eyebrow: Business Transformation
- H1, first line: Change with purpose
- H1, second line: keep moving forward
- Copy: We help you decide what needs to change and prepare your team to put it into practice while keeping the business in focus.

### Narrative

What worked before may no longer meet the needs of your customers or your business. Knowing **what to change**, involving your **team** and reviewing progress helps turn new ideas into **practical improvements**.

### What is included

- Title: Five foundations for putting change into practice.
- Copy: We connect what your business needs to achieve with changes in everyday work and the people who will make them happen.

#### 01. Need for change

- Subtitle: What is no longer working
- Copy: We review what needs to change to meet your customers’ needs and your business goals. We clarify the problem the transformation must solve.

#### 02. Direction for change

- Subtitle: What you want to achieve
- Copy: We define how your business needs to work and what is worth keeping. Your team understands why things are changing and the result you want.

#### 03. New ways of working

- Subtitle: Ideas that meet real needs
- Copy: We assess changes to how you work, serve customers and offer products or services. We choose ideas for the value they bring to the business.

#### 04. Team readiness

- Subtitle: People who understand the change
- Copy: We clarify what changes for each team and what support they need. We define responsibilities and how to communicate changes so people can put them into practice.

#### 05. Progress

- Subtitle: Improvements you can review
- Copy: We set out the actions and define which results to watch. Together we review what works and what needs adjusting to make the changes last.

### How we work with you

- Title: From the need for change to everyday work.
- Copy: We help you define the change, prepare the people involved and review how it works in practice.

1. **Understand the need.** We review what is no longer working and what your business needs to achieve now.
2. **Agree on what to change.** We define the priorities and the results that should guide decisions.
3. **Prepare your team.** We clarify responsibilities, communication and support to bring changes into everyday work.
4. **Review and adjust.** We follow progress and agree on adjustments based on what happens in practice.

### Shared final contact

- Title: Let's discuss your next move.
- Copy: Schedule a free consultation to review your priorities, identify opportunities and define the next step with clarity.
- Form and direct contact: existing shared content, unchanged; see “Textos comunes”.

## Textos comunes

### Control de desplazamiento de la portada

Se conservan los textos de Corporativa en todas las páginas:

| Campo | Español | English |
| --- | --- | --- |
| Nombre accesible del botón | Continuar a la siguiente sección | Continue to the next section |
| Texto circular | DESLIZA · EXPLORA · DESLIZA · EXPLORA · | SCROLL · EXPLORE · SCROLL · EXPLORE · |

### Contacto directo y formulario

Contenido existente de `src/data/contact.ts`, compartido por las ocho versiones; no se propone modificarlo. Los datos de teléfono, correo y demás canales siguen procediendo de la configuración actual.

| Elemento | Español | English |
| --- | --- | --- |
| Rótulo de contacto | Información de contacto | Contact information |
| Título de contacto | Contacto directo | Direct contact |
| Texto de contacto | También puedes comunicarte con nuestro equipo por estos canales. | You can also contact our team through these channels. |
| Teléfono | Llamadas y WhatsApp | Calls and WhatsApp |
| WhatsApp | Abrir conversación en WhatsApp | Open WhatsApp conversation |
| Campos obligatorios | * Campos obligatorios | * Required fields |
| Nombre / indicación | Nombre / Tu nombre | First name / Your first name |
| Apellido / indicación | Apellido / Tu apellido | Last name / Your last name |
| Teléfono / indicación | Teléfono / Tu número de teléfono | Phone / Your phone number |
| Correo / indicación | Email / Tu correo electrónico | Email / Your email address |
| Empresa / indicación | Nombre de la compañía / Nombre de la empresa a la que representas | Company name / Name of the company you represent |
| Mensaje / indicación | Comentario / Describe brevemente el proyecto o necesidad. | Message / Briefly describe the project or need. |
| Enviar | Solicitar asesoría | Request consultation |
| Enviando | Enviando... | Sending... |
| Éxito | Solicitud enviada. Te contactaremos pronto. | Request sent. We will contact you soon. |
| Error | No se pudo enviar la solicitud. Intenta de nuevo o usa los datos de contacto directo. | The request could not be sent. Try again or use the direct contact details. |

## Etiquetas de los espacios reservados

Cada fila es una imagen compartida por ambos idiomas, con `pending: true`. El orden corresponde a las cinco tarjetas y a la sección de trabajo. Estos textos son las etiquetas visibles de los espacios reservados. Los textos alternativos describen la escena prevista y deberán revisarse cuando se entreguen las imágenes reales. Las rutas de archivos y los recortes se documentarán en `docs/` al crear cada página.

| Servicio / espacio | Etiqueta ES | Label EN | Texto alternativo ES | Alt text EN |
| --- | --- | --- | --- | --- |
| Diagnóstico / 01 | La situación del negocio | The business today | Equipo revisando la situación actual de su empresa. | Team reviewing their company’s current position. |
| Diagnóstico / 02 | Las fortalezas de la empresa | Business strengths | Equipo conversando sobre las fortalezas de su empresa. | Team discussing their company’s strengths. |
| Diagnóstico / 03 | Los obstáculos del trabajo | Obstacles at work | Colaboradores identificando dónde se atora el trabajo. | Colleagues identifying where work gets stuck. |
| Diagnóstico / 04 | El entorno del negocio | The business environment | Equipo revisando información sobre clientes y mercado. | Team reviewing information about customers and the market. |
| Diagnóstico / 05 | Las prioridades del negocio | Business priorities | Directivos acordando qué asuntos atender primero. | Business leaders agreeing on which issues to address first. |
| Diagnóstico / Trabajo | Una revisión del negocio | A business review | Sesión de trabajo para revisar hallazgos y prioridades de la empresa. | Working session to review business findings and priorities. |
| Gobierno / 01 | Las decisiones de la empresa | Business decisions | Dueños y directivos conversando sobre las decisiones de la empresa. | Owners and senior leaders discussing business decisions. |
| Gobierno / 02 | Las responsabilidades del equipo | Team responsibilities | Equipo revisando sus responsabilidades y compromisos. | Team reviewing their responsibilities and commitments. |
| Gobierno / 03 | Los acuerdos de trabajo | Working agreements | Participantes dejando por escrito los acuerdos de una reunión. | Participants recording the agreements reached in a meeting. |
| Gobierno / 04 | Los resultados del negocio | Business results | Directivos revisando los resultados de la empresa. | Business leaders reviewing company results. |
| Gobierno / 05 | El seguimiento de acuerdos | Following through on agreements | Equipo revisando el avance de los compromisos acordados. | Team reviewing progress on agreed commitments. |
| Gobierno / Trabajo | Una sesión de dirección | A leadership session | Sesión de dirección para acordar responsabilidades y seguimiento. | Leadership session to agree on responsibilities and reviews. |
| Crecimiento / 01 | Las oportunidades del negocio | Business opportunities | Equipo evaluando oportunidades para ampliar el negocio. | Team evaluating opportunities to expand the business. |
| Crecimiento / 02 | Los nuevos mercados | New markets | Equipo revisando las necesidades de posibles clientes. | Team reviewing the needs of potential customers. |
| Crecimiento / 03 | Los ingresos y costos | Revenue and costs | Directivos revisando ingresos y costos de una oportunidad de crecimiento. | Business leaders reviewing revenue and costs for a growth opportunity. |
| Crecimiento / 04 | La capacidad de la empresa | Business capacity | Equipo revisando los recursos necesarios para crecer. | Team reviewing the resources needed for growth. |
| Crecimiento / 05 | El plan de crecimiento | The growth plan | Equipo acordando acciones y responsabilidades para crecer. | Team agreeing on actions and responsibilities for growth. |
| Crecimiento / Trabajo | Una sesión de crecimiento | A growth planning session | Sesión de trabajo para comparar oportunidades y acordar prioridades de crecimiento. | Working session to compare opportunities and agree on growth priorities. |
| Transformación / 01 | La necesidad de cambio | The need for change | Equipo revisando qué necesita cambiar en su empresa. | Team reviewing what needs to change in their business. |
| Transformación / 02 | El rumbo del cambio | Direction for change | Directivos acordando qué debe lograr el cambio. | Business leaders agreeing on what the change should achieve. |
| Transformación / 03 | Las nuevas formas de trabajar | New ways of working | Colaboradores evaluando una nueva forma de atender a sus clientes. | Colleagues assessing a new way to serve their customers. |
| Transformación / 04 | El equipo ante el cambio | The team preparing for change | Equipo conversando sobre sus responsabilidades ante un cambio. | Team discussing their responsibilities as the business changes. |
| Transformación / 05 | Los avances del cambio | Progress on change | Equipo revisando los avances y ajustes de un cambio en la empresa. | Team reviewing progress and adjustments to a business change. |
| Transformación / Trabajo | Una sesión de cambio | A session to plan change | Sesión de trabajo para preparar al equipo y revisar las acciones de cambio. | Working session to prepare the team and review actions for change. |

## Textos alternativos de las imágenes para redes

Cada servicio tendrá una imagen de 1200 × 630 generada como las anteriores durante la implementación. Los textos alternativos propuestos describen el tema; se ajustarán si la imagen final requiere una descripción distinta.

| Servicio | Español | English |
| --- | --- | --- |
| Diagnóstico Estratégico | Diagnóstico estratégico AGSIT para entender tu negocio y definir prioridades. | AGSIT strategic assessment to understand your business and set priorities. |
| Gobierno Corporativo | Gobierno corporativo AGSIT para dirigir con decisiones y responsabilidades claras. | AGSIT corporate governance for clear decisions and responsibilities. |
| Crecimiento Empresarial | Crecimiento empresarial AGSIT para elegir oportunidades y preparar tu negocio. | AGSIT business growth to choose opportunities and prepare your business. |
| Transformación Empresarial | Transformación empresarial AGSIT para preparar al equipo y llevar el cambio a la práctica. | AGSIT business transformation to prepare your team and put change into practice. |

## Alcance de esta entrega

Solo se agrega este documento. La creación de páginas, los enlaces, los mensajes de WhatsApp, las imágenes, los metadatos y las verificaciones visuales quedan para el paso 2, después de aprobar los textos y las rutas. No se propone modificar el menú, el contacto, el footer, el layout, `global.css`, los componentes de otras áreas ni Gestión de Calidad.
