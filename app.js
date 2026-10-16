/* Progressive enhancement only. All handbook content is already in index.html. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const grid = $('procedure-grid');
  const dialog = $('procedure-dialog');
  const guide = $('guide-dialog');
  const canOpenDialogs = typeof dialog.showModal === 'function';
  const entries = [...document.querySelectorAll('[data-procedure]')].map((element, index) => {
    const reference = $('procedure-' + element.dataset.procedure);
    return {
      element, reference, index,
      id: element.dataset.procedure,
      title: element.dataset.title,
      section: element.dataset.section,
      roles: JSON.parse(element.dataset.roles),
      task: element.dataset.task,
      searchText: (element.textContent + ' ' + reference.textContent).toLowerCase()
    };
  });
  const filters = {query: '', section: 'all', role: 'all', task: 'all', sort: 'recommended'};
  let lastOpener = null;

  function render() {
    const words = filters.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const entry of entries) {
      const matches = (filters.section === 'all' || entry.section === filters.section)
        && (filters.role === 'all' || entry.roles.includes(filters.role))
        && (filters.task === 'all' || entry.task === filters.task)
        && words.every(word => entry.searchText.includes(word));
      entry.element.hidden = !matches;
      if (matches) visible++;
    }
    const sorted = [...entries].sort(filters.sort === 'az'
      ? (a, b) => a.title.localeCompare(b.title)
      : (a, b) => a.index - b.index);
    sorted.forEach(entry => grid.append(entry.element));
    const filtered = !!(words.length || filters.section !== 'all' || filters.role !== 'all' || filters.task !== 'all');
    $('results-count').textContent = visible + (visible === 1 ? ' procedure' : ' procedures') + (filtered ? ' matching your filters' : '');
    $('empty-state').hidden = visible > 0;
    $('clear-filters').hidden = !filtered;
    document.querySelectorAll('[data-action="section"]').forEach(control => {
      const active = control.dataset.section === filters.section;
      control.classList.toggle('active', active);
      if (control.tagName === 'BUTTON') control.setAttribute('aria-pressed', String(active));
      else if (active) control.setAttribute('aria-current', 'true');
      else control.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-action="responsibility"]').forEach(control => {
      const active = control.dataset.section === filters.section && control.dataset.owner === filters.role;
      control.classList.toggle('active', active);
      if (active) control.setAttribute('aria-current', 'true');
      else control.removeAttribute('aria-current');
    });
  }

  function reset() {
    Object.assign(filters, {query: '', section: 'all', role: 'all', task: 'all', sort: 'recommended'});
    $('search').value = '';
    $('role-filter').value = 'all';
    $('task-filter').value = 'all';
    $('sort').value = 'recommended';
    render();
  }

  function openProcedure(id, opener) {
    const entry = entries.find(entry => entry.id === id);
    if (!entry || !canOpenDialogs) return false;
    $('procedure-content').innerHTML = entry.reference.innerHTML.replace(
      'id="procedure-' + id + '-title"', 'id="procedure-title"');
    lastOpener = opener;
    dialog.showModal();
    return true;
  }

  $('search').addEventListener('input', event => { filters.query = event.target.value; render(); });
  $('role-filter').addEventListener('change', event => { filters.role = event.target.value; render(); });
  $('task-filter').addEventListener('change', event => { filters.task = event.target.value; render(); });
  $('sort').addEventListener('change', event => { filters.sort = event.target.value; render(); });
  $('clear-filters').addEventListener('click', reset);
  $('empty-action').addEventListener('click', reset);

  document.addEventListener('click', event => {
    const control = event.target.closest('[data-action]');
    if (!control) return;
    const action = control.dataset.action;
    if (action === 'open') {
      if (openProcedure(control.dataset.id, control)) event.preventDefault();
      return;
    }
    if (action === 'close' && dialog.open) {
      event.preventDefault();
      dialog.close();
      return;
    }
    if (action === 'section') {
      event.preventDefault();
      filters.section = control.dataset.section;
      render();
    }
    if (action === 'responsibility') {
      event.preventDefault();
      reset();
      filters.section = control.dataset.section;
      filters.role = control.dataset.owner;
      $('role-filter').value = filters.role;
      render();
    }
    if (action === 'browse') reset();
  });

  dialog.addEventListener('close', () => { lastOpener?.focus(); });
  if (typeof guide.showModal === 'function') {
    $('guide-button').hidden = false;
    $('guide-button').addEventListener('click', () => guide.showModal());
    $('guide-close').addEventListener('click', () => guide.close());
    $('guide-done').addEventListener('click', () => guide.close());
  }
  for (const surface of [dialog, guide]) {
    surface.addEventListener('click', event => {
      if (event.target !== surface) return;
      const box = surface.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) surface.close();
    });
  }
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k' && !dialog.open && !guide.open) {
      event.preventDefault();
      $('search').focus();
    }
  });

  // Reveal enhanced controls after setup succeeds. Native anchor links remain the fallback.
  render();
  $('reference-tools').hidden = false;
  if (canOpenDialogs) $('full-handbook').hidden = true;
})();
