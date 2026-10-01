const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('.gallery-item').forEach(button => {
  button.addEventListener('click', () => {
    lightbox.querySelector('img').src = button.dataset.image;
    lightbox.querySelector('img').alt = button.dataset.caption;
    lightbox.querySelector('p').textContent = button.dataset.caption;
    lightbox.showModal();
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('#service').value = link.dataset.service; });
});
const form = document.querySelector('#quote-form');
const requestDialog = document.querySelector('#quote-dialog');
const requestPreview = document.querySelector('#request-preview');
const requestStatus = document.querySelector('.request-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  for (const field of form.querySelectorAll('input[required], textarea[required]')) field.value = field.value.trim();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Hi Bruno, I'm " + data.get('name') + " and I'd like to request a painting quote.",
    '',
    'Area: ' + data.get('area'),
    'Service: ' + data.get('service'),
    'Preferred timing: ' + data.get('timing'),
    '',
    String(data.get('details')),
    '',
    'Please let me know the next steps. Thanks!'
  ].join('\n');
  requestPreview.value = message;
  requestStatus.textContent = '';
  document.querySelector('#copy-request').textContent = 'Copy message';
  requestDialog.showModal();
});
document.querySelector('#copy-request').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(requestPreview.value);
    requestStatus.textContent = 'Copied. Paste it into a message to Bruno, then send it when you’re ready.';
    document.querySelector('#copy-request').textContent = 'Message copied';
  } catch {
    requestPreview.focus();
    requestPreview.select();
    requestStatus.textContent = 'Select and copy the message above, then paste it into a text to Bruno.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
