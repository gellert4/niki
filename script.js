'use strict';
const config = window.NIKI_CONFIG || {};
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);

function filterPrices(category) {
  document.querySelectorAll('[data-filter]').forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  document.querySelectorAll('.price-group').forEach(group => {
    group.hidden = category !== 'all' && group.dataset.category !== category;
    if (!group.hidden) count++;
  });
  const status = document.querySelector('#price-status');
  if (status) status.textContent = `${count} Preisgruppen angezeigt.`;
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => filterPrices(button.dataset.filter)));
document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => filterPrices(link.dataset.categoryLink)));
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#service').value = link.dataset.service; }));

// Validate configurable destinations. Contact information is never invented.
let contactURL = '';
let contactLabel = '';
if (/^[1-9]\d{6,14}$/.test(config.whatsappNumber || '')) {
  contactURL = `https://wa.me/${config.whatsappNumber}`;
  contactLabel = 'Auf WhatsApp schreiben ↗';
} else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '') && !/[\r\n]/.test(config.email)) {
  contactURL = `mailto:${config.email}`;
  contactLabel = config.email;
} else {
  try {
    const instagram = new URL(config.instagram);
    if (instagram.protocol === 'https:' && ['instagram.com', 'www.instagram.com'].includes(instagram.hostname)) {
      contactURL = instagram.href;
      contactLabel = `${config.instagramHandle || 'Auf Instagram schreiben'} ↗`;
    }
  } catch { /* Contact remains visibly unconfigured. */ }
}
if (contactURL) {
  const contact = document.querySelector('#configured-contact');
  contact.href = contactURL;
  contact.textContent = contactLabel;
  contact.hidden = false;
  document.querySelector('.contact-status').hidden = true;
  document.querySelector('.form-note').textContent = 'Hier wird noch nichts versendet. Du kannst deine Nachricht im nächsten Schritt kopieren und persönlich abschicken.';
  document.querySelector('#message-dialog > p:not(.eyebrow)').textContent = 'Kopiere den Text oder öffne deinen Kontaktkanal, um deine Anfrage persönlich abzuschicken. Es wurde noch nichts versendet.';
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('#inquiry-form');
const dialog = document.querySelector('#message-dialog');
const prepared = document.querySelector('#prepared-message');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const nameField = form.elements.name;
  nameField.setCustomValidity(nameField.value.trim() ? '' : 'Bitte gib deinen Vornamen ein.');
  if (!form.reportValidity()) return;
  const name = nameField.value.trim();
  const service = form.elements.service.value;
  const message = form.elements.message.value.trim();
  prepared.value = `Hallo Niki! Ich bin ${name}.\n\nIch interessiere mich für: ${service}.${message ? `\n\n${message}` : ''}\n\nIch freue mich auf deine Rückmeldung!`;
  document.querySelector('#copy-status').textContent = '';
  const send = document.querySelector('#send-message');
  if (contactURL) {
    send.href = contactURL.startsWith('https://wa.me/') ? `${contactURL}?text=${encodeURIComponent(prepared.value)}` : contactURL.startsWith('mailto:') ? `${contactURL}?subject=${encodeURIComponent('Terminanfrage · Niki’s Nageldesign')}&body=${encodeURIComponent(prepared.value)}` : contactURL;
    send.hidden = false;
  }
  dialog.showModal();
});
form?.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});
document.querySelector('#copy-message')?.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(prepared.value);
    status.textContent = 'Kopiert! Du kannst den Text jetzt für deine persönliche Anfrage verwenden.';
  } catch {
    prepared.focus(); prepared.select();
    status.textContent = 'Der Text ist markiert. Bitte kopiere ihn mit Strg+C oder über das Menü deines Geräts.';
  }
});
