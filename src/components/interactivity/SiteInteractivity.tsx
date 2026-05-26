import { useCallback, useEffect, useState } from 'react';

function OfficeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4 21V4.8C4 3.8 4.8 3 5.8 3h8.4c1 0 1.8.8 1.8 1.8V21" />
      <path d="M16 8h2.2c1 0 1.8.8 1.8 1.8V21" />
      <path d="M8 7h4M8 11h4M8 15h4" />
      <path d="M3 21h18" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg className="contact-whatsapp-icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M8.2 24.6 9.3 20.7A9.2 9.2 0 1 1 12.5 23Z" />
      <path d="M12.4 11.4c.2-.5.5-.5.8-.5h.6c.2 0 .4.1.6.5l.7 1.7c.1.3.1.5-.1.7l-.6.7c-.1.2-.2.4 0 .7.6 1.1 1.6 2.1 2.9 2.8.3.2.5.1.7-.1l.8-1c.2-.2.5-.3.8-.1l1.7.8c.4.2.5.4.5.7-.1.8-.8 1.7-1.7 2-.9.3-2.4.1-4.4-.9-2.4-1.2-4.5-3.7-4.8-5.5-.2-1 .3-2 .9-2.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.8 6h14.4c1 0 1.8.8 1.8 1.8v8.4c0 1-.8 1.8-1.8 1.8H4.8c-1 0-1.8-.8-1.8-1.8V7.8C3 6.8 3.8 6 4.8 6Z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ContactForm() {
  return (
    <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
      <label>
        Nombre
        <input type="text" name="name" placeholder="Tu nombre" />
      </label>
      <label>
        Apellido
        <input type="text" name="lastName" placeholder="Tu apellido" />
      </label>
      <label>
        Teléfono
        <input type="tel" name="phone" placeholder="+52" />
      </label>
      <label>
        Email
        <input type="email" name="email" placeholder="correo@empresa.com" />
      </label>
      <label className="contact-form-wide">
        Nombre de la compañía
        <input type="text" name="company" placeholder="Empresa" />
      </label>
      <label className="contact-form-wide">
        Comentario
        <textarea name="message" placeholder="Describe brevemente el proyecto o necesidad" rows={4} />
      </label>
      <button className="contact-submit" type="submit">
        Solicitar asesoría
      </button>
    </form>
  );
}

function ContactDirectCard() {
  return (
    <aside className="contact-direct-card" aria-label="Información de contacto">
      <h3>Contacto directo</h3>
      <p>También puedes comunicarte con nuestro equipo por estos canales.</p>
      <a href="tel:+525570267458">
        <span className="contact-direct-icon">
          <OfficeIcon />
        </span>
        <span>+52 55 7026 7458</span>
      </a>
      <a href="https://wa.me/525588905291" target="_blank" rel="noreferrer">
        <span className="contact-direct-icon">
          <WhatsappIcon />
        </span>
        <span>+52 55 8890 5291</span>
      </a>
      <a href="mailto:contacto@agsit.com.mx">
        <span className="contact-direct-icon">
          <MailIcon />
        </span>
        <span>contacto@agsit.com.mx</span>
      </a>
    </aside>
  );
}

function ContactDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('drawer-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('drawer-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`contact-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <button className="contact-drawer-backdrop" type="button" aria-label="Cerrar formulario" onClick={onClose} />
      <section className="contact-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="contact-drawer-title">
        <div className="contact-drawer-handle" aria-hidden="true" />
        <button className="contact-drawer-close" type="button" aria-label="Cerrar formulario" onClick={onClose}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className="contact-drawer-content">
          <div className="contact-drawer-heading">
            <p>Agenda una asesoría sin costo</p>
            <h2 id="contact-drawer-title">Cuéntanos qué necesita tu empresa.</h2>
            <span>Un especialista de AGSIT revisará tu solicitud para orientar el siguiente paso.</span>
          </div>

          <ContactForm />
          <ContactDirectCard />
        </div>
      </section>
    </div>
  );
}

function SiteInteractivity() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const closeContact = useCallback(() => setIsContactOpen(false), []);
  const openContact = useCallback(() => setIsContactOpen(true), []);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.site-nav nav');
    const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
    const openButtons = Array.from(document.querySelectorAll<HTMLElement>('[data-contact-trigger]'));
    const navLinks = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-close]'));
    const forms = Array.from(document.querySelectorAll<HTMLFormElement>('[data-contact-form]'));

    const setMenuOpen = (isOpen: boolean) => {
      nav?.classList.toggle('is-open', isOpen);
      toggle?.classList.toggle('is-open', isOpen);
      toggle?.setAttribute('aria-expanded', String(isOpen));
      toggle?.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    };

    const handleToggle = () => setMenuOpen(!nav?.classList.contains('is-open'));
    const handleOpen = () => {
      setMenuOpen(false);
      openContact();
    };
    const handleNavClose = () => setMenuOpen(false);
    const handleOpenEvent = () => openContact();
    const handleCloseEvent = () => closeContact();
    const handleSubmit = (event: SubmitEvent) => event.preventDefault();

    toggle?.addEventListener('click', handleToggle);
    openButtons.forEach((button) => button.addEventListener('click', handleOpen));
    navLinks.forEach((link) => link.addEventListener('click', handleNavClose));
    forms.forEach((form) => form.addEventListener('submit', handleSubmit));
    window.addEventListener('agsit:open-contact', handleOpenEvent);
    window.addEventListener('agsit:close-contact', handleCloseEvent);

    return () => {
      toggle?.removeEventListener('click', handleToggle);
      openButtons.forEach((button) => button.removeEventListener('click', handleOpen));
      navLinks.forEach((link) => link.removeEventListener('click', handleNavClose));
      forms.forEach((form) => form.removeEventListener('submit', handleSubmit));
      window.removeEventListener('agsit:open-contact', handleOpenEvent);
      window.removeEventListener('agsit:close-contact', handleCloseEvent);
    };
  }, [closeContact, openContact]);

  return <ContactDrawer isOpen={isContactOpen} onClose={closeContact} />;
}

export default SiteInteractivity;
