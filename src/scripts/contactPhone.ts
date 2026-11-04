import intlTelInput, { type Iti } from 'intl-tel-input';
import { es, en } from 'intl-tel-input/locale';

const instances = new WeakMap<HTMLFormElement, Iti>();
let utilsPromise: Promise<void> | null = null;
let openSelector: Iti | null = null;

export const ensureContactPhoneReady = () => {
  // Import first so a network failure can be retried without leaving the
  // library's global loader or either form in a partially loaded state.
  utilsPromise ??= import('intl-tel-input/utils')
    .then((module) => intlTelInput.attachUtils(() => Promise.resolve(module)))
    .then(() => undefined)
    .catch((error) => {
      utilsPromise = null;
      throw error;
    });
  return utilsPromise;
};

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && openSelector) {
    event.preventDefault();
    event.stopImmediatePropagation();
    openSelector.closeCountrySelector();
  }
}, true);

export function initContactPhone(form: HTMLFormElement) {
  if (instances.has(form)) return;
  const input = form.querySelector<HTMLInputElement>('input[name="phone"]');
  if (!input) return;
  // Keep '+' in the telephone field instead of redirecting typed digits to
  // country search. The library's next input event resolves the dial code.
  input.addEventListener('keydown', (event) => {
    if (event.key === '+' && input.selectionStart === 0) event.stopImmediatePropagation();
  }, true);
  input.addEventListener('input', (event) => {
    // Android can insert '+' without a keydown event.
    if ((event as InputEvent).data === '+' && input.value.startsWith('+')) event.stopImmediatePropagation();
  }, true);
  const english = document.documentElement.lang.toLowerCase().startsWith('en');
  const initialCountry = english ? 'us' : 'mx';
  const instance = intlTelInput(input, {
    initialCountry,
    countryNameLocale: english ? 'en' : 'es-MX',
    uiTranslations: english ? en : es,
    separateDialCode: true,
    showFlags: true,
    countrySelectorMode: 'AUTO',
    countrySearch: true,
    dropdownParent: document.body,
    fullscreenParent: document.body,
    placeholderNumberPolicy: 'OFF',
    allowedNumberTypes: ['MOBILE', 'FIXED_LINE'],
    // Preserve incomplete/invalid input so validation can explain the error.
    strictMode: false,
  });
  instances.set(form, instance);
  const preload = () => { void ensureContactPhoneReady().catch(() => undefined); };
  input.addEventListener('focus', preload);
  input.addEventListener('input', preload);
  input.addEventListener('open:countryselector', () => {
    openSelector?.closeCountrySelector();
    openSelector = instance;
    preload();
  });
  input.addEventListener('close:countryselector', () => {
    if (openSelector === instance) openSelector = null;
  });
  form.addEventListener('reset', () => {
    instance.closeCountrySelector();
    // The native reset happens after this event.
    queueMicrotask(() => {
      instance.setNumber('');
      instance.setSelectedCountry(initialCountry);
    });
  });
  const drawer = form.closest('.contact-drawer');
  if (drawer) {
    new MutationObserver(() => {
      if (!drawer.classList.contains('is-open')) instance.closeCountrySelector();
    }).observe(drawer, { attributes: true, attributeFilter: ['class'] });
  }
}

export const isContactPhoneValid = (form: HTMLFormElement) => {
  const utils = intlTelInput.utils;
  const instance = instances.get(form);
  if (!utils) return true;
  if (!instance) return false;
  if (instance.isValidNumber()) return true;
  const raw = form.querySelector<HTMLInputElement>('input[name="phone"]')?.value.trim() || '';
  const digits = raw.replace(/\D/g, '');
  const country = instance.getSelectedCountry();
  // Also accept a pasted country code without '+', but only when it matches
  // the selected country and the resulting international number is valid.
  if (/^[0-9][0-9\s().-]*$/.test(raw) && country && digits.startsWith(country.dialCode) &&
      utils.isValidNumber(`+${digits}`, country.iso2, ['MOBILE', 'FIXED_LINE'])) {
    instance.setNumber(`+${digits}`);
    return instance.isValidNumber() === true;
  }
  return false;
};

export const getContactPhoneNumber = (form: HTMLFormElement) =>
  instances.get(form)?.getNumber('E164') || '';
